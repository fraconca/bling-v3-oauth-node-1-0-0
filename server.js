(async () => {
    const express = require('express');
    const { exchangeCodeForTokens } = require('./bling');
    require('dotenv').config();
  
    const app = express();
    const PORT = process.env.PORT || 3000;
    const CLIENT_ID = process.env.CLIENT_ID;
    const REDIRECT_URI = process.env.REDIRECT_URI;
  
    app.get('/', async (req, res) => {
      const state = Math.random().toString(36).substring(2, 15);
      const authUrl = `https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`;
      
      const open = (await import('open')).default;
      open(authUrl); // abre o navegador
  
      res.send(`<a href="${authUrl}">Clique aqui para autenticar com Bling</a>`);
    });
  
    app.get('/callback', async (req, res) => {
      const { code } = req.query;
  
      if (!code) {
        return res.status(400).send('Code não encontrado na URL.');
      }
  
      res.send('✅ Código recebido! Os tokens estão sendo processados...');
      await exchangeCodeForTokens(code);
    });
  
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
      console.log('🔗 Acesse essa URL para iniciar o fluxo de autenticação...');
    });
  })();  