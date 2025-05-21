const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Your Microsoft Teams Incoming Webhook
const TEAMS_WEBHOOK = 'https://timwinfo2.webhook.office.com/webhookb2/f6b13cc4-328b-4395-baeb-f8632dd229b2@f74b1450-e46a-41df-abee-ebf3621bfd85/IncomingWebhook/f25dcd95ffc14a8f9ec012996ce33608/630743f1-e10f-401c-8c02-379470b66ef7/V2ZATWDb8DgzCVmb4P0kTxFTPwcWliyfBlvBAfFutzASg1';

app.post('/webhook', async (req, res) => {
  const event = req.headers['x-github-event'];
  const payload = req.body;

  // Only respond to secret scanning alerts
  if (event === 'secret_scanning_alert' && payload.action === 'created') {
    const { alert, repository } = payload;

    const message = {
      text: `🚨 GitHub Secret Alert: **${alert.secret_type_display_name || alert.secret_type}**\n\nRepo: ${repository.full_name}\n[View Alert](${alert.html_url})`
    };

    try {
      await axios.post(TEAMS_WEBHOOK, message);
      console.log('✅ Posted alert to Teams.');
    } catch (err) {
      console.error('❌ Teams post failed:', err.message);
    }
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('✅ Listening on http://localhost:3000/webhook');
});
