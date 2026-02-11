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
  // First find or create George
  const studentsRef = collection(db, "students");
  const q = query(studentsRef, where("name", "==", "George"));
  const snapshot = await getDocs(q);

  let georgeId;
  if (snapshot.empty) {
    const docRef = await addDoc(studentsRef, {
      name: "George",
      level: "A0",
      createdAt: new Date(),
    });
    georgeId = docRef.id;
    console.log("Created George with ID:", georgeId);
  } else {
    georgeId = snapshot.docs[0].id;
    console.log("Found George with ID:", georgeId);
  }

  // Add diagnostic with full assessment content
  const diagRef = collection(db, "students", georgeId, "diagnostics");
  await addDoc(diagRef, {
    title: "🌟 Avaliação Diagnóstica / Diagnostic Assessment",
    description:
      "Complete Portuguese level assessment - Colors, Numbers, Body Parts, Family, Commands, Oral Production",
    status: "pending",
    createdAt: new Date(),
    sections: [
      {
        id: "A1",
        title: "Cores / Colors 🎨",
        instruction: 'Show colored objects. Ask: "Que cor é esta?"',
        items: [
          { portuguese: "Vermelho", english: "Red", emoji: "🔴", response: "" },
          { portuguese: "Azul", english: "Blue", emoji: "🔵", response: "" },
          {
            portuguese: "Amarelo",
            english: "Yellow",
            emoji: "🟡",
            response: "",
          },
          { portuguese: "Verde", english: "Green", emoji: "🟢", response: "" },
        ],
        score: null,
        maxScore: 4,
      },
      {
        id: "A2",
        title: "Números / Numbers 🔢",
        instruction: 'Use fingers or objects to count. Ask: "Quantos?"',
        items: [
          { portuguese: "Um", english: "One", emoji: "1️⃣", response: "" },
          { portuguese: "Dois", english: "Two", emoji: "2️⃣", response: "" },
          { portuguese: "Três", english: "Three", emoji: "3️⃣", response: "" },
          { portuguese: "Quatro", english: "Four", emoji: "4️⃣", response: "" },
          { portuguese: "Cinco", english: "Five", emoji: "5️⃣", response: "" },
        ],
        score: null,
        maxScore: 5,
      },
      {
        id: "A3",
        title: "Partes do Corpo / Body Parts 🧍",
        instruction: 'Point to body parts. Ask: "O que é isto?"',
        items: [
          { portuguese: "Cabeça", english: "Head", emoji: "🗣️", response: "" },
          { portuguese: "Mão", english: "Hand", emoji: "✋", response: "" },
          { portuguese: "Pé", english: "Foot", emoji: "🦶", response: "" },
          { portuguese: "Olhos", english: "Eyes", emoji: "👀", response: "" },
          { portuguese: "Boca", english: "Mouth", emoji: "👄", response: "" },
        ],
        score: null,
        maxScore: 5,
      },
      {
        id: "A4",
        title: "Família / Family 👨‍👩‍👦",
        instruction: 'Use photos or drawings. Ask: "Quem é?"',
        items: [
          { portuguese: "Mamã/Mãe", english: "Mom", emoji: "👩", response: "" },
          { portuguese: "Papá/Pai", english: "Dad", emoji: "👨", response: "" },
          { portuguese: "Menino", english: "Boy", emoji: "👦", response: "" },
          { portuguese: "Menina", english: "Girl", emoji: "👧", response: "" },
        ],
        score: null,
        maxScore: 4,
      },
      {
        id: "B",
        title: "Compreensão de Instruções / Understanding Commands 📢",
        instruction: "Give simple commands and observe if child understands",
        items: [
          {
            portuguese: "Olá!",
            english: "Hello! (wave)",
            emoji: "👋",
            response: "",
          },
          {
            portuguese: "Bate palmas!",
            english: "Clap your hands!",
            emoji: "👏",
            response: "",
          },
          { portuguese: "Salta!", english: "Jump!", emoji: "🦘", response: "" },
          {
            portuguese: "Senta!",
            english: "Sit down!",
            emoji: "🪑",
            response: "",
          },
          {
            portuguese: "Dá-me a mão",
            english: "Give me your hand",
            emoji: "🤝",
            response: "",
          },
        ],
        score: null,
        maxScore: 5,
      },
      {
        id: "C1",
        title: "Saudações / Greetings 👋",
        instruction: "Encourage child to respond or repeat",
        items: [
          {
            portuguese: "Olá! Como te chamas?",
            english: "Hello! What is your name?",
            emoji: "🙋",
            response: "",
          },
          {
            portuguese: "Quantos anos tens?",
            english: "How old are you?",
            emoji: "🎂",
            response: "",
          },
          {
            portuguese: "Adeus!",
            english: "Goodbye!",
            emoji: "👋",
            response: "",
          },
        ],
        score: null,
        maxScore: 3,
      },
      {
        id: "C2",
        title: "Repetição / Repetition 🗣️",
        instruction: "Ask child to repeat after you",
        items: [
          { portuguese: "Olá", english: "Hello", emoji: "👋", response: "" },
          { portuguese: "Sim", english: "Yes", emoji: "✅", response: "" },
          { portuguese: "Não", english: "No", emoji: "❌", response: "" },
          {
            portuguese: "Obrigado/a",
            english: "Thank you",
            emoji: "🙏",
            response: "",
          },
          {
            portuguese: "Por favor",
            english: "Please",
            emoji: "🙂",
            response: "",
          },
        ],
        score: null,
        maxScore: 5,
      },
    ],
    parentNotes: "",
    totalScore: null,
    maxTotalScore: 31,
  });
  console.log("Added diagnostic for George");

  // Add games
  const gamesRef = collection(db, "students", georgeId, "games");
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

  console.log("\n✅ George setup complete!");
  console.log("Username: george");
  console.log("Password: georgept2026");
  process.exit(0);
}

setup().catch((e) => {
  console.error(e);
  process.exit(1);
});
