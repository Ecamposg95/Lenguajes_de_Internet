document.addEventListener('DOMContentLoaded', function() {
    var audio = document.querySelector('.album'); // Elemento de audio
    var progressBar = document.getElementById('progress-bar'); // Barra de progreso
    var playButton = document.getElementById('play'); // Botón de play/pause
    var nextButton = document.getElementById('next'); // Botón de siguiente pista
    var prevButton = document.getElementById('prev'); // Botón de pista anterior
    var albumImage = document.querySelector('.block-content img'); // Imagen del álbum
    var tracks = document.querySelectorAll('.track-item'); // Todos los elementos de la pista
    var currentTrack = 0; // Índice de la pista actual

    function loadTrack(trackIndex) {
        var trackElement = tracks[trackIndex];
        audio.src = trackElement.getAttribute('data-src');
        albumImage.src = trackElement.getAttribute('data-img-src'); // Actualiza la imagen del álbum
        audio.load();
        audio.play();
        updateActiveTrack(trackIndex);
        updatePlayPauseIcon(); // Actualiza el ícono de play/pause
    }

    function updateActiveTrack(trackIndex) {
        tracks.forEach(track => track.classList.remove('active'));
        tracks[trackIndex].classList.add('active');
    }

    function updatePlayPauseIcon() {
        if (audio.paused) {
            playButton.innerHTML = '<i class="fas fa-play"></i>'; // Ícono de play
        } else {
            playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Ícono de pause
        }
    }

    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        updatePlayPauseIcon(); // Cambia el ícono según el estado del audio
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

    // Cargar la primera pista al inicio
    if (tracks.length > 0) {
        loadTrack(currentTrack);
    }
});
