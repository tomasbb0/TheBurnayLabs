/**
 * Game Firebase Integration — The Burnay Labs
 * Add to any game: <script src="../game-firebase.js"></script>
 *
 * URL params:
 *   ?student={id}     — Firestore student doc ID
 *   &game={id}        — Firestore game doc ID under that student
 *   &source=teacher   — If set, play count is NOT incremented
 *
 * Usage in game code:
 *   window.GameFirebase.loadProgress(function(data) { ... });
 *   window.GameFirebase.saveProgress({ score: 100, ... });
 *   window.GameFirebase.isStudentMode();  // true if play should count
 *
 * Listen for readiness:
 *   window.addEventListener('gameFirebaseReady', function() { ... });
 */
(function () {
  var params = new URLSearchParams(window.location.search);
  var studentId = params.get("student");
  var gameId = params.get("game");
  var source = params.get("source");

  // No-op fallback when not in student context
  if (!studentId || !gameId) {
    window.GameFirebase = {
      ready: false,
      isStudentMode: function () {
        return false;
      },
      loadProgress: function (cb) {
        if (cb) cb(null);
      },
      saveProgress: function () {},
      getStudentId: function () {
        return null;
      },
      getGameId: function () {
        return null;
      },
    };
    return;
  }

  function loadScript(url, cb) {
    var s = document.createElement("script");
    s.src = url;
    s.onload = cb;
    s.onerror = function () {
      console.error("GameFirebase: Failed to load", url);
    };
    document.head.appendChild(s);
  }

  var firebaseConfig = {
    apiKey: "AIzaSyAki3QaFgKY0cTWAt2R06c86WimoXRVWKs",
    authDomain: "lessonsplatform-e228c.firebaseapp.com",
    projectId: "lessonsplatform-e228c",
    storageBucket: "lessonsplatform-e228c.firebasestorage.app",
    messagingSenderId: "804556322280",
    appId: "1:804556322280:web:85ffeb6fd6a49e321c605d",
  };

  loadScript(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
    function () {
      loadScript(
        "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js",
        function () {
          // Don't re-initialize if already done
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          }
          var db = firebase.firestore();
          var ref = db
            .collection("students")
            .doc(studentId)
            .collection("games")
            .doc(gameId);

          // Increment playCount only for non-teacher (student) mode
          if (source !== "teacher") {
            ref
              .get()
              .then(function (doc) {
                var data = doc.exists ? doc.data() : {};
                var playCount = (data.playCount || 0) + 1;
                return ref.set(
                  {
                    playCount: playCount,
                    lastPlayed: new Date().toISOString(),
                  },
                  { merge: true },
                );
              })
              .catch(function (e) {
                console.error("GameFirebase: Play count error", e);
              });
          }

          window.GameFirebase = {
            ready: true,
            db: db,
            ref: ref,
            isStudentMode: function () {
              return source !== "teacher";
            },
            loadProgress: function (cb) {
              ref
                .get()
                .then(function (doc) {
                  var data = doc.exists ? doc.data() : {};
                  if (cb) cb(data.progress || null);
                })
                .catch(function (e) {
                  console.error("GameFirebase: Load error", e);
                  if (cb) cb(null);
                });
            },
            saveProgress: function (data) {
              ref
                .set(
                  {
                    progress: data,
                    lastUpdated: new Date().toISOString(),
                  },
                  { merge: true },
                )
                .catch(function (e) {
                  console.error("GameFirebase: Save error", e);
                });
            },
            getStudentId: function () {
              return studentId;
            },
            getGameId: function () {
              return gameId;
            },
          };

          // Signal readiness to game code
          window.dispatchEvent(new CustomEvent("gameFirebaseReady"));
          console.log(
            "GameFirebase: Ready (student=" +
              studentId +
              ", game=" +
              gameId +
              ", mode=" +
              (source === "teacher" ? "teacher-preview" : "student-play") +
              ")",
          );
        },
      );
    },
  );
})();
