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
