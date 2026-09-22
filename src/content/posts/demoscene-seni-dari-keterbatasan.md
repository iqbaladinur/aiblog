---
title: "Game 3D Selebar 96 Kilobyte: Trik Gila di Balik Demoscene"
pubDatetime: 2026-09-22T08:00:00.000Z
modDatetime: 2026-09-22T08:00:00.000Z
slug: demoscene-seni-dari-keterbatasan
tags: ["demoscene", "retro-computing", "programming"]
description: "Sebuah FPS 3D lengkap dengan musik, tekstur, dan level cuma berukuran 96 kilobyte — lebih kecil dari foto HP lo. Ini rahasia programmernya."
---

Bayangin sebuah game first-person shooter 3D lengkap — ada musik, tekstur detail, model senjata, beberapa level buat dijelajahi — tapi ukuran filenya cuma **97.280 byte**. Bukan 97 megabyte. Byte. Itu lebih kecil dari kebanyakan foto hasil jepretan HP lo sekarang.

Game itu beneran ada, namanya **.kkrieger**, dan jawaban gimana caranya ada di dunia **demoscene** — subkultur programmer yang sejak awal 1980-an demen bikin karya visual & audio se-keren mungkin dalam batasan ukuran file yang gila-gilaan kecil. Bukan buat dijual. Bukan buat dimainin orang awam. Cuma buat pamer skill ke sesama coder.

## Awalnya dari pesan bajakan

Sebelum jadi ajang pamer teknis murni, demoscene lahir dari kebiasaan yang jauh lebih nakal: **cracktro**. Di scene Commodore 64 tahun 1984, kelompok yang berhasil membobol proteksi salinan sebuah game nggak cuma numpang ngerusak title screen kayak yang biasa dilakuin di Apple II. Mereka bikin halaman terpisah — sebuah "intro" singkat yang muncul sebelum game aslinya jalan, isinya nama grup, kadang efek visual & musik chiptune, semacam tanda tangan digital "kami yang crack ini".

Lama-lama, bikin cracktro yang keren jadi ajang gengsi tersendiri, lepas dari game bajakannya. Grup-grup mulai kompetisi bikin intro paling megah, sampai akhirnya lahir event khusus buat pamer karya ini — **demoparty**.

## Assembly dan demo yang bikin PC jadi "nggak masuk akal"

Salah satu demoparty paling legendaris, **Assembly** di Finlandia, jadi panggung buat demo yang mengubah cara orang mikir soal apa yang bisa dilakuin PC. Di Assembly '93, grup Finlandia **Future Crew** merilis **Second Reality** — demo yang menampilkan efek 2D & 3D yang saat itu dianggap mustahil buat PC biasa, lengkap dengan musik yang tersinkron sempurna. Demo ini masih dianggap salah satu demo PC terbaik sepanjang masa, dan jadi rujukan wajib kalau ngomongin sejarah demoscene.

Tapi trik yang bikin Second Reality "wah" tahun 1993 itu beda liga sama trik yang dipake buat nge-squeeze game 3D penuh ke 96 kilobyte satu dekade kemudian.

## Rahasia .kkrieger: tekstur yang nggak disimpan sebagai gambar

.kkrieger dibikin grup Jerman **Farbrausch** (lewat sub-divisi mereka, .theprodukkt) dan menang kompetisi "96k game" di demoparty Breakpoint, April 2004. Yang bikin ini beda dari kompresi file biasa: hampir **nggak ada aset yang benar-benar disimpan**.

Tekstur, misalnya, sama sekali nggak disimpan per-pixel kayak file JPEG atau PNG biasa. Sebaliknya, yang disimpan di dalam executable cuma:

- **riwayat pembuatan** tekstur itu — semacam resep langkah demi langkah
- **kode generator** yang bisa "memasak" resep itu jadi tekstur utuh saat game dijalankan

Jadi bukan gambar yang dikompres, tapi *instruksi cara menggambar ulang* gambar itu dari nol, setiap kali game dibuka. Hal yang sama berlaku buat model 3D, musik, bahkan sebagian layout level — semuanya digenerate secara prosedural saat runtime, bukan dibaca dari file statis.

![Screenshot gameplay .kkrieger, FPS 3D penuh yang cuma 96 KB di disk](/images/demoscene-seni-dari-keterbatasan-2.jpg)
*.kkrieger (2004) oleh .theprodukkt/Farbrausch — semua tekstur & model di-generate prosedural saat runtime, bukan disimpan sebagai aset. Foto: Wikimedia Commons, BSD license.*

Konsekuensinya cukup ekstrem: begitu dijalankan, executable 96 KB ini bisa **membengkak sampai sekitar 300 MB** di memori RAM komputer, karena semua konten yang tadinya cuma berupa "resep" itu di-render jadi data penuh saat itu juga. File di disk kecil mungil, tapi begitu hidup, dia rakus RAM.

![Commodore 64, komputer rumahan yang jadi tempat lahirnya cracktro pertama tahun 1984](/images/demoscene-seni-dari-keterbatasan-1.jpg)
*Commodore 64 — mesin yang jadi rumah pertama cracktro, cikal-bakal demoscene. Foto: Wikimedia Commons (CC BY-SA 3.0)*

## Kenapa nggak sekalian kompresi biasa?

Kompresi standar (zip, dsb) punya batas: data acak/kompleks kayak tekstur foto-realistis nggak bisa dikecilin drastis tanpa kehilangan detail. Prosedural generation nyolong jalan pintas: kalau lo bisa nulis **algoritma singkat** yang menghasilkan pola kompleks (noise, gradient, pattern berulang dimodifikasi), lo cuma perlu simpan algoritmanya — beberapa ratus byte — bukan hasil akhirnya yang bisa berukuran megabyte.

Teknik yang sama masih hidup sampai sekarang di kompetisi **64K intro**, di mana grup demoscene modern kayak Ctrl-Alt-Test bikin adegan visual sekelas render film — termasuk scene bawah laut detail yang pernah dipresentasikan di ajang akademik SIGGRAPH Asia — semuanya lahir dari kode generator, bukan aset yang digambar manual.

## Kenapa ini penting di luar "pamer doang"

Demoscene sering diremehin sebagai hobi coder yang cuma buat gagah-gagahan. Tapi teknik procedural generation yang diasah di sana — bikin banyak dari sedikit — jadi fondasi buat banyak hal di industri game modern: dari texture generation di game AAA, sampai world generation ala *No Man's Sky* yang bikin galaksi raksasa dari kode beberapa ratus megabyte doang.

Jadi lain kali lo liat game bertema "infinite universe" atau tekstur prosedural di engine modern, inget: itu bukan ide baru. Programmer di garasi tahun 2004 udah ngelakuin versi ekstremnya — bikin FPS penuh muat di ruang yang lebih kecil dari satu foto selfie.