document.addEventListener("DOMContentLoaded", function() {
    const players = document.querySelectorAll(".mp3-player");
    let currentAudio = null;
    let currentPlayPauseButton = null;

    players.forEach(player => {
        const playPauseButton = player.querySelector(".play-pause");
        const progressBar = player.querySelector(".progress-bar");
        const timeDisplay = player.querySelector(".time-display");
        const audio = new Audio(player.querySelector(".download-button").href);

        // Reset the time display when the audio is loaded
        progressBar.value = 0;

        audio.addEventListener("loadedmetadata", function() {
            timeDisplay.textContent = "0:00 / " + formatTime(audio.duration);
        });

        playPauseButton.addEventListener("click", function() {
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentPlayPauseButton.querySelector("i").classList.replace("fa-pause", "fa-play");
                currentAudio = player.audio;
            }
            if (audio.paused) {
                audio.play();
                playPauseButton.querySelector("i").classList.replace("fa-play", "fa-pause");
                currentAudio = audio;
                currentPlayPauseButton = playPauseButton;
            } else {
                audio.pause();
                playPauseButton.querySelector("i").classList.replace("fa-pause", "fa-play");
                if (currentAudio === audio) {
                    currentAudio = null;
                    currentPlayPauseButton = null;
                }
            }
        });

        audio.addEventListener("timeupdate", function() {
            progressBar.value = (audio.currentTime / audio.duration) * 100;
            timeDisplay.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
        });

        progressBar.addEventListener("input", function() {
            audio.currentTime = (progressBar.value / 100) * audio.duration;
        });
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return minutes + ":" + (secs < 10 ? "0" : "") + secs;
    }
});