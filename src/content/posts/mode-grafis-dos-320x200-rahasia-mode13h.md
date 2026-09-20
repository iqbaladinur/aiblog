---
title: "320x200: Angka Aneh yang Diam-Diam Ngatur Wajah Semua Game DOS"
pubDatetime: 2026-09-20T02:00:00.000Z
modDatetime: 2026-09-20T02:00:00.000Z
slug: mode-grafis-dos-320x200-rahasia-mode13h
tags: [dos, retro-computing, vga]
description: "Kenapa hampir semua game DOS klasik punya resolusi 320x200 yang aneh? Jawabannya bukan soal selera desainer, tapi trik matematika buat ngakalin segmen memori 64KB."
---

Pernah perhatiin kenapa karakter di game DOS jadul — dari Commander Keen sampe Doom awal — keliatan agak "gepeng" atau gendut dikit dibanding versi modern? Itu bukan gaya seni. Itu efek samping dari satu angka aneh yang jadi standar hampir semua game PC era 1987-1995: **320 x 200 piksel**. Dan alasan angka ini dipilih ternyata sama sekali gak ada hubungannya sama estetika — murni akal-akalan programmer buat muat ke dalam kotak memori 64 kilobyte.

## Kenapa harus 320x200, bukan angka lain?

Waktu IBM ngeluarin standar VGA lewat PS/2 di tahun 1987, salah satu mode paling populer yang dipake programmer adalah **Mode 13h** (angka 13 dalam heksadesimal, mode ke-19 di BIOS video). Mode ini ngasih 256 warna sekaligus di layar — lompatan besar dari EGA yang cuma 16 warna.

Tapi kenapa resolusinya pas 320x200? Kalau dihitung: 320 × 200 = **64.000 byte**. Itu pas banget muat di satu segmen memori 64KB (65.536 byte) yang dialokasikan di alamat `A000h` pada arsitektur real-mode DOS. Setiap piksel cuma butuh 1 byte (buat nunjuk salah satu dari 256 warna palet), jadi seluruh layar bisa "dipetakan" langsung ke satu blok memori tanpa perlu ribet ganti-ganti segmen (bank switching). Programmer tinggal `mov` byte ke alamat memori, dan piksel langsung nongol di layar — simpel dan cepet, penting banget di era CPU 8088/286 yang masih pelan.

Efek sampingnya: karena rasio 320:200 itu 1.6:1, sementara monitor CRT dirancang buat rasio 4:3 (1.33:1), piksel Mode 13h jadi **gak persegi** — agak lonjong ke atas-bawah. Makanya lingkaran di game DOS lama kalo digambar "sempurna" secara data, keliatannya malah oval pas ditonton di CRT beneran.

## Trik ekstra: nebeng 768 byte "sisa"

Ada detail unik yang jarang dibahas: segmen `A000h` sebenernya nyediain 65.536 byte, sementara layar cuma makan 64.000. Sisa **1.536 byte** di ujung situ — dari offset 64.000 sampe 65.536 — ternyata aman dipakai tanpa efek buruk ke tampilan. Programmer sering nyelipin data palet warna di situ: 256 warna × 3 komponen RGB = 768 byte, pas muat di ruang "bonus" itu. Jadi satu segmen memori dipake dua kali lipat fungsinya — hemat alokasi tanpa nabrak batas 64KB.

![IBM VGA graphics card era PS/2](/images/mode-grafis-dos-1.jpg)
*Kartu VGA IBM PS/2 — chipset yang melahirkan standar Mode 13h di tahun 1987. Sumber: Wikimedia Commons (Vlask, CC BY-SA 4.0)*

## Mode X: hack "tidak resmi" yang jadi rahasia umum industri

Mode 13h punya satu kelemahan: piksel gak persegi bikin gerakan diagonal keliatan janggal, dan cuma ada satu buffer di memori — susah buat bikin animasi mulus tanpa flicker. Solusinya datang bukan dari IBM, tapi dari seorang programmer bernama **Michael Abrash**, yang mempublikasikan trik ini di kolom "Ramblings in Realtime" di majalah *Dr. Dobb's Journal* edisi Juli 1991.

Trik itu dinamai **Mode X** — dan sebenarnya bukan mode resmi yang didokumentasikan IBM sama sekali. Caranya: masuk dulu ke Mode 13h lewat BIOS interrupt seperti biasa, terus diam-diam ubah beberapa register VGA secara langsung buat masuk ke kondisi "unchained". Di mode unchained ini, memori video yang tadinya 1 blok 64KB kepecah jadi **4 plane** terpisah, masing-masing 64KB — total jadi 256KB memori yang bisa dipake. Hasilnya: resolusi bisa dinaikin ke 320x240 (piksel persegi sempurna!), dan yang lebih penting, ada cukup ruang buat **page flipping** — nyiapin frame berikutnya di background sambil frame sekarang masih ditampilkan, jadi animasi jauh lebih mulus tanpa robek gambar (tearing).

Karena gak resmi, Mode X harus dipelajari lewat reverse-engineering kombinasi register yang gak ada di manual mana pun. Tapi begitu triknya nyebar, developer game langsung ngadopsi rame-rame. Beberapa yang kepake: seri pinball legendaris **Pinball Fantasies** dan **Pinball Illusions**, **Epic Pinball**, port awal **Quake**, **Earthworm Jim**, sampe **The Lost Vikings**. Semua nebeng celah yang gak pernah dijanjiin IBM ada.

## Warisan satu angka

Yang menarik, 320x200 bukan cuma soal batasan teknis — angka ini jadi identitas visual buat satu generasi game. Bahkan setelah hardware makin kenceng dan resolusi lebih tinggi jadi mungkin, banyak developer tetep milih turunan resolusi ini karena udah kepalang jadi "bahasa visual" genre tertentu, mirip gimana 8-bit jadi gaya seni sendiri di luar keterbatasan hardware aslinya.

Jadi lain kali liat game DOS jadul yang keliatan agak "gepeng", inget: itu bukan bug seni, itu matematika 320 dikali 200 yang pas banget muat di kotak 64 kilobyte.
