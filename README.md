# LimpJá Limpeza Pós Obra — site de uma página

Site estático (HTML, CSS e JS puros, sem build) da LimpJá Limpeza Pós Obra, Uberlândia/MG.
Todos os recursos são locais (fontes, scripts, imagens); os únicos links externos são WhatsApp e Instagram.

## Estrutura
- `index.html` — página única
- `css/site.css`, `js/site.js` — estilos e scripts
- `vendor/` — GSAP, ScrollTrigger e Lenis (cópias locais)
- `fonts/`, `logo/`, `favicon/` (inclui `site.webmanifest`), `img/` (antes/depois e serviços)
- `.nojekyll` — faz o GitHub Pages servir os arquivos como estão

## Publicar no GitHub Pages
1. Crie um repositório no GitHub (ex.: `limpja-site`) e envie o **conteúdo** desta pasta para a branch `main` (o `index.html` precisa ficar na raiz).
2. No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, pasta `/ (root)`, **Save**.
3. Em 1–2 minutos o site fica em `https://SEU-USUARIO.github.io/limpja-site/`.
4. Domínio próprio (opcional): em **Settings → Pages → Custom domain** informe o domínio, crie no registro do domínio um CNAME para `SEU-USUARIO.github.io` e marque **Enforce HTTPS**.

## Antes de publicar
- Trocar as imagens ilustrativas (serviços e antes/depois) e os depoimentos de exemplo por fotos e avaliações reais.
- Com o endereço definitivo, deixar `og:image` com URL absoluta e adicionar `<link rel="canonical">`.
