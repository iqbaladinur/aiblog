---
title: "Trik Mode 7 SNES: 3D Palsu yang Bikin Konsol 16-Bit Ketipu Mata"
pubDatetime: 2026-09-21T02:00:00.000Z
modDatetime: 2026-09-21T02:00:00.000Z
slug: snes-mode-7-pseudo-3d
tags: ["snes", "retro-hardware", "game-design"]
description: "F-Zero dan Mario Kart kelihatan '3D' padahal SNES cuma punya grafis 2D — dan anehnya, Nintendo sendiri butuh chip tambahan buat nge-trick-nya sendiri."
---

Coba pikir: SNES itu konsol 16-bit generasi 2D, gak punya polygon, gak punya GPU 3D apapun. Tapi kenapa trek di F-Zero bisa melengkung kayak jalan raya sungguhan, dan sirkuit Mario Kart kelihatan meluas ke arah horizon? Jawabannya bukan sihir — tapi juga bukan sesederhana yang orang kira. Bahkan Nintendo sendiri sampai kewalahan ngakalin batasan chip buatan mereka sendiri.

Namanya **Mode 7**, salah satu dari 8 mode grafis di PPU (Picture Processing Unit) SNES. Dan cerita di baliknya jauh lebih nyeleneh dari sekadar "rotasi dan scaling".

## Bukan 3D, Cuma Satu Layer yang Dipelintir

Mode 7 pada dasarnya cuma bikin **satu background layer** bisa diputar dan di-scale secara matematis (affine transformation). Itu doang. Gak ada kedalaman beneran, gak ada polygon, gak ada kamera 3D. Yang bikin efeknya kelihatan seperti dunia 3D yang melebar ke horizon adalah trik tambahan: layer itu ditransformasi ulang **di setiap scanline** lewat sistem bernama HDMA (Horizontal DMA), yang jalan tiap kali sinar CRT loncat ke baris berikutnya.

Jadi ilusi "jalan yang mengecil ke kejauhan" di F-Zero itu sebenarnya cuma satu gambar datar yang di-scale beda-beda tiap baris pixel horizontal — makin ke atas layar, makin kecil skalanya, biar kelihatan makin jauh. Bukan geometri 3D, tapi manipulasi skala per-baris yang dieksekusi ribuan kali per detik.

![Demo teknis efek Mode 7 SNES — satu layer background dirotasi & di-scale per-scanline sampai kelihatan seperti lantai 3D](/images/snes-mode7-demo.png)
*Demo Mode 7 SNES: satu bidang datar ditekuk secara matematis jadi ilusi "lantai" yang melebar ke horizon. Foto: Wikimedia Commons, domain publik.*

![Konsol Super Nintendo Entertainment System, rumah dari chip PPU yang menjalankan Mode 7](/images/snes-mode7-console.jpg)
*Super Nintendo Entertainment System (SNS-001) — foto: Evan-Amos, Wikimedia Commons, domain publik.*

## Batasan yang Jarang Disebut: Cuma Satu Layer, 128x128 Tile Tetap

Ini bagian yang sering dilewatin pembahasan umum soal Mode 7: layer yang bisa ditransformasi itu **fixed** — ukuran tilemap-nya selalu 128x128 tile 8x8 piksel, gak peduli mode grafis lain bisa lebih kecil (32x32) atau lebih besar. Dan yang lebih penting: **Mode 7 cuma jalan di satu background layer, sama sekali gak bisa dipakai buat sprite**.

Konsekuensinya lucu: kalau ada objek yang secara visual "nempel" ke tanah yang berputar — platform, rintangan, item di trek — itu **bukan** bagian dari layer Mode 7. Developer terpaksa gambar ulang objek-objek itu sebagai sprite terpisah yang diposisikan manual biar seolah-olah ikut muter bareng lantai. Semua elemen yang keliatan menyatu dengan dunia berputar itu sebenarnya trik tempel manual, bukan hasil transformasi tunggal.

## Ironi Terbesar: SNES Butuh Bantuan Chip Luar Buat Trik Buatannya Sendiri

Nah ini yang paling nyeleneh. Rotasi dan scaling Mode 7 butuh perhitungan matematika (perkalian, trigonometri) yang lumayan berat buat CPU 65816 SNES yang cuma jalan di ~3.58 MHz. SNES sebenarnya punya hardware fast-multiply — tapi unit itu ada **di dalam PPU yang sama** yang lagi dipakai buat Mode 7, jadi gak bisa dipakai bersamaan saat Mode 7 aktif. Nintendo bikin fitur canggih, tapi fitur itu justru mengunci akses ke hardware matematika cepatnya sendiri.

Solusinya? Nintendo dan developer pihak ketiga nyelipin **chip koprosesor terpisah di dalam cartridge** — yang paling terkenal namanya DSP-1. Chip mini ini isinya cuma buat ngitung matriks rotasi/scaling lebih presisi dan cepat, lalu ngirim hasilnya balik ke CPU utama. *Super Mario Kart* dan *Pilotwings* — dua game paling identik dengan Mode 7 — sebenarnya gak akan berjalan semulus itu tanpa chip tambahan ini. Artinya, konsol yang "terkenal" karena satu trik grafis, ternyata butuh hardware ekstra buat trik itu sendiri jalan maksimal — informasi yang jarang muncul di luar forum teknis SNES.

## Kenapa Efeknya Awet Sampai Sekarang

Mode 7 juga punya fitur wraparound — layer yang ditransformasi bisa "membungkus" tak berhingga, itulah kenapa trek balap kelihatan menyatu mulus tanpa batas tepi yang kentara. Kombinasi HDMA per-scanline + wraparound + (kalau perlu) DSP-1 inilah yang bikin generasi 90-an percaya SNES punya grafis 3D, padahal semuanya murni trik 2D yang dieksekusi dengan presisi timing luar biasa.

Sampai hari ini, komunitas romhacking dan homebrew masih ngoprek Mode 7 buat bikin efek yang gak kepikiran developer aslinya — bukti bahwa satu trik sederhana bisa punya kedalaman teknis yang jauh lebih rumit dari yang keliatan di layar.
