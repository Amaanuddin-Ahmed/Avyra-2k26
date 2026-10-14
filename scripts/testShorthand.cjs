const fs = require('fs');

const content = fs.readFileSync('C:/Users/DELL/.gemini/antigravity/brain/7023d3c9-02ec-45a4-816a-5f7952f48a13/.system_generated/steps/711/content.md', 'utf8');

// Notice:
// <a href="https://drive.google.com/file/d/FILE_ID/view?usp=drive_web" ...><div class="flip-entry-title">FILENAME</div></a>
const fileRegex = /href="https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view\?usp=drive_web"[^>]*>[\s\S]*?<div class="flip-entry-title">([^<]+)<\/div>/g;

const files = {};
let m;
while ((m = fileRegex.exec(content)) !== null) {
  files[m[2].trim().toUpperCase()] = m[1];
}

console.log('Total files parsed:', Object.keys(files).length);

// User list with shorthand expansions:
// sdq0867 , 87, 91, 98,..919,931,37,38,53,59,65,68,87,1041,56,62,73,78,85,88,90,93,96,
// 1104,1111,1133,1146,1148,1157,1159,1169,1172,1187,1194,1202,1210,1216,1222,1224,1238,
// 1264,1274,1278,1295,1306,1307,1302,1361,1262,1366,1381,1382,1393,1395,1417,1424,
// 1440,1454,1459,1460,1463,1467,1468,71
const userTokens = [
  "0867", "0887", "0891", "0898",
  "0919", "0931", "0937", "0938", "0953", "0959", "0965", "0968", "0987",
  "1041", "1056", "1062", "1073", "1078", "1085", "1088", "1090", "1093", "1096",
  "1104", "1111", "1133", "1146", "1148", "1157", "1159", "1169", "1172", "1187", "1194",
  "1202", "1210", "1216", "1222", "1224", "1238", "1264", "1274", "1278", "1295",
  "1306", "1307", "1302", "1361", "1262", "1366", "1381", "1382", "1393", "1395",
  "1417", "1424", "1440", "1454", "1459", "1460", "1463", "1467", "1468", "1471"
];

console.log('User tokens count:', userTokens.length);

const matched = [];
const missing = [];

for (const code of userTokens) {
  const variations = [
    `_SDQ${code}.JPG`,
    `SDQ${code}.JPG`,
    `_SDQ${code}.jpg`,
    `SDQ${code}.jpg`
  ];
  let id = null;
  let matchedName = null;
  for (const v of variations) {
    if (files[v]) {
      id = files[v];
      matchedName = v;
      break;
    }
  }
  if (id) {
    matched.push({ code, id, filename: matchedName });
  } else {
    missing.push(code);
  }
}

console.log(`Matched: ${matched.length} / ${userTokens.length}`);
if (missing.length > 0) {
  console.log('Missing:', missing.join(', '));
}

// Write the complete gallery data!
const galleryData = matched.map((item, idx) => ({
  id: item.id,
  num: item.code,
  src: `https://lh3.googleusercontent.com/d/${item.id}=w600`,
  alt: `AVYRA Freshers Celebration Memory ${idx + 1}`
}));

const tsContent = `// Auto-generated gallery data from Google Drive
// ${galleryData.length} curated photos from last year's freshers
// Matching user requested SDQ codes

export interface GalleryPhoto {
  id: string;
  num: string;
  src: string;
  alt: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = ${JSON.stringify(galleryData, null, 2)};
`;

fs.writeFileSync('src/data/gallery.ts', tsContent);
console.log(`Successfully generated src/data/gallery.ts with ${galleryData.length} photos!`);
