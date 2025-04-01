# 🔐 Bling V3 OAuth com Node.js

Este projeto é uma automação completa do processo de geração de tokens de acesso (`access_token` e `refresh_token`) da **API Bling V3**, utilizando Node.js + Express + SQLite.

> 📌 Ideal para quem deseja integrar o Bling V3 com sistemas externos (ex: WMS, ERP, etc.) sem precisar usar o Insomnia manualmente.

## 🧠 Por que automatizar isso?

O Bling usa OAuth 2.0 para autenticação, mas o processo de gerar tokens pode ser manual e repetitivo. Esse projeto automatiza isso para você, de forma segura e reutilizável.

## 📚 Requisitos

- Node.js 18 ou superior
- SQLite (já incluso no projeto via sqlite3)

## 🛠️ Dependências

- express
- axios
- sqlite3
- dotenv
- open

## ✨ O que *bling-auth.js* faz?

- Gera o link de autorização automaticamente.
- Abre automaticamente no navegador.
- Captura o `authorization_code` via servidor Express.
- Salva os tokens em `tokens.json`. 
- Solicita o code após redirecionamento manual.
- Troca access_token por tokens usando refresh_token e OAuth 2.0.
- Também salva os tokens em um banco de dados SQLite.

Em resumo:

🧠 Vai rodar um servidor Express para capturar automaticamente o code após o redirecionamento.
🛡️ Faz a troca automática do code por access_token e refresh_token.
💾 Salva os tokens tanto em um arquivo JSON quanto em um banco de dados SQLite (leve e fácil de usar).

# 🧱 Para ler o Banco SQLite

Online 
https://inloop.github.io/sqlite-viewer/
https://sqliteviewer.app/
https://beta.sqliteviewer.app/

Software
https://sqlitebrowser.org/ 


---


## 🚀 Como usar

### 1. Clone o projeto

```bash
git clone https://github.com/seu-usuario/bling-v3-oauth-node.git
cd bling-v3-oauth-node
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo .env:

```bash
CLIENT_ID=seu_client_id_gerado_no_bling
CLIENT_SECRET=seu_client_secret_gerado_no_bling
REDIRECT_URI=http://localhost:3000/callback
PORT=3000
```


---


> 🔐 O CLIENT_ID e CLIENT_SECRET são obtidos no painel do Bling em: Configurações > Cadastros de Aplicativos


## ▶️ Rodando o servidor

```bash
node server.js
```

1 - O servidor abrirá automaticamente o navegador com a URL de login do Bling.
2 - Faça login e autorize o aplicativo.
3- O código será capturado automaticamente pela rota /callback.
4 - Os tokens serão salvos em:
    tokens.json
    banco SQLite bling.db


## 📁 Estrutura do Projeto

```bash
bling-v3-oauth-node/
├── .env
├── server.js         # Servidor Express para capturar o code
├── bling.js          # Lógica de troca de code por tokens
├── db.js             # Banco SQLite para armazenar os tokens
├── tokens.json       # Tokens salvos em formato JSON
├── package.json
```


## 🤝 Contribuições

Sinta-se à vontade para enviar PRs, abrir issues ou compartilhar este projeto com outros desenvolvedores que usam Bling.


## 📄 Licença

MIT


## 🙌 Créditos

Criado com base no vídeo tutorial de geração de tokens Bling V3 + Insomnia
Assista no YouTube


## 🔍 Palavras-chave
bling api, bling oauth, bling v3, node.js bling integration, oauth2 bling, refresh token, bling express node, automação bling, yampi, yampi checkout, shopify, shopify bling, shopify integration, shopify tema, shopify partner