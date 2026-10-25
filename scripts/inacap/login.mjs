// Inicia sesión en la intranet INACAP (ADFS) y guarda las cookies en .auth/state.json.
// Lo ejecuta el usuario, no el agente: lee INACAP_USER e INACAP_PASSWORD de scripts/inacap/.env.
//   npm run inacap:login             (sin ventana)
//   npm run inacap:login -- --headed (con ventana, para ver qué pasa si falla)
import { existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { ENV_FILE, LOGIN_URL, OUT_DIR, STATE_FILE, esLogin, lanzar, nuevoContexto } from './sesion.mjs';

if (!existsSync(ENV_FILE)) {
  console.error(`✗ Falta ${ENV_FILE}. Cópialo desde .env.example y completa tus datos.`);
  process.exit(1);
}
process.loadEnvFile(ENV_FILE);
const { INACAP_USER, INACAP_PASSWORD } = process.env;
if (!INACAP_USER || !INACAP_PASSWORD) {
  console.error('✗ Faltan INACAP_USER o INACAP_PASSWORD en el .env.');
  process.exit(1);
}

const browser = await lanzar({ headed: process.argv.includes('--headed') });
try {
  const context = await nuevoContexto(browser);
  const page = await context.newPage();
  await page.goto(LOGIN_URL, { waitUntil: 'networkidle' });

  if (esLogin(page.url())) {
    await page.fill('#userNameInput', INACAP_USER);
    await page.fill('#passwordInput', INACAP_PASSWORD);
    // "Mantener la sesión iniciada": alarga la vida de la sesión de ADFS
    await page.check('#kmsiInput').catch(() => {});
    await page.click('#submitButton');
    await page
      .waitForURL((url) => !esLogin(url.href), { timeout: 30_000 })
      .catch(async () => {
        // Diagnóstico sin datos sensibles: el campo de contraseña se ve enmascarado en la captura
        mkdirSync(OUT_DIR, { recursive: true });
        await page.screenshot({ path: `${OUT_DIR}login-error.png`, fullPage: true }).catch(() => {});
        const mensajes = await page
          .locator('#errorText, #error, .error, [role="alert"], #usernameError, #passwordError')
          .allInnerTexts()
          .catch(() => []);
        // Página de error genérica de ADFS: "Detalles del error" trae el código (MSISxxxx) y el Activity ID
        const detalles = page.getByText('Detalles del error');
        if (await detalles.isVisible().catch(() => false)) {
          await detalles.click().catch(() => {});
          await page.waitForTimeout(500);
          const texto = await page.locator('#errorArea, #errorDetails, #content').first().innerText().catch(() => '');
          console.error(`  Detalles del error ADFS:\n${texto.replace(/^/gm, '    ')}`);
        }
        console.error(`  URL final: ${page.url().split('?')[0]}`);
        console.error(`  Mensajes en la página: ${mensajes.map((m) => m.trim()).filter(Boolean).join(' | ') || '(ninguno)'}`);
        console.error(`  Captura: ${OUT_DIR}login-error.png`);
        throw new Error('ADFS no redirigió al portal (¿credenciales, captcha o un paso extra?). Prueba con --headed.');
      });
    await page.waitForLoadState('networkidle');
  }

  mkdirSync(dirname(STATE_FILE), { recursive: true });
  await context.storageState({ path: STATE_FILE });
  console.log(`✓ Sesión guardada en ${STATE_FILE}`);
  console.log(`  Portal: ${page.url()}`);
} catch (e) {
  console.error(`✗ No se pudo iniciar sesión: ${e.message}`);
  process.exitCode = 1;
} finally {
  await browser.close();
}
