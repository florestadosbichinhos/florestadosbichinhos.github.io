# Contribuindo com o site

1. **Toda mudança começa por uma issue.** Procure se já existe; se não, abra uma descrevendo o
   problema.
2. **Espere a aprovação** (label `aprovada`). Tudo passa por curadoria: o site fala com
   famílias e escolas de crianças pequenas.
3. **Proponha a solução** na issue antes de começar e espere o ok.
4. **Branch** a partir da `main` com o número da issue: `fix/12-menu-no-celular`.
5. **Pull request** com `Closes #12` na descrição — PR sem issue ligada é reprovado pela
   verificação *Issue ligada*.

Regras do site:

- Todo texto visível usa `data-i18n` e existe em **todos** os idiomas de `js/strings.js`
  (`python3 tools/check_i18n.py`).
- Nada de scripts, fontes, cookies ou analytics de terceiros.
- Funciona no celular (390 px) sem rolagem lateral e respeita "reduzir movimento".
- Imagens em WebP; arte nova precisa ser sua ou CC0/CC BY e entra sob a CC BY-NC-SA 4.0.

As regras completas do projeto estão no CONTRIBUTING do repositório do jogo.
