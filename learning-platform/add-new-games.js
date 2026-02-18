const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAki3QaFgKY0cTWAt2R06c86WimoXRVWKs",
  authDomain: "lessonsplatform-e228c.firebaseapp.com",
  projectId: "lessonsplatform-e228c",
  storageBucket: "lessonsplatform-e228c.firebasestorage.app",
  messagingSenderId: "804556322280",
  appId: "1:804556322280:web:85ffeb6fd6a49e321c605d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BASE = "https://tomasbb0.github.io/TheBurnayLabs/games";

const newGames = [
  {
    title: "🏰 Build Your Castle",
    url: `${BASE}/build-your-castle/`,
    description: "Medieval vocab: Castles, Knights, Dragons, Treasures",
  },
  {
    title: "🎪 Command Circus",
    url: `${BASE}/command-circus/`,
    description: "Portuguese imperative commands — Senta! Salta! Corre!",
  },
  {
    title: "🎭 Emotion Island",
    url: `${BASE}/emotion-island/`,
    description: "Emotions vocabulary — Feliz, Triste, Zangado, Surpreso",
  },
  {
    title: "🧑‍🍳 Magic Kitchen",
    url: `${BASE}/magic-kitchen/`,
    description: "Cooking & food vocabulary — Cozinhar, Misturar, Provar",
  },
  {
    title: "🌊 Ocean Explorer",
    url: `${BASE}/ocean-explorer/`,
    description: "Ocean creatures vocabulary — Tubarão, Polvo, Estrela-do-mar",
  },
  {
    title: "⭐ Spelling Stars",
    url: `${BASE}/spelling-stars/`,
    description: "Galaxy spelling game — 9 categories, 61 Portuguese words",
  },
];

async function addNewGames() {
  // Find George
  const studentsRef = collection(db, "students");
  const q = query(studentsRef, where("name", "==", "George"));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log("George not found!");
    process.exit(1);
  }

  const georgeId = snapshot.docs[0].id;
  console.log("Found George:", georgeId);

  // Check existing games to avoid duplicates
  const gamesRef = collection(db, "students", georgeId, "games");
  const existingGames = await getDocs(gamesRef);
  const existingUrls = new Set();
  existingGames.forEach((doc) => {
    const data = doc.data();
    if (data.url) existingUrls.add(data.url);
  });

  console.log(`George has ${existingUrls.size} existing games`);

  // Add only games that don't already exist
  let added = 0;
  for (const game of newGames) {
    if (existingUrls.has(game.url)) {
      console.log(`  ⏭️  Already exists: ${game.title}`);
      continue;
    }
    await addDoc(gamesRef, {
      ...game,
      done: false,
      playCount: 0,
      createdAt: new Date(),
    });
    console.log(`  ✅ Added: ${game.title}`);
    added++;
  }

  console.log(`\nDone! Added ${added} new games.`);
  process.exit(0);
}

addNewGames().catch((e) => {
  console.error(e);
  process.exit(1);
});
