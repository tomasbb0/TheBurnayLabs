const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc } = require('firebase/firestore');

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

async function fix() {
  console.log('Fetching students...');
  const studentsSnap = await getDocs(collection(db, 'students'));
  for (const s of studentsSnap.docs) {
    const sid = s.id;
    console.log('Checking student:', s.data().name || sid);
    const gamesRef = collection(db, 'students', sid, 'games');
    const gamesSnap = await getDocs(gamesRef);
    for (const gdoc of gamesSnap.docs) {
      const data = gdoc.data();
      if (data.url && data.url.includes('/docs/games/')) {
        const newUrl = data.url.replace('/docs/games/', '/games/');
        console.log(' - Updating', data.title || gdoc.id, '->', newUrl);
        await updateDoc(doc(db, 'students', sid, 'games', gdoc.id), { url: newUrl });
      }
    }
  }
  console.log('Done.');
  process.exit(0);
}

fix().catch(e => { console.error(e); process.exit(1); });