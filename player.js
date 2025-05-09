// player.js
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const songCards = document.querySelectorAll('.card');
    const mainPlayPauseBtn = document.getElementById('main-play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeBar = document.getElementById('volume-bar');

    const nowPlayingArt = document.getElementById('now-playing-art');
    const nowPlayingTitle = document.getElementById('now-playing-title');
    const nowPlayingArtist = document.getElementById('now-playing-artist');

    const playIconSVG = '<svg viewBox="0 0 24 24" width="24" height="24" class="icon-play"><path d="M8 5v14l11-7z"></path></svg>';
    const pauseIconSVG = '<svg viewBox="0 0 24 24" width="24" height="24" class="icon-pause"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';

    let currentSongSrc = null;

    // Function to format time (MM:SS)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Update Play/Pause button icon
    function updatePlayPauseIcon(isPlaying) {
        mainPlayPauseBtn.innerHTML = isPlaying ? pauseIconSVG : playIconSVG;
        mainPlayPauseBtn.title = isPlaying ? "Tạm dừng" : "Phát";
    }

    // Play a new song
    function playSong(songData) {
        const { src, title, artist, art } = songData;

        audioPlayer.src = src;
        audioPlayer.play()
            .then(() => {
                updatePlayPauseIcon(true);
                nowPlayingTitle.textContent = title;
                nowPlayingArtist.textContent = artist;
                nowPlayingArt.src = art;
                currentSongSrc = src; // Track current song
            })
            .catch(error => console.error("Error playing audio:", error));
    }

    // Event listener for song cards
    songCards.forEach(card => {
        card.addEventListener('click', () => {
            const songData = {
                src: card.dataset.src,
                title: card.dataset.title,
                artist: card.dataset.artist,
                art: card.dataset.art
            };
            if (songData.src) {
                if (currentSongSrc === songData.src && !audioPlayer.paused) {
                    audioPlayer.pause();
                    updatePlayPauseIcon(false);
                } else if (currentSongSrc === songData.src && audioPlayer.paused) {
                    audioPlayer.play().catch(e => console.error(e));
                    updatePlayPauseIcon(true);
                }
                else {
                    playSong(songData);
                }
            }
        });
    });

    // Event listener for main Play/Pause button
    mainPlayPauseBtn.addEventListener('click', () => {
        if (!audioPlayer.src) { // No song loaded
            // Optionally, play the first song in the list or do nothing
            if (songCards.length > 0 && songCards[0].dataset.src) {
                const firstSongData = {
                    src: songCards[0].dataset.src,
                    title: songCards[0].dataset.title,
                    artist: songCards[0].dataset.artist,
                    art: songCards[0].dataset.art
                };
                playSong(firstSongData);
            }
            return;
        }

        if (audioPlayer.paused) {
            audioPlayer.play().catch(error => console.error("Error playing audio:", error));
        } else {
            audioPlayer.pause();
        }
        updatePlayPauseIcon(!audioPlayer.paused);
    });

    // Audio element events
    audioPlayer.addEventListener('loadedmetadata', () => {
        progressBar.max = audioPlayer.duration;
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });

    audioPlayer.addEventListener('timeupdate', () => {
        progressBar.value = audioPlayer.currentTime;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    });

    audioPlayer.addEventListener('play', () => {
        updatePlayPauseIcon(true);
    });

    audioPlayer.addEventListener('pause', () => {
        updatePlayPauseIcon(false);
    });

    audioPlayer.addEventListener('ended', () => {
        updatePlayPauseIcon(false);
        // Optionally: play next song in a playlist
    });

    // Progress bar seeking
    progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = progressBar.value;
    });

    // Volume control
    volumeBar.addEventListener('input', () => {
        audioPlayer.volume = volumeBar.value / 100;
    });
    // Set initial volume
    audioPlayer.volume = volumeBar.value / 100;


    // Sidebar active item (simple example - no change from previous)
    const navLinks = document.querySelectorAll('.sidebar-nav a, .sidebar-nav button');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            navLinks.forEach(node => node.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
// Sidebar toggle button (for mobile)
// Cần cẩn thận nếu không dùng stopPropagation ở trên    

const menuToggleBtn = document.querySelector('.menu-toggle-btn');
const sidebar = document.querySelector('.sidebar');
const mainContentForOverlay = document.querySelector('.main-content'); // Để tạo overlay

if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Ngăn sự kiện click lan ra document
        sidebar.classList.toggle('active');
        // Optional: Thêm/xóa lớp overlay cho main content
        if (mainContentForOverlay) {
            if (sidebar.classList.contains('active')) {
                // Tạo overlay nếu chưa có
                let overlay = document.querySelector('.sidebar-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.classList.add('sidebar-overlay');
                    overlay.style.cssText = `
                            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                            background-color: rgba(0,0,0,0.5);
                            z-index: 999; /* Dưới sidebar */
                        `;
                    document.body.appendChild(overlay);
                    overlay.addEventListener('click', () => { // Click overlay để đóng sidebar
                        sidebar.classList.remove('active');
                        overlay.remove();
                    });
                }
            } else {
                let overlay = document.querySelector('.sidebar-overlay');
                if (overlay) overlay.remove();
            }
        }
    });
}

// Optional: Đóng sidebar khi click ra ngoài (trên mobile)
// Cần cẩn thận nếu không dùng stopPropagation ở trên
document.addEventListener('click', (event) => {
    if (sidebar && sidebar.classList.contains('active') &&
        !sidebar.contains(event.target) &&
        event.target !== menuToggleBtn) {
        // Kiểm tra thêm để không bị ảnh hưởng bởi click vào menuToggleBtn lần nữa

        sidebar.classList.remove('active');
        let overlay = document.querySelector('.sidebar-overlay');
        if (overlay) overlay.remove();
    }
});
