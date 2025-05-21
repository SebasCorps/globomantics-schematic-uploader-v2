require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const winston = require('winston');
const fs = require('fs');

// --- FAKE SECRETS FOR DEMO PURPOSES ---
// GitHub Personal Access Token (PAT) - FAKE
const GITHUB_PAT = 'ghp_FAKE1234567890DEMOsecretPAT';
// Cloud API Key - FAKE
const CLOUD_API_KEY = 'cloud_api_key_DEMO-1234-5678-SECRET';








// --- LOGGING SETUP ---
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

const app = express();
const PORT = process.env.PORT || 3002;

// --- MULTER SETUP ---
const upload = multer({
  dest: path.join(__dirname, 'uploads'),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

app.use(express.static(path.join(__dirname, 'public')));

// --- Load secret scanning tips (fortune cookies) ---
let secretScanningTips = [];
function loadTips() {
  try {
    const tipsRaw = fs.readFileSync(path.join(__dirname, 'secret-scanning-tips.txt'), 'utf-8');
    secretScanningTips = tipsRaw.split('\n').map(t => t.trim()).filter(Boolean);
  } catch (e) {
    secretScanningTips = ['Always scan your repo for secrets before pushing!'];
  }
}
loadTips();
function getRandomTip() {
  if (!secretScanningTips.length) return 'Always scan your repo for secrets before pushing!';
  return secretScanningTips[Math.floor(Math.random() * secretScanningTips.length)];
}

// --- HOME PAGE ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- FILE UPLOAD ENDPOINT ---
app.post('/upload', upload.single('schematic'), (req, res) => {
  if (!req.file) {
    logger.warn('No file uploaded');
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
  logger.info(`File uploaded: ${req.file.originalname}`, { filename: req.file.filename });
  // Simulate a secret leak in logs (for demo)
  logger.warn(`Leaked secret (for demo): ${GITHUB_PAT}`);
  const fortune = getRandomTip();
  logger.info(`[FORTUNE] ${fortune}`);
  res.json({
    success: true,
    filename: req.file.originalname,
    uploadedAt: new Date().toISOString(),
    message: 'Did you know this app contains fake secrets for GitHub secret scanning demos? Try scanning this repo with GitHub Advanced Security.',
    fortuneCookie: fortune
  });
});

// --- RESULT PAGE ---
app.get('/result', (req, res) => {
  const filename = req.query.filename;
  if (!filename) {
    return res.status(400).send('No file specified.');
  }
  res.send(`
    <html>
      <head>
        <title>Upload Result</title>
        <link rel="stylesheet" href="/assets/style-robotics.css">
      </head>
      <body>
        <div class="container">
          <h1>Upload Successful!</h1>
          <p>File <strong>${filename}</strong> uploaded.</p>
          <p><em>Did you know?</em> This app intentionally contains fake secrets for GitHub secret scanning demos. Check the logs and code for examples!</p>
          <a href="/">Back to Upload</a>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  logger.info(`Globomantics Schematic Uploader v2 running on port ${PORT}`);
});
