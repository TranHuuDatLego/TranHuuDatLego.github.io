// playlist.js
console.log("playlist.js loading...");

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Playlist DOMContentLoaded Start");

    const playlistDetailContainer = document.getElementById('playlist-detail-container');
    const playlistUlSidebar = document.getElementById('playlist-links-list');

    function getPlaylistIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }
    const playlistId = getPlaylistIdFromUrl();

    if (typeof ALL_MUSIC_SECTIONS === 'undefined' || !playlistDetailContainer || !playlistId) {
        console.error("Playlist.js: Dữ liệu nhạc, container hoặc ID playlist không hợp lệ.");
        if (playlistDetailContainer) playlistDetailContainer.innerHTML = '<h1>Lỗi</h1><p>Không thể tải thông tin playlist.</p>';
        if (typeof ALL_MUSIC_SECTIONS !== 'undefined' && playlistUlSidebar && typeof window.renderPlaylistLinks === 'function') {
            window.renderPlaylistLinks(ALL_MUSIC_SECTIONS, playlistUlSidebar);
        }
        return;
    }

    const targetSection = ALL_MUSIC_SECTIONS.find(section => section.id === playlistId);

    if (targetSection) {
        playlistDetailContainer.innerHTML = ''; // Xóa "Đang tải..."
        document.title = `${targetSection.title} - My Music Player`;

        // Tạo Header Playlist
        const playlistHeaderDiv = document.createElement('div');
        playlistHeaderDiv.classList.add('playlist-header-details');
        const playlistCoverArtDiv = document.createElement('div');
        playlistCoverArtDiv.classList.add('playlist-cover-art');
        const coverImg = document.createElement('img');
        coverImg.src = targetSection.songs && targetSection.songs.length > 0 ?
                       (targetSection.songs[0].artUrl || 'https://via.placeholder.com/180?text=Playlist') :
                       'https://via.placeholder.com/180?text=Playlist';
        coverImg.alt = targetSection.title;
        playlistCoverArtDiv.appendChild(coverImg);
        playlistHeaderDiv.appendChild(playlistCoverArtDiv);
        const playlistInfoDiv = document.createElement('div');
        playlistInfoDiv.classList.add('playlist-info');
        playlistInfoDiv.innerHTML = `
            <span class="playlist-type">Playlist</span>
            <h1 class="playlist-main-title">${targetSection.title}</h1>
            <p class="playlist-description">${targetSection.description || ''}</p>
            <div class="playlist-stats">
                ${targetSection.songs ? targetSection.songs.length : 0} bài hát
            </div>
        `;
        playlistHeaderDiv.appendChild(playlistInfoDiv);
        playlistDetailContainer.appendChild(playlistHeaderDiv);

        // Tạo Container cho Danh sách Bài hát
        const songListContainer = document.createElement('div');
        songListContainer.id = `playlist-${playlistId}-songs`;
        songListContainer.classList.add('song-list-container');

        // Tạo Header Bảng
        const tableHeader = document.createElement('div');
        tableHeader.classList.add('song-list-header', 'song-list-item');
        tableHeader.innerHTML = `
            <span class="song-index">#</span>
            <span class="song-art-placeholder"></span>
            <div class="song-details"><div class="song-title">TIÊU ĐỀ</div></div>
            <div style="padding-left:40px" class="song-artist-column">NGHỆ SĨ</div>
            <div class="song-plays">LƯỢT NGHE</div>
            <div class="song-duration">THỜI LƯỢNG</div>
            <div class="song-actions-placeholder"></div>
        `;
        songListContainer.appendChild(tableHeader);

        if (targetSection.songs && targetSection.songs.length > 0) {
            let songsToDisplay = JSON.parse(JSON.stringify(targetSection.songs));

            if (typeof window.getAudioFileDuration === 'function') {
                console.log(`Playlist: Bắt đầu lấy thời lượng cho ${songsToDisplay.length} bài hát trong '${targetSection.title}'...`);
                const durationPromises = songsToDisplay.map(song =>
                    window.getAudioFileDuration(song.audioSrc)
                        .then(duration => {
                            song.duration = duration;
                        })
                        .catch(err => {
                            song.duration = "N/A";
                        })
                );
                try {
                    await Promise.all(durationPromises);
                    console.log("Playlist: Đã lấy xong tất cả thời lượng.");
                } catch (error) {
                    console.error("Playlist: Lỗi trong Promise.all khi chờ lấy durations:", error);
                }
            } else {
                console.warn("Playlist: Hàm window.getAudioFileDuration không tồn tại.");
                songsToDisplay.forEach(song => song.duration = "N/A");
            }

            songsToDisplay.forEach((songData, index) => {
                if (typeof window.createSongListItem === 'function') {
                    const songItem = window.createSongListItem(
                        songData,
                        index + 1,
                        songData.displayArtist?.name || songData.artistData
                    );
                    songItem.addEventListener('click', function(event) {
                        if (event.target.closest('button.like-song-btn') || event.target.closest('a')) return;
                        if (typeof window.playSongFromData === 'function' && songData.audioSrc) {
                            const songToPlayForPlayer = {
                                src: songData.audioSrc,
                                title: songData.title,
                                artist: songData.displayArtist?.name || songData.artistData,
                                art: songData.artUrl || songData.albumArt,
                            };
                            window.playSongFromData(songToPlayForPlayer, songsToDisplay);
                        } else {
                            console.warn("Playlist: Không thể phát bài hát.");
                        }
                    });
                    songListContainer.appendChild(songItem);
                } else {
                    console.error("Playlist: Hàm window.createSongListItem không tồn tại.");
                }
            });
        } else {
            songListContainer.innerHTML = '<p>Playlist này chưa có bài hát nào.</p>';
        }
        playlistDetailContainer.appendChild(songListContainer);

    } else {
        playlistDetailContainer.innerHTML = '<h1>Không tìm thấy playlist</h1><p>Playlist bạn yêu cầu không tồn tại hoặc đã bị xóa.</p>';
        document.title = "Không tìm thấy playlist - My Music Player";
    }

    // Render playlist links trong sidebar
    if (typeof ALL_MUSIC_SECTIONS !== 'undefined' && playlistUlSidebar && typeof window.renderPlaylistLinks === 'function') {
        window.renderPlaylistLinks(ALL_MUSIC_SECTIONS, playlistUlSidebar);
    }

    // Xóa active khỏi nav chính, active link playlist hiện tại đã xử lý trong renderPlaylistLinks
    document.querySelectorAll('.sidebar-nav > ul > li > a').forEach(link => {
        if (!link.closest('.sidebar-playlists')) { // Không tác động đến link trong sidebar-playlists
            link.classList.remove('active');
        }
    });

    console.log("Playlist DOMContentLoaded End");
});

console.log("playlist.js loaded successfully.");