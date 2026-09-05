---
pubDatetime: 2026-09-05T12:00:00.000Z
modDatetime: 2026-09-05T12:00:00.000Z
title: "RetroPie & Raspberry Pi: Komputer Amal yang Jadi Konsol Retro Favorit Dunia"
slug: retropie-raspberry-pi
featured: false
draft: false
tags:
  - emulasi
  - raspberry-pi
  - retro-gaming
description: Papan sirkuit hijau seharga segelas kopi yang dibuat buat anak sekolah belajar coding — kok bisa jadi tulang punggung scene emulasi game retro sedunia?
---

Coba tebak: konsol retro paling berpengaruh di era 2010-an itu apa? Bukan bikinan Nintendo, Sony, atau Sega. Bentuknya bukan konsol — tapi **papan sirkuit hijau seukuran kartu kredit**, dijual bukan sebagai alat game, melainkan sebagai komputer edukasi murah.

Dan cerita di baliknya penuh ironi: GPU di dalamnya ada bukan buat game, melainkan buat **nonton video**. CPU-nya bahkan bukan "otak" yang pertama nyala. Ini kisah kenapa Raspberry Pi — komputer amal — justru jadi mesin emulasi paling populer di dunia.

![Raspberry Pi Model B generasi pertama (2012) — papan hijau yang mengubah scene emulasi rumahan](/images/retropie-rpi-1.jpg)
*Raspberry Pi Model B orisinal. Foto: Tors, CC BY-SA 3.0 DE (Wikimedia Commons)*

## Lahir dari masalah pendidikan, bukan game

Raspberry Pi lahir dari Raspberry Pi Foundation, badan amal pendidikan Inggris yang terinspirasi BBC Micro — komputer sekolah legendaris era 80-an. Timnya prihatin anak-anak zaman itu cuma bisa *memakai* komputer, bukan *memprogram*-nya. Prototipe sudah mereka garap sejak 2006; butuh enam tahun sampai akhirnya 29 Februari 2012 Model B resmi dijual seharga US$35.

Reaksinya? Langsung ludes — sampai websitenya jebol karena kebanjiran pesanan.

Namanya pun punya cerita. "Raspberry" ngikutin tradisi penamaan komputer era 80-an yang pakai buah: Apple, Apricot, Tangerine, bahkan Acorn (komputer pendahulu Pi di Inggris). Sedangkan "Pi" diambil dari **Python** — karena rencana awalnya, Pi cuma mau jalanin Python sebagai bahasa utama.

## Keanehan teknis: GPU yang "nonton video" malah jago ngegame

Ini bagian yang jarang dibahas. Di Raspberry Pi, yang pertama kali nyala **bukan** CPU ARM-nya. Prosesor utamanya justru GPU VideoCore IV: GPU itu yang powered-on duluan, muter firmware dari kartu SD, baru kemudian "menghidupkan" ARM. Linux di Pi praktis jalan di prosesor *sekunder*. Makanya Pi nggak punya BIOS ala PC — yang ada ROM di dalam GPU.

Kok bisa begitu? Karena chipnya, BCM2835, awalnya dirancang buat perangkat multimedia — GPU-nya ada buat decode video HD. Eben Upton, arsitek Broadcom yang ikut mendesain chip itu, sadar satu chip = ongkos produksi jauh lebih murah. Nah, konsekuensi tak terduganya: GPU yang tadinya "buat nonton film" ini ternyata jago banget buat scaling dan grafis 2D — persis modal yang dibutuhkan emulator game klasik.

## RetroPie: dari adapter SNES kesayangan ke fenomena

Juli 2012 — Pi baru rilis beberapa bulan — Florian Müller (dikenal sebagai *petrockblock*) memulai proyek bernama SNESDev-RPi: adapter buat nyolokin **kontroler SNES asli** ke Pi. Dari situ dia ngerakit RetroPie Setup Script: skrip bash yang mengotomasi instalasi emulator dan frontend di atas Raspbian.

Frontend-nya, EmulationStation, juga punya asal usul serupa: ditulis Alec Lofquist ("Aloshi") buat mengubah Pi miliknya sendiri jadi konsol retro, dengan UI dari Nils Bonenberger. Ketika keduanya pindah ke proyek lain, RetroPie mengambil alih dan merawat fork-nya sendiri sampai sekarang.

Kenapa kombinasi ini mengubah segalanya?

- **Emulasi turun dari meja ke sofa.** Sebelumnya, emulasi identik dengan PC: mahal, ribet, dan nempel di monitor. RetroPie bikin pengalaman "konsol beneran": colok TV, pasang kontroler USB, boot langsung ke menu daftar game.
- **Masukin game semudah transfer file.** RetroPie otomatis nyediain folder berbagi (Samba) per sistem — tinggal drop ROM lewat WiFi, restart, main.
- **Library jadi kayak Steam.** EmulationStation punya scraper yang narik box art dan metadata dari internet. Koleksi game lo tampil dengan sampul rapi, bukan daftar teks kusam.
- **Basis yang sehat.** RetroPie dibangun di atas RetroArch dan core libretro — emulator yang dipakai bareng-bareng, dirawat komunitas global. Total sistem yang didukung: puluhan, dari NES sampai PlayStation.

![Raspberry Pi 4 — generasi modern yang masih jadi favorit build emulasi](/images/retropie-rpi-2.jpg)
*Raspberry Pi 4 Model B. Foto: Laserlicht, CC BY-SA 4.0 (Wikimedia Commons)*

## Efek dominonya

Stack open source ini (EmulationStation + RetroArch) nyebar ke mana-mana. Handheld retro China kayak RG35XX dan saudara-saudaranya? Jalan di atas fondasi yang sama. Distro khusus kayak Lakka? Turunan idenya. Kabinet arkade DIY di ruang tamu orang? Itu juga Pi di dalamnya. Bahkan tren konsol mini resmi ikut diuntungkan — orang-orang "dipanaskan" dulu sama pengalaman main game lawas di TV.

Tentu ada catatan jujurnya: RetroPie tidak pernah membundel ROM atau BIOS — urusan itu ada di tangan pengguna, dan secara legal emulasi tetap zona abu-abu yang harus disikapi dewasa.

Tapi satu hal nggak bisa dipungkiri: komputer yang dirancang buat ngajar anak-anak ngoding, dengan GPU "buat nonton video" dan CPU yang bahkan bukan bos di rumahnya sendiri, justru jadi gerbang nostalgia paling ramah di dunia. Kadang revolusi datang dari arah yang nggak pernah diduga — bahkan oleh pembuatnya sendiri.
