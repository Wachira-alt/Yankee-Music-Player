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
