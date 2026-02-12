const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, where } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyAki3QaFgKY0cTWAt2R06c86WimoXRVWKs',
  authDomain: 'lessonsplatform-e228c.firebaseapp.com',
  projectId: 'lessonsplatform-e228c',
  storageBucket: 'lessonsplatform-e228c.firebasestorage.app',
  messagingSenderId: '804556322280',
  appId: '1:804556322280:web:85ffeb6fd6a49e321c605d'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addHomework() {
  // Find George
  const studentsRef = collection(db, 'students');
  const q = query(studentsRef, where('name', '==', 'George'));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log('George not found!');
    process.exit(1);
  }

  const georgeId = snapshot.docs[0].id;
  console.log('Found George with ID:', georgeId);

  const hwRef = collection(db, 'students', georgeId, 'homework');

  // Calculate due dates (this week)
  const today = new Date();
  const getDate = (daysFromNow) => {
    const d = new Date(today);
    d.setDate(d.getDate() + daysFromNow);
    return d.toISOString().split('T')[0];
  };

  // Homework based on George's diagnostic:
  // Strong: Colors (90%), Numbers (100%), Family (75%), Animals (60%)
  // Weak: Commands (10%), Objects (0%), Actions (0%), Personal Questions (0%)
  // Focus: Commands, Objects, Personal Questions + review Colors/Numbers

  const assignments = [
    {
      title: '🎯 Simon Says — 6 Commands',
      description: 'Practice with parent: Olha! (Look!), Ouve! (Listen!), Bate palmas! (Clap hands!), Salta! (Jump!), Senta-te! (Sit down!), Levanta-te! (Stand up!). Play Simon Says (O Simão diz) — parent says command, George does action. 5 minutes daily.',
      dueDate: getDate(3),
      progress: 0,
      createdAt: new Date()
    },
    {
      title: '🏠 4 Everyday Objects — Point & Say',
      description: 'Learn 4 objects: livro (book) 📖, lápis (pencil) ✏️, bola (ball) ⚽, cadeira (chair) 🪑. Have parent point to each object at home and ask "O que é isto?" — George answers in Portuguese. Practice 5 min/day.',
      dueDate: getDate(3),
      progress: 0,
      createdAt: new Date()
    },
    {
      title: '💬 2 Personal Questions',
      description: 'Practice answering: "Como te chamas?" → "Chamo-me George." and "Quantos anos tens?" → "Tenho cinco anos." Say each answer 3 times, every day. Parent asks randomly during the day!',
      dueDate: getDate(5),
      progress: 0,
      createdAt: new Date()
    },
    {
      title: '🎨 Color Review — Treasure Hunt',
      description: 'Color scavenger hunt at home! Find 1 object of each color and say it in Portuguese: vermelho (red), azul (blue), amarelo (yellow), verde (green), preto (black), branco (white). Bonus: say "É vermelho!" (It\'s red!)',
      dueDate: getDate(4),
      progress: 0,
      createdAt: new Date()
    },
    {
      title: '🔢 Numbers 1-10 Song',
      description: 'Sing/count 1-10 in Portuguese every day: um, dois, três, quatro, cinco, seis, sete, oito, nove, dez. Try counting backwards too! Use fingers while counting. 2 minutes daily.',
      dueDate: getDate(4),
      progress: 0,
      createdAt: new Date()
    },
    {
      title: '🚀 Build Your Rocket Game',
      description: 'Play the Build Your Rocket vocabulary game on the platform. Try to complete at least levels 1-3! Ask parent for help if needed.',
      dueDate: getDate(7),
      progress: 0,
      createdAt: new Date()
    }
  ];

  console.log('Adding', assignments.length, 'homework assignments...');

  for (const hw of assignments) {
    await addDoc(hwRef, hw);
    console.log('  ✅', hw.title);
  }

  // Also add some vocab words to George's vocab bank
  const vocabRef = collection(db, 'students', georgeId, 'vocab');
  
  const vocabWords = [
    // Commands (weakest area - 10%)
    { emoji: '👀', portuguese: 'Olha!', english: 'Look!', category: 'Commands', mastery: 10, createdAt: new Date() },
    { emoji: '👂', portuguese: 'Ouve!', english: 'Listen!', category: 'Commands', mastery: 10, createdAt: new Date() },
    { emoji: '👏', portuguese: 'Bate palmas!', english: 'Clap hands!', category: 'Commands', mastery: 0, createdAt: new Date() },
    { emoji: '🦘', portuguese: 'Salta!', english: 'Jump!', category: 'Commands', mastery: 0, createdAt: new Date() },
    { emoji: '🪑', portuguese: 'Senta-te!', english: 'Sit down!', category: 'Commands', mastery: 0, createdAt: new Date() },
    { emoji: '🧍', portuguese: 'Levanta-te!', english: 'Stand up!', category: 'Commands', mastery: 0, createdAt: new Date() },
    // Objects (0%)
    { emoji: '📖', portuguese: 'Livro', english: 'Book', category: 'Objects', mastery: 0, createdAt: new Date() },
    { emoji: '✏️', portuguese: 'Lápis', english: 'Pencil', category: 'Objects', mastery: 0, createdAt: new Date() },
    { emoji: '⚽', portuguese: 'Bola', english: 'Ball', category: 'Objects', mastery: 0, createdAt: new Date() },
    { emoji: '🪑', portuguese: 'Cadeira', english: 'Chair', category: 'Objects', mastery: 0, createdAt: new Date() },
    // Personal Questions (0%)
    { emoji: '👋', portuguese: 'Como te chamas?', english: 'What is your name?', category: 'Personal', mastery: 0, createdAt: new Date() },
    { emoji: '🎂', portuguese: 'Quantos anos tens?', english: 'How old are you?', category: 'Personal', mastery: 0, createdAt: new Date() },
    // Greetings review (45%)
    { emoji: '👋', portuguese: 'Olá', english: 'Hello', category: 'Greetings', mastery: 50, createdAt: new Date() },
    { emoji: '👋', portuguese: 'Adeus', english: 'Goodbye', category: 'Greetings', mastery: 40, createdAt: new Date() },
    { emoji: '☀️', portuguese: 'Bom dia', english: 'Good morning', category: 'Greetings', mastery: 45, createdAt: new Date() },
  ];

  console.log('\nAdding', vocabWords.length, 'vocabulary words...');

  for (const word of vocabWords) {
    await addDoc(vocabRef, word);
    console.log('  ✅', word.emoji, word.portuguese, '→', word.english);
  }

  // Add class book resources for George
  const cbRef = collection(db, 'students', georgeId, 'classbook');

  const resources = [
    {
      title: 'Zig Zag — Manual de Português A0',
      type: 'textbook',
      url: 'https://www.lidel.pt/pt/catalogo/zig-zag/',
      description: 'Portuguese textbook for young beginners (A0-A1). Colorful with games and activities.',
      notes: 'Recommended for 5-7 year olds. Focus on Unidade 1-3 for now.',
      createdAt: new Date()
    },
    {
      title: 'DGE — Estudo em Casa (RTP)',
      type: 'video',
      url: 'https://estudoemcasa.dge.mec.pt/',
      description: 'Free Portuguese government educational videos. Search for "1º ano Português".',
      notes: 'Great for listening practice. Watch 1 short video per week.',
      createdAt: new Date()
    },
    {
      title: 'Ciberescola da Língua Portuguesa',
      type: 'website',
      url: 'https://www.ciberescola.com/',
      description: 'Interactive Portuguese language exercises online.',
      notes: 'Use beginner section. Good for reading practice when ready.',
      createdAt: new Date()
    },
    {
      title: 'Porto Editora — Escola Virtual',
      type: 'website',
      url: 'https://www.escolavirtual.pt/',
      description: 'Portuguese school platform with free and paid content. 1º Ciclo section.',
      notes: 'Some free resources available. Good supplement material.',
      createdAt: new Date()
    },
    {
      title: 'Build Your Rocket Game 🚀',
      type: 'app',
      url: 'https://tomasbb0.github.io/TheBurnayLab/games/build-your-rocket/',
      description: 'Vocabulary game — answer Portuguese questions to build a rocket!',
      notes: 'Assigned as homework. Levels 1-3 cover basics.',
      createdAt: new Date()
    },
    {
      title: 'Build Your Dinosaur Game 🦕',
      type: 'app',
      url: 'https://tomasbb0.github.io/TheBurnayLab/games/build-your-dinosaur/',
      description: 'Vocabulary game — answer Portuguese questions to build a dinosaur!',
      notes: 'Fun reward game after completing rocket.',
      createdAt: new Date()
    }
  ];

  console.log('\nAdding', resources.length, 'class book resources...');

  for (const res of resources) {
    await addDoc(cbRef, res);
    console.log('  ✅', res.title);
  }

  console.log('\n🎉 All done! George now has:');
  console.log('  📋', assignments.length, 'homework assignments');
  console.log('  📚', vocabWords.length, 'vocabulary words');
  console.log('  📖', resources.length, 'class book resources');
  
  process.exit(0);
}

addHomework().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
