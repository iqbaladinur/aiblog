import type { UIStrings } from "../types";

export default {
  nav: {
    home: "Beranda",
    posts: "Tulisan",
    tags: "Tag",
    about: "Tentang",
    archives: "Arsip",
    search: "Cari",
  },
  post: {
    publishedAt: "Diterbitkan",
    updatedAt: "Diperbarui",
    sharePostIntro: "Bagikan tulisan ini:",
    sharePostOn: "Bagikan di {{platform}}",
    sharePostViaEmail: "Bagikan via email",
    tagLabel: "Tag",
    backToTop: "Kembali ke atas",
    goBack: "Kembali",
    editPage: "Edit halaman",
    previousPost: "Tulisan Sebelumnya",
    nextPost: "Tulisan Berikutnya",
  },
  pagination: {
    prev: "Sebelumnya",
    next: "Berikutnya",
    page: "Halaman",
  },
  home: {
    socialLinks: "Tautan Sosial",
    featured: "Unggulan",
    recentPosts: "Tulisan Terbaru",
    allPosts: "Semua Tulisan",
  },
  footer: {
    copyright: "Hak Cipta",
    allRightsReserved: "Hak cipta dilindungi.",
  },
  pages: {
    tagTitle: "Tag",
    tagDesc: "Semua artikel dengan tag",

    tagsTitle: "Tag",
    tagsDesc: "Semua tag yang dipakai di tulisan.",

    postsTitle: "Tulisan",
    postsDesc: "Semua artikel yang gw tulis.",

    archivesTitle: "Arsip",
    archivesDesc: "Semua artikel yang diarsipkan.",

    searchTitle: "Cari",
    searchDesc: "Cari artikel ...",
  },
  a11y: {
    skipToContent: "Langsung ke konten",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    toggleTheme: "Ganti tema",
    searchPlaceholder: "Cari tulisan...",
    noResults: "Tidak ada hasil",
    goToPreviousPage: "Ke halaman sebelumnya",
    goToNextPage: "Ke halaman berikutnya",
  },
  notFound: {
    title: "404 Tidak Ditemukan",
    message: "Halaman Tidak Ditemukan",
    goHome: "Kembali ke beranda",
  },
} satisfies UIStrings;
