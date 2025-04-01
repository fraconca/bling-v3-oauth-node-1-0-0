const axios = require('axios');
const fs = require('fs');
const { saveTokensToDB } = require('./db');
require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

async function exchangeCodeForTokens(code) {
  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const res = await axios.post(
      'https://www.bling.com.br/Api/v3/oauth/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token } = res.data;

    console.log('✅ Tokens obtidos com sucesso!');
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);

    fs.writeFileSync('tokens.json', JSON.stringify({ access_token, refresh_token }, null, 2));
    console.log('💾 Tokens salvos em tokens.json');

    saveTokensToDB(access_token, refresh_token);
  } catch (err) {
    console.error('❌ Erro ao trocar o code por tokens:', err.response?.data || err.message);
  }
}

module.exports = { exchangeCodeForTokens };
