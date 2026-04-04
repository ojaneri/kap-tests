# KAP Tests — Session Notes

## Repositório
- **URL:** https://github.com/ojaneri/kap-tests
- **Visibilidade:** Privado
- **Autor:** ojaneri <janeri@gmail.com>
- **Branch:** master

## Credenciais
- Token do GitHub em `.env` (variável `GH_TOKEN`)
- Login de teste: `teste@janeri.com.br` / `Teste2026!`
- Login expirado: `testeexpirado@janeri.com.br`

## O que foi feito
- Testes Playwright para o site https://kaponline.com.br
- `beforeEach` faz login automático antes de cada teste do `post-login.spec.ts`
- Corrigida URL do teste de CNPJ: `cnpj2.php` → `cnpj.php`
- Configurado modo headless via variável de ambiente `HEADLESS=1`
- Em modo headless, testes rodam com 1 worker (sequencial) por padrão

## Arquivos de teste
| Arquivo | O que testa |
|---|---|
| `tests/example.spec.ts` | Testes de exemplo do Playwright |
| `tests/kap-login.spec.ts` | Login válido, expirado, esqueci senha, suporte |
| `tests/post-login.spec.ts` | Consultas e histórico: nome, CPF, placa, CNPJ; logout |

## run.sh — Como usar

```bash
# Com navegador visível (padrão)
./run.sh

# Headless, sequencial (1 worker)
./run.sh --nohead

# Headless, paralelo
./run.sh --nohead --multiple-workers
```

Ao final, envia relatório por e-mail para `janeri@gmail.com` com o HTML do Playwright.

## Status dos testes (última execução: 2026-04-04)
- 9 passaram, 6 falharam em modo headless
- Falhas suspeitas: site possivelmente detecta user-agent headless e bloqueia/redireciona
- Páginas afetadas: `nome2.php`, `cpf2.php`, `placa2.php`, `cnpj.php`
- Próximo passo a investigar: definir user-agent real no `playwright.config.ts`

## Dependências
- Node.js + npx
- Playwright (`@playwright/test`)
- `mailutils` (comando `mail`) para envio de relatório
- `gh` CLI autenticado com token em `.env`
