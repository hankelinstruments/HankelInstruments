<?php
/* ===============================================
   IPN - NOTIFICACIÓN DE PAGO (Izipay -> tu servidor)
   ===============================================
   Este archivo es OPCIONAL pero muy recomendado para
   producción: es la única fuente 100% confiable de que
   un pago realmente se completó (el navegador del cliente
   puede fallar, cerrarse, perder internet, etc. — esta
   notificación llega directo desde los servidores de
   Izipay, sin pasar por el navegador del comprador).

   CONFIGURACIÓN (una sola vez):
   Back Office Vendedor > API REST > Notificación IPN >
   pega la URL pública de este archivo, ej:
   https://tudominio.com/backend/ipn.php

   Aquí normalmente: guardarías el pedido como "pagado"
   en tu base de datos y descontarías el stock. Como este
   proyecto no usa base de datos propia (usas Google Sheets),
   lo más simple es que este archivo te mande un correo o
   registre el pedido en un archivo de texto/log para que
   luego actualices el Sheet manualmente, o que llame a la
   API de Google Sheets para restar el stock automáticamente
   (paso más avanzado, no incluido aquí).
   =============================================== */

define('IZIPAY_PASSWORD', 'CHANGE_ME_CLAVE_TEST'); // misma clave usada para generar el token

function checkHash($key) {
    $krAnswer = str_replace('\/', '/', $_POST["kr-answer"] ?? '');
    $calculatedHash = hash_hmac("sha256", $krAnswer, $key);
    return isset($_POST['kr-hash']) && hash_equals($calculatedHash, $_POST['kr-hash']);
}

if (empty($_POST)) {
    http_response_code(400);
    echo "Sin datos";
    exit;
}

if (!checkHash(IZIPAY_PASSWORD)) {
    http_response_code(403);
    echo "Firma inválida";
    exit;
}

$answer = json_decode($_POST['kr-answer'], true);
$orderStatus = $answer['orderStatus'] ?? 'UNKNOWN';
$orderId = $answer['orderDetails']['orderId'] ?? 'N/A';

if ($orderStatus === 'PAID') {
    // ✅ Pago confirmado. Registra el pedido (ejemplo simple con un log).
    $linea = date('Y-m-d H:i:s') . " | Orden: $orderId | PAGADO | " . json_encode($answer) . "\n";
    file_put_contents(__DIR__ . '/pedidos.log', $linea, FILE_APPEND);

    // 💡 Opcional: enviar un correo de notificación con mail() o un servicio como SendGrid/Resend.
}

// Izipay espera una respuesta simple confirmando recepción
echo "OK";
