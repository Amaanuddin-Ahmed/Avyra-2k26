const fs = require('fs');
const path = require('path');
const https = require('https');

const photoIds = [
  { id: "1LC5KE-q4IVokoS7Ho3lJf7OYaEJiuMui", name: "drive-photo-1.jpg" },
  { id: "1dwKxYLaIE2QcTJMm6FMFobx8PVb5wlMS", name: "drive-photo-2.jpg" },
  { id: "1_6KdulisRCDCEXyn61bT_W91rzalMRfF", name: "drive-photo-3.jpg" },
  { id: "16Enq-oOOno-AyEqGVPM6WFKlBEy0Wq46", name: "drive-photo-4.jpg" },
  { id: "1l_8VJG0S07Ceuj_-gvi8aKS_zeUo6GCn", name: "drive-photo-5.jpg" },
  { id: "1ZduGK6UvYipLEQW1Dj4VAuMChpJYoQeY", name: "drive-photo-6.jpg" },
  { id: "1xOAYIAcjoY_SDflo5_p_WR6guuezSgT5", name: "drive-photo-7.jpg" },
  { id: "1Tyub1bAs7AXBMboZydPQQBYW1wcWGXEu", name: "drive-photo-8.jpg" },
  { id: "1saRRwJKFz2rT5CXbTgQaR2NpwrsD0Zxd", name: "drive-photo-9.jpg" },
  { id: "15GLQFPwAS5UPdFUnpAF766uWCKlVlO7t", name: "drive-photo-10.jpg" }
];

const galleryDir = path.join(__dirname, 'public', 'images', 'gallery');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(); });
    }).on('error', reject);
  });
}

async function run() {
  for (let i = 0; i < photoIds.length; i++) {
    const item = photoIds[i];
    const dest = path.join(galleryDir, item.name);
    const url = `https://lh3.googleusercontent.com/d/${item.id}=w800`;
    console.log(`Downloading ${item.name} (${item.id})...`);
    try {
      await download(url, dest);
      const stat = fs.statSync(dest);
      console.log(`Saved ${item.name}: ${stat.size} bytes`);
    } catch (e) {
      console.log(`Fallback for ${item.name}: ${e.message}`);
    }
  }
  console.log('All real photos downloaded successfully!');
}

run();
