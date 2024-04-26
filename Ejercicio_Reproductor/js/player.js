document.addEventListener('DOMContentLoaded', function() {
    var audio = document.querySelector('.album');
    var progressBar = document.getElementById('progress-bar');
    var playButton = document.getElementById('play');
    var nextButton = document.getElementById('next');
    var prevButton = document.getElementById('prev');
    var tracks = document.querySelectorAll('.as-link');
    var currentTrack = 0;

    function loadTrack(trackIndex) {
        audio.src = tracks[trackIndex].getAttribute('data-src');
        audio.load();
        audio.play();
        updateActiveTrack(trackIndex);
    }

    function updateActiveTrack(trackIndex) {
        tracks.forEach(track => track.classList.remove('active'));
        tracks[trackIndex].classList.add('active');
    }

    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    nextButton.addEventListener('click', function() {
        currentTrack++;
        if (currentTrack >= tracks.length) currentTrack = 0;
        loadTrack(currentTrack);
    });

    prevButton.addEventListener('click', function() {
        currentTrack--;
        if (currentTrack < 0) currentTrack = tracks.length - 1;
        loadTrack(currentTrack);
    });

    tracks.forEach(function(track, index) {
        track.addEventListener('click', function() {
            currentTrack = index;
            loadTrack(currentTrack);
        });
    });

    audio.addEventListener('timeupdate', function() {
        var progress = parseInt((audio.currentTime / audio.duration) * 100, 10);
        progressBar.value = progress;
    });

    progressBar.addEventListener('input', function() {
        var time = (audio.duration * (progressBar.value / 100));
        audio.currentTime = time;
    });

    // Cargar la primera pista
    if (tracks.length > 0) {
        loadTrack(currentTrack);
    }
});
