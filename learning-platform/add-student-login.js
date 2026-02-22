const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
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

// Student login credentials to add to Firestore
const STUDENT_LOGINS = [
  { name: "George", username: "george", password: "georgept2026" },
  // Add more students here as needed:
  // { name: 'Leo', username: 'leo', password: 'leo123' },
];

async function addLogins() {
  const studentsRef = collection(db, "students");

  for (const student of STUDENT_LOGINS) {
    const q = query(studentsRef, where("name", "==", student.name));
    const snap = await getDocs(q);

    if (snap.empty) {
      console.log(`❌ Student "${student.name}" not found in Firestore`);
      continue;
    }

    const studentDoc = snap.docs[0];
    await updateDoc(doc(db, "students", studentDoc.id), {
      username: student.username,
      password: student.password,
    });

    console.log(
      `✅ Added login for ${student.name} (ID: ${studentDoc.id}) — username: ${student.username}`,
    );
  }

  console.log("\nDone! Students can now log in at play.html");
  process.exit(0);
}

addLogins().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
