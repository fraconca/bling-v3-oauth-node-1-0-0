# 🔐 Bling V3 OAuth com Node.js

Este projeto é uma automação completa do processo de geração de tokens OAuth2 de acesso (`access_token` e `refresh_token`) da **API Bling V3**, utilizando Node.js + Express + SQLite sem precisar do Insomnia ou Postman.

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

## Fluxo automatizado

- Abre a URL de autenticação do Bling no navegador.
- Usuário faz login e autoriza o app.
- Bling redireciona para http://localhost:3000/callback?code=...
- O código code é capturado automaticamente.
- Um access_token e um refresh_token são gerados e:
    - Salvos em tokens.json.
    - Salvos no banco SQLite bling.db.

---

## OPCIONAL 🧱 Para ler o Banco SQLite

Online 
https://inloop.github.io/sqlite-viewer/
https://sqliteviewer.app/
https://beta.sqliteviewer.app/

Software
https://sqlitebrowser.org/ 

---


# 🧪 Passo a passo para executar o projeto 

1. Crie uma pasta do projeto e entre nela:

```bash
mkdir bling-v3-oauth-node && cd bling-v3-oauth-node
```

2. Clone o projeto na pasta:

```bash
git clone https://github.com/seu-usuario/bling-v3-oauth-node.git
```

3. Instale dependências

```bash
npm install
```

4. Agora crie um aplicativo Bling (se ainda não tiver um)

É necessário gerar o *CLIENT_ID* e o *CLIENT_SECRET* e preencher o arquivo *.env* com os dados gerados no Aplicativo Privado do [Bling](https://www.bling.com.br/cadastro.aplicativos.php#/list). Caso não tenha criado, cadastre um novo aplicativo [aqui](https://www.bling.com.br/cadastro.aplicativos.php#/form) e siga os passos abaixo:

- Tipo de aplicativo > API
- Selecione o uso do aplicativo > Privado
- Clique em *Próximo*

- Suba um *Logo* em SVG (o tamanho permitido é de 500 x 500 px)
- Preencha os campos:
    - Nome: Bling OAuth Node
    - Categoria: Escolha uma categoria
    - Descrição: "Automação completa do processo de geração de tokens OAuth2. Desenvolvido por: Flávio Conca."
    - Link de redirecionamento: coloque exatamente o que está no seu .env, ou seja:

```bash
http://localhost:3000/callback
```

- Selecione o escopo desejado
- Preencher os campos:
    - Informações para contato 
    - Nome do desenvolvedor
    - Email
    - Celular
- Clique em *Salvar Dados Básicos*

5. Clique em Informações do APP

- Copie e cole no .env → CLIENT_ID e CLIENT_SECRET:

```bash
CLIENT_ID=seu_client_id
CLIENT_SECRET=seu_client_secret
```

6. Abra seu navegador e inicie o script pelo Node.JS

```bash
node server.js
```

Você será redirecionado automaticamente para autorizar a aplicação. 
- Clique em *Autorizar*

Obs.: Caso não seja redireiconado copie o *Link de Convite* e abra no navegador e clique em *Autorizar* e volte para o passo 6 para rodar o server.js. 

#### Se tudo funcionar vai aparecer em seu navegador a mensagem: 

*✅ Código recebido! Os tokens estão sendo processados...*

#### Abra o *Terminal* e confira:

✅ Tokens obtidos com sucesso!

Access Token: 6eefd86aa646bb588669d8c07f1291b3a34b53ff
Refresh Token: 347b639b4caa6c3a7c1ffda6107d549de2182d3c

💾 Tokens salvos em tokens.json
📥 Tokens salvos no banco com sucesso!

- 🔐 O Refresh Token expira em 60 segundos. Após este tempo será necessário gerar outro Refresh Token.
- O servidor abrirá automaticamente o navegador com a URL de login do Bling. O código será capturado automaticamente pela rota /callback. Os tokens serão salvos em *tokens.json* e no banco SQLite *bling.db*.


## 📁 Estrutura do Projeto

```bash
bling-v3-oauth-node/
├── .env
├── server.js
├── bling.js
├── db.js
├── tokens.json
```

.env:           Armazenamento seguro das credenciais (Client ID, Secret, Redirect URI).
server.js:      Servidor Express para iniciar o fluxo e capturar o code via callback.
bling.js:       Lógica para trocar o authorization_code por tokens usando a API do Bling.
db.js:          Criação e conexão com banco SQLite local para armazenar tokens.
tokens.json:    Backup local dos tokens em arquivo.


## 🤝 Contribuições

Sinta-se à vontade para enviar PRs, abrir issues ou compartilhar este projeto com outros desenvolvedores que usam Bling.


## 📄 Licença

MIT


## 🙌 Créditos

Criado com base no [video](https://drive.google.com/file/d/14TKngA7m74Njk3unf6Ruku70V0XuxaAJ/view) tutorial de integração com o WMS da Fontes.Log  e documentação [documentação](https://docs.google.com/document/d/14aKbt9V6ZCVSKR1qHGpqfuRjSjJgpCmXYRgPoKHD_KI/edit?pli=1&tab=t.0).


## 🔍 Palavras-chave
bling api, bling oauth, bling v3, node.js bling integration, oauth2 bling, refresh token, bling express node, automação bling, yampi, yampi checkout, shopify, shopify bling, shopify integration, shopify tema, shopify partner, insomnia, postman