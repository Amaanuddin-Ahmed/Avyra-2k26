const fs = require('fs');
const path = require('path');
const https = require('https');

const html = fs.readFileSync('photos_embed.html', 'utf8');

// Regex for entry IDs
const regex = /entry-([a-zA-Z0-9_-]+)[^>]*>.*?flip-entry-title">([^<]+)<\/div>/g;
const items = [];
let match;
while ((match = regex.exec(html)) !== null) {
  items.push({ id: match[1], title: match[2] });
}

console.log(`Found ${items.length} photos in drive folder.`);
console.log('Sample items:', items.slice(0, 10));

const galleryDir = path.join(__dirname, 'public', 'images', 'gallery');

// Function to download an image from Google drive
function downloadImage(id, destPath) {
  return new Promise((resolve, reject) => {
    // lh3.googleusercontent.com/d/{id}=w800
    const url = `https://lh3.googleusercontent.com/d/${id}=w800`;
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (res2) => {
          const fileStream = fs.createWriteStream(destPath);
          res2.pipe(fileStream);
          fileStream.on('finish', () => { fileStream.close(); resolve(); });
        }).on('error', reject);
      } else {
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => { fileStream.close(); resolve(); });
      }
    }).on('error', reject);
  });
}

async function downloadAll() {
  const selected = items.slice(0, 12);
  for (let i = 0; i < selected.length; i++) {
    const item = selected[i];
    const filename = `drive-photo-${i + 1}.jpg`;
    const dest = path.join(galleryDir, filename);
    console.log(`Downloading ${item.title} (${item.id}) -> ${filename}...`);
    try {
      await downloadImage(item.id, dest);
    } catch (err) {
      console.error(`Error downloading ${item.id}:`, err.message);
    }
  }
  console.log('Done downloading actual drive photos!');
}

downloadAll();
