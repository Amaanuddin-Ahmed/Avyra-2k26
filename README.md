# AVYRA 2K26 — CSE 1 Freshers' Party | MGIT

> **"Where It All Begins."**  
> Official immersive digital experience and animated event website for **AVYRA 2K26**, organized by the seniors of **CSE 1** at **Mahatma Gandhi Institute of Technology (MGIT)**.

---

## 🌟 Event Details (Official & Verified)

- **Event Name:** AVYRA 2K26
- **Event Type:** Freshers' Party
- **Organising Department:** CSE 1 (Computer Science & Engineering)
- **Institution:** Mahatma Gandhi Institute of Technology (MGIT)
- **Date:** Thursday, 15 October 2026 (15/10/2026)
- **Time:** 09:30 AM onwards
- **Venue:** E-101
- **Tagline:** *Where It All Begins.*
- **Official Instagram:** [instagram.com/avyra.2026](https://instagram.com/avyra.2026?vrfl=MmlleTF6dnV6cGR4)
- **Creator Credit:** *Made by Amaann.. with love*

---

## 🎨 Visual Identity & Architecture

Built with a high-fidelity **midnight-blue** and **electric-blue** aesthetic art-directed from the official AVYRA poster:
1. **Cinematic Hero:** Beveled metallic-crystal Roman display typography, glowing orbital elliptical rings, disco ball spotlight beams, and immediate event stats.
2. **Sakura Blossom Welcome:** Japanese cherry blossom tree with drifting petals particle animation (#F2A7D4) and heartfelt invitation from CSE 1 seniors.
3. **Luxury Chronograph Watch Reveal:** Precision dial frozen at **09:30 AM**, rotating into a smooth zoom reveal for the **Grand Inauguration**.
4. **Kinetic Editorial AVYRA Typography (CherryFizz / Dora style):** Massive display wordmark gliding laterally back-and-forth across scroll progress behind 7 floating liquid-glass schedule cards.
5. **Honourable Guests (Faculty):** Distinguished profiles for Principal **Prof. G. ChandraMohan Reddy**, HOD **Prof. T. V. Rajini Kanth**, and Coordinator **R. Mohan Krishna**.
6. **Coordinators Section:** Dual-mode interactive experience:
   - **Continuous Stream:** Seamless infinite-loop horizontal marquee with hover-pause and keyboard accessibility.
   - **Orbital Glass Deck:** 3D circular deck of small glass cards.
7. **Final Invitation & Finale:** Interactive *Add to Google Calendar* button, confetti burst effect, Instagram connection, and creator credit.

---

## 📅 Official Schedule Timeline

| Time | Event Name | Description |
| :--- | :--- | :--- |
| **09:30 AM** | Inauguration | Grand ceremonial commencement & lamp lighting |
| **09:40 AM** | Cake Cutting | Uniting seniors and freshers in celebration |
| **10:00 AM** | Speeches | Inspiring messages from respected guests & seniors |
| **10:10 AM** | Dances | High-energy choreography & electrifying beats |
| **11:30 AM** | Singing | Melodic performances and crowd anthems |
| **11:40 AM** | Rose Ceremony | Welcoming every fresher with flowers and warmth |
| **12:25 PM** | Exciting Gifts for You All | Curated surprises & commemorative mementos |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+ LTS recommended)
- npm or pnpm / yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd Avyra-2k26

# Install dependencies
npm install
```

### Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```
Creates an optimized, tree-shaken static production bundle in `dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## 🛠️ How to Update Content & Photos

All content is cleanly separated from UI components in `src/data/`:

### 1. Updating Coordinator Names and Photos
Open [`src/data/coordinators.ts`](file:///c:/Users/DELL/OneDrive/Desktop/Avyra-2k26/src/data/coordinators.ts):
```typescript
export const COORDINATORS: Coordinator[] = [
  {
    id: "coord-1",
    name: "Alex Johnson", // Update name here
    role: "Lead Coordinator",
    department: "CSE 1",
    image: "/images/coordinators/alex.jpg", // Place image in public/images/coordinators/
  },
  // ...
];
```
Place their photo files directly inside `public/images/coordinators/`.

### 2. Updating Faculty Information
Open [`src/data/faculty.ts`](file:///c:/Users/DELL/OneDrive/Desktop/Avyra-2k26/src/data/faculty.ts):
```typescript
export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Prof. G. ChandraMohan Reddy",
    role: "Respected Principal",
    department: "Mahatma Gandhi Institute of Technology",
    image: "/images/faculty/principal.jpg",
  },
  // ...
];
```

### 3. Updating Schedule Items
Open [`src/data/schedule.ts`](file:///c:/Users/DELL/OneDrive/Desktop/Avyra-2k26/src/data/schedule.ts) to adjust timings or descriptions.

---

## ☁️ Google Drive Photo Integration (Optional)

If you wish to load coordinator photos directly from a public Google Drive folder without re-deploying:
1. Upload your photos to a Google Drive folder.
2. Set the folder sharing permission to **"Anyone with the link can view"**.
3. For each file, copy its **File ID** (the long string in the share URL).
4. Use Google Drive's direct image URL format in `src/data/coordinators.ts`:
   ```typescript
   image: "https://lh3.googleusercontent.com/d/YOUR_FILE_ID_HERE"
   ```
This provides instantaneous image updates without needing any backend server or private API keys.

---

## 🚢 Deploying to Vercel

### Option 1: Vercel CLI (Fastest)
```bash
npx vercel
```
Follow the interactive prompts:
- Link to existing project? **No**
- Project name: **avyra-2k26**
- Directory: **.**
- Auto-detect Vite framework: **Yes**

### Option 2: Via GitHub + Vercel Dashboard
1. Push the code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete AVYRA 2K26 production website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/Avyra-2k26.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your `Avyra-2k26` repository.
4. Click **Deploy**. Vercel will automatically run `npm run build` and publish the site with continuous deployment enabled!

---

## 💎 Credits & Heartfelt Note

- **Organized with pride by:** CSE 1, Mahatma Gandhi Institute of Technology (MGIT)
- **Crafted with love by:** Amaann..
