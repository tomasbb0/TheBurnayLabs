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

async function setup() {
  // First find or create Leo
  const studentsRef = collection(db, "students");
  const q = query(studentsRef, where("name", "==", "Leo"));
  const snapshot = await getDocs(q);

  let leoId;
  if (snapshot.empty) {
    const docRef = await addDoc(studentsRef, {
      name: "Leo",
      level: "A0",
      createdAt: new Date(),
    });
    leoId = docRef.id;
    console.log("Created Leo with ID:", leoId);
  } else {
    leoId = snapshot.docs[0].id;
    console.log("Found Leo with ID:", leoId);
  }

  // Add diagnostic
  const diagRef = collection(db, "students", leoId, "diagnostics");
  await addDoc(diagRef, {
    title: "Initial Portuguese Assessment",
    description:
      "Complete diagnostic to assess Portuguese level - Colors, Numbers, Animals, Family, Body Parts, and Food vocabulary",
    status: "pending",
    createdAt: new Date(),
  });
  console.log("Added diagnostic for Leo");

  // Add games
  const gamesRef = collection(db, "students", leoId, "games");
  const games = [
    {
      title: "🚗 Build Your Car",
      url: "https://tomasbb0.github.io/TheBurnayLab/games/build-your-car/",
      description: "Colors, Numbers, Animals, Family, Body, Food",
    },
    {
      title: "🏠 Build Your House",
      url: "https://tomasbb0.github.io/TheBurnayLab/games/build-your-house/",
      description: "Shapes, Rooms, Furniture, Nature, Weather, Sizes",
    },
    {
      title: "🚀 Build Your Rocket",
      url: "https://tomasbb0.github.io/TheBurnayLab/games/build-your-rocket/",
      description:
        "Planets, Directions, Numbers 6-10, Actions, Transport, Professions",
    },
    {
      title: "🤖 Build Your Robot",
      url: "https://tomasbb0.github.io/TheBurnayLab/games/build-your-robot/",
      description: "Colors, Opposites, Emotions, Instruments, Sports, School",
    },
    {
      title: "🦖 Build Your Dinosaur",
      url: "https://tomasbb0.github.io/TheBurnayLab/games/build-your-dinosaur/",
      description: "Wild Animals, Fruits, Vegetables, Insects, Seasons, Days",
    },
  ];

  for (const game of games) {
    await addDoc(gamesRef, { ...game, createdAt: new Date() });
    console.log("Added game:", game.title);
  }

  console.log("\n✅ Setup complete!");
  process.exit(0);
}

setup().catch((e) => {
  console.error(e);
  process.exit(1);
});
