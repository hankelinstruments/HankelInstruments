<?php
/* ===============================================
   GENERAR TOKEN DE PAGO - IZIPAY
   ===============================================
   Este es el ÚNICO archivo que necesita "servidor".
   Todo lo demás de tu sitio (index.html, productos.html,
   etc.) sigue siendo HTML/CSS/JS estático normal.

   ¿Por qué existe este archivo?
   Izipay exige tu "Clave API" (usuario+contraseña secretos)
   para generar el token de pago. Esa clave JAMÁS debe estar
   en un archivo que el navegador pueda leer (como carrito.js),
   porque cualquiera podría copiarla y usarla. Por eso vive
   aquí, en un script que se ejecuta en tu servidor.

   Basado en la documentación oficial:
   https://github.com/izipay-pe/Server-PaymentForm-Php
   =============================================== */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // en producción, limita esto a tu dominio

// ==============================================
// 🔧 1. TUS CREDENCIALES (Back Office Vendedor Izipay)
//    Sección: API REST > "Ver claves"
//    NUNCA subas este archivo a un repositorio público con
//    las claves reales dentro. Usa variables de entorno si puedes.
// ==============================================
define('IZIPAY_USERNAME', 'CHANGE_ME_ID_TIENDA');       // "Identificador de tienda"
define('IZIPAY_PASSWORD', 'CHANGE_ME_CLAVE_TEST');      // "Clave de Test" (luego "Clave de Producción")
define('IZIPAY_URL', 'https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment');

// ==============================================
// 2. LEER LOS DATOS QUE MANDA checkout.js
// ==============================================
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['monto']) || !isset($input['orden'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

$monto = floatval($input['monto']);
$orderId = preg_replace('/[^A-Za-z0-9\-_]/', '', $input['orden']); // limpiar el ID de orden

if ($monto <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Monto inválido']);
    exit;
}

// ==============================================
// 3. ARMAR LA SOLICITUD A IZIPAY
//    IMPORTANTE: el monto se envía en CÉNTIMOS (soles x 100)
// ==============================================
$body = [
    "amount"   => intval(round($monto * 100)),
    "currency" => "PEN",
    "orderId"  => $orderId,
    "customer" => [
        "email" => $input['email'] ?? "cliente@hankelinstruments.com",
    ],
];

$auth = base64_encode(IZIPAY_USERNAME . ":" . IZIPAY_PASSWORD);

$curl = curl_init(IZIPAY_URL);
curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($body),
    CURLOPT_HTTPHEADER => [
        "Authorization: Basic " . $auth,
        "Content-Type: application/json",
    ],
]);

$rawResponse = curl_exec($curl);
$curlError = curl_error($curl);
curl_close($curl);

if ($curlError) {
    http_response_code(502);
    echo json_encode(['error' => 'Error de conexión con Izipay: ' . $curlError]);
    exit;
}

$response = json_decode($rawResponse, true);

if (!isset($response['answer']['formToken'])) {
    http_response_code(502);
    echo json_encode(['error' => 'Izipay no devolvió un formToken', 'detalle' => $response]);
    exit;
}

// ==============================================
// 4. DEVOLVER EL formToken A checkout.js
// ==============================================
echo json_encode([
    'formToken' => $response['answer']['formToken'],
    'orderId'   => $orderId,
]);
