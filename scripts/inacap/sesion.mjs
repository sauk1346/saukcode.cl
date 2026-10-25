// Sesión de la intranet INACAP para los extractores. La sesión la crea login.mjs, que ejecuta el
// usuario; los extractores solo reutilizan el estado guardado (cookies) y nunca ven la contraseña.
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const dir = (p) => fileURLToPath(new URL(p, import.meta.url));

export const ENV_FILE = dir('./.env');
export const STATE_FILE = dir('./.auth/state.json');
export const OUT_DIR = dir('./salida/');
export const PORTAL_URL = 'https://intranet.inacap.cl/tportalvp/alumnos-intranet';
// Entrada oficial (inacap.cl → Intranet → Ed. Superior). Ir al portal sin sesión redirige a ADFS con
// wtrealm=http://intranet.inacap.cl/, que ADFS rechaza (MSIS7007); este enlace usa el realm https.
export const LOGIN_URL =
  'https://adfs.inacap.cl/adfs/ls/?wtrealm=https://siga.inacap.cl/sts/&wa=wsignin1.0&wreply=https://siga.inacap.cl/sts/&wctx=' +
  encodeURIComponent(`https://adfs.inacap.cl/adfs/ls/?wreply=${PORTAL_URL}&wtrealm=https://intranet.inacap.cl/`);

const CHROMIUM = process.env.CHROMIUM_PATH ?? '/usr/bin/chromium';
const LOGIN_HOST = 'adfs.inacap.cl';

export class SesionVencida extends Error {
  constructor() {
    super('La sesión de INACAP no existe o venció. Ejecuta: npm run inacap:login');
  }
}

export const esLogin = (url) => new URL(url).host === LOGIN_HOST;

export function lanzar({ headed = false } = {}) {
  return chromium.launch({ executablePath: CHROMIUM, headless: !headed });
}

/**
 * Contexto con user agent de Chrome normal: el de headless se anuncia como "HeadlessChrome", y ADFS
 * decide el flujo de autenticación según el user agent.
 */
export async function nuevoContexto(browser, opciones = {}) {
  const version = browser.version();
  const userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version} Safari/537.36`;
  return browser.newContext({ locale: 'es-CL', userAgent, ...opciones });
}

/** Navegador + página ya autenticados. Lanza SesionVencida si el portal redirige al login. */
export async function abrirSesion({ headed = false } = {}) {
  if (!existsSync(STATE_FILE)) throw new SesionVencida();
  const browser = await lanzar({ headed });
  const context = await nuevoContexto(browser, { storageState: STATE_FILE });
  const page = await context.newPage();
  await page.goto(PORTAL_URL, { waitUntil: 'networkidle' });
  if (esLogin(page.url())) {
    await browser.close();
    throw new SesionVencida();
  }
  return { browser, context, page };
}

/** Ejecuta `fn` con una sesión abierta y cierra el navegador al terminar; los errores de sesión salen limpios. */
export async function conSesion(fn, opciones) {
  let sesion;
  try {
    sesion = await abrirSesion(opciones);
    return await fn(sesion);
  } catch (e) {
    if (e instanceof SesionVencida) {
      console.error(`✗ ${e.message}`);
      process.exitCode = 2;
      return;
    }
    throw e;
  } finally {
    await sesion?.browser.close();
  }
}
