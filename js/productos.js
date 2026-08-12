/* ============================================================
   js/productos.js — Hankel Instruments
   Catálogo de productos (microcontroladores, SBC, kits de
   evaluación e instrumentación). Datos embebidos localmente
   (sin llamadas externas ni a IA) para carga rápida en un
   sitio estático.
   Requiere: js/config.js (HANKEL_CONFIG) cargado antes que este archivo.
   ============================================================ */

// Número de WhatsApp de la empresa para consultas
const WHATSAPP_NUMBER = '51935344937';

const PRODUCTS = [
  {
    "id": "seeed-xiao-ra4m1",
    "imagen": "HI01",
    "categoria": "MCU / Desarrollo",
    "nombre": "Seeed XIAO RA4M1",
    "soc": "Renesas RA4M1 (R7FA4M1AB3CNE)",
    "tipo": "MCU compacto",
    "precio": 37.0,
    "cpu": "Arm Cortex-M4F",
    "nucleos": "1",
    "frecuencia_mhz": "48",
    "ram": "32 KB SRAM",
    "flash": "256 KB Flash + 8 KB Data Flash",
    "conectividad_principal": "Sin radio; CAN y USB 2.0",
    "perifericos": "19 GPIO; 6 entradas analógicas; 2× I2C, 2× UART, 2× SPI; ADC de 14 bits; DAC de 12 bits; CAN; USB-C; gestión/carga de batería",
    "ide": "Arduino IDE, MicroPython, PlatformIO",
    "ficha": "Placa XIAO basada en Renesas RA4M1, con núcleo Arm Cortex-M4F a 48 MHz, 256 KB de Flash y 32 KB de SRAM. Expone 19 GPIO, ADC de 14 bits, DAC de 12 bits, CAN, USB 2.0 y buses I2C/UART/SPI; integra gestión de batería en el formato compacto XIAO.",
    "link": "https://wiki.seeedstudio.com/getting_started_xiao_ra4m1/"
  },
  {
    "id": "firebeetle-2-esp32-c6",
    "imagen": "HI02",
    "categoria": "MCU IoT",
    "nombre": "FireBeetle 2 ESP32-C6",
    "soc": "Espressif ESP32-C6",
    "tipo": "MCU inalámbrico IoT",
    "precio": 45.0,
    "cpu": "RISC-V 32-bit",
    "nucleos": "1",
    "frecuencia_mhz": "160",
    "ram": "512 KB SRAM",
    "flash": "320 KB ROM + 4 MB Flash",
    "conectividad_principal": "Wi-Fi 6 2.4 GHz; Bluetooth 5 LE; IEEE 802.15.4 (Zigbee/Thread)",
    "perifericos": "19 I/O digitales; 6 PWM; ADC de 12 bits; SPI; 3× UART; 2× I2C; I2S; USB 2.0; conector GDI; carga de batería/solar",
    "ide": "ESP-IDF, Arduino IDE, MicroPython",
    "ficha": "FireBeetle 2 basada en ESP32-C6, con CPU RISC-V a 160 MHz, 512 KB de SRAM, 320 KB de ROM y 4 MB de Flash. Añade Wi-Fi 6, Bluetooth LE e IEEE 802.15.4 para Zigbee/Thread, además de 19 I/O digitales y múltiples buses y ADC.",
    "link": "https://wiki.dfrobot.com/dfr1075/"
  },
  {
    "id": "seeed-xiao-rp2350",
    "imagen": "HI03",
    "categoria": "MCU / Desarrollo",
    "nombre": "Seeed XIAO RP2350",
    "soc": "Raspberry Pi RP2350",
    "tipo": "MCU compacto",
    "precio": 45.0,
    "cpu": "Dual Arm Cortex-M33 / dual Hazard3 RISC-V (seleccionable)",
    "nucleos": "2",
    "frecuencia_mhz": "150",
    "ram": "520 KB SRAM",
    "flash": "2 MB Flash onboard",
    "conectividad_principal": "Sin radio",
    "perifericos": "19 GPIO multifunción; USB-C; PIO; ADC; PWM; RGB; gestión y medición de batería",
    "ide": "Raspberry Pi Pico C/C++ SDK, MicroPython, Arduino IDE",
    "ficha": "XIAO basada en RP2350, capaz de usar dos núcleos Arm Cortex-M33 o dos núcleos Hazard3 RISC-V a hasta 150 MHz. Integra 520 KB de SRAM y 2 MB de Flash en la placa, con 19 GPIO y el ecosistema de periféricos/PIO del RP2350.",
    "link": "https://wiki.seeedstudio.com/getting-started-xiao-rp2350/"
  },
  {
    "id": "milk-v-duo-256m",
    "imagen": "HI04",
    "categoria": "Placas Linux / SBC",
    "nombre": "Milk-V Duo 256M",
    "soc": "SOPHGO SG2002",
    "tipo": "SBC Linux/RTOS + TPU",
    "precio": 45.0,
    "cpu": "RISC-V C906 + Arm Cortex-A53 seleccionable + 8051",
    "nucleos": "2",
    "frecuencia_mhz": "1000",
    "ram": "256 MB DRAM",
    "flash": "microSD; SD NAND según variante",
    "conectividad_principal": "Ethernet 100 Mb/s mediante PHY; sin radio integrado",
    "perifericos": "C906 principal hasta 1 GHz; C906 secundario hasta 700 MHz; A53 alternativo hasta 1 GHz; MIPI CSI; USB-C; hasta 26 GPIO; TPU INT8 de 1 TOPS",
    "ide": "Milk-V SDK, Linux, RTOS",
    "ficha": "Milk-V Duo 256M usa el SoC SG2002 con 256 MB de DRAM. El núcleo principal puede ser RISC-V C906 o Arm Cortex-A53 a 1 GHz, acompañado por otro C906 a 700 MHz y un 8051; incorpora TPU de 1 TOPS, MIPI CSI, USB y opciones de almacenamiento microSD/SD NAND.",
    "link": "https://milkv.io/duo"
  },
  {
    "id": "seeed-xiao-samd21",
    "imagen": "HI05",
    "categoria": "MCU / Desarrollo",
    "nombre": "Seeed XIAO SAMD21",
    "soc": "Microchip ATSAMD21G18A",
    "tipo": "MCU compacto",
    "precio": 49.0,
    "cpu": "Arm Cortex-M0+",
    "nucleos": "1",
    "frecuencia_mhz": "48",
    "ram": "32 KB SRAM",
    "flash": "256 KB Flash",
    "conectividad_principal": "Sin radio",
    "perifericos": "11 pines digitales; hasta 11 entradas analógicas; 10 PWM; 1 DAC; I2C, SPI y UART; USB-C",
    "ide": "Arduino IDE, PlatformIO, MicroPython, CircuitPython",
    "ficha": "XIAO SAMD21 utiliza el ATSAMD21G18A, un Arm Cortex-M0+ a 48 MHz con 256 KB de Flash y 32 KB de SRAM. En su formato compacto ofrece GPIO, entradas analógicas, PWM, DAC, I2C, SPI, UART y USB-C, sin conectividad inalámbrica integrada.",
    "link": "https://wiki.seeedstudio.com/Seeeduino-XIAO/"
  },
  {
    "id": "raspberry-pi-pico-w",
    "imagen": "HI06",
    "categoria": "MCU IoT",
    "nombre": "Raspberry Pi Pico W",
    "soc": "RP2040 + Infineon CYW43439",
    "tipo": "MCU inalámbrico",
    "precio": 50.0,
    "cpu": "Dual Arm Cortex-M0+",
    "nucleos": "2",
    "frecuencia_mhz": "133",
    "ram": "264 KB SRAM",
    "flash": "2 MB QSPI Flash",
    "conectividad_principal": "Wi-Fi 2.4 GHz 802.11n; Bluetooth 5.2 / BLE",
    "perifericos": "26 GPIO; 3 ADC; 2× UART, 2× SPI, 2× I2C; 16 PWM; 8 máquinas PIO; USB 1.1; sensor de temperatura",
    "ide": "Raspberry Pi Pico C/C++ SDK, MicroPython",
    "ficha": "Raspberry Pi Pico W combina el RP2040 dual-core a 133 MHz con 264 KB de SRAM y 2 MB de Flash, más el CYW43439 para Wi-Fi 2.4 GHz y Bluetooth 5.2/BLE. Expone 26 GPIO y los periféricos PIO, ADC, PWM, UART, SPI e I2C del RP2040.",
    "link": "https://www.raspberrypi.com/products/raspberry-pi-pico/"
  },
  {
    "id": "raspberry-pi-pico-2-w",
    "imagen": "HI07",
    "categoria": "MCU IoT",
    "nombre": "Raspberry Pi Pico 2 W",
    "soc": "RP2350 + Infineon CYW43439",
    "tipo": "MCU inalámbrico",
    "precio": 58.0,
    "cpu": "Dual Arm Cortex-M33 / dual Hazard3 RISC-V (seleccionable)",
    "nucleos": "2",
    "frecuencia_mhz": "150",
    "ram": "520 KB SRAM",
    "flash": "4 MB QSPI Flash",
    "conectividad_principal": "Wi-Fi 2.4 GHz 802.11n; Bluetooth 5.2 / BLE",
    "perifericos": "26 GPIO; 3 ADC; 2× UART, 2× SPI, 2× I2C; PWM; 12 máquinas PIO; USB 1.1; funciones de seguridad del RP2350",
    "ide": "Raspberry Pi Pico C/C++ SDK, MicroPython",
    "ficha": "Pico 2 W incorpora RP2350 a 150 MHz con arquitectura dual Cortex-M33 o dual Hazard3 RISC-V seleccionable, 520 KB de SRAM y 4 MB de Flash. El CYW43439 aporta Wi-Fi 2.4 GHz y Bluetooth 5.2/BLE.",
    "link": "https://www.raspberrypi.com/products/raspberry-pi-pico-2/"
  },
  {
    "id": "stm32g474ce",
    "imagen": "HI08",
    "categoria": "MCU / Desarrollo",
    "nombre": "STM32G474CE",
    "soc": "STMicroelectronics STM32G474CE",
    "tipo": "MCU de señal mixta/control",
    "precio": 62.0,
    "cpu": "Arm Cortex-M4F",
    "nucleos": "1",
    "frecuencia_mhz": "170",
    "ram": "128 KB SRAM",
    "flash": "512 KB Flash",
    "conectividad_principal": "Sin radio",
    "perifericos": "ADC de 12 bits de alta velocidad; DAC; comparadores y op-amps; FDCAN; USB FS/UCPD; I2C, SPI, UART/USART; temporizadores de alta resolución",
    "ide": "STM32CubeIDE, STM32CubeMX, IAR, Keil",
    "ficha": "STM32G474CE es un microcontrolador Arm Cortex-M4F a 170 MHz con 512 KB de Flash y 128 KB de SRAM. Está orientado a control y señal mixta, con ADC/DAC, comparadores, amplificadores operacionales, temporizadores de alta resolución, FDCAN, USB y buses serie.",
    "link": "https://www.st.com/en/microcontrollers-microprocessors/stm32g474ce.html"
  },
  {
    "id": "microchip-sam-d21-curiosity-nano",
    "imagen": "HI09",
    "categoria": "Microchip Curiosity",
    "nombre": "Microchip SAM D21 Curiosity Nano",
    "soc": "Microchip SAMD21G17D",
    "tipo": "Kit de evaluación MCU",
    "precio": 76.0,
    "cpu": "Arm Cortex-M0+",
    "nucleos": "1",
    "frecuencia_mhz": "48",
    "ram": "16 KB SRAM",
    "flash": "128 KB Flash",
    "conectividad_principal": "Sin radio",
    "perifericos": "Depurador/programador integrado; Virtual COM; USB; LED y pulsador de usuario; pines de expansión; periféricos ADC, timers, I2C/SPI/UART del SAMD21",
    "ide": "MPLAB X IDE, MPLAB Harmony / MCC",
    "ficha": "SAM D21 Curiosity Nano evalúa el SAMD21G17D, un Cortex-M0+ de hasta 48 MHz con 128 KB de Flash y 16 KB de SRAM. El kit integra depurador/programador, puerto COM virtual, alimentación USB, LED/pulsador y acceso a los pines del MCU.",
    "link": "https://www.microchip.com/en-us/development-tool/dm320119"
  },
  {
    "id": "microchip-sam-e51-curiosity-nano",
    "imagen": "HI10",
    "categoria": "Microchip Curiosity",
    "nombre": "Microchip SAM E51 Curiosity Nano",
    "soc": "Microchip SAME51J20A",
    "tipo": "Kit de evaluación MCU",
    "precio": 76.0,
    "cpu": "Arm Cortex-M4F",
    "nucleos": "1",
    "frecuencia_mhz": "120",
    "ram": "256 KB SRAM",
    "flash": "1 MB Flash",
    "conectividad_principal": "Sin radio",
    "perifericos": "Depurador integrado; USB; LED/pulsador; pines de expansión; ADC/DAC y buses I2C/SPI/UART del SAME51",
    "ide": "MPLAB X IDE, MPLAB Harmony / MCC",
    "ficha": "SAM E51 Curiosity Nano está basada en SAME51J20A, un Cortex-M4F a 120 MHz con 1 MB de Flash y 256 KB de SRAM. La placa incorpora depurador/programador, USB, LED y pulsador de usuario y acceso directo a los periféricos del microcontrolador.",
    "link": "https://www.microchip.com/en-us/development-tool/ev76s68a"
  },
  {
    "id": "avr64dd32-curiosity-nano",
    "imagen": "HI11",
    "categoria": "Microchip Curiosity",
    "nombre": "AVR64DD32 Curiosity Nano",
    "soc": "Microchip AVR64DD32",
    "tipo": "Kit de evaluación MCU",
    "precio": 76.0,
    "cpu": "AVR 8-bit",
    "nucleos": "1",
    "frecuencia_mhz": "24",
    "ram": "8 KB SRAM",
    "flash": "64 KB Flash",
    "conectividad_principal": "Sin radio",
    "perifericos": "MVIO; ADC; DAC; UART, SPI e I2C/TWI; temporizadores; LED/pulsador; depurador integrado; tensión objetivo ajustable",
    "ide": "MPLAB X IDE, MCC, Microchip Studio",
    "ficha": "AVR64DD32 Curiosity Nano evalúa el AVR64DD32 de 8 bits a hasta 24 MHz, con 64 KB de Flash y 8 KB de SRAM. Incluye MVIO, periféricos analógicos y serie, depurador integrado, LED/pulsador y alimentación objetivo configurable.",
    "link": "https://www.microchip.com/en-us/development-tool/ev72y42a"
  },
  {
    "id": "avr64du32-curiosity-nano",
    "imagen": "HI12",
    "categoria": "Microchip Curiosity",
    "nombre": "AVR64DU32 Curiosity Nano",
    "soc": "Microchip AVR64DU32",
    "tipo": "Kit de evaluación MCU con USB",
    "precio": 76.0,
    "cpu": "AVR 8-bit",
    "nucleos": "1",
    "frecuencia_mhz": "24",
    "ram": "8 KB SRAM",
    "flash": "64 KB Flash",
    "conectividad_principal": "USB 2.0 Full-Speed; sin radio",
    "perifericos": "USB FS integrado; MVIO; ADC; UART, SPI e I2C/TWI; temporizadores; depurador integrado; conectividad USB-C",
    "ide": "MPLAB X IDE, MCC, Microchip Studio",
    "ficha": "AVR64DU32 Curiosity Nano usa el AVR64DU32 de 8 bits a 24 MHz, con 64 KB de Flash y 8 KB de SRAM. A diferencia de la familia DD, la familia DU integra USB 2.0 Full-Speed; el kit expone además MVIO y los buses/periféricos del MCU.",
    "link": "https://www.microchip.com/en-us/development-tool/ev59f82a"
  },
  {
    "id": "pic32cm-curiosity-nano-touch",
    "imagen": "HI13",
    "categoria": "Microchip Curiosity",
    "nombre": "PIC32CM Curiosity Nano+ Touch",
    "soc": "Microchip PIC32CM5164JH01048",
    "tipo": "Kit de evaluación MCU + touch",
    "precio": 76.0,
    "cpu": "Arm Cortex-M0+",
    "nucleos": "1",
    "frecuencia_mhz": "48",
    "ram": "64 KB SRAM",
    "flash": "512 KB Flash",
    "conectividad_principal": "CAN/LIN; sin radio",
    "perifericos": "Botón táctil; depurador integrado; USB; CAN y LIN; LED/pulsador; ADC y buses serie del PIC32CM",
    "ide": "MPLAB X IDE, MPLAB Harmony / MCC",
    "ficha": "PIC32CM JH01 Curiosity Nano+ Touch utiliza el PIC32CM5164JH01048, Cortex-M0+ a 48 MHz con 512 KB de Flash y 64 KB de SRAM. El kit añade botón táctil, depuración integrada y conectividad CAN/LIN, además del acceso a los periféricos del MCU.",
    "link": "https://www.microchip.com/en-us/development-tool/ev29g58a"
  },
  {
    "id": "dspic33-curiosity-nano",
    "imagen": "HI14",
    "categoria": "Microchip Curiosity",
    "nombre": "dsPIC33 Curiosity Nano",
    "soc": "Microchip dsPIC33CK64MC105",
    "tipo": "Kit de evaluación DSC",
    "precio": 76.0,
    "cpu": "dsPIC33 16-bit DSC",
    "nucleos": "1",
    "frecuencia_mhz": "100",
    "ram": "8 KB RAM",
    "flash": "64 KB ECC Flash",
    "conectividad_principal": "Sin radio",
    "perifericos": "ADC de 12 bits; PWM de alta velocidad; op-amps/comparadores/DAC; buses serie; depurador integrado; LED/pulsador",
    "ide": "MPLAB X IDE, MCC",
    "ficha": "dsPIC33 Curiosity Nano está basada en dsPIC33CK64MC105, un controlador digital de señales de 16 bits que opera hasta 100 MHz, con 64 KB de Flash ECC y 8 KB de RAM. Está orientado a control digital, con ADC, PWM rápido y recursos analógicos integrados.",
    "link": "https://www.microchip.com/en-us/development-tool/ev88g73a"
  },
  {
    "id": "esp32-c6-devkitc-1",
    "imagen": "HI15",
    "categoria": "MCU IoT",
    "nombre": "ESP32-C6-DevKitC-1",
    "soc": "Espressif ESP32-C6 (módulo ESP32-C6-WROOM-1)",
    "tipo": "Kit de desarrollo MCU inalámbrico",
    "precio": 80.0,
    "cpu": "RISC-V 32-bit",
    "nucleos": "1",
    "frecuencia_mhz": "160",
    "ram": "512 KB SRAM",
    "flash": "320 KB ROM + 8 MB SPI Flash",
    "conectividad_principal": "Wi-Fi 6 2.4 GHz; Bluetooth 5 LE; IEEE 802.15.4 (Thread/Zigbee)",
    "perifericos": "USB nativo y USB-UART; GPIO; ADC; SPI/I2C/UART/I2S; headers de expansión; botones Boot/Reset",
    "ide": "ESP-IDF, Arduino IDE",
    "ficha": "ESP32-C6-DevKitC-1 es la placa oficial de desarrollo para ESP32-C6, con CPU RISC-V a 160 MHz, 512 KB de SRAM y módulo con Flash SPI. Integra Wi-Fi 6, Bluetooth LE e IEEE 802.15.4 para Thread/Zigbee, además de USB y headers para los GPIO del SoC.",
    "link": "https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32c6/esp32-c6-devkitc-1/user_guide.html"
  },
  {
    "id": "seeed-xiao-mg24",
    "imagen": "HI16",
    "categoria": "MCU IoT",
    "nombre": "Seeed XIAO MG24",
    "soc": "Silicon Labs EFR32MG24",
    "tipo": "MCU inalámbrico multiprotocolo",
    "precio": 83.0,
    "cpu": "Arm Cortex-M33",
    "nucleos": "1",
    "frecuencia_mhz": "78",
    "ram": "256 KB RAM",
    "flash": "1.5 MB Flash interna + 4 MB Flash onboard",
    "conectividad_principal": "Bluetooth 5.3 LE; Matter/Thread; Zigbee",
    "perifericos": "GPIO; ADC; UART/SPI/I2C; USB-C; RGB; gestión de batería; radio multiprotocolo 2.4 GHz",
    "ide": "Arduino IDE, Simplicity Studio, Zephyr / SDK Silicon Labs",
    "ficha": "XIAO MG24 usa el EFR32MG24, Cortex-M33 a 78 MHz con 256 KB de RAM y 1.5 MB de Flash interna, complementada por 4 MB de Flash en placa. Su radio 2.4 GHz soporta Bluetooth LE, Matter/Thread y Zigbee en un formato XIAO compacto.",
    "link": "https://wiki.seeedstudio.com/xiao_mg24_getting_started/"
  },
  {
    "id": "luckfox-pico",
    "imagen": "HI17",
    "categoria": "Placas Linux / SBC",
    "nombre": "LuckFox Pico",
    "soc": "Rockchip RV1103",
    "tipo": "SBC Linux + NPU",
    "precio": 98.0,
    "cpu": "Arm Cortex-A7 + coprocesador RISC-V",
    "nucleos": "1",
    "frecuencia_mhz": "1200",
    "ram": "64 MB DDR2",
    "flash": "microSD",
    "conectividad_principal": "Sin Wi-Fi/Bluetooth; Ethernet no integrado en el modelo base",
    "perifericos": "MIPI CSI de 2 lanes; USB 2.0 host/device; 24 GPIO; NPU de 0.5 TOPS; audio/serial según pines",
    "ide": "LuckFox SDK, Buildroot, Ubuntu 22.04",
    "ficha": "LuckFox Pico base utiliza RV1103 con Cortex-A7 a 1.2 GHz, coprocesador RISC-V, 64 MB de DDR2 y NPU de 0.5 TOPS. Dispone de cámara MIPI CSI, USB, microSD y GPIO; el modelo base no incorpora radio inalámbrica ni Ethernet integrado.",
    "link": "https://wiki.luckfox.com/Luckfox-Pico/Luckfox-Pico-RV1103/"
  },
  {
    "id": "sipeed-licheerv-nano",
    "imagen": "HI18",
    "categoria": "Placas Linux / SBC",
    "nombre": "Sipeed LicheeRV Nano",
    "soc": "SOPHGO SG2002",
    "tipo": "SBC Linux/RTOS + NPU",
    "precio": 111.0,
    "cpu": "RISC-V C906 + Arm Cortex-A53 seleccionable + 8051",
    "nucleos": "2",
    "frecuencia_mhz": "1000",
    "ram": "256 MB DDR3",
    "flash": "microSD; SD NAND según versión",
    "conectividad_principal": "Ethernet 100 Mb/s y/o Wi-Fi 6 + Bluetooth 5.4 según versión",
    "perifericos": "C906 principal 1 GHz; C906 secundario 700 MHz; A53 alternativo 1 GHz; USB-C OTG; MIPI CSI/DSI; audio; NPU de 1 TOPS",
    "ide": "Sipeed SDK, Buildroot Linux, Debian, RTOS",
    "ficha": "LicheeRV Nano se basa en SG2002 con 256 MB DDR3. Puede ejecutar el núcleo principal RISC-V C906 o Arm Cortex-A53 a 1 GHz, acompañado por otro C906 a 700 MHz, e integra NPU de 1 TOPS. Las variantes añaden Ethernet y/o Wi-Fi 6 con Bluetooth.",
    "link": "https://wiki.sipeed.com/hardware/en/lichee/RV_Nano/1_intro.html"
  },
  {
    "id": "m5stamp-pico-diy-kit",
    "imagen": "HI19",
    "categoria": "MCU IoT",
    "nombre": "M5Stamp Pico DIY Kit",
    "soc": "Espressif ESP32-PICO-D4",
    "tipo": "MCU inalámbrico compacto",
    "precio": 121.0,
    "cpu": "Dual Xtensa LX6",
    "nucleos": "2",
    "frecuencia_mhz": "240",
    "ram": "520 KB SRAM",
    "flash": "4 MB Flash",
    "conectividad_principal": "Wi-Fi 2.4 GHz 802.11b/g/n; Bluetooth Classic + BLE",
    "perifericos": "12 GPIO; ADC/DAC; touch; SPI/I2C/UART/I2S; RGB SK6812; botón; kit con programador USB y headers",
    "ide": "UIFlow, Arduino IDE, ESP-IDF, PlatformIO",
    "ficha": "M5Stamp Pico DIY Kit se basa en el SiP ESP32-PICO-D4 dual-core a 240 MHz, con 520 KB de SRAM y 4 MB de Flash. Integra Wi-Fi y Bluetooth; el kit aporta el Stamp Pico, programador USB, headers y accesorios para prototipado.",
    "link": "https://shop.m5stack.com/products/m5stamp-pico-diy-kit"
  },
  {
    "id": "raspberry-pi-zero-2-w",
    "imagen": "HI20",
    "categoria": "Placas Linux / SBC",
    "nombre": "Raspberry Pi Zero 2 W",
    "soc": "Broadcom BCM2710A1 en RP3A0 SiP",
    "tipo": "SBC Linux",
    "precio": 125.0,
    "cpu": "Quad Arm Cortex-A53",
    "nucleos": "4",
    "frecuencia_mhz": "1000",
    "ram": "512 MB SDRAM",
    "flash": "microSD",
    "conectividad_principal": "Wi-Fi 2.4 GHz 802.11b/g/n; Bluetooth 4.2 / BLE",
    "perifericos": "mini HDMI; micro-USB OTG; micro-USB power; CSI-2; footprint GPIO de 40 pines; decodificación H.264",
    "ide": "Raspberry Pi OS, Linux",
    "ficha": "Raspberry Pi Zero 2 W integra el SiP RP3A0 con CPU quad-core Cortex-A53 a 1 GHz y 512 MB de SDRAM. Añade Wi-Fi 2.4 GHz y Bluetooth 4.2/BLE, microSD, mini HDMI, USB OTG, cámara CSI-2 y el footprint GPIO de 40 pines.",
    "link": "https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/"
  },
  {
    "id": "esp32-c61-devkitc-1",
    "imagen": "HI21",
    "categoria": "MCU IoT",
    "nombre": "ESP32-C61-DevKitC-1",
    "soc": "Espressif ESP32-C61 (ESP32-C61-WROOM-1)",
    "tipo": "Kit de desarrollo MCU inalámbrico",
    "precio": 126.0,
    "cpu": "RISC-V 32-bit",
    "nucleos": "1",
    "frecuencia_mhz": "160",
    "ram": "320 KB SRAM + 2 MB PSRAM",
    "flash": "256 KB ROM + hasta 8 MB SPI Flash",
    "conectividad_principal": "Wi-Fi 6 2.4 GHz; Bluetooth 5 LE",
    "perifericos": "USB nativo + USB-UART; GPIO; ADC; buses serie; botones Boot/Reset; RGB; headers de expansión",
    "ide": "ESP-IDF",
    "ficha": "ESP32-C61-DevKitC-1 utiliza ESP32-C61, CPU RISC-V de hasta 160 MHz. La configuración de la placa incluye SRAM interna y PSRAM externa, con Flash SPI, Wi-Fi 6 y Bluetooth LE; expone dos interfaces USB y los GPIO/periféricos del SoC.",
    "link": "https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32c61/esp32-c61-devkitc-1/user_guide.html"
  },
  {
    "id": "stm32-nucleo-f401re",
    "imagen": "HI22",
    "categoria": "Arduino / STM32",
    "nombre": "STM32 Nucleo-F401RE",
    "soc": "STMicroelectronics STM32F401RE",
    "tipo": "Nucleo-64 MCU",
    "precio": 127.0,
    "cpu": "Arm Cortex-M4F",
    "nucleos": "1",
    "frecuencia_mhz": "84",
    "ram": "96 KB SRAM",
    "flash": "512 KB Flash",
    "conectividad_principal": "Sin radio",
    "perifericos": "Headers Arduino Uno V3 y ST Morpho; ST-LINK/V2-1; USB; LED y botón de usuario; acceso a ADC, timers, SPI/I2C/UART del MCU",
    "ide": "STM32CubeIDE, STM32CubeMX, IAR, Keil",
    "ficha": "NUCLEO-F401RE incorpora STM32F401RE, Cortex-M4F a 84 MHz con 512 KB de Flash y 96 KB de SRAM. La placa Nucleo-64 añade ST-LINK/V2-1 y headers Arduino Uno V3/ST Morpho para acceder a los periféricos del MCU; no integra Wi-Fi ni Bluetooth.",
    "link": "https://www.st.com/en/evaluation-tools/nucleo-f401re.html"
  },
  {
    "id": "m5stickc-plus2",
    "imagen": "HI23",
    "categoria": "MCU IoT",
    "nombre": "M5StickC PLUS2",
    "soc": "Espressif ESP32-PICO-V3-02",
    "tipo": "Dispositivo MCU IoT con pantalla",
    "precio": 151.0,
    "cpu": "Dual Xtensa LX6",
    "nucleos": "2",
    "frecuencia_mhz": "240",
    "ram": "520 KB SRAM + 2 MB PSRAM",
    "flash": "8 MB Flash",
    "conectividad_principal": "Wi-Fi 2.4 GHz; Bluetooth Classic + BLE",
    "perifericos": "TFT 1.14 in 135×240; IMU MPU6886; micrófono; RTC; buzzer; IR; botones; USB-C; HY2.0",
    "ide": "UIFlow 1/2, Arduino IDE, ESP-IDF, PlatformIO",
    "ficha": "M5StickC PLUS2 es un dispositivo compacto basado en ESP32-PICO-V3-02 dual-core a 240 MHz, con 8 MB de Flash y 2 MB de PSRAM. Integra Wi-Fi/Bluetooth, pantalla TFT, IMU, micrófono, RTC, buzzer, IR, botones y USB-C.",
    "link": "https://docs.m5stack.com/en/core/M5StickC%20PLUS2"
  },
  {
    "id": "arduino-uno-r4-wifi",
    "imagen": "HI24",
    "categoria": "Arduino",
    "nombre": "Arduino UNO R4 WiFi",
    "soc": "Renesas RA4M1 + Espressif ESP32-S3-MINI-1",
    "tipo": "Placa Arduino con coprocesador inalámbrico",
    "precio": 156.0,
    "cpu": "Arm Cortex-M4F + Xtensa LX7 (coprocesador)",
    "nucleos": "1",
    "frecuencia_mhz": "48",
    "ram": "32 KB SRAM (RA4M1)",
    "flash": "256 KB Flash (RA4M1) + memoria del módulo ESP32-S3",
    "conectividad_principal": "Wi-Fi 2.4 GHz; Bluetooth LE mediante ESP32-S3",
    "perifericos": "14 I/O digitales; 6 entradas analógicas; CAN; DAC 12-bit; ADC hasta 14-bit; USB-C HID; Qwiic; matriz LED 12×8",
    "ide": "Arduino IDE, Arduino Cloud",
    "ficha": "UNO R4 WiFi combina el Renesas RA4M1 Cortex-M4F a 48 MHz con 256 KB de Flash y 32 KB de SRAM, y un módulo ESP32-S3 para Wi-Fi/Bluetooth. Mantiene el formato UNO y añade CAN, DAC, ADC de mayor resolución, USB-C HID, Qwiic y matriz LED 12×8.",
    "link": "https://docs.arduino.cc/hardware/uno-r4-wifi"
  },
  {
    "id": "radxa-zero-3w",
    "imagen": "HI25",
    "categoria": "Placas Linux / SBC",
    "nombre": "Radxa ZERO 3W",
    "soc": "Rockchip RK3566",
    "tipo": "SBC Linux/Android",
    "precio": 159.0,
    "cpu": "Quad Arm Cortex-A55",
    "nucleos": "4",
    "frecuencia_mhz": "1600",
    "ram": "1/2/4/8 GB LPDDR4",
    "flash": "microSD + eMMC según configuración",
    "conectividad_principal": "Wi-Fi 6; Bluetooth 5.4",
    "perifericos": "micro HDMI; USB-C/USB; GPIO; interfaces de cámara/display según placa; GPU Mali-G52",
    "ide": "Radxa OS, Debian, Ubuntu, Android",
    "ficha": "Radxa ZERO 3W es una SBC compacta con RK3566 quad-core Cortex-A55 a hasta 1.6 GHz y opciones de 1 a 8 GB de LPDDR4. Incorpora Wi-Fi 6 y Bluetooth, salida HDMI, USB, GPIO y opciones de almacenamiento microSD/eMMC.",
    "link": "https://radxa.com/products/zeros/zero3w/"
  },
  {
    "id": "orange-pi-zero-2w",
    "imagen": "HI26",
    "categoria": "Placas Linux / SBC",
    "nombre": "Orange Pi Zero 2W",
    "soc": "Allwinner H618",
    "tipo": "SBC Linux/Android",
    "precio": 197.0,
    "cpu": "Quad Arm Cortex-A53",
    "nucleos": "4",
    "frecuencia_mhz": "1500",
    "ram": "1/1.5/2/4 GB LPDDR4",
    "flash": "microSD/TF + 16 MB SPI Flash",
    "conectividad_principal": "Wi-Fi 5 dual-band 802.11a/b/g/n/ac; Bluetooth 5.0",
    "perifericos": "mini HDMI 2.0; USB Type-C; header de expansión de 40 pines y conector adicional; GPU Mali-G31 MP2",
    "ide": "Orange Pi OS, Android, Debian, Ubuntu",
    "ficha": "Orange Pi Zero 2W emplea Allwinner H618 quad-core Cortex-A53 a hasta 1.5 GHz, con 1 a 4 GB de LPDDR4, microSD y 16 MB de SPI Flash. Integra Wi-Fi dual-band 802.11ac, Bluetooth 5.0, HDMI, USB-C y expansión GPIO.",
    "link": "https://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-Zero-2W.html"
  },
  {
    "id": "luckfox-pico-pro-max",
    "imagen": "HI27",
    "categoria": "Placas Linux / SBC",
    "nombre": "LuckFox Pico Pro / Max",
    "soc": "Rockchip RV1106G2 (Pro) / RV1106G3 (Max)",
    "tipo": "SBC Linux + NPU",
    "precio": 265.0,
    "cpu": "Arm Cortex-A7 + coprocesador RISC-V",
    "nucleos": "1",
    "frecuencia_mhz": "1200",
    "ram": "128 MB DDR3L (Pro) / 256 MB DDR3L (Max)",
    "flash": "256 MB SPI NAND + microSD",
    "conectividad_principal": "Ethernet 10/100 Mb/s; sin radio integrado",
    "perifericos": "MIPI CSI; USB 2.0 host/device; 26 GPIO; NPU 0.5 TOPS (Pro) / 1 TOPS (Max)",
    "ide": "LuckFox SDK, Buildroot, Ubuntu 22.04",
    "ficha": "LuckFox Pico Pro y Max usan RV1106: Pro incorpora 128 MB DDR3L y NPU de 0.5 TOPS, mientras Max incorpora 256 MB y NPU de 1 TOPS. Ambos operan con Cortex-A7 a 1.2 GHz, 256 MB SPI NAND, Ethernet, cámara MIPI y microSD.",
    "link": "https://wiki.luckfox.com/Luckfox-Pico-Pro-Max/"
  },
  {
    "id": "milk-v-duo-s",
    "imagen": "HI28",
    "categoria": "Placas Linux / SBC",
    "nombre": "Milk-V Duo S",
    "soc": "SOPHGO SG2000",
    "tipo": "SBC Linux/RTOS + TPU",
    "precio": 326.0,
    "cpu": "RISC-V C906 + Arm Cortex-A53 seleccionable + 8051",
    "nucleos": "2",
    "frecuencia_mhz": "1000",
    "ram": "512 MB SiP DRAM",
    "flash": "microSD + pads eMMC",
    "conectividad_principal": "Ethernet 100 Mb/s onboard; Wi-Fi 6 + Bluetooth 5 opcional",
    "perifericos": "C906 principal 1 GHz; C906 secundario 700 MHz; A53 alternativo 1 GHz; USB-C/USB host; MIPI CSI/DSI; hasta 39 GPIO; TPU 0.5 TOPS",
    "ide": "Milk-V SDK, Linux, RTOS",
    "ficha": "Milk-V Duo S usa SG2000 con 512 MB de DRAM. Combina C906 RISC-V, un Cortex-A53 seleccionable para el núcleo principal y otro C906 a 700 MHz, además de un 8051. Incluye Ethernet 100 Mb/s, interfaces MIPI, USB y TPU de 0.5 TOPS; Wi-Fi 6/Bluetooth es opcional.",
    "link": "https://milkv.io/duo-s"
  },
  {
    "id": "nanopi-neo3",
    "imagen": "HI29",
    "categoria": "Placas Linux / SBC",
    "nombre": "NanoPi NEO3",
    "soc": "Rockchip RK3328",
    "tipo": "SBC Linux",
    "precio": 338.0,
    "cpu": "Quad Arm Cortex-A53",
    "nucleos": "4",
    "frecuencia_mhz": "1300",
    "ram": "1/2 GB DDR4",
    "flash": "microSD",
    "conectividad_principal": "Gigabit Ethernet; sin Wi-Fi/Bluetooth integrado",
    "perifericos": "USB 3.0 Type-A; USB 2.0 en header; header GPIO de 26 pines; I2C/UART/SPI/I2S; USB-C power; UART de depuración",
    "ide": "FriendlyWrt, FriendlyCore/Ubuntu, Debian",
    "ficha": "NanoPi NEO3 es una SBC de 48×48 mm basada en RK3328 quad-core Cortex-A53 a hasta 1.3 GHz, con 1 o 2 GB DDR4. Incluye Gigabit Ethernet, USB 3.0, microSD y header GPIO de 26 pines; no integra Wi-Fi ni Bluetooth.",
    "link": "https://wiki.friendlyelec.com/wiki/index.php/NanoPi_NEO3"
  },
  {
    "id": "stm32-nucleo-h753zi",
    "imagen": "HI30",
    "categoria": "Arduino / STM32",
    "nombre": "STM32 NUCLEO-H753ZI",
    "soc": "STMicroelectronics STM32H753ZI",
    "tipo": "Nucleo-144 MCU alto rendimiento",
    "precio": 394.0,
    "cpu": "Arm Cortex-M7",
    "nucleos": "1",
    "frecuencia_mhz": "480",
    "ram": "1 MB RAM",
    "flash": "2 MB Flash",
    "conectividad_principal": "Ethernet 10/100 Mb/s; sin radio",
    "perifericos": "ST Zio/Arduino y ST Morpho; ST-LINK; Ethernet; USB OTG FS; GPIO y periféricos avanzados; conectores de expansión",
    "ide": "STM32CubeIDE, STM32CubeMX, IAR, Keil",
    "ficha": "NUCLEO-H753ZI incorpora STM32H753ZI, un único Cortex-M7 a hasta 480 MHz con 2 MB de Flash y 1 MB de RAM. La Nucleo-144 ofrece ST-LINK, headers Zio/Morpho, Ethernet y USB para evaluación del amplio conjunto de periféricos del H753; no integra Wi-Fi/Bluetooth.",
    "link": "https://www.st.com/en/evaluation-tools/nucleo-h753zi.html"
  },
  {
    "id": "arduino-giga-r1-wifi",
    "imagen": "HI31",
    "categoria": "Arduino",
    "nombre": "Arduino GIGA R1 WiFi",
    "soc": "STMicroelectronics STM32H747XI",
    "tipo": "Placa Arduino dual-core de alto rendimiento",
    "precio": 553.0,
    "cpu": "Arm Cortex-M7 + Cortex-M4",
    "nucleos": "2",
    "frecuencia_mhz": "480 / 240",
    "ram": "1 MB SRAM interna + 8 MB SDRAM",
    "flash": "2 MB Flash interna + 16 MB Flash externa",
    "conectividad_principal": "Wi-Fi; Bluetooth mediante módulo Murata 1DX",
    "perifericos": "76 I/O; entradas analógicas y DAC; USB-C device/HID; USB-A host; jack de audio; conectores de cámara/display; UART/I2C/SPI/CAN",
    "ide": "Arduino IDE, Arduino Cloud, MicroPython",
    "ficha": "Arduino GIGA R1 WiFi usa STM32H747XI dual-core: Cortex-M7 a 480 MHz y Cortex-M4 a 240 MHz. Integra 1 MB de SRAM y 2 MB de Flash en el MCU, más 8 MB SDRAM y 16 MB de Flash externas, junto con Wi-Fi/Bluetooth, abundantes I/O, USB host/device, audio y conectores multimedia.",
    "link": "https://docs.arduino.cc/hardware/giga-r1-wifi"
  },
  {
    "id": "arduino-portenta-h7-lite",
    "imagen": "HI32",
    "categoria": "Arduino",
    "nombre": "Arduino Portenta H7 Lite",
    "soc": "STMicroelectronics STM32H747XI",
    "tipo": "Módulo Arduino dual-core alto rendimiento",
    "precio": 601.0,
    "cpu": "Arm Cortex-M7 + Cortex-M4",
    "nucleos": "2",
    "frecuencia_mhz": "480 / 240",
    "ram": "1 MB SRAM interna + 8 MB SDRAM",
    "flash": "2 MB Flash interna + 16 MB QSPI Flash",
    "conectividad_principal": "Sin Wi-Fi/Bluetooth",
    "perifericos": "Ethernet PHY; USB-C; dos conectores de alta densidad de 80 pines; cámara y buses de alta velocidad; elemento seguro",
    "ide": "Arduino IDE, Mbed OS, MicroPython",
    "ficha": "Portenta H7 Lite conserva el STM32H747XI dual-core a 480/240 MHz y la memoria externa de la familia Portenta H7, pero elimina el módulo Wi-Fi/Bluetooth. Ofrece USB-C, Ethernet mediante PHY, conectores de alta densidad y recursos para aplicaciones industriales/embebidas.",
    "link": "https://docs.arduino.cc/hardware/portenta-h7-lite"
  },
  {
    "id": "arduino-portenta-h7",
    "imagen": "HI33",
    "categoria": "Arduino",
    "nombre": "Arduino Portenta H7",
    "soc": "STMicroelectronics STM32H747XI",
    "tipo": "Módulo Arduino dual-core alto rendimiento",
    "precio": 864.0,
    "cpu": "Arm Cortex-M7 + Cortex-M4",
    "nucleos": "2",
    "frecuencia_mhz": "480 / 240",
    "ram": "1 MB SRAM interna + 8 MB SDRAM",
    "flash": "2 MB Flash interna + 16 MB QSPI Flash",
    "conectividad_principal": "Wi-Fi 802.11b/g/n; Bluetooth 5.1 mediante Murata 1DX",
    "perifericos": "Ethernet PHY; USB-C con DisplayPort; dos conectores de alta densidad de 80 pines; cámara; buses de alta velocidad; elemento seguro",
    "ide": "Arduino IDE, Mbed OS, MicroPython, Arduino Cloud",
    "ficha": "Portenta H7 integra STM32H747XI con Cortex-M7 a 480 MHz y Cortex-M4 a 240 MHz, además de 8 MB SDRAM y 16 MB QSPI Flash externos. El módulo Murata 1DX añade Wi-Fi y Bluetooth 5.1; también incluye USB-C/DisplayPort, Ethernet PHY y conectores de alta densidad.",
    "link": "https://docs.arduino.cc/hardware/portenta-h7"
  },
  {
    "id": "rp2040-zero",
    "imagen": "HI34",
    "categoria": "MCU / Desarrollo",
    "nombre": "RP2040-Zero",
    "soc": "Raspberry Pi RP2040",
    "tipo": "MCU compacto",
    "precio": 36.0,
    "cpu": "Dual Arm Cortex-M0+",
    "nucleos": "2",
    "frecuencia_mhz": "133",
    "ram": "264 KB SRAM",
    "flash": "2 MB onboard Flash",
    "conectividad_principal": "Sin radio",
    "perifericos": "20 GPIO expuestos; 2× SPI, 2× I2C, 2× UART; ADC de 12 bits; PWM; PIO; USB Type-C; LED RGB WS2812",
    "ide": "Raspberry Pi Pico C/C++ SDK, MicroPython",
    "ficha": "Waveshare RP2040-Zero es una placa compacta basada en RP2040 dual-core Cortex-M0+ a 133 MHz, con 264 KB de SRAM y 2 MB de Flash. Expone 20 GPIO en el pequeño formato de la placa e incluye USB-C, ADC, PWM, PIO y un LED RGB WS2812; no dispone de Wi-Fi integrado.",
    "link": "https://www.waveshare.com/wiki/RP2040-Zero"
  },
  {
    "id": "pro-micro-nrf52840",
    "imagen": "HI35",
    "categoria": "MCU / Desarrollo",
    "nombre": "Pro Micro NRF52840",
    "soc": "Nordic nRF52840",
    "tipo": "MCU inalámbrico compacto (compatible Pro Micro)",
    "precio": 24.0,
    "cpu": "Arm Cortex-M4F",
    "nucleos": "1",
    "frecuencia_mhz": "64",
    "ram": "256 KB RAM",
    "flash": "1 MB Flash",
    "conectividad_principal": "Bluetooth 5.0 LE; sin Wi-Fi",
    "perifericos": "~21 GPIO en formato Pro Micro/Elite-C; ADC; PWM; SPI; I2C; UART; USB-C; carga de batería LiPo integrada",
    "ide": "Arduino IDE, Adafruit nRF52 Bootloader, Zephyr, PlatformIO",
    "ficha": "Pro Micro NRF52840 (también vendida como SuperMini nRF52840) usa el SoC Nordic nRF52840 con núcleo Arm Cortex-M4F a 64 MHz, 1 MB de Flash y 256 KB de RAM. Mantiene el pinout compatible con Arduino Pro Micro y añade Bluetooth 5.0 LE, USB-C y gestión de carga de batería LiPo.",
    "link": "https://mechboards.co.uk/products/supermini-nrf52840-ble-pro-micro"
  },
  {
    "id": "esp32-c3-esp32-supermini",
    "imagen": "HI36",
    "categoria": "MCU IoT",
    "nombre": "ESP32-C3 ESP32 SuperMini",
    "soc": "Espressif ESP32-C3",
    "tipo": "MCU inalámbrico compacto",
    "precio": 19.0,
    "cpu": "RISC-V 32-bit",
    "nucleos": "1",
    "frecuencia_mhz": "160",
    "ram": "400 KB SRAM",
    "flash": "4 MB Flash",
    "conectividad_principal": "Wi-Fi 2.4 GHz 802.11 b/g/n; Bluetooth 5 LE",
    "perifericos": "11 GPIO utilizables; ADC de 12 bits; I2C/SPI/UART; USB nativo (Serial/JTAG, sin chip externo); LED en GPIO8; botones BOOT/RESET",
    "ide": "ESP-IDF, Arduino IDE, MicroPython",
    "ficha": "ESP32-C3 SuperMini integra el SoC RISC-V de un núcleo a 160 MHz con 400 KB de SRAM y 4 MB de Flash. En su formato ultracompacto ofrece Wi-Fi 802.11b/g/n y Bluetooth 5 LE, 11 GPIO utilizables y USB nativo sin necesidad de chip serie externo.",
    "link": "https://www.espboards.dev/esp32/esp32-c3-super-mini/"
  },
  {
    "id": "esp32-s3-n16r8-para-arduino-8mb-psram-16mb-flash-con-led-ws2812-ch340-tipo-c-modulo-wifi-esp32s3-bt-2-4g",
    "imagen": "HI37",
    "categoria": "MCU IoT",
    "nombre": "ESP32-S3 N16R8 para Arduino, 8MB PSRAM, 16MB FLASH, con LED WS2812, CH340 Tipo-C, Módulo Wifi ESP32S3 BT 2.4G",
    "soc": "Espressif ESP32-S3 (módulo ESP32-S3-WROOM-1 N16R8)",
    "tipo": "Kit de desarrollo MCU inalámbrico",
    "precio": 48.0,
    "cpu": "Dual Xtensa LX7",
    "nucleos": "2",
    "frecuencia_mhz": "240",
    "ram": "512 KB SRAM + 8 MB PSRAM",
    "flash": "16 MB Flash",
    "conectividad_principal": "Wi-Fi 2.4 GHz 802.11b/g/n; Bluetooth 5 LE",
    "perifericos": "45 GPIO programables; LED RGB WS2812; USB-C nativo + conversor CH340; ADC; SPI/I2C/UART/I2S; compatible con pinout ESP32-S3-DevKitC-1",
    "ide": "Arduino IDE, ESP-IDF, MicroPython",
    "ficha": "Este kit de desarrollo ESP32-S3-WROOM-1 N16R8 integra un procesador dual-core Xtensa LX7 a 240 MHz con 512 KB de SRAM, 8 MB de PSRAM y 16 MB de Flash. Incorpora Wi-Fi y Bluetooth 5 LE, 45 GPIO, LED RGB WS2812 y conversor USB-C con chip CH340.",
    "link": "https://www.waveshare.com/esp32-s3-dev-kit-n8r8.htm"
  },
  {
    "id": "luckfox-pico-mini-linux-cena-mini-ai-placa-64mb-ddr2-mipi-csi-tarjeta-tf-rv1103-rockchip-arm-mejor-que-raspberry-pi-pico",
    "imagen": "HI38",
    "categoria": "Placas Linux / SBC",
    "nombre": "Luckfox Pico Mini Linux cena MINI AI placa 64MB DDR2 MIPI CSI tarjeta TF RV1103 Rockchip ARM mejor que Raspberry Pi Pico",
    "soc": "Rockchip RV1103",
    "tipo": "SBC Linux + NPU compacta",
    "precio": 156.0,
    "cpu": "Arm Cortex-A7 + coprocesador RISC-V",
    "nucleos": "1",
    "frecuencia_mhz": "1200",
    "ram": "64 MB DDR2",
    "flash": "128 MB SPI NAND (variante B) + microSD opcional (variante A)",
    "conectividad_principal": "Sin Wi-Fi/Bluetooth; USB 2.0 Host/Device",
    "perifericos": "MIPI CSI de 2 lanes; 17 GPIO; NPU de 0.5 TOPS (hasta 1.0 TOPS en INT4); ISP de hasta 4 MP con HDR/WDR/reducción de ruido",
    "ide": "Luckfox SDK, Buildroot, Ubuntu 22.04",
    "ficha": "Luckfox Pico Mini se basa en el SoC Rockchip RV1103 con núcleo Arm Cortex-A7 a 1.2 GHz y coprocesador RISC-V, junto a 64 MB de DDR2 integrada. Incluye NPU de 0.5 TOPS, ISP de hasta 4 MP con entrada MIPI CSI de 2 lanes y 17 GPIO; no integra radio inalámbrica.",
    "link": "https://wiki.luckfox.com/Luckfox-Pico/Luckfox-Pico-RV1103/"
  },
  {
    "id": "esp32-s3-de-desarrollo-de-la-camara-n16r8-wifi-modulo-bluetooth-ov2640-5640-camara",
    "imagen": "HI39",
    "categoria": "MCU IoT",
    "nombre": "ESP32-S3 de desarrollo de la Cámara N16R8 WiFi + módulo Bluetooth OV2640/5640 Cámara",
    "soc": "Espressif ESP32-S3 (módulo ESP32-S3-WROOM-1 N16R8)",
    "tipo": "Kit de desarrollo MCU inalámbrico con cámara",
    "precio": 56.0,
    "cpu": "Dual Xtensa LX7",
    "nucleos": "2",
    "frecuencia_mhz": "240",
    "ram": "512 KB SRAM + 8 MB PSRAM",
    "flash": "16 MB Flash",
    "conectividad_principal": "Wi-Fi 2.4 GHz 802.11b/g/n; Bluetooth 5 LE",
    "perifericos": "Conector para cámara OV2640 u OV5640; GPIO; USB-C; ADC; SPI/I2C/UART/I2S",
    "ide": "Arduino IDE, ESP-IDF, MicroPython",
    "ficha": "Esta placa de desarrollo ESP32-S3 N16R8 añade un conector de cámara compatible con módulos OV2640 o OV5640 al mismo SoC dual-core Xtensa LX7 a 240 MHz, con 512 KB de SRAM, 8 MB de PSRAM y 16 MB de Flash. Incluye Wi-Fi y Bluetooth 5 LE, orientada a aplicaciones de visión por computador y reconocimiento de imágenes en el borde.",
    "link": "https://www.robotics.org.za/ESP32-S3-N16R8"
  },
  {
    "id": "seeed-xiao-ra4m1-2",
    "imagen": "HI40",
    "categoria": "MCU / Desarrollo",
    "nombre": "Seeed XIAO RA4M1",
    "soc": "Renesas RA4M1 (R7FA4M1AB3CNE)",
    "tipo": "MCU compacto",
    "precio": 36.65,
    "cpu": "Arm Cortex-M4F",
    "nucleos": "1",
    "frecuencia_mhz": "48",
    "ram": "32 KB SRAM",
    "flash": "256 KB Flash + 8 KB Data Flash",
    "conectividad_principal": "Sin radio; CAN y USB 2.0",
    "perifericos": "19 GPIO; 6 entradas analógicas; 2× I2C, 2× UART, 2× SPI; ADC de 14 bits; DAC de 12 bits; CAN; USB-C; gestión/carga de batería",
    "ide": "Arduino IDE, MicroPython, PlatformIO",
    "ficha": "Placa XIAO basada en Renesas RA4M1, con núcleo Arm Cortex-M4F a 48 MHz, 256 KB de Flash y 32 KB de SRAM. Expone 19 GPIO, ADC de 14 bits, DAC de 12 bits, CAN, USB 2.0 y buses I2C/UART/SPI; integra gestión de batería en el formato compacto XIAO.",
    "link": "https://wiki.seeedstudio.com/getting_started_xiao_ra4m1/"
  },
  {
    "id": "firebeetle-2-esp32-c6-2",
    "imagen": "HI41",
    "categoria": "MCU IoT",
    "nombre": "FireBeetle 2 ESP32-C6",
    "soc": "Espressif ESP32-C6",
    "tipo": "MCU inalámbrico IoT",
    "precio": 40.12,
    "cpu": "RISC-V 32-bit",
    "nucleos": "1",
    "frecuencia_mhz": "160",
    "ram": "512 KB SRAM",
    "flash": "320 KB ROM + 4 MB Flash",
    "conectividad_principal": "Wi-Fi 6 2.4 GHz; Bluetooth 5 LE; IEEE 802.15.4 (Zigbee/Thread)",
    "perifericos": "19 I/O digitales; 6 PWM; ADC de 12 bits; SPI; 3× UART; 2× I2C; I2S; USB 2.0; conector GDI; carga de batería/solar",
    "ide": "ESP-IDF, Arduino IDE, MicroPython",
    "ficha": "FireBeetle 2 basada en ESP32-C6, con CPU RISC-V a 160 MHz, 512 KB de SRAM, 320 KB de ROM y 4 MB de Flash. Añade Wi-Fi 6, Bluetooth LE e IEEE 802.15.4 para Zigbee/Thread, además de 19 I/O digitales y múltiples buses y ADC.",
    "link": "https://wiki.dfrobot.com/dfr1075/"
  },
  {
    "id": "seeed-xiao-rp2350-2",
    "imagen": "HI42",
    "categoria": "MCU / Desarrollo",
    "nombre": "Seeed XIAO RP2350",
    "soc": "Raspberry Pi RP2350",
    "tipo": "MCU compacto",
    "precio": 40.12,
    "cpu": "Dual Arm Cortex-M33 / dual Hazard3 RISC-V (seleccionable)",
    "nucleos": "2",
    "frecuencia_mhz": "150",
    "ram": "520 KB SRAM",
    "flash": "2 MB Flash onboard",
    "conectividad_principal": "Sin radio",
    "perifericos": "19 GPIO multifunción; USB-C; PIO; ADC; PWM; RGB; gestión y medición de batería",
    "ide": "Raspberry Pi Pico C/C++ SDK, MicroPython, Arduino IDE",
    "ficha": "XIAO basada en RP2350, capaz de usar dos núcleos Arm Cortex-M33 o dos núcleos Hazard3 RISC-V a hasta 150 MHz. Integra 520 KB de SRAM y 2 MB de Flash en la placa, con 19 GPIO y el ecosistema de periféricos/PIO del RP2350.",
    "link": "https://wiki.seeedstudio.com/getting-started-xiao-rp2350/"
  },
  {
    "id": "raspberry-pi-pico-2-w-2",
    "imagen": "HI43",
    "categoria": "MCU IoT",
    "nombre": "Raspberry Pi Pico 2 W",
    "soc": "RP2350 + Infineon CYW43439",
    "tipo": "MCU inalámbrico",
    "precio": 52.36,
    "cpu": "Dual Arm Cortex-M33 / dual Hazard3 RISC-V (seleccionable)",
    "nucleos": "2",
    "frecuencia_mhz": "150",
    "ram": "520 KB SRAM",
    "flash": "4 MB QSPI Flash",
    "conectividad_principal": "Wi-Fi 2.4 GHz 802.11n; Bluetooth 5.2 / BLE",
    "perifericos": "26 GPIO; 3 ADC; 2× UART, 2× SPI, 2× I2C; PWM; 12 máquinas PIO; USB 1.1; funciones de seguridad del RP2350",
    "ide": "Raspberry Pi Pico C/C++ SDK, MicroPython",
    "ficha": "Pico 2 W incorpora RP2350 a 150 MHz con arquitectura dual Cortex-M33 o dual Hazard3 RISC-V seleccionable, 520 KB de SRAM y 4 MB de Flash. El CYW43439 aporta Wi-Fi 2.4 GHz y Bluetooth 5.2/BLE.",
    "link": "https://www.raspberrypi.com/products/raspberry-pi-pico-2/"
  },
  {
    "id": "raspberry-pi-zero-2-w-2",
    "imagen": "HI44",
    "categoria": "Placas Linux / SBC",
    "nombre": "Raspberry Pi Zero 2 W",
    "soc": "Broadcom BCM2710A1 en RP3A0 SiP",
    "tipo": "SBC Linux",
    "precio": 108.46,
    "cpu": "Quad Arm Cortex-A53",
    "nucleos": "4",
    "frecuencia_mhz": "1000",
    "ram": "512 MB SDRAM",
    "flash": "microSD",
    "conectividad_principal": "Wi-Fi 2.4 GHz 802.11b/g/n; Bluetooth 4.2 / BLE",
    "perifericos": "mini HDMI; micro-USB OTG; micro-USB power; CSI-2; footprint GPIO de 40 pines; decodificación H.264",
    "ide": "Raspberry Pi OS, Linux",
    "ficha": "Raspberry Pi Zero 2 W integra el SiP RP3A0 con CPU quad-core Cortex-A53 a 1 GHz y 512 MB de SDRAM. Añade Wi-Fi 2.4 GHz y Bluetooth 4.2/BLE, microSD, mini HDMI, USB OTG, cámara CSI-2 y el footprint GPIO de 40 pines.",
    "link": "https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/"
  }
];

/* ---------- Utilidades ---------- */

function formatoPrecio(valor) {
  const simbolo = (window.HANKEL_CONFIG && window.HANKEL_CONFIG.CURRENCY_SYMBOL) || 'S/.';
  if (valor === null || valor === undefined || isNaN(valor)) return 'Consultar';
  return simbolo + ' ' + valor.toFixed(2).replace(/\.00$/, '');
}

function normalizarTexto(texto) {
  return (texto || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function truncar(texto, maxLen) {
  if (!texto) return '';
  if (texto.length <= maxLen) return texto;
  return texto.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

/* ---------- Lazy-loading de imágenes de fondo ---------- */
/* Las imágenes de producto se aplican como background-image inline,
   así que el atributo nativo loading="lazy" (pensado para <img>) no
   aplica. Para no descargar las ~34 imágenes de una sola vez en
   conexiones móviles, se difiere la carga real hasta que la tarjeta
   está por entrar en el viewport, usando IntersectionObserver. Si el
   navegador no lo soporta, se aplica el fondo de inmediato. */
const lazyImgObserver = ('IntersectionObserver' in window)
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const bg = el.dataset.bg;
          if (bg) {
            el.style.backgroundImage = bg;
            el.removeAttribute('data-bg');
          }
          observer.unobserve(el);
        }
      });
    }, { rootMargin: '200px 0px' })
  : null;

/* ---------- Estado de filtros ---------- */

const state = {
  query: '',
  categoria: 'todas',
  orden: 'nombre'
};

/* ---------- Construcción de la interfaz de filtros ---------- */

function poblarFiltroCategorias() {
  const select = document.getElementById('categoryFilter');
  if (!select) return;
  const categorias = Array.from(new Set(PRODUCTS.map(p => p.categoria))).sort();
  categorias.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

/* ---------- Filtrado y orden ---------- */

function obtenerProductosFiltrados() {
  let lista = PRODUCTS.slice();

  if (state.query) {
    const q = normalizarTexto(state.query);
    lista = lista.filter(p => {
      const campos = [p.nombre, p.soc, p.categoria, p.tipo, p.cpu];
      return campos.some(campo => normalizarTexto(campo).includes(q));
    });
  }

  if (state.categoria !== 'todas') {
    lista = lista.filter(p => p.categoria === state.categoria);
  }

  switch (state.orden) {
    case 'precio-asc':
      lista.sort((a, b) => (a.precio ?? Infinity) - (b.precio ?? Infinity));
      break;
    case 'precio-desc':
      lista.sort((a, b) => (b.precio ?? -Infinity) - (a.precio ?? -Infinity));
      break;
    case 'nombre':
    default:
      lista.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
      break;
  }

  return lista;
}

/* ---------- Renderizado de tarjetas ---------- */

function crearTarjetaProducto(producto) {
  const card = document.createElement('article');
  card.className = 'producto-card';
  card.dataset.id = producto.id;

  // Construir la ruta de la imagen (todas las imágenes se guardan como .jpg
  // en /images, nombradas según el indicativo HI01, HI02, etc.)
  const imagenNombre = producto.imagen || '';
  const bgValue = imagenNombre
    ? `linear-gradient(135deg, rgba(20,40,55,0.85), rgba(15,35,50,0.9)), url('images/${imagenNombre}.jpeg')`
    : '';

  const specs = [
    { etiqueta: 'SoC', valor: producto.soc },
    { etiqueta: 'CPU', valor: producto.cpu },
    { etiqueta: 'Núcleos', valor: producto.nucleos },
    { etiqueta: 'Frecuencia', valor: producto.frecuencia_mhz ? producto.frecuencia_mhz + ' MHz' : '' },
    { etiqueta: 'RAM', valor: producto.ram },
    { etiqueta: 'Flash', valor: producto.flash },
    { etiqueta: 'Conectividad', valor: producto.conectividad_principal }
  ].filter(s => s.valor);

  // Construir el mensaje de WhatsApp
  const mensajeWhatsApp = encodeURIComponent(`Hola, quiero información sobre el producto: ${producto.nombre} (${producto.soc})`);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeWhatsApp}`;

  // NOTA: todo el contenido va envuelto en .producto-card-body, que es el
  // contenedor que aporta el padding y el flex-grow para anclar el botón
  // de WhatsApp al final de la tarjeta (definido en el <style> de productos.html).
  card.innerHTML = `
    <div class="producto-imagen" data-bg="${escapeHTML(bgValue)}" role="img" aria-label="${escapeHTML(producto.nombre)}">
      <div class="producto-imagen-overlay"></div>
      <span class="producto-imagen-texto">${escapeHTML(producto.nombre)}</span>
    </div>
    <div class="producto-card-body">
      <div class="producto-card-header">
        <span class="producto-categoria">${escapeHTML(producto.categoria)}</span>
        <span class="producto-precio">${formatoPrecio(producto.precio)}</span>
      </div>
      <h3 class="producto-nombre">${escapeHTML(producto.nombre)}</h3>
      <p class="producto-tipo">${escapeHTML(producto.tipo)}</p>
      <ul class="producto-specs">
        ${specs.map(s => `<li><span class="spec-etiqueta">${escapeHTML(s.etiqueta)}</span><span class="spec-valor">${escapeHTML(s.valor)}</span></li>`).join('')}
      </ul>
      <p class="producto-ficha">${escapeHTML(truncar(producto.ficha, 160))}</p>
      <div class="producto-acciones">
        <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-producto">
          <svg class="wp-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          Consultar por WhatsApp
        </a>
        ${producto.link ? `<a href="${escapeHTML(producto.link)}" target="_blank" rel="noopener noreferrer" class="producto-link">Ficha técnica →</a>` : ''}
      </div>
    </div>
  `;

  // Activar lazy-loading real de la imagen de fondo
  const imgEl = card.querySelector('.producto-imagen');
  if (imgEl) {
    if (lazyImgObserver) {
      lazyImgObserver.observe(imgEl);
    } else if (bgValue) {
      imgEl.style.backgroundImage = bgValue;
    }
  }

  return card;
}

function renderizarProductos() {
  const contenedor = document.getElementById('productosContainer');
  if (!contenedor) return;

  const lista = obtenerProductosFiltrados();
  contenedor.innerHTML = '';

  const contador = document.getElementById('resultadosContador');
  if (contador) {
    contador.textContent = lista.length === 1
      ? '1 producto encontrado'
      : lista.length + ' productos encontrados';
  }

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div class="productos-vacio">
        No se encontraron productos con los criterios de búsqueda actuales.
      </div>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  lista.forEach(p => fragment.appendChild(crearTarjetaProducto(p)));
  contenedor.appendChild(fragment);
}

/* ---------- Eventos ---------- */

function inicializarEventos() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    // Debounce simple para no re-renderizar en cada tecla en móviles de gama baja
    let debounceTimer;
    searchInput.addEventListener('input', e => {
      clearTimeout(debounceTimer);
      const valor = e.target.value;
      debounceTimer = setTimeout(() => {
        state.query = valor;
        renderizarProductos();
      }, 150);
    });
  }

  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', e => {
      state.categoria = e.target.value;
      renderizarProductos();
    });
  }

  const sortBy = document.getElementById('sortBy');
  if (sortBy) {
    sortBy.addEventListener('change', e => {
      state.orden = e.target.value;
      renderizarProductos();
    });
  }
}

/* ---------- Inicialización ---------- */

document.addEventListener('DOMContentLoaded', () => {
  poblarFiltroCategorias();
  inicializarEventos();
  renderizarProductos();
});
