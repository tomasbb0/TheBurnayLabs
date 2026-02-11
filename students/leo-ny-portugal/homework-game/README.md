# 🚗 Constrói o Teu Carro! - Portuguese Learning Game

A fun, interactive Portuguese learning game for young children (A0 level) where they learn vocabulary while building a virtual cardboard car!

## 🎮 Game Features

- **6 Themed Levels**: Colors, Numbers, Animals, Family, Body Parts, Greetings
- **18 Portuguese Words**: Learn essential vocabulary through picture-based questions
- **Cardboard Car Theme**: Unlock car parts as you complete each level
- **Visual Rewards**: Stars, animations, and a printable certificate
- **Bilingual Support**: Portuguese questions with English hints
- **Mobile Friendly**: Works on tablets, phones, and computers

## 📁 Files

```
homework-game/
├── index.html    # Main game page
├── styles.css    # Game styling
├── game.js       # Game logic
└── README.md     # This file
```

## 🚀 How to Host on GitHub Pages (FREE!)

### Option 1: Quick Setup

1. **Create a GitHub account** (if you don't have one): https://github.com/join

2. **Create a new repository**:
   - Go to https://github.com/new
   - Name it: `portuguese-car-game` (or any name)
   - Make it **Public**
   - Click "Create repository"

3. **Upload the files**:
   - Click "uploading an existing file"
   - Drag and drop: `index.html`, `styles.css`, `game.js`
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to repository **Settings** (tab at top)
   - Scroll down to **Pages** (left sidebar)
   - Under "Source", select **main** branch
   - Click **Save**

5. **Your game is live!** 🎉
   - URL will be: `https://YOUR-USERNAME.github.io/portuguese-car-game/`
   - It may take 1-2 minutes to become active

### Option 2: Using Git (Command Line)

```bash
# Create a new folder and copy game files there
cd ~/Desktop
mkdir portuguese-car-game
cp /path/to/homework-game/* portuguese-car-game/
cd portuguese-car-game

# Initialize git
git init
git add .
git commit -m "Initial commit - Portuguese learning game"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/portuguese-car-game.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
```

## 🔗 Sharing the Game

Once hosted, share the link with:

- **Rita (mom)**: She can help her son play at home
- **The student**: Bookmark it on their tablet/computer
- **Link format**: `https://your-username.github.io/portuguese-car-game/`

## 🎯 Learning Objectives

By completing the game, students will learn:

| Level | Theme     | Words Learned           |
| ----- | --------- | ----------------------- |
| 1     | Colors    | Vermelho, Azul, Amarelo |
| 2     | Numbers   | Um, Dois, Cinco         |
| 3     | Animals   | Cão, Gato, Peixe        |
| 4     | Family    | Mãe, Pai, Menino        |
| 5     | Body      | Mão, Nariz, Orelha      |
| 6     | Greetings | Olá, Adeus, Obrigado    |

## 🛠️ Customization

### Adding More Questions

Edit `game.js` and add questions to the `levels` array:

```javascript
{
    image: '🍎',
    questionPT: 'O que é isto?',
    questionEN: 'What is this?',
    answer: 'Maçã',
    answerEN: 'Apple',
    options: ['Banana', 'Maçã', 'Laranja', 'Uva']
}
```

### Changing Colors

Edit `styles.css` and modify the CSS variables at the top:

```css
:root {
  --primary-color: #ff6b35; /* Orange */
  --secondary-color: #4ecdc4; /* Teal */
  --accent-color: #ffe66d; /* Yellow */
  /* ... etc */
}
```

### Adding Sound Effects

The game references sound files from Mixkit (free). To use local sounds:

1. Download MP3 files
2. Put them in the same folder
3. Update the `<audio>` elements in `index.html`

## 📱 Works On

- ✅ Desktop computers (Chrome, Firefox, Safari, Edge)
- ✅ Tablets (iPad, Android tablets)
- ✅ Smartphones (iPhone, Android)
- ✅ No installation required - just open the link!

## 🎨 Credits

- **Game Design**: The Burnay Lab
- **For**: Young Portuguese learners (A0 level)
- **Sound Effects**: Mixkit (free sounds)
- **Emojis**: Standard Unicode emojis

## 📞 Support

If you have questions about hosting or customizing the game, feel free to ask!

---

**Boa sorte e diverte-te! / Good luck and have fun!** 🚗✨
