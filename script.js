// Global Constants & Variables
const YOUTUBE_API_KEY = "AIzaSyB_mmD9wqQbfr-73CgeBuFUtbKRMotCfQM";
const shuffleBtn = document.getElementById("shuffle-btn");
const playerContainer = document.createElement("div");
playerContainer.id = "player-container";
document.body.appendChild(playerContainer);
// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
favorites = favorites.filter(song => song && song.videoId && song.songTitle);
localStorage.setItem("favorites", JSON.stringify(favorites));
// Function: Fetch Trending Music Videos
async function fetchTopTracks() {
  try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=Top trending music&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`);
      const data = await response.json();
      displayTracks(data.items, "playlist", "Popular");
  } catch (error) {
      console.error("Error fetching YouTube data:", error);
  }
}
// Function: Display Tracks in Playlist
function displayTracks(tracks, containerClass, title) {
    const playlist = document.querySelector("." + containerClass);
    playlist.innerHTML = `<h2>${title}</h2>`;

    tracks.forEach((track) => {
        const songElement = document.createElement("div");
        songElement.classList.add("song-item");
        const videoId = track.id.videoId;
        const songTitle = track.snippet.title;
        const isFavorite = favorites.some(song => song.videoId === videoId);

        songElement.innerHTML = `
            <img src="${track.snippet.thumbnails.default.url}" class="album-cover">
            <span class="song-title">${songTitle}</span>
            <button class="play-btn" data-video-id="${videoId}">▶</button>
            <button class="like-btn" data-video-id="${videoId}" data-title="${songTitle}">${isFavorite ? "❤️" : "🤍"}</button>
        `;
        playlist.appendChild(songElement);
    });

    addEventListeners();
}
// Function: Add Event Listeners for Play and Like Buttons
function addEventListeners() {
  document.querySelectorAll(".play-btn").forEach(btn => {
      btn.addEventListener("click", () => playTrack(btn));
  });
  document.querySelectorAll(".like-btn").forEach(btn => {
      btn.addEventListener("click", () => toggleFavorite(btn));
  });
}
// Function: Play Selected Track
function playTrack(button) {
  const videoId = button.getAttribute("data-video-id");
  const videoContainer = document.getElementById("video-player");
  if (!videoContainer) return console.error("Error: Video container not found!");
  
  videoContainer.innerHTML = `
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
          frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
      </iframe>
  `;

  document.querySelectorAll(".play-btn").forEach(btn => btn.innerText = "▶");
  button.innerText = "⏸";
}
// Function: Toggle Favorite Songs
function toggleFavorite(button) {
  const videoId = button.getAttribute("data-video-id");
  const songTitle = button.getAttribute("data-title");
  const existingIndex = favorites.findIndex(song => song.videoId === videoId);

  if (existingIndex !== -1) {
      favorites.splice(existingIndex, 1);
      button.innerText = "🤍";
  } else {
      favorites.push({ videoId, songTitle });
      button.innerText = "❤️";
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
}
// Function: Display Favorites Section
function displayFavorites() {
  const favoriteList = document.getElementById("favorite-list");
  favoriteList.innerHTML = favorites.length === 0 ? "<p>No favorite songs yet.</p>" : "";
  
  favorites.forEach(song => {
      const songElement = document.createElement("div");
      songElement.classList.add("song-item");

      songElement.innerHTML = `
          <img src="https://img.youtube.com/vi/${song.videoId}/default.jpg" class="album-cover">
          <span class="song-title">${song.songTitle}</span>
          <button class="play-btn" data-video-id="${song.videoId}">▶</button>
          <button class="like-btn" data-video-id="${song.videoId}">❤️</button>
      `;
      favoriteList.appendChild(songElement);
  });
  addEventListeners();
}
