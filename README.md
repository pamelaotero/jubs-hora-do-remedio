# Jubs — sua receita na hora certa

Envie a receita do médico ou do veterinário — para você, sua família ou seu pet — e receba uma tabela de horários, com quadradinhos para marcar cada dose, PDF para imprimir, Excel e arquivo de calendário (.ics). Disponível em português e inglês.

> **Privacidade:** nenhuma receita é guardada. Tudo vive só na memória do navegador enquanto a aba está aberta: não há servidor, localStorage, cookies nem histórico.

## Rodando

```bash
npm install
cp .env.example .env   # ajuste VITE_SITE_URL com o domínio real
npm run dev            # http://localhost:5173
npm run build          # typecheck + build + pré-renderização (SEO) em dist/
npm run preview        # serve o dist/ localmente
npm run lint
```

## Stack

React 19 + TypeScript + Vite · React Router · CSS Modules · lucide-react · jsPDF / SheetJS (carregados sob demanda) · fontes Outfit e Figtree auto-hospedadas (@fontsource, sem chamadas ao Google).

## Estrutura

```
src/
  components/
    ui/         Botões, Card, campos, Dialog, Toast… (genéricos, sem regra de negócio)
    layout/     Header, LanguageSwitcher, Footer, Layout, LocaleLayout (idioma + <head>)
    home/       Hero, UploadDropzone, FeatureCards, SchedulePreview, HowItWorks, ExportFormats, Faq
    review/     PatientDetailsCard, MedicationCard
    schedule/   StepIndicator, WeekNavigator, ScheduleTable, ScheduleNotes, ExportPanel
  pages/        Uma página por rota
  i18n/         Idiomas, rotas traduzidas e textos (messages/pt.ts, messages/en.ts)
  seo/          Metadados por página, hreflang, Open Graph e JSON-LD
  context/      Estado em memória: receita (useReducer), configurações e toast
  hooks/        useI18n, usePrescription, useSettings, useUploadFlow, useScheduleExport…
  lib/          Funções puras: agendamento, datas e exportação (pdf/xlsx/ics)
  routes.tsx    Rotas compartilhadas entre navegador e pré-renderização
  entry-server.tsx  Pré-renderização (só no build)
scripts/prerender.mjs  Gera HTML estático, sitemap.xml, robots.txt e 404.html
```

## Idiomas e rotas

| Página | Português | English |
| --- | --- | --- |
| Início | `/` | `/en/` |
| Leitura | `/lendo` | `/en/reading` |
| Conferir | `/conferir` | `/en/review` |
| Tabela | `/tabela` | `/en/schedule` |
| Minhas Receitas | `/receitas` | `/en/prescriptions` |
| Configurações | `/configuracoes` | `/en/settings` |
| Privacidade | `/privacidade` | `/en/privacy` |

Para adicionar um idioma: crie `src/i18n/messages/<idioma>.ts` (o TypeScript exige todas as chaves), registre em `locales.ts`, `messages/index.ts` e os slugs em `routes.ts`.

## SEO

- Uma URL por idioma com `hreflang` (pt-BR, en e `x-default` → inglês, para o público mundial).
- Início e Privacidade são **pré-renderizados** em HTML estático: o Google lê o conteúdo sem executar JavaScript. As etapas do app (`/conferir`, `/tabela`…) são `noindex`.
- Título, descrição e palavras-chave por página e idioma em `src/i18n/messages/*.ts` (`seo`).
- Open Graph e Twitter Card com imagem 1200×630 por idioma (`public/og-pt.png`, `public/og-en.png`).
- Dados estruturados (JSON-LD): `WebApplication`, `HowTo` e `FAQPage`.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest` e ícones.

A leitura automática da receita ainda é **simulada**: carrega uma receita de exemplo que pode ser editada.

O protótipo em HTML original está em `legacy/` e o mockup em `docs/prototipo.png`.

## Deploy

Publique a pasta `dist/` em qualquer hospedagem estática (Netlify, Vercel, Cloudflare Pages, GitHub Pages). Cada página já tem seu próprio `index.html`; para rotas desconhecidas o host deve servir `404.html`, que carrega o app normalmente.

Depois de publicar: cadastre o domínio no Google Search Console e no Bing Webmaster Tools e envie o `sitemap.xml`.
