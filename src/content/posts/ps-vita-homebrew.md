---
title: "Konsol Gagal Ini Lebih Susah Dibobol dari PS3 — Sampai Akhirnya Dibajak Lewat Aplikasi Email"
pubDatetime: 2026-09-25T13:05:00.000Z
modDatetime: 2026-09-25T13:05:00.000Z
slug: ps-vita-homebrew
tags: ["ps-vita", "homebrew", "retro-hardware"]
description: "Tiga tahun nggak ada yang bisa nembus PS Vita secara native, sampai sekelompok hacker nemu celah di aplikasi Mail — dan Sony butuh 10 hari buat ngebalesnya."
---

Bayangkan cara nge-hack konsol paling gampang yang pernah ada: buka aplikasi **Mail** di konsol lo, buka satu email, dan konsol itu langsung jadi milik lo. Nggak perlu kabel, nggak perlu modchip, bahkan nggak perlu koneksi internet. Itu bukan lelucon — itu beneran cara orang ngebajak PlayStation Vita tahun 2016.

Tapi biar paham kenapa trik sekonyol itu sampai dibutuhin, lo harus tau dulu: Vita ini disebut sebagai perangkat mobile paling susah ditembus yang pernah Sony bikin — lebih ribet dari PS3, bahkan dibanding iOS.

![Layar PlayStation Vita setelah HENkaku dijalankan — homebrew installer muncul langsung di LiveArea](/images/ps-vita-homebrew-1.jpg)

## Kenapa Nggak Bisa Dibongkar dari Sisi Hardware?

Jalur normal buat ngebongkar konsol baru biasanya hardware dulu: tempelkan penyadap di jalur antara RAM dan CPU, lihat lalu lintas datanya, cari kebocoran. Cara itu yang dipakai buat membedah hampir semua konsol.

Vita menutup pintu itu sejak awal. DRAM-nya ditumpuk langsung di atas chip CPU dalam satu paket system-on-chip, jadi nggak ada jalur yang bisa disadap pakai alat konvensional. Yifan Lu, salah satu hacker yang terlibat di awal, nulis: secara teori mungkin, tapi dia nggak mau ngebongkar perangkat 300 dolar cuma demi "kemungkinan".

Jadi satu-satunya jalan masuk adalah software. Masalahnya, eksploitasi butuh pengetahuan soal layout memori — dan layout memori cuma bisa diketahui dari dump RAM, yang justru jadi tujuan eksploitasi itu sendiri. Umpan balik yang muter di tempat.

Hasilnya, selama **2012 sampai 2015** Vita cuma bisa "ditembus" dari satu pintu: emulator PSP internalnya, yang jalan dalam sandbox. Dari situ lahir VHBL, TN-V, ARK — semuanya cuma bisa ngejalanin homebrew PSP, bukan kode native Vita. Pertarungannya sepihak: begitu ada game PSP dengan bug yang dieksploitasi, Sony tinggal mencabutnya dari PlayStation Store.

## Hadiah dari Program yang Sedang Dimatikan

Titik baliknya justru datang dari inisiatif Sony sendiri: **PlayStation Mobile (PSM)**, cara buat developer indie nulis aplikasi sandboxed buat Vita. Runtime-nya berbasis Mono, yang basis kodenya (.NET) terbuka.

Di situlah Yifan Lu masuk. Selama tiga minggu, tiga sampai empat jam sehari, dia cuma membaca source code Mono dan membongkar aplikasi PSM versi Windows serta Android, mencari celah di sistem keamanan CoreCLR. Hasilnya dirilis Juni 2015 dengan nama **Rejuvenate** — bareng tools bernama UVLoader, homebrew native pertama yang beneran jalan di Vita.

Kedengarannya menang besar. Kenyataannya ironis dua kali: PSM justru sedang dimatikan Sony, jadi calon pengguna harus ngakalin lisensi developer yang sudah nggak dijual lagi. Lalu yang pahit — Sony dilaporkan menganalisis source UVLoader yang dirilis terbuka itu untuk menambal sistem di update berikutnya. Yifan Lu pun hengkang dari scene Vita dengan surat perpisahan yang getir.

## HENkaku: Bug yang Harus Ditulis dengan ROP

Juli 2016, dia balik lagi bareng tim bernama **Team Molecule** (xyz, Proxima, Davee). Yang mereka rilis, HENkaku, cuma butuh satu langkah dari sisi pengguna: buka browser konsol, kunjungi satu situs, tekan tombol.

Di balik kesederhanaan itu ada pekerjaan brutal. xyz menulis detailnya:

- ASLR di WebKit Vita punya entropi **9 bit**. Kedengeran kecil, tapi buat brute-force itu artinya rata-rata **256 kali reload** sebelum exploit nyantol — nggak realistis, jadi mereka butuh bug yang benar-benar bersih.
- Vita **nggak punya JIT**, dan halaman memori nggak bisa ditandai executable. Artinya setelah dapat code execution di browser, mereka nggak bisa sekadar menempelkan shellcode. Seluruh kernel exploit — tahap berikutnya dari rantai serangan — **ditulis dalam ROP**, nyusun instruksi dari potongan kode yang sudah ada di memori.

Bug yang mereka pakai datang dari sumber yang nggak disebut namanya, tanpa dokumentasi publik. HENkaku dirilis 29 Juli 2016.

## Duel 10 Hari, dan Tambalan yang Kelewat Niat

Sony nggak diam. **8 Agustus 2016** — sekitar sepuluh hari setelah HENkaku rilis — firmware 3.61 keluar dan langsung melubangi bug WebKit-nya. Tapi inti exploitnya belum mati.

Tambalan yang benar-benar mematikan baru datang lewat firmware 3.63 pada **1 November 2016**, dua bulan setelah xyz mempublikasikan cara kerja exploitnya. Di titik inilah ceritanya jadi menarik, karena cara Sony menambal jauh lebih "niat" dari yang dibutuhkan:

- Mereka menambahkan **reference counting socket di seluruh modul** SceNetPs — bukan cuma di fungsi yang bermasalah. Menurut xyz sendiri, ini sudah lebih dari cukup, bahkan berlebihan.
- Mereka menyisipkan sanity check sebelum operasi berbahaya: memastikan pointer vtable menunjuk ke section yang benar dan tiap fungsi di dalamnya menunjuk area kode yang benar. xyz menyebutnya **"poor man's CFI"** — versi murah dari control-flow integrity.

Reaksi xyz waktu itu setengah bercanda: Vita udah gagal secara komersial, buat apa Sony susah-susah sebegitu? "Kecuali... Sony sedang bikin Vita baru buat lawan Nintendo Switch?"

Yang lebih jenius lagi: begitu tahu hack-nya bakal ilang tiap konsol dimatikan, xyz menyelundupkan exploit yang sama ke dalam **aplikasi Mail** — yang di dalamnya juga ada WebKit. HENkaku pun bisa dipicu offline, cuma dengan membuka satu pesan. Team Molecule bahkan sengaja meng-obfuscate kodenya dan bikin kontes King of the Hill: siapa pun yang bisa mereverse-engineer ROP chain mereka akan diakui. Dua orang menyelesaikannya, dan source code HENkaku dibuka.

## Kartu Memori yang Jadi Salah Satu Alasan Konsol Ini Mati

Masalahnya nggak cuma software. Vita model awal **nggak punya storage internal sama sekali**, jadi semua orang wajib beli kartu memori proprietary Sony — harganya jauh di atas microSD sekelas. Shuhei Yoshida, yang dulu memimpin PlayStation, mengakuinya sebagai kesalahan: kartu memori khusus dan rear touchpad adalah "pilihan yang nggak bagus".

Tapi kartu game Vita punya autentikasi kriptografi yang sampai sekarang belum pernah ditembus. Dongle bajakan termahal yang pernah dicoba, Cobra Black Fin, gagal — dan desainnya memang aneh: lo masih harus terhubung ke pengguna lain yang punya kartu asli dan bersedia berbagi.

Solusinya justru lebih elegan. **SD2Vita**, dirilis Juli 2017 berdasarkan riset motoharu dan xyzz, cuma adapter mekanik microSD ke slot kartu game — karena di level elektrik, slot itu sebenarnya MMC. Lewat plugin kernel, microSD-nya di-mount sebagai `ux0:`, posisi yang biasa diisi kartu Sony.

![Kartu memori proprietary PS Vita — mahal, dan wajib karena model awal tak punya penyimpanan internal](/images/ps-vita-homebrew-3.jpg)

![Adapter SD2Vita: microSD biasa dicolok ke slot kartu game, lalu di-mount sebagai penyimpanan utama](/images/ps-vita-homebrew-2.jpg)

## Sony Sudah Berhenti, Komunitas Belum

Sony berhenti merilis angka penjualan Vita setelah Agustus 2012. Estimasi akhirnya berkisar 14–15 juta unit — dibanding PSP yang menembus 80 juta. Produksinya dihentikan Maret 2019, dan Sony nggak pernah lagi bikin handheld murni.

Tapi perangkat ini justru jadi salah satu konsol paling "hidup" setelah mati. Rantai exploit-nya terus tumbuh: **Ensō** membuatnya permanen sejak boot di firmware 3.60 dan 3.65, **h-encore** membuka 3.65–3.68, **Trinity** menaklukkan 3.69–3.70, dan **Modoru** memungkinkan downgrade firmware. Port seperti GTA: San Andreas bahkan jalan dengan cara gila: executable ARMv7 versi Android dimuat ke memori, import-nya dipetakan ke fungsi native Vita, lalu di-patch — praktis "emulator Android minimalis" yang menjalankan binary aslinya native.

Dan ada satu lingkaran penuh yang manis: buat menjalankan homebrew grafis modern, scene butuh `libshacccg.suprx` — shader compiler resmi Sony yang harus diekstrak dan didekripsi dari runtime PSM. Program yang dulu dimatikan Sony itu, bertahun-tahun kemudian, jadi hadiah yang bikin Vita tetap bisa memainkan hal-hal baru. Kadang cara terbaik menyelamatkan sebuah perangkat bukan dengan menjualnya lebih banyak, tapi dengan melepaskan kuncinya.
