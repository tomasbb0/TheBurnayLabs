const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
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

async function fix() {
  console.log("Fetching students...");
  const studentsSnap = await getDocs(collection(db, "students"));
  for (const s of studentsSnap.docs) {
    const sid = s.id;
    console.log("Checking student:", s.data().name || sid);

    // Fix game URLs
    const gamesRef = collection(db, "students", sid, "games");
    const gamesSnap = await getDocs(gamesRef);
    for (const gdoc of gamesSnap.docs) {
      const data = gdoc.data();
      if (data.url) {
        let newUrl = data.url;
        // Fix repo name: TheBurnayLab → TheBurnayLabs
        if (
          newUrl.includes("/TheBurnayLab/") &&
          !newUrl.includes("/TheBurnayLabs/")
        ) {
          newUrl = newUrl.replace("/TheBurnayLab/", "/TheBurnayLabs/");
        }
        // Fix path: /docs/games/ → /games/
        if (newUrl.includes("/docs/games/")) {
          newUrl = newUrl.replace("/docs/games/", "/games/");
        }
        if (newUrl !== data.url) {
          console.log("  Game:", data.title || gdoc.id, "->", newUrl);
          await updateDoc(doc(db, "students", sid, "games", gdoc.id), {
            url: newUrl,
          });
        }
      }
    }

    // Fix homework URLs
    const hwRef = collection(db, "students", sid, "homework");
    const hwSnap = await getDocs(hwRef);
    for (const hdoc of hwSnap.docs) {
      const data = hdoc.data();
      if (data.url) {
        let newUrl = data.url;
        if (
          newUrl.includes("/TheBurnayLab/") &&
          !newUrl.includes("/TheBurnayLabs/")
        ) {
          newUrl = newUrl.replace("/TheBurnayLab/", "/TheBurnayLabs/");
        }
        if (newUrl !== data.url) {
          console.log("  Homework:", data.title || hdoc.id, "->", newUrl);
          await updateDoc(doc(db, "students", sid, "homework", hdoc.id), {
            url: newUrl,
          });
        }
      }
    }

    // Fix links URLs
    const linksRef = collection(db, "students", sid, "links");
    const linksSnap = await getDocs(linksRef);
    for (const ldoc of linksSnap.docs) {
      const data = ldoc.data();
      if (data.url) {
        let newUrl = data.url;
        if (
          newUrl.includes("/TheBurnayLab/") &&
          !newUrl.includes("/TheBurnayLabs/")
        ) {
          newUrl = newUrl.replace("/TheBurnayLab/", "/TheBurnayLabs/");
        }
        if (newUrl !== data.url) {
          console.log("  Link:", data.title || ldoc.id, "->", newUrl);
          await updateDoc(doc(db, "students", sid, "links", ldoc.id), {
            url: newUrl,
          });
        }
      }
    }

    // Fix classBook URLs
    const cbRef = collection(db, "students", sid, "classBook");
    const cbSnap = await getDocs(cbRef);
    for (const cdoc of cbSnap.docs) {
      const data = cdoc.data();
      if (data.url) {
        let newUrl = data.url;
        if (
          newUrl.includes("/TheBurnayLab/") &&
          !newUrl.includes("/TheBurnayLabs/")
        ) {
          newUrl = newUrl.replace("/TheBurnayLab/", "/TheBurnayLabs/");
        }
        if (newUrl !== data.url) {
          console.log("  ClassBook:", data.title || cdoc.id, "->", newUrl);
          await updateDoc(doc(db, "students", sid, "classBook", cdoc.id), {
            url: newUrl,
          });
        }
      }
    }
  }
  console.log("Done! All URLs updated from TheBurnayLab → TheBurnayLabs");
  process.exit(0);
}

fix().catch((e) => {
  console.error(e);
  process.exit(1);
});
