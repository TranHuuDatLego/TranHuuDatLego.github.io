// data/music.js

const ALL_MUSIC_SECTIONS = [
    {
        id: "Vpop",
        title: "Nhạc Việt Nam",
        songs: [
            {
                id: "fav1",
                title: "Bạc Phận",
                artistData: "Jack, K-ICM",
                displayArtist: { name: "Jack, K-ICM", id: "jack" },
                artUrl: "img/bac-phan.jpg",
                audioSrc: "audio/bac-phan.mp3",
                isFavorite: true,
                plays: "416.583.209" // Giữ lại giá trị cũ nếu bạn thích
            },
            {
                id: "fav2",
                title: "Sóng Gió",
                artistData: "Jack, K-ICM",
                displayArtist: { name: "Jack, K-ICM", id: "jack" },
                artUrl: "img/song-gio.png",
                audioSrc: "audio/song-gio.mp3",
                isFavorite: true,
                plays: "550.123.456" // Random
            },
            {
                id: "fav3",
                title: "Thay Lòng",
                artistData: "Nal",
                displayArtist: { name: "Nal", id: "nal" },
                artUrl: "img/nal.png",
                audioSrc: "audio/thay-long-nal.mp3",
                isFavorite: false, // Ví dụ
                plays: "440.789.123" // Random
            },
            {
                id: "fav4",
                title: "Making My Way",
                artistData: "Sơn Tùng M-TP",
                displayArtist: { name: "Sơn Tùng MTP", id: "son-tung-mtp" },
                artUrl: "img/making-my-way.jpg",
                audioSrc: "audio/making-my-way.mp3",
                isFavorite: false, // Ví dụ
                plays: "85.321.678" // Random
            }
        ]
    },
    {
        id: "Mahiru",
        title: "Thiên sứ nhà bên - Mahiru",
        songs: [
            {
                id: "mahiru1",
                title: "小さな恋のうた",
                artistData: "椎名真昼 (CV: 石見舞菜香)",
                displayArtist: { name: "椎名真昼 (CV: 石見舞菜香)", id: "MahiruShiina" },
                artUrl: "img/mahiru1.png",
                audioSrc: "audio/mahiru_ed1.mp3",
                isFavorite: true,
                plays: "4.258.910" // Random
            },
            {
                id: "mahiru2",
                title: "愛唄",
                artistData: "椎名真昼 (CV: 石見舞菜香)",
                displayArtist: { name: "椎名真昼 (CV: 石見舞菜香)", id: "MahiruShiina" },
                artUrl: "img/mahiru2.png",
                audioSrc: "audio/mahiru_ed2.mp3",
                isFavorite: true,
                plays: "3.789.552" // Random
            },
            {
                id: "mahiru3",
                title: "君に届け",
                artistData: "椎名真昼 (CV: 石見舞菜香)",
                displayArtist: { name: "椎名真昼 (CV: 石見舞菜香)", id: "MahiruShiina" },
                artUrl: "img/mahiru3.png",
                audioSrc: "audio/mahiru_ed3.mp3",
                isFavorite: true,
                plays: "5.102.304" // Random
            },
            {
                id: "mahiru4",
                title: "君に届け - Instrumental",
                artistData: "Instrumental",
                displayArtist: { name: "椎名真昼 (CV: 石見舞菜香)", id: "MahiruShiina" },
                artUrl: "img/mahiru4.png",
                audioSrc: "audio/mahiru_ed3_Instrumental.mp3",
                isFavorite: true,
                plays: "1.567.890" // Random
            }
        ]
    },
    {
        id: "SummerPockets",
        title: "Summer Pockets - OST & Vocal",
        songs: [
            {
                id: "sp1",
                title: "アルカレイド (Alkaleido)",
                artistData: "鈴木このみ (Konomi Suzuki)",
                displayArtist: { name: "Konomi Suzuki", id: "KonomiSuzuki" },
                artUrl: "img/summer_pockets_op.png",
                audioSrc: "audio/summer_pockets_op.mp3",
                isFavorite: true,
                plays: "4.481.234" // Random
            },
            {
                id: "sp2",
                title: "Lasting Moment",
                artistData: "鈴木このみ (Konomi Suzuki)",
                displayArtist: { name: "Konomi Suzuki", id: "KonomiSuzuki" },
                artUrl: "img/Tsumugi.png",
                audioSrc: "audio/summer_pockets_ed.mp3",
                isFavorite: false, // Ví dụ
                plays: "5.356.789" // Random
            },
            {
                id: "sp3",
                title: "羽のゆりかご",
                artistData: "水谷瑠奈 (NanosizeMir)",
                displayArtist: { name: "水谷瑠奈 (NanosizeMir)", id: "RunaMizutani" },
                artUrl: "img/Hane no Yurikago.png",
                audioSrc: "audio/Hane no Yurikago.mp3",
                isFavorite: false, // Ví dụ
                plays: "2.987.654" // Random
            },
            {
                id: "sp4",
                title: "Sea, You & Me",
                artistData: "紬ヴェンダース (CV: 岩井映美里)",
                displayArtist: { name: "紬ヴェンダース", id: "TsumugiWenders" },
                artUrl: "img/Tsumugi.png",
                audioSrc: "audio/Tsumugi.mp3",
                isFavorite: true, // Ví dụ
                plays: "1.205.333" // Random
            },
            {
                id: "sp5",
                title: "Hamu 20th Anniversary", // Có thể đổi tên thành "Summer Pockets Theme (Hamu 20th Ver.)"
                artistData: "Instrumental",
                displayArtist: { name: "Key Sound Label", id: "KeySoundLabel" },
                artUrl: "img/key20th.png",
                audioSrc: "audio/summer_pockets_op_20th_Key.mp3",
                isFavorite: false, // Ví dụ
                plays: "987.654" // Random
            },
            {
                id: "sp6",
                title: "アスタロア (Asterlore)",
                artistData: "riya (eufonius)",
                displayArtist: { name: "riya (eufonius)", id: "riyaEufonius" },
                artUrl: "img/Summer_Pockets_Asterlore.png",
                audioSrc: "audio/Summer_Pockets_Asterlore.mp3",
                isFavorite: true, // Ví dụ
                plays: "3.015.888" // Random
            }
        ]
    }
];

// Nếu dùng ES Modules: export { ALL_MUSIC_SECTIONS };