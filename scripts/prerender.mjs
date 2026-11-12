/**
 * Pré-renderização para SEO (roda depois do `vite build`).
 *
 * - Páginas públicas (início e privacidade, em PT e EN) recebem o HTML do React,
 *   para o Google ler o conteúdo sem executar JavaScript.
 * - Etapas do app (conferir, tabela...) recebem só o <head> certo (noindex) e
 *   são montadas no navegador.
 * - Gera sitemap.xml, robots.txt e 404.html.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = resolve('dist');
const SSR_DIST = resolve('dist-ssr');

const server = await import(pathToFileURL(join(SSR_DIST, 'entry-server.js')).href);
const template = await readFile(join(DIST, 'index.html'), 'utf8');

const HEAD_REGION = /<!--app-head-->[\s\S]*?<!--\/app-head-->/;

/** O React 19 emite <link rel="preload"> das imagens no início do HTML; eles pertencem ao <head>. */
const LEADING_PRELOADS = /^(?:<link rel="preload"[^>]*\/>)+/;

const fillTemplate = ({ lang, head, html = '' }) => {
  const preloads = html.match(LEADING_PRELOADS)?.[0] ?? '';
  const body = html.slice(preloads.length);
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(HEAD_REGION, `${head}\n    ${preloads}`)
    .replace('<!--app-html-->', body);
};

const outputFile = (path) => (path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html'));

const write = async (file, content) => {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
};

for (const page of server.pagesToBuild()) {
  const html = page.prerender ? await server.renderPage(page.path) : '';
  await write(outputFile(page.path), fillTemplate({ ...page, html }));
  console.log(`${page.prerender ? 'prerender' : 'shell    '}  ${page.path}`);
}

await write(join(DIST, '404.html'), fillTemplate(server.notFoundPage()));
await write(join(DIST, 'sitemap.xml'), server.buildSitemap(new Date().toISOString().slice(0, 10)));
await write(join(DIST, 'robots.txt'), server.buildRobots());
await rm(SSR_DIST, { recursive: true, force: true });

console.log('sitemap.xml, robots.txt e 404.html gerados.');
