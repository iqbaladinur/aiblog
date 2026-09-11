---
author: Iqbal Adi
pubDatetime: 2026-09-11T12:00:00.000Z
modDatetime: 2026-09-11T12:00:00.000Z
title: "640 KB Bukan Batas Komputer — Itu Cuma Keputusan IBM yang Salah"
slug: memori-dos-640kb
featured: false
draft: false
tags:
  - retro-computing
  - dos
  - hardware-history
description: Batas 640 KB di era DOS bukan keterbatasan prosesor, tapi satu keputusan desain IBM tahun 1981 — dan butuh lebih dari satu dekade kerja manusia untuk mengakalinya.
---

Angka ini pernah bikin jutaan orang mengedit file teks di layar hitam jam dua pagi: **640 KB**. Buat siapa pun yang pernah ngerakit `config.sys` demi bisa main game, itu bukan angka — itu momok.

Yang hampir semua orang salah paham: 640 KB **bukan batas prosesor, bukan batas DOS, dan bukan batas fisik memori**. Itu batas yang digambar tangan IBM pada 1981 — dan industri menghabiskan sekitar 15 tahun berikutnya untuk menyiasatinya.

## Prosesornya Sebenarnya Bisa 1 MB

Intel 8088 di IBM PC punya 20 jalur alamat: bisa menembak **1.048.576 byte**. Dari semua itu, IBM memberi **655.360 byte** (640 KiB) untuk RAM program, lalu mengunci 384 KiB sisanya.

Bukan karena malas. BIOS **harus** tinggal di puncak ruang alamat — x86 selalu mulai mengeksekusi dari alamat tetap setelah reset, dan alamat itu harus bertahan walau listrik mati.

![Ilustrasi IBM PC, mesin yang desain memorinya tahun 1981 menghantui PC sampai pertengahan 90-an](/images/memdos-ibmpc.jpg)

*IBM PC (1981) di Computer History Museum. Sumber: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:IBM_PC,_1981,_Computer_History_Museum.jpg) (CC BY-SA 4.0).*

## 384 KB yang Nggak Boleh Disentuh DOS

![Peta alokasi memori IBM PC: 640 KB untuk program, 384 KB atas dikunci](/images/memdos-map.jpg)

*Peta ruang memori IBM PC/compatible. Sumber: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:IBM_PC_Memory_areas.svg) (CC BY-SA 3.0).*

Isi 384 KB itu dibagi rapi: `A0000`–`BFFFF` (128 KB) untuk memori layar VGA, `C0000`–`DFFFF` (128 KB) untuk option ROM termasuk BIOS video, lalu dua blok 64 KB terakhir untuk BIOS.

Leluconnya: di antara blok-blok itu hampir selalu ada **lubang kecil** — ruang tercadang yang nggak benar-benar terpakai. Bertahun-tahun kemudian, satu cabang software tumbuh hanya untuk memanen sisa celah itu. Dan bukti ini masalah IBM, bukan arsitektur: Apricot PC bisa 768 KiB, Sirius Victor 9000 sampai 896 KiB.

## Solusinya Bukan Menambah Alamat, Tapi "Jendela"

80286 (1984) secara teori sanggup 16 MB, tapi hanya di protected mode — dan nggak ada aplikasi DOS yang jalan di sana. Maka lahirlah bank switching: sistem menyediakan **page frame 64 KB** di area atas, dan program bisa "menurunkan kartu dari dek" — memetakan potongan memori mana pun ke jendela itu. Program era EMS nggak punya memori; mereka cuma punya satu jendela kecil plus daftar isi.

Standarnya digarap bersama Lotus, Intel, dan Microsoft (**LIM EMS**): versi 3.0 (1985) menembus 4 MiB, 3.2 menembus 8 MiB, **4.0 (Oktober 1987)** menembus 32 MiB. Standar pesaing dari AST Research, Quadram, dan Ashton-Tate bernama EEMS, akhirnya diserap ke EMS 4.0.

![Modul memori 30-pin, bentuk fisik dari memori yang jadi rebutan bertahun-tahun](/images/memdos-ram.jpg)

*Modul memori 30-pin. Sumber: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:30_pin_goldstar_memory_modules.jpg) (CC BY-SA 4.0).*

Bill Gates sendiri nggak pura-pura suka. Sambil menggebrak meja dalam sebuah wawancara, dia bilang soal expanded memory: *"It's garbage! It's a kludge! … But we're going to do it."*

## Dua Trik Paling Aneh di Atas 1 MB

**High memory area.** Ada RAM di atas 1 MB yang bisa dijangkau tanpa pindah ke protected mode. Ukurannya bukan 64 KB, melainkan **65.520 byte** — 64 KB dikurangi 16 byte. Sebabnya alamat x86 dihitung `segment × 16 + offset`, dan `FFFF:0010` jatuh tepat di `0x100000`. Prosesor 8086 melingkar balik ke alamat nol di titik itu; 80286 tidak, dan itu merusak program lama. Solusi IBM: menempelkan **gerbang logika di motherboard** yang bisa memutus jalur alamat ke-21 — Gate-A20 — awalnya dikendalikan lewat chip pengendali keyboard Intel 8042. Jadi untuk mengakses memori di atas 1 MB, CPU kadang harus mengobrol dulu dengan keyboard controller.

**Instruksi ilegal.** 80286 punya instruksi nggak terdokumentasi bernama **LOADALL** (opcode `0Fh 05h`) yang memuat seluruh register internal CPU sekaligus dan menaruh CPU di kondisi yang tidak diizinkan model pemrograman resmi. `HIMEM.SYS` 2.03 dan 2.04 (Agustus 1988) memakainya untuk menyalin data ke extended memory. Dan yang paling gila: **DOS 3.3 dan 4.0 sengaja menyisakan buffer 102 byte di `0070:0100h`** supaya LOADALL nggak perlu menyimpan dan memulihkan area data BIOS. Sistem operasi menyiapkan ruang untuk instruksi yang secara resmi tidak ada.

## Ritual `config.sys`

Bagi pengguna, semua itu jadi ritual: muat `HIMEM.SYS`, lalu `EMM386.EXE`, lalu `DOS=HIGH,UMB`, lalu setiap driver di-`DEVICEHIGH`. Memindahkan kernel DOS ke HMA bisa membebaskan sampai **46 KB**. `EMM386` cuma jalan di 386 ke atas karena butuh virtual 8086 mode dan MMU.

Lalu tumbuh pasar kedua: memory manager pihak ketiga. QEMM dari Quarterdeck jadi yang paling populer, disaingi 386MAX (Qualitas) dan Helix Netroom; semuanya harus bernegosiasi dengan Windows lewat API bernama GEMMIS. MS-DOS 6 (1993) menyediakan **MemMaker** yang mengotomatiskan ritual itu — tapi lo tetap reboot berkali-kali, dan konfigurasi optimal untuk satu game sering bikin game lain nggak jalan.

## Yang Menyelesaikan Masalah Bukan DOS

Jawabannya datang dari arah lain: keluar dari DOS. DOOM (1993) dibungkus **DOS/4GW**, DOS extender 32-bit — versi gratis terbatas dari DOS/4G yang dibundel bareng compiler Watcom C — yang langsung masuk protected mode dan mengalamati puluhan megabyte. Banner `RATIONAL DOS/4GW` yang muncul sepersekian detik sebelum game mulai jadi kenangan kolektif satu generasi. Masalah 640 KB nggak diselesaikan; ia ditinggalkan.

## Dan Soal Kutipan Terkenal Itu

"640K ought to be enough for anybody." Kalimat itu nempel ke Bill Gates seperti tato — padahal menurut penelusuran Quote Investigator, dia kemungkinan besar **tidak pernah mengucapkannya**. Versi paling awal gagasan itu muncul di editorial InfoWorld 29 April 1985 oleh James E. Fawcette: *"When we set the upper limit of PC-DOS at 640K, we thought nobody would ever need that much memory"*. Ditanya pada 1996, Gates menjawab: *"I've said some stupid things and some wrong things, but not that."*

Pelajarannya bukan soal satu kutipan palsu. Pelajarannya soal harga backward compatibility: satu keputusan desain tahun 1981, diambil demi kompatibilitas kartu ekspansi dan ROM, memaksa satu dekade insinyur menulis instruksi ilegal dan menyelipkan driver ke celah bekas BIOS. Sampai hari ini, belum ada satu pun angka memori yang benar-benar "cukup".
