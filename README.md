# 🏆 Panini 2026 World Cup Sticker Tracker

A modern, responsive web application built with Next.js to help collectors track their Panini World Cup 2026 sticker album progress, manage duplicates, and easily share swap lists.

## ✨ Features

- **Interactive Album:** Easily tap stickers to mark them as collected, or tap again to mark them as duplicates.
- **Smart Search:** Quickly find teams or specific sticker sections by typing their name, prefix (e.g., "MEX", "BIH"), or group.
- **Statistics Dashboard:** Visualize your collection progress with a percentage completion bar, and keep track of your total collected, missing, and duplicate stickers.
- **Swaps Generator:** Automatically generates a beautifully formatted list of your duplicate and missing stickers, grouped by country emoji, ready to be copied or shared via WhatsApp and social media.
- **Persistent Storage:** Your progress is automatically saved in your browser's local storage—no account or login required.
- **Mobile-First Design:** Optimized for mobile devices with a convenient bottom navigation bar for a native app-like experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** React
- **Styling:** Tailwind CSS
- **State Management:** Zustand (with persist middleware for local storage)
- **Icons:** Lucide React

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📱 Screenshots & Usage

1. **Álbum (Home):** Browse through groups (Group A, Group B, etc.) or use the top search bar to filter. Tap a sticker once to collect it (green outline), tap again to mark it as a duplicate (blue outline with a counter), and tap again to reset it.
2. **Estadísticas:** Check your overall completion percentage and numeric stats.
3. **Intercambio:** Go here to copy a generated text report of your duplicates and missing stickers formatted with emojis to trade with friends.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
