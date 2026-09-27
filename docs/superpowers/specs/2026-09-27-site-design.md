# Site da Floresta dos Bichinhos — design

**Data:** 2026-09-27
**Status:** aprovado em conversa, aguardando revisão da spec

## Objetivo

Site público do jogo, no estilo do [Pok Pok](https://playpokpok.com) (referência escolhida entre 8),
falando com pais e escolas (é grátis, seguro, educativo) e com a comunidade (é aberto, dá pra
contribuir, inclusive sem programar).

## Decisões fechadas

| Tema | Decisão |
|---|---|
| Repositório | `lucassdoro/floresta-dos-bichinhos-site`, **público desde já**, separado do jogo |
| Hospedagem | GitHub Pages direto da `main` (raiz), sem build. `CNAME` pronto para domínio próprio (ainda não registrado) |
| Tecnologia | HTML + CSS + JS estático, sem framework nem build; parte do site do projeto antigo (`../floresta-dos-bichinhos-old/site/floresta-de-bichinhos/`) |
| Idiomas | Os mesmos do jogo: **pt-BR e it**. Troca na própria página (`data-i18n`), detecta o navegador, lembra a escolha. Idioma novo do jogo = idioma novo do site |
| Downloads | Ainda não há builds: botões Android, macOS, Linux, Windows aparecem como **"Em breve"** até existirem releases |
| Links pro repo do jogo | "Em breve" enquanto o repo do jogo for privado |
| Licença | Código GPL-3.0; arte, textos e personagens CC BY-NC-SA 4.0 (mesmas do jogo) |
| Regras | Iguais às do jogo: toda mudança começa por issue, curadoria do mantenedor, PR com `Closes #N` verificado por workflow |
| Aprovação visual | Mockup gerado no ChatGPT e aprovado **antes** de codar |

## Estrutura da página (uma página só)

1. **Topo** — logo, menu (O jogo · Fases · Para pais e escolas · Contribuir), seletor pt/it,
   botão "Baixar" em pílula. Fixo no scroll, compacto no celular (menu vira gaveta).
2. **Hero** — título colorido, subtítulo "Grátis, sem anúncios, para crianças de 3 a 7 anos",
   botão Baixar + ícones das 4 plataformas; ao lado, os 4 bichinhos em volta de um tablet com o jogo.
3. **Linha de garantias** (no lugar dos prêmios do Pok Pok) — sem anúncios · sem compras ·
   funciona offline · sem coleta de dados · código aberto. Ícone + rótulo curto.
4. **Faixa verde ondulada com trailer** — "Uma floresta de brincadeiras" + vídeo (`hero.mp4`),
   com pôster e sem autoplay com som.
5. **Espie a floresta** — tablet com moldura escura e carrossel das fases (prints do jogo), cada
   slide com nome da fase, habilidade e personagem; pontinhos + setas; troca a cada ~4 s.
6. **Tudo o que a criança ama, tudo o que os pais querem** — grade de 6 benefícios com ícones:
   cores, números e letras · calmo e sem pressa · vozes dos personagens · Modo Livre ·
   português e italiano · grátis e aberto.
7. **Os quatro bichinhos** — Didia, Lali, Lolo e Sophy, com uma frase de cada.
8. **Para pais e escolas** (faixa sol) — uso livre em casa e em sala; sem cadastro, sem internet.
9. **Feito por uma comunidade** (faixa céu) — código aberto, curadoria para crianças, como
   contribuir (inclusive sem programar), link do GitHub ("em breve").
10. **CTA final** — os 4 bichinhos + botão Baixar.
11. **Rodapé** — licenças, política de privacidade (página própria, traduzida), contato.

## Visual

- Base clara (creme), muito respiro; títulos em **Baloo 2** coloridos (laranja dos botões do
  jogo e verde-folha), texto corrido em **Nunito** marrom — paleta do site antigo
  (`--brown #6b401c`, `--cream #fff5de`, `--leaf #61a84a`, `--sun #ffd973`, `--sky #7ec4f5`)
  mais o laranja dos botões do jogo como destaque.
- Faixas de largura total com **borda ondulada** em SVG.
- **Tablet** com moldura escura arredondada, como o do Pok Pok.
- Botões em pílula; ícones chapados e simples.
- Movimento suave: carrossel com transição de deslize, bichinhos flutuando de leve, seções
  entrando com fade discreto. **Tudo desliga com `prefers-reduced-motion`.**
- Celular primeiro: margem lateral de 16 px, nenhuma rolagem horizontal; no celular o tablet
  vai para baixo do texto.

## Acessibilidade e privacidade

- `lang` do documento acompanha o idioma; textos alternativos em todas as imagens; contraste AA;
  link "pular para o conteúdo"; carrossel operável por teclado e pausável.
- Sem cookies, sem analytics, sem scripts de terceiros além das fontes (fontes servidas do
  próprio repo para não chamar o Google).

## Arquivos

```
index.html                 página
privacidade.html           política de privacidade
css/style.css
js/app.js                  idioma, carrossel, animações
js/strings.js              textos { "pt-BR": {...}, "it": {...} }
assets/                    personagens, prints, vídeo, ícones, fontes (do site antigo + novos)
tools/check_i18n.py        confere que toda chave data-i18n existe em todos os idiomas
.github/workflows/         checagem de i18n + issue ligada
CNAME                      só quando houver domínio
README.md, LICENSE, LICENSE-ASSETS.md, CONTRIBUTING.md
```

## Verificação

- `tools/check_i18n.py` em todo PR: toda chave usada no HTML existe em todos os idiomas, sem
  texto vazio.
- Capturas no Chrome headless em 1440 px e 390 px antes de cada entrega; conferir sem rolagem
  horizontal.
- Todos os links internos e âncoras funcionando.

## Fora de escopo

Versão jogável no navegador (export web do Godot), blog, newsletter, analytics, domínio (fica
para quando for registrado), páginas por idioma separadas para SEO.
