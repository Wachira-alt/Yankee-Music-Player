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
/ Function: Display Tracks in Playlist
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
