// Enter the site after button click
function enterSite() {
    document.getElementById("entryScreen").style.display = "none";
    document.getElementById("profilePage").classList.remove("hidden");
    document.getElementById("muteButton").classList.remove("hidden");

    // Play music when the site is entered
    const music = document.getElementById("backgroundMusic");
    music.play().catch(error => console.log("Autoplay blocked:", error));

    // Fetch YouTube subscriber count
    fetchYouTubeSubscribers();
}

// Mute Button Functionality
function toggleMute() {
    const music = document.getElementById("backgroundMusic");
    const muteButton = document.getElementById("muteButton");
    const icon = muteButton.querySelector("i");

    if (music.muted) {
        music.muted = false;
        icon.classList.replace("fa-volume-mute", "fa-volume-up");
    } else {
        music.muted = true;
        icon.classList.replace("fa-volume-up", "fa-volume-mute");
    }
}

// Fetch YouTube Subscriber Count from YouTube API
function fetchYouTubeSubscribers() {
    const channelId = 'UCIE6u_r7jqI1LVIZ42dge1Q'; // Your Channel ID
    const apiKey = 'AIzaSyDjZSen2b6_PuGFtfzzFaopp_65aT46QNM'; // Your API Key

    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const currentSubscribers = parseInt(data.items[0].statistics.subscriberCount);
            const progressPercentage = (currentSubscribers / 1000) * 100;

            // Update the YouTube subscriber progress bar width and text
            const progressBar = document.getElementById("subscribersBar");
            progressBar.style.width = `${progressPercentage}%`;
            progressBar.textContent = `${currentSubscribers} / 1000 Subscribers`;
        })
        .catch(error => {
            console.error("Error fetching subscriber count:", error);
        });
}
