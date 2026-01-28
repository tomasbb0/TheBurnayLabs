const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } = require('firebase/firestore');

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

async function setup() {
  // Find George
  const studentsRef = collection(db, 'students');
  const q = query(studentsRef, where('name', '==', 'George'));
  const snapshot = await getDocs(q);
  
  let georgeId;
  if (snapshot.empty) {
    const docRef = await addDoc(studentsRef, {
      name: 'George',
      level: 'A0',
      createdAt: new Date()
    });
    georgeId = docRef.id;
    console.log('Created George with ID:', georgeId);
  } else {
    georgeId = snapshot.docs[0].id;
    console.log('Found George with ID:', georgeId);
  }
  
  // Delete old diagnostics
  const oldDiags = await getDocs(collection(db, 'students', georgeId, 'diagnostics'));
  for (const d of oldDiags.docs) {
    await deleteDoc(doc(db, 'students', georgeId, 'diagnostics', d.id));
  }
  console.log('Cleared old diagnostics');
  
  // Add comprehensive diagnostic
  const diagRef = collection(db, 'students', georgeId, 'diagnostics');
  await addDoc(diagRef, {
    title: '🌟 Complete Portuguese Language Assessment',
    description: 'Comprehensive diagnostic covering vocabulary, comprehension, oral production, and cultural awareness',
    status: 'pending',
    createdAt: new Date(),
    version: '2.0',
    estimatedTime: '25-35 minutes',
    sections: [
      // SECTION 1: COLORS (Extended)
      {
        id: 'colors',
        title: '🎨 Cores / Colors',
        category: 'Vocabulary',
        instruction: 'Show colored objects or cards. Point and ask: "Que cor é esta?" (What color is this?)',
        tip: 'Use real objects around the room when possible - toys, clothes, furniture',
        items: [
          { portuguese: 'Vermelho', english: 'Red', emoji: '🔴', response: '', notes: '' },
          { portuguese: 'Azul', english: 'Blue', emoji: '🔵', response: '', notes: '' },
          { portuguese: 'Amarelo', english: 'Yellow', emoji: '🟡', response: '', notes: '' },
          { portuguese: 'Verde', english: 'Green', emoji: '🟢', response: '', notes: '' },
          { portuguese: 'Laranja', english: 'Orange', emoji: '🟠', response: '', notes: '' },
          { portuguese: 'Roxo/Lilás', english: 'Purple', emoji: '🟣', response: '', notes: '' },
          { portuguese: 'Rosa', english: 'Pink', emoji: '💗', response: '', notes: '' },
          { portuguese: 'Castanho/Marrom', english: 'Brown', emoji: '🟤', response: '', notes: '' },
          { portuguese: 'Preto', english: 'Black', emoji: '⚫', response: '', notes: '' },
          { portuguese: 'Branco', english: 'White', emoji: '⚪', response: '', notes: '' }
        ],
        score: null,
        maxScore: 10
      },
      
      // SECTION 2: NUMBERS
      {
        id: 'numbers',
        title: '🔢 Números / Numbers',
        category: 'Vocabulary',
        instruction: 'Use fingers, blocks, or objects to count. Ask: "Quantos são?" (How many are there?)',
        tip: 'Make it fun! Count toys, snacks, or fingers together',
        items: [
          { portuguese: 'Um', english: 'One (1)', emoji: '1️⃣', response: '', notes: '' },
          { portuguese: 'Dois', english: 'Two (2)', emoji: '2️⃣', response: '', notes: '' },
          { portuguese: 'Três', english: 'Three (3)', emoji: '3️⃣', response: '', notes: '' },
          { portuguese: 'Quatro', english: 'Four (4)', emoji: '4️⃣', response: '', notes: '' },
          { portuguese: 'Cinco', english: 'Five (5)', emoji: '5️⃣', response: '', notes: '' },
          { portuguese: 'Seis', english: 'Six (6)', emoji: '6️⃣', response: '', notes: '' },
          { portuguese: 'Sete', english: 'Seven (7)', emoji: '7️⃣', response: '', notes: '' },
          { portuguese: 'Oito', english: 'Eight (8)', emoji: '8️⃣', response: '', notes: '' },
          { portuguese: 'Nove', english: 'Nine (9)', emoji: '9️⃣', response: '', notes: '' },
          { portuguese: 'Dez', english: 'Ten (10)', emoji: '🔟', response: '', notes: '' }
        ],
        score: null,
        maxScore: 10
      },
      
      // SECTION 3: BODY PARTS
      {
        id: 'body',
        title: '🧍 Partes do Corpo / Body Parts',
        category: 'Vocabulary',
        instruction: 'Point to body parts on yourself or a doll. Ask: "O que é isto?" (What is this?) or "Onde está o/a...?" (Where is the...?)',
        tip: 'Make it interactive - touch your head, show your hands, wiggle your feet!',
        items: [
          { portuguese: 'Cabeça', english: 'Head', emoji: '🗣️', response: '', notes: '' },
          { portuguese: 'Cabelo', english: 'Hair', emoji: '💇', response: '', notes: '' },
          { portuguese: 'Olhos', english: 'Eyes', emoji: '👀', response: '', notes: '' },
          { portuguese: 'Nariz', english: 'Nose', emoji: '👃', response: '', notes: '' },
          { portuguese: 'Boca', english: 'Mouth', emoji: '👄', response: '', notes: '' },
          { portuguese: 'Orelhas', english: 'Ears', emoji: '👂', response: '', notes: '' },
          { portuguese: 'Mãos', english: 'Hands', emoji: '🙌', response: '', notes: '' },
          { portuguese: 'Dedos', english: 'Fingers', emoji: '🖐️', response: '', notes: '' },
          { portuguese: 'Pés', english: 'Feet', emoji: '🦶', response: '', notes: '' },
          { portuguese: 'Barriga', english: 'Belly/Tummy', emoji: '🫃', response: '', notes: '' }
        ],
        score: null,
        maxScore: 10
      },
      
      // SECTION 4: FAMILY
      {
        id: 'family',
        title: '👨‍👩‍👧‍👦 Família / Family',
        category: 'Vocabulary',
        instruction: 'Use family photos or drawings. Ask: "Quem é?" (Who is this?)',
        tip: 'If possible, use photos of the child\'s actual family members',
        items: [
          { portuguese: 'Mãe/Mamã', english: 'Mother/Mom', emoji: '👩', response: '', notes: '' },
          { portuguese: 'Pai/Papá', english: 'Father/Dad', emoji: '👨', response: '', notes: '' },
          { portuguese: 'Irmão', english: 'Brother', emoji: '👦', response: '', notes: '' },
          { portuguese: 'Irmã', english: 'Sister', emoji: '👧', response: '', notes: '' },
          { portuguese: 'Avó', english: 'Grandmother', emoji: '👵', response: '', notes: '' },
          { portuguese: 'Avô', english: 'Grandfather', emoji: '👴', response: '', notes: '' },
          { portuguese: 'Bebé', english: 'Baby', emoji: '👶', response: '', notes: '' },
          { portuguese: 'Família', english: 'Family', emoji: '👨‍👩‍👧‍👦', response: '', notes: '' }
        ],
        score: null,
        maxScore: 8
      },
      
      // SECTION 5: ANIMALS
      {
        id: 'animals',
        title: '🐾 Animais / Animals',
        category: 'Vocabulary',
        instruction: 'Show pictures of animals or use toy animals. Ask: "Que animal é este?" (What animal is this?)',
        tip: 'Make animal sounds together to make it more engaging!',
        items: [
          { portuguese: 'Cão/Cachorro', english: 'Dog', emoji: '🐕', response: '', notes: '' },
          { portuguese: 'Gato', english: 'Cat', emoji: '🐈', response: '', notes: '' },
          { portuguese: 'Pássaro', english: 'Bird', emoji: '🐦', response: '', notes: '' },
          { portuguese: 'Peixe', english: 'Fish', emoji: '🐟', response: '', notes: '' },
          { portuguese: 'Cavalo', english: 'Horse', emoji: '🐴', response: '', notes: '' },
          { portuguese: 'Vaca', english: 'Cow', emoji: '🐄', response: '', notes: '' },
          { portuguese: 'Porco', english: 'Pig', emoji: '🐷', response: '', notes: '' },
          { portuguese: 'Galinha', english: 'Chicken', emoji: '🐔', response: '', notes: '' },
          { portuguese: 'Coelho', english: 'Rabbit', emoji: '🐰', response: '', notes: '' },
          { portuguese: 'Leão', english: 'Lion', emoji: '🦁', response: '', notes: '' }
        ],
        score: null,
        maxScore: 10
      },
      
      // SECTION 6: FOOD
      {
        id: 'food',
        title: '🍎 Comida / Food',
        category: 'Vocabulary',
        instruction: 'Use pictures of food or real items from the kitchen. Ask: "O que é isto?" (What is this?)',
        tip: 'Consider doing this section near snack time to make it relevant!',
        items: [
          { portuguese: 'Maçã', english: 'Apple', emoji: '🍎', response: '', notes: '' },
          { portuguese: 'Banana', english: 'Banana', emoji: '🍌', response: '', notes: '' },
          { portuguese: 'Pão', english: 'Bread', emoji: '🍞', response: '', notes: '' },
          { portuguese: 'Leite', english: 'Milk', emoji: '🥛', response: '', notes: '' },
          { portuguese: 'Água', english: 'Water', emoji: '💧', response: '', notes: '' },
          { portuguese: 'Queijo', english: 'Cheese', emoji: '🧀', response: '', notes: '' },
          { portuguese: 'Ovo', english: 'Egg', emoji: '🥚', response: '', notes: '' },
          { portuguese: 'Arroz', english: 'Rice', emoji: '🍚', response: '', notes: '' },
          { portuguese: 'Frango', english: 'Chicken (food)', emoji: '🍗', response: '', notes: '' },
          { portuguese: 'Gelado/Sorvete', english: 'Ice cream', emoji: '🍦', response: '', notes: '' }
        ],
        score: null,
        maxScore: 10
      },
      
      // SECTION 7: BASIC COMMANDS
      {
        id: 'commands',
        title: '📢 Comandos Básicos / Basic Commands',
        category: 'Comprehension',
        instruction: 'Give these commands and observe if the child understands and responds correctly.',
        tip: 'Make it like a game - "Simon Says" style! Be enthusiastic and encouraging.',
        items: [
          { portuguese: 'Olá! (wave)', english: 'Hello! (wave back)', emoji: '👋', response: '', notes: '' },
          { portuguese: 'Bate palmas!', english: 'Clap your hands!', emoji: '👏', response: '', notes: '' },
          { portuguese: 'Salta!', english: 'Jump!', emoji: '🦘', response: '', notes: '' },
          { portuguese: 'Senta-te!', english: 'Sit down!', emoji: '🪑', response: '', notes: '' },
          { portuguese: 'Levanta-te!', english: 'Stand up!', emoji: '🧍', response: '', notes: '' },
          { portuguese: 'Anda cá!', english: 'Come here!', emoji: '🚶', response: '', notes: '' },
          { portuguese: 'Para!', english: 'Stop!', emoji: '✋', response: '', notes: '' },
          { portuguese: 'Olha!', english: 'Look!', emoji: '👁️', response: '', notes: '' },
          { portuguese: 'Ouve!', english: 'Listen!', emoji: '👂', response: '', notes: '' },
          { portuguese: 'Dá-me a mão', english: 'Give me your hand', emoji: '🤝', response: '', notes: '' }
        ],
        score: null,
        maxScore: 10
      },
      
      // SECTION 8: GREETINGS & POLITE EXPRESSIONS
      {
        id: 'greetings',
        title: '🙋 Saudações e Expressões / Greetings & Expressions',
        category: 'Oral Production',
        instruction: 'Encourage the child to respond or repeat. Ask questions and see if they can answer.',
        tip: 'Model the responses first, then let the child try. Praise all attempts!',
        items: [
          { portuguese: 'Olá!', english: 'Hello!', emoji: '👋', response: '', notes: '' },
          { portuguese: 'Bom dia!', english: 'Good morning!', emoji: '🌅', response: '', notes: '' },
          { portuguese: 'Boa tarde!', english: 'Good afternoon!', emoji: '☀️', response: '', notes: '' },
          { portuguese: 'Boa noite!', english: 'Good night!', emoji: '🌙', response: '', notes: '' },
          { portuguese: 'Adeus!/Tchau!', english: 'Goodbye!/Bye!', emoji: '👋', response: '', notes: '' },
          { portuguese: 'Obrigado/a!', english: 'Thank you!', emoji: '🙏', response: '', notes: '' },
          { portuguese: 'Por favor', english: 'Please', emoji: '😊', response: '', notes: '' },
          { portuguese: 'Desculpa', english: 'Sorry', emoji: '😔', response: '', notes: '' },
          { portuguese: 'Sim', english: 'Yes', emoji: '✅', response: '', notes: '' },
          { portuguese: 'Não', english: 'No', emoji: '❌', response: '', notes: '' }
        ],
        score: null,
        maxScore: 10
      },
      
      // SECTION 9: PERSONAL QUESTIONS
      {
        id: 'personal',
        title: '❓ Perguntas Pessoais / Personal Questions',
        category: 'Oral Production',
        instruction: 'Ask these questions directly. Record what the child says or does.',
        tip: 'Be patient - these require more language production. Accept any attempt at communication.',
        items: [
          { portuguese: 'Como te chamas?', english: 'What is your name?', emoji: '🏷️', response: '', notes: '' },
          { portuguese: 'Quantos anos tens?', english: 'How old are you?', emoji: '🎂', response: '', notes: '' },
          { portuguese: 'Onde moras?', english: 'Where do you live?', emoji: '🏠', response: '', notes: '' },
          { portuguese: 'Gostas de...?', english: 'Do you like...?', emoji: '❤️', response: '', notes: '' },
          { portuguese: 'O que é isto? (point)', english: 'What is this?', emoji: '👆', response: '', notes: '' },
          { portuguese: 'De que cor é?', english: 'What color is it?', emoji: '🎨', response: '', notes: '' }
        ],
        score: null,
        maxScore: 6
      },
      
      // SECTION 10: EVERYDAY OBJECTS
      {
        id: 'objects',
        title: '🎒 Objetos do Dia-a-Dia / Everyday Objects',
        category: 'Vocabulary',
        instruction: 'Point to real objects around the room. Ask: "O que é isto?"',
        tip: 'Use objects the child uses every day - their toys, clothes, school items',
        items: [
          { portuguese: 'Mesa', english: 'Table', emoji: '🪑', response: '', notes: '' },
          { portuguese: 'Cadeira', english: 'Chair', emoji: '💺', response: '', notes: '' },
          { portuguese: 'Porta', english: 'Door', emoji: '🚪', response: '', notes: '' },
          { portuguese: 'Janela', english: 'Window', emoji: '🪟', response: '', notes: '' },
          { portuguese: 'Livro', english: 'Book', emoji: '📚', response: '', notes: '' },
          { portuguese: 'Lápis', english: 'Pencil', emoji: '✏️', response: '', notes: '' },
          { portuguese: 'Bola', english: 'Ball', emoji: '⚽', response: '', notes: '' },
          { portuguese: 'Carro (toy)', english: 'Car', emoji: '🚗', response: '', notes: '' },
          { portuguese: 'Boneca/Boneco', english: 'Doll/Action figure', emoji: '🧸', response: '', notes: '' },
          { portuguese: 'Telefone', english: 'Phone', emoji: '📱', response: '', notes: '' }
        ],
        score: null,
        maxScore: 10
      },
      
      // SECTION 11: ACTIONS/VERBS
      {
        id: 'actions',
        title: '🏃 Ações / Actions',
        category: 'Vocabulary',
        instruction: 'Demonstrate actions or show pictures. Ask: "O que estou a fazer?" (What am I doing?)',
        tip: 'Act out the actions dramatically to make it fun and memorable!',
        items: [
          { portuguese: 'Correr', english: 'To run', emoji: '🏃', response: '', notes: '' },
          { portuguese: 'Andar', english: 'To walk', emoji: '🚶', response: '', notes: '' },
          { portuguese: 'Comer', english: 'To eat', emoji: '🍽️', response: '', notes: '' },
          { portuguese: 'Beber', english: 'To drink', emoji: '🥤', response: '', notes: '' },
          { portuguese: 'Dormir', english: 'To sleep', emoji: '😴', response: '', notes: '' },
          { portuguese: 'Brincar', english: 'To play', emoji: '🎮', response: '', notes: '' },
          { portuguese: 'Cantar', english: 'To sing', emoji: '🎤', response: '', notes: '' },
          { portuguese: 'Dançar', english: 'To dance', emoji: '💃', response: '', notes: '' },
          { portuguese: 'Desenhar', english: 'To draw', emoji: '🎨', response: '', notes: '' },
          { portuguese: 'Ler', english: 'To read', emoji: '📖', response: '', notes: '' }
        ],
        score: null,
        maxScore: 10
      },
      
      // SECTION 12: SHAPES
      {
        id: 'shapes',
        title: '🔷 Formas / Shapes',
        category: 'Vocabulary',
        instruction: 'Draw shapes or use shape toys. Ask: "Que forma é esta?"',
        tip: 'Look for shapes in the room - windows are rectangles, clocks are circles!',
        items: [
          { portuguese: 'Círculo', english: 'Circle', emoji: '⭕', response: '', notes: '' },
          { portuguese: 'Quadrado', english: 'Square', emoji: '⬛', response: '', notes: '' },
          { portuguese: 'Triângulo', english: 'Triangle', emoji: '🔺', response: '', notes: '' },
          { portuguese: 'Retângulo', english: 'Rectangle', emoji: '▬', response: '', notes: '' },
          { portuguese: 'Estrela', english: 'Star', emoji: '⭐', response: '', notes: '' },
          { portuguese: 'Coração', english: 'Heart', emoji: '❤️', response: '', notes: '' }
        ],
        score: null,
        maxScore: 6
      },
      
      // SECTION 13: WEATHER
      {
        id: 'weather',
        title: '🌤️ Tempo / Weather',
        category: 'Vocabulary',
        instruction: 'Show weather pictures or look outside. Ask: "Como está o tempo?"',
        tip: 'Connect to today\'s actual weather when possible!',
        items: [
          { portuguese: 'Sol', english: 'Sun/Sunny', emoji: '☀️', response: '', notes: '' },
          { portuguese: 'Chuva', english: 'Rain/Rainy', emoji: '🌧️', response: '', notes: '' },
          { portuguese: 'Nuvem', english: 'Cloud/Cloudy', emoji: '☁️', response: '', notes: '' },
          { portuguese: 'Vento', english: 'Wind/Windy', emoji: '💨', response: '', notes: '' },
          { portuguese: 'Neve', english: 'Snow/Snowy', emoji: '❄️', response: '', notes: '' },
          { portuguese: 'Quente', english: 'Hot', emoji: '🥵', response: '', notes: '' },
          { portuguese: 'Frio', english: 'Cold', emoji: '🥶', response: '', notes: '' }
        ],
        score: null,
        maxScore: 7
      },
      
      // SECTION 14: EMOTIONS
      {
        id: 'emotions',
        title: '😊 Emoções / Emotions',
        category: 'Vocabulary',
        instruction: 'Make facial expressions or show emoji. Ask: "Como te sentes?" or "Como está ele/ela?"',
        tip: 'Make exaggerated faces together - kids love this!',
        items: [
          { portuguese: 'Feliz/Contente', english: 'Happy', emoji: '😊', response: '', notes: '' },
          { portuguese: 'Triste', english: 'Sad', emoji: '😢', response: '', notes: '' },
          { portuguese: 'Zangado', english: 'Angry', emoji: '😠', response: '', notes: '' },
          { portuguese: 'Assustado', english: 'Scared', emoji: '😨', response: '', notes: '' },
          { portuguese: 'Cansado', english: 'Tired', emoji: '😴', response: '', notes: '' },
          { portuguese: 'Surpreso', english: 'Surprised', emoji: '😮', response: '', notes: '' },
          { portuguese: 'Com fome', english: 'Hungry', emoji: '🍽️', response: '', notes: '' },
          { portuguese: 'Com sede', english: 'Thirsty', emoji: '🥤', response: '', notes: '' }
        ],
        score: null,
        maxScore: 8
      },
      
      // SECTION 15: OBSERVATION NOTES
      {
        id: 'observations',
        title: '📝 Observações Gerais / General Observations',
        category: 'Assessment Notes',
        instruction: 'Please rate and note your observations about the child\'s overall engagement and abilities.',
        tip: 'Be honest - this helps us tailor the lessons to your child\'s needs!',
        items: [
          { portuguese: 'Nível de Confiança', english: 'Confidence Level', emoji: '💪', response: '', notes: '' },
          { portuguese: 'Engagement/Interest', english: 'Engagement Level', emoji: '🎯', response: '', notes: '' },
          { portuguese: 'Pronunciation Attempt', english: 'Tries to pronounce', emoji: '🗣️', response: '', notes: '' },
          { portuguese: 'Attention Span', english: 'Stays focused', emoji: '👁️', response: '', notes: '' },
          { portuguese: 'Prior Knowledge', english: 'Shows prior exposure', emoji: '📚', response: '', notes: '' }
        ],
        score: null,
        maxScore: 5
      }
    ],
    parentNotes: '',
    childStrengths: '',
    areasForImprovement: '',
    totalScore: null,
    maxTotalScore: 120
  });
  console.log('Added comprehensive diagnostic for George');
  
  console.log('\n✅ George diagnostic updated!');
  console.log('Total sections: 15');
  console.log('Total items: 120+');
  console.log('Estimated time: 25-35 minutes');
  process.exit(0);
}

setup().catch(e => { console.error(e); process.exit(1); });
