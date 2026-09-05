# La pieza central — especificación

Solo hace falta **una imagen**. Todo lo demás —rejilla, guías, marcadores,
fichas— lo dibuja el código.

Archivo: `public/objeto-asistente.png`

## Los tres requisitos que lo deciden todo

**1. PNG con fondo transparente de verdad.** El escenario es blanco. Con fondo
blanco «plano» se vería el recorte en cuanto el objeto flota, y con fondo negro
sería un rectángulo negro en mitad de la página. Es el requisito que más veces
se incumple.

**2. Vista en tres cuartos, ligeramente desde arriba.** Ni frontal plana (se lee
como icono) ni cenital (se pierde el volumen). Unos 25-35° por encima del
horizonte, como el objeto de la referencia.

**3. El objeto centrado y con aire alrededor.** Que no toque los bordes del
lienzo: encima van marcadores y algunos caen cerca del borde de la silueta.
Lienzo cuadrado, 2000 × 2000.

## Qué debe ser el objeto

Un fragmento flotante que represente el asistente por dentro: una pieza de
hardware abierta, con capas visibles y algo de vida encima. La referencia usa
una roca con musgo y una flor — orgánico sobre mineral. El equivalente aquí es
**tecnología con algo vivo asomando**: un núcleo de circuitería del que brotan
fibras de luz, o una placa con estructura orgánica creciendo entre los
componentes. Ese contraste es lo que hace memorable la referencia; una pieza de
hardware sola sería solo una pieza de hardware.

Prompt base:

> floating fragment of advanced hardware, open cross-section revealing internal
> layers, circuitry with organic filaments and soft light growing through it,
> three-quarter view from slightly above, photorealistic octane render, neutral
> studio lighting, isolated on transparent background, centered with margin,
> square 2000x2000, no text, no logos

## Peso

Exporta a **WebP calidad 85**. Un PNG de 2000 px puede irse a 4 MB; en WebP se
queda en torno a 300 kB sin diferencia visible.

## Mientras tanto

Está puesto `hero-core.png`, el chip que ya usas en el Hero principal. Funciona
como marcador de posición porque ya tiene transparencia, pero es una pieza
cerrada: no enseña nada por dentro, que es justo de lo que va esta pantalla.

Cuando tengas la definitiva, cambia la constante `OBJETO` en
`src/components/HeroTest.jsx` — una línea.

## Ajustar los marcadores

Los cuatro marcadores van en la constante `NOTAS`, en porcentaje del escenario:
`m` es dónde se clava sobre el objeto y `t` dónde se apoya el texto. Con una
pieza nueva habrá que mover los `m` para que caigan sobre lo que señalan; son
cuatro pares de números y el resto se recalcula solo.
