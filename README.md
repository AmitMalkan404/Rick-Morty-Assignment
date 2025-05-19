# 🧪 Rick & Morty – Tech Interview Assignment

This project is a technical assignment built using **React + TypeScript**, consuming the public [Rick and Morty API](https://rickandmortyapi.com/).

---

## 🚀 How to Run the Application

```bash
git clone https://github.com/AmitMalkan404/Rick-Morty-Assignment.git
cd Rick-Morty-Assignment
npm install
npm start
```

The app will be available at:  
📍 `http://localhost:3000`

---

## 🧩 Component Breakdown

| Component               | Purpose                                                                 |
|-------------------------|-------------------------------------------------------------------------|
| `AllCharactersList`     | Displays paginated list of characters with search capability.           |
| `CharacterCard`         | Shows character name, image and a favorite toggle button.               |
| `DetailedCharacter`     | Modal that displays detailed character info.                            |
| `SearchCharacter`       | Search input field with a clear button.                                 |
| `FavoritesList`         | Displays the user's favorite characters with a randomizable background. |
| `FavoriteCharacterCard` | Displays a character inside the favorites list.                         |
| `App`                   | Manages selected character and renders global layout.                   |

---

## 🧰 Services

### 📡 API Service

- Uses `fetch` to interact with:  
  `https://rickandmortyapi.com/api/character`
- Supports:
  - pagination
  - name-based search
  - error handling for invalid queries or empty results

### 🧠 State Management

- Global state is handled using **React Context API** (`FavoritesContext`).
- Local component states manage:
  - current page
  - loading
  - selected character (for modal)
  - search term
  - total pages
  - background image in favorites

---

## 🔄 Interaction Flow Diagram

### 🧱 Component Render Flow
- `App` renders `AllCharactersList`.
- When a character is clicked, the modal (`DetailedCharacter`) is rendered with full info.

### 🔍 Search
- `SearchCharacter` receives input and triggers `onSearch`.
- `AllCharactersList` fetches filtered characters by name.
- Clearing search resets pagination and character list.

### 🪟 Modal Interaction
- `onCharacterClick` triggers `setSelectedCharacter`.
- `DetailedCharacter` renders with full metadata:
  - status
  - species
  - gender
  - episode count
  - origin (name, type, dimension)

### ⭐ Favorites Management
- `toggleFavorite(character)` adds/removes from `FavoritesContext` (Map by `id`).
- `FavoritesList` reads the context and displays all favorite characters.
- Includes “Change Background” button — selects a random background image from 12 local assets (`public/assets/{1–12}.jpg`).

---

## 🗂 Folder Structure (Simplified)

```
src/
│
├── context/
│   └── FavoritesContext.tsx
│
├── Leftside/
│   ├── AllCharactersList.tsx
│   ├── allCharactersList.css
│   ├── CharacterCard.tsx
│   ├── characterCard.css
│   └── SearchCharacter.tsx
│
├── Modal/
│   ├── CharacterDetailsModal.tsx
│   └── characterDetailsModal.css
│
├── Rightside/
│   ├── FavoritesList.tsx
│   ├── favoritesList.css
│   ├── FavoriteCharacterCard.tsx
│   └── favoriteCharacterCard.css
│
├── types/
│   └── types.ts
│
├── App.tsx
├── App.css
├── App.test.tsx
├── index.tsx
└── index.css

```

---

## 📄 License

This project is intended for educational and technical evaluation purposes only.  
All code was written by the author during personal hours, with no use of proprietary or company code.  
No external collaborators, employees, or corporate resources were involved.

---