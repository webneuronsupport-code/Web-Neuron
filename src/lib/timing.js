/**
 * Reloj compartido de la intro.
 *
 * El preloader y la entrada del hero tienen que encajar sin conocerse: el
 * hero arranca justo cuando el telón acaba de salir. Con la cifra en un único
 * sitio, ajustar el ritmo es cambiar un número y no perseguir delays sueltos
 * por varios componentes.
 */

/** Duración del contador 0 → 100. */
export const COUNT_DURATION = 1.5;

/** Momento en que el telón empieza a retirarse. */
export const CURTAIN_START = COUNT_DURATION + 0.25;

/** Momento en que el hero empieza a entrar: el telón ya está a medio salir. */
export const INTRO_DELAY = CURTAIN_START + 0.55;
