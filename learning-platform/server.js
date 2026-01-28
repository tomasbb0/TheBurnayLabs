const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for all routes (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🎓 Learning with Tomas - Platform Running!                ║
║                                                              ║
║   Open in your browser:  http://localhost:${PORT}              ║
║                                                              ║
║   ⚠️  IMPORTANT: Configure Firebase first!                   ║
║   Edit: public/firebase-config.js                            ║
║   with your Firebase project credentials                     ║
║                                                              ║
║   Default login (after Firebase is configured):              ║
║   Username: tomas                                            ║
║   Password: admin123                                         ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `);
});
