const fs = require('fs');

const content = fs.readFileSync('drive_page.html', 'utf8');

// Look for image extensions
const imgMatches = [...content.matchAll(/([a-zA-Z0-9_-]{25,})[^\w-]{1,20}([^"'\\]+\.(?:jpg|jpeg|png|webp|JPG|PNG))/g)];
console.log('Image matches:', imgMatches.length);
imgMatches.slice(0, 15).forEach(m => console.log(m[1], m[2]));

// Look for Google Drive thumbnail / uc URLs
const ucMatches = [...content.matchAll(/https:\/\/[^"'\s<>]*(?:googleusercontent|drive\.google)[^"'\s<>]*/g)];
console.log('Google content URLs:', ucMatches.length);
ucMatches.slice(0, 10).forEach(m => console.log(m[0]));

// Search for any file metadata in JSON
const fileData = [...content.matchAll(/\["([a-zA-Z0-9_-]{28,35})",\["([^"]+)"/g)];
console.log('File data arrays:', fileData.length);
fileData.slice(0, 10).forEach(m => console.log(m[1], m[2]));
