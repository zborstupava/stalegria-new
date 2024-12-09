document.addEventListener("DOMContentLoaded", function() {
    const players = document.querySelectorAll(".mp3-player");
    let currentAudio = null;

    players.forEach(player => {
        const playPauseButton = player.querySelector(".play-pause");
        const progressBar = player.querySelector(".progress-bar");
        const timeDisplay = player.querySelector(".time-display");
        const audio = new Audio(player.querySelector(".download-button").href);

        audio.addEventListener("loadedmetadata", function() {
            timeDisplay.textContent = "0:00 / " + formatTime(audio.duration);
        });

        playPauseButton.addEventListener("click", function() {
            if (audio.paused) {
                if (currentAudio && currentAudio !== audio) {
                    currentAudio.pause();
                    currentAudio.closest(".mp3-player").querySelector(".play-pause i").classList.replace("fa-pause", "fa-play");
                }
                audio.play();
                playPauseButton.querySelector("i").classList.replace("fa-play", "fa-pause");
                currentAudio = audio;
            } else {
                audio.pause();
                playPauseButton.querySelector("i").classList.replace("fa-pause", "fa-play");
                currentAudio = null;
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