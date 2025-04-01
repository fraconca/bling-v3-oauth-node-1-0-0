const axios = require('axios');
const open = require('open');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const generateState = () => Math.random().toString(36).substring(2, 15);

async function startAuth() {
  const state = generateState();
  const authUrl = `https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`;

  console.log('🔗 Acesse esse link para autorizar:');
  console.log(authUrl);
  await open(authUrl);

  console.log('\n📝 Após o redirecionamento, copie o valor de "code" da URL e cole abaixo:');
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question('Cole o código "code=" aqui: ', async (code) => {
    readline.close();
    await getTokens(code);
  });
}

async function getTokens(code) {
  const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const res = await axios.post(
      'https://www.bling.com.br/Api/v3/oauth/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('✅ Access Token:', res.data.access_token);
    console.log('🔁 Refresh Token:', res.data.refresh_token);

    // Aqui você pode salvar os tokens em DB ou arquivo local
  } catch (err) {
    console.error('❌ Erro ao obter tokens:', err.response?.data || err.message);
  }
}

startAuth();
