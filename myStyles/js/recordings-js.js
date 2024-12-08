document.addEventListener("DOMContentLoaded", function() {
    const players = document.querySelectorAll(".mp3-player");
    let currentAudio = null;

    players.forEach(player => {
        const playPauseButton = player.querySelector(".play-pause");
        const progressBar = player.querySelector(".progress-bar");
        const audio = new Audio(player.querySelector(".download-button").href);

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
        });

        progressBar.addEventListener("input", function() {
            audio.currentTime = (progressBar.value / 100) * audio.duration;
        });
    });
});