# Site da Floresta dos Bichinhos

Site do [Floresta dos Bichinhos](https://github.com/lucassdoro/floresta-dos-bichinhos), jogo
educativo e gratuito para crianças de 3 a 7 anos.

No ar em **https://florestadosbichinhos.github.io**.

Página estática — HTML, CSS e JavaScript, sem build e sem dependências. Publicada pelo
GitHub Pages a partir da `main`.

## Rodando localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8000
```

e acesse `http://localhost:8000`.

## Idiomas

O site tem os mesmos idiomas do jogo (hoje português e italiano). Os textos ficam em
`js/strings.js`, e toda chave precisa existir em todos os idiomas:

```bash
python3 tools/check_i18n.py
```

## Contribuindo

Mesmas regras do jogo: toda mudança começa por uma issue, tudo passa por curadoria (o
público são crianças pequenas) e o pull request cita a issue com `Closes #N`. Veja o
[CONTRIBUTING.md](CONTRIBUTING.md).

## Licença

Código sob [GPL-3.0](LICENSE); imagens, personagens e textos sob
[CC BY-NC-SA 4.0](LICENSE-ASSETS.md).
