// utils.js

// --- Hàm tạo một card bài hát ---
// Hàm này sẽ được gọi từ main.js và search.js
function createSongCard(songData) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.src = songData.audioSrc || '';
    card.dataset.title = songData.title || 'Không có tiêu đề';
    card.dataset.artist = songData.artistData || songData.displayArtist?.name || 'N/A';
    card.dataset.art = songData.artUrl || 'https://via.placeholder.com/200';

    const img = document.createElement('img');
    img.src = songData.artUrl || 'https://via.placeholder.com/200';
    img.alt = songData.title || 'Album Art';
    img.classList.add('album-art');
    img.loading = 'lazy';

    const titleH3 = document.createElement('h3');
    titleH3.classList.add('song-title');
    titleH3.textContent = songData.title || 'Không có tiêu đề';

    const artistP = document.createElement('p');
    artistP.classList.add('song-artist');
    if (songData.displayArtist && songData.displayArtist.id && songData.displayArtist.name) {
        const artistLink = document.createElement('a');
        artistLink.href = `artist_page.html?artistId=${songData.displayArtist.id}`;
        artistLink.textContent = songData.displayArtist.name;
        // Ngăn link nghệ sĩ tự kích hoạt phát nhạc của card cha
        artistLink.addEventListener('click', (e) => e.stopPropagation());
        artistP.appendChild(artistLink);
    } else if (songData.displayArtist && songData.displayArtist.name) {
        artistP.textContent = songData.displayArtist.name;
    } else {
        artistP.textContent = 'Nghệ sĩ không xác định';
    }

    const playButton = document.createElement('button');
    playButton.classList.add('play-button-overlay');
    playButton.innerHTML = '▶';
    // Ngăn nút play tự kích hoạt sự kiện click của card cha (nếu cần)
    // playButton.addEventListener('click', (e) => e.stopPropagation());

    card.appendChild(img);
    card.appendChild(titleH3);
    card.appendChild(artistP);
    card.appendChild(playButton);

    // **QUAN TRỌNG:** Gắn listener sẽ được thực hiện bởi hàm gọi createSongCard
    // thông qua hàm addCardClickListener được expose từ player.js
    if (typeof window.addCardClickListener === 'function') {
         window.addCardClickListener(card);
    } else {
        console.warn('Hàm window.addCardClickListener không tồn tại khi tạo card.');
    }

    return card;
}

// Hàm format thời gian (MM:SS)
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
// --- Hàm render các link playlist trong sidebar ---
// sectionsData: Mảng dữ liệu (ví dụ: ALL_MUSIC_SECTIONS)
// targetUlElement: Phần tử <ul> trong sidebar để chèn link vào
function renderPlaylistLinks(sectionsData, targetUlElement) {
    if (!targetUlElement) {
        console.error("Lỗi: Không tìm thấy phần tử UL mục tiêu cho playlist.");
        return;
    }
    if (!sectionsData || !Array.isArray(sectionsData)) {
        console.error("Lỗi: Dữ liệu section không hợp lệ.");
        targetUlElement.innerHTML = '<li>Lỗi tải playlist</li>'; // Thông báo lỗi
        return;
    }

    targetUlElement.innerHTML = ''; // Xóa các link cũ trước khi tạo mới

    sectionsData.forEach(section => {
        // Chỉ tạo link nếu section có id và title hợp lệ
        if (section && section.id && section.title) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');

            link.href = `#${section.id}`; // href trỏ đến ID của section
            link.textContent = section.title; // Text là tiêu đề section

            // Có thể thêm class nếu cần style riêng
            // link.classList.add('sidebar-playlist-link');

            listItem.appendChild(link);
            targetUlElement.appendChild(listItem);
        }
    });
    console.log("Playlist links rendered."); // Để kiểm tra
}

// Expose hàm renderPlaylistLinks ra global
window.renderPlaylistLinks = renderPlaylistLinks;

// --- Hàm gắn listener cho Smooth scroll (có thể giữ ở main.js hoặc chuyển vào đây) ---
// Nếu chuyển vào đây, nó sẽ dùng chung, nhưng chỉ có ý nghĩa trên trang có các section target
function attachSmoothScrollListeners(linkSelector, scrollContainerSelector) {
    const playlistLinks = document.querySelectorAll(linkSelector);
    const mainContentElement = document.querySelector(scrollContainerSelector);

     if (playlistLinks.length > 0 && mainContentElement) {
         console.log(`Attaching smooth scroll to ${playlistLinks.length} links.`); // Kiểm tra
         playlistLinks.forEach(link => {
             // Gỡ listener cũ nếu có thể (phức tạp hơn, tạm bỏ qua)
             link.addEventListener('click', function handleSmoothScroll(event) {
                 event.preventDefault();
                 const targetId = this.getAttribute('href');
                 if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                     try {
                         const targetSection = document.getElementById(targetId.substring(1)); // Dùng getElementById hiệu quả hơn cho ID
                         if (targetSection) {
                              // Kiểm tra xem targetSection có thực sự nằm trong mainContentElement không nếu cần
                             if (mainContentElement.contains(targetSection)) {
                                 targetSection.scrollIntoView({
                                     behavior: 'smooth',
                                     block: 'start'
                                 });
                             } else {
                                  console.warn(`Section ${targetId} không nằm trong ${scrollContainerSelector}.`);
                             }
                         } else {
                             console.warn(`Không tìm thấy section với ID: ${targetId}`);
                         }
                     } catch (e) {
                         console.error(`Lỗi khi tìm selector: ${targetId}`, e);
                     }
                 }
             });
         });
     } else {
          if(playlistLinks.length === 0) console.warn("Không tìm thấy link playlist nào để gắn smooth scroll.");
          if(!mainContentElement) console.warn("Không tìm thấy container cuộn chính.");
     }
}

// Expose hàm attachSmoothScrollListeners ra global
window.attachSmoothScrollListeners = attachSmoothScrollListeners;


console.log("utils.js loaded with playlist functions");