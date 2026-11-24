export type Language = 'en' | 'id';

export const translations = {
  en: {
    nav: {
      brand: 'CIPTAGELAR',
      welcome: 'Welcome',
      gallery: 'Gallery',
      visit: 'Visit',
    },
    hero: {
      watermark: 'CIPTAGELAR',
      eyebrow: 'Sukabumi, West Java',
      title1: 'Where customary law',
      title2: 'breathes in the mountain mist',
      subtitle: 'Highland Ancestry · Sacred Rice · Leuit Granaries · Customary Rule',
      scroll: 'Scroll',
    },
    chapters: [
      {
        id: 'dawn',
        num: '01',
        eyebrow: 'Mount Halimun Highlands',
        titleLine1: 'Where Fog Veils',
        titleLine2: 'the Ancestral Hamlet',
        text: 'The dirt track yields to bamboo gates south of Mount Halimun. Roosters call into damp air before dawn wood fires ignite.',
        floatingDetail: '1,050 MASL • 6°49′S, 106°30′E',
      },
      {
        id: 'seren-taun',
        num: '02',
        eyebrow: 'Harvest Thanksgiving',
        titleLine1: 'The Harvest',
        titleLine2: 'is Never Sold',
        text: 'Golden sheaves of ancestral rice are carried down from terraced slopes into the courtyard. Resonant bamboo rengkong hums until dark.',
        floatingDetail: 'Rengkong Bamboo Resonators',
      },
      {
        id: 'leuit',
        num: '03',
        eyebrow: 'Generational Granaries',
        titleLine1: 'Rice That Breathes',
        titleLine2: 'for Decades',
        text: 'Mortise-jointed timber and palm fiber thatch keep unthreshed grain viable for up to ninety years. Selling rice remains taboo.',
        floatingDetail: 'Over 8,000 Granaries Recorded',
      },
    ],
    gallery: {
      eyebrow: 'Documentary Stills',
      title: 'Moments of Customary Life',
      photos: [
        {
          id: 1,
          src: '/assets/media/gallery-1-rengkong-procession.webp',
          caption: 'Warga carrying golden harvest sheaves on resonant bamboo rengkong poles.',
        },
        {
          id: 2,
          src: '/assets/media/gallery-2-ceremony-sacred.webp',
          caption: 'Sacred harvest thanksgiving prayers held before the ancestral Leuit granaries.',
        },
        {
          id: 3,
          src: '/assets/media/gallery-3-leuit-aerial-valley.webp',
          caption: 'Centuries of self-reliance: scores of Leuit granaries standing across the Halimun basin.',
        },
        {
          id: 4,
          src: '/assets/media/gallery-4-terrace-sanctuary.webp',
          caption: 'Terraced mountain paddies cultivated under strict traditional crop cycles.',
        },
        {
          id: 5,
          src: '/assets/media/gallery-5-golden-dawn.webp',
          caption: 'Highland dawn mist lifting over thatched roofs and ripening mountain rice.',
        },
        {
          id: 6,
          src: '/assets/media/gallery-6-leuit-row.webp',
          caption: 'Stilted wooden granaries aligned along the perimeter of customary wetlands.',
        },
        {
          id: 7,
          src: '/assets/media/gallery-7-rengkong-closeup.webp',
          caption: 'Tuned bamboo poles vibrating in rhythm with the bearers’ brisk mountain steps.',
        },
        {
          id: 8,
          src: '/assets/media/gallery-8-ceremony-elders.webp',
          caption: 'Customary elders offering prayers and traditional tributes during Seren Taun.',
        },
        {
          id: 9,
          src: '/assets/media/gallery-9-granary-detail.webp',
          caption: 'Suren timber mortise joints and thick palm fiber thatch built without metal nails.',
        },
      ],
    },
    closing: {
      tag: 'Living Heritage in the Modern Era',
      sentence: 'Cultural heritage is not a relic preserved under glass; it breathes only when lived, farmed, and guarded by each generation.',
      tipsTitle: 'Visiting Respectfully',
      tips: [
        {
          num: '01',
          title: 'Dark & Modest Attire',
          body: 'Wear dark, modest clothing with covered shoulders when walking near the Imah Gede and ancestral hearths.',
        },
        {
          num: '02',
          title: 'Seek Permission Before Photographing',
          body: 'Always ask permission before photographing elders, sacred rituals, private kitchens, or inside the Leuit.',
        },
        {
          num: '03',
          title: 'Pack Out Every Single Waste',
          body: 'The highland valley has no municipal waste processing; carry every piece of plastic back to the city.',
        },
      ],
      travelInfo: 'Accessible via mountain dirt tracks south of Pelabuhan Ratu and Cisolok. Coordinate visits through customary liaisons.',
      backToTop: 'Back to top',
      location: 'Sukabumi, West Java · 6°49′S, 106°30′E · 1,050 MASL',
      credits: "Scroll feel inspired by Code Media Labs' Odisha Tourism concept.",
    },
  },
  id: {
    nav: {
      brand: 'CIPTAGELAR',
      welcome: 'Selamat Datang',
      gallery: 'Galeri',
      visit: 'Kunjungan',
    },
    hero: {
      watermark: 'CIPTAGELAR',
      eyebrow: 'Sukabumi, Jawa Barat',
      title1: 'Di mana hukum adat',
      title2: 'hidup di balik kabut Halimun',
      subtitle: 'Leluhur Halimun · Padi Pusaka · Lumbung Leuit · Kedaulatan Adat',
      scroll: 'Gulir',
    },
    chapters: [
      {
        id: 'dawn',
        num: '01',
        eyebrow: 'Dataran Tinggi Halimun',
        titleLine1: 'Kala Kabut Menyelimuti',
        titleLine2: 'Perkampungan Adat',
        text: 'Jalan tanah berbatu berujung di gerbang bambu selatan Gunung Halimun. Kokok ayam memecah hawa dingin sebelum tungku kayu pertama dinyalakan.',
        floatingDetail: '1.050 MDPL • 6°49′LS, 106°30′BT',
      },
      {
        id: 'seren-taun',
        num: '02',
        eyebrow: 'Syukuran Panen Raya',
        titleLine1: 'Padi Pusaka',
        titleLine2: 'Pantang Diperjualbelikan',
        text: 'Ikat-ikat padi emas dipikul turun dari terasering menuju pelataran Imah Gede. Irama rengkong bambu berdengung hingga senja.',
        floatingDetail: 'Pikulan Bambu Rengkong',
      },
      {
        id: 'leuit',
        num: '03',
        eyebrow: 'Lumbung Padi Antargenerasi',
        titleLine1: 'Padi yang Bernapas',
        titleLine2: 'Hingga Puluhan Tahun',
        text: 'Struktur pasak kayu suren dan atap ijuk menjaga bulir padi tetap bernapas hingga puluhan tahun. Menjual beras pantang dilakukan.',
        floatingDetail: 'Lebih dari 8.000 Leuit Tercatat',
      },
    ],
    gallery: {
      eyebrow: 'Dokumentasi Visual',
      title: 'Potret Kehidupan Adat Warga',
      photos: [
        {
          id: 1,
          src: '/assets/media/gallery-1-rengkong-procession.webp',
          caption: 'Warga memikul ikatan padi emas menggunakan pikulan bambu rengkong yang bersuara nyaring.',
        },
        {
          id: 2,
          src: '/assets/media/gallery-2-ceremony-sacred.webp',
          caption: 'Upacara doa syukuran panen raya di pelataran depan lumbung Leuit pusaka.',
        },
        {
          id: 3,
          src: '/assets/media/gallery-3-leuit-aerial-valley.webp',
          caption: 'Kedaulatan pangan ratusan tahun: gugusan lumbung Leuit di lembah adat Halimun.',
        },
        {
          id: 4,
          src: '/assets/media/gallery-4-terrace-sanctuary.webp',
          caption: 'Pematang sawah terasering berundak yang ditanam mengikuti pranata mangsa adat.',
        },
        {
          id: 5,
          src: '/assets/media/gallery-5-golden-dawn.webp',
          caption: 'Kabut fajar perlahan terangkat menyinari atap-atap ijuk dan hamparan padi menguning.',
        },
        {
          id: 6,
          src: '/assets/media/gallery-6-leuit-row.webp',
          caption: 'Deretan lumbung Leuit panggung di sepanjang tepian sawah pegunungan yang asri.',
        },
        {
          id: 7,
          src: '/assets/media/gallery-7-rengkong-closeup.webp',
          caption: 'Resonansi gesekan bambu rengkong berirama serempak dengan langkah kaki warga.',
        },
        {
          id: 8,
          src: '/assets/media/gallery-8-ceremony-elders.webp',
          caption: 'Para sesepuh adat memanjatkan doa khidmat dan persembahan pada perayaan Seren Taun.',
        },
        {
          id: 9,
          src: '/assets/media/gallery-9-granary-detail.webp',
          caption: 'Sambungan pasak kayu suren dan lapisan atap ijuk tebal tanpa paku besi.',
        },
      ],
    },
    closing: {
      tag: 'Warisan Hidup di Era Modern',
      sentence: 'Warisan budaya bukanlah pajangan di balik kaca; ia hidup hanya saat dijalani, ditanam, dan dijaga oleh setiap generasi.',
      tipsTitle: 'Tata Krama Berkunjung',
      tips: [
        {
          num: '01',
          title: 'Busana Gelap & Sopan',
          body: 'Kenakan pakaian bernuansa gelap dan tertutup saat berada di sekitar Imah Gede serta dapur adat.',
        },
        {
          num: '02',
          title: 'Izin Sebelum Memotret',
          body: 'Selalu meminta izin sebelum memotret tetua adat, prosesi sakral, area dapur, atau bagian dalam leuit.',
        },
        {
          num: '03',
          title: 'Bawa Pulang Seluruh Sampah',
          body: 'Lembah Halimun tidak memiliki tempat pembuangan akhir kota; bawa kembali seluruh sampah plastik ke kota asal.',
        },
      ],
      travelInfo: 'Dapat diakses lewat jalur tanah berbatu selatan Pelabuhan Ratu dan Cisolok. Sebaiknya konfirmasi terlebih dahulu melalui penghubung adat.',
      backToTop: 'Kembali ke atas',
      location: 'Sukabumi, Jawa Barat · 6°49′LS, 106°30′BT · 1.050 MDPL',
      credits: 'Scroll feel terinspirasi dari konsep Odisha Tourism oleh Code Media Labs.',
    },
  },
};
