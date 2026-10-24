---
title: "Doom Nggak Pakai Raycasting — dan Itu Bukan Detail Sepele"
pubDatetime: 2026-10-24T08:00:00.000Z
modDatetime: 2026-10-24T08:00:00.000Z
slug: doom-engine-bsp-bukan-raycasting
tags: ["game", "retro", "engine"]
description: "Kebanyakan orang (dan setengah internet) bilang engine Doom itu raycasting. Salah — dan bedanya menjelaskan kenapa Doom punya lorong miring sementara Wolfenstein 3D mentok di kotak."
---

Tanya sepuluh orang "engine Doom itu apa?", sembilan bakal jawab **raycasting**. Jawaban itu salah. Bukan salah ketik, bukan simplifikasi yang innocent — itu beda arsitektur yang langsung menjelaskan kenapa Doom bisa punya lorong miring, tangga, jendela, dan kolam lava, sementara Wolfenstein 3D mentok di grid kotak selamanya.

Kesalahpahaman ini nyebar karena Wolfenstein 3D, game sebelumnya dari studio yang sama, **memang** raycasting.

![Screenshot Freedoom yang dirender pakai software renderer khas Doom](/images/doom-engine-bsp-1.png)
*Freedoom (aset bebas lisensi BSD) di software renderer khas Doom: semua tembok vertikal, lantai dan plafon datar, sprite musuh cuma punya 8 sudut putar. Sumber: Wikimedia Commons (BSD, Hugo Locurcio)*

## Raycasting itu ide bagus — sampai lo butuh dinding miring

Raycasting ala Wolfenstein 3D itu jenius karena sederhana: peta disimpan sebagai grid kotak, dan buat tiap kolom piksel di layar, lo tembak satu sinar dari posisi pemain sampai nabrak tembok. Jarak tabrakan = tinggi tembok di layar. Selesai. Nggak ada poligon, nggak ada sorting, nggak ada z-buffer.

Tapi ada harga yang dibayar: **semua tembok harus tegak lurus grid dan semua ruangan punya tinggi yang sama**. Nggak ada lorong diagonal, nggak ada jendela yang bisa dilihat tembus, nggak ada lantai bertingkat. Kalau lo lihat screenshot Wolf3D lama-lama, rasa "kotak-kotak"-nya bukan gaya seni — itu batas matematis mesinnya.

Doom mau lebih dari itu. Dan di titik itu raycasting berhenti jadi solusi.

## Jawabannya: dipotong dulu sebelum game jalan

Doom pakai **BSP tree** — Binary Space Partitioning. Idenya: peta 2D dipotong-potong pakai garis lurus, berulang-ulang, sampai semua potongannya berbentuk **konveks** (cembung). Potongan konveks punya sifat ajaib: dari dalam potongan itu, tembok mana yang kelihatan bisa ditentukan cuma dengan cek sudut, tanpa nembak sinar sama sekali.

Yang penting: pemotongan ini **nggak terjadi saat main**. Dilakukan offline, sekali, waktu level dibikin. Hasilnya disimpan jadi file `.wad`, dan game cuma baca pohon yang udah jadi.

Detail yang jarang disebut: tool-nya, `DoomED` dan `idbsp`, ditulis pakai **Objective-C di workstation NeXTSTEP**. Jadi pipeline id Software waktu itu: level diedit dan di-BSP di NeXT, lalu kode dikirim lewat jaringan ke PC, di-compile pakai Watcom buat DOS. Satu studio, dua dunia yang beda total, disambung kabel LAN.

![Diagram binary space partitioning: poligon berantakan dipotong jadi potongan konveks pakai garis partisi](/images/doom-engine-bsp-2.png)
*Prinsip BSP: poligon sembarang dipotong garis partisi sampai semua potongannya konveks. Sumber: Wikimedia Commons (CC BY-SA 3.0, Jkwchui)*

Konsekuensinya aneh dan sering nggak disadari:

- **Tembok nggak bisa geser ke samping.** Pintu dan lift cuma bisa naik-turun, karena BSP-nya udah dibakar. Kalau mau pintu geser horizontal, pohonnya harus dibangun ulang.
- **Nggak ada ruangan bertumpuk.** Dua lantai di koordinat XY yang sama mustahil. Ini alasan semua map Doom isinya lorong dan ruang terbuka, bukan gedung bertingkat.

![Denah level Doom dalam format 2D: garis, sektor, dan vertex](/images/doom-engine-bsp-3.png)
*Level Doom dari atas: cuma garis dan sektor di bidang 2D. Tinggi lantai/plafon menempel sebagai atribut, bukan geometri. Sumber: Wikimedia Commons (public domain, Fredrik)*

## Gambarnya digambar per kolom, dari depan ke belakang

Saat render, engine jalan menyusuri pohon BSP dan menggambar tembok **dari yang paling dekat dulu**. Setiap seg tembok yang udah digambar dicatat di linked list (`drawsegs`), dan seg berikutnya dipotong kalau ketutupan. Efeknya: hampir **nol overdraw**. Nggak ada piksel yang digambar dua kali, nggak ada z-buffer, dan itu penting banget di 1993 karena framebuffer disimpan di RAM biasa — akses memori itu mahal.

Semuanya digambar di resolusi **320×200, 256 warna**. Dan karena pada 1993 cuma 486DX yang punya FPU (koprocessor matematika), engine ini nyaris nggak pakai floating point sama sekali: sudut disimpan sebagai integer, presisi pecahan pakai format fixed-point 16.16, dan konversi sudut ke koordinat layar lewat tabel lookup 8K entri (`viewangletox`). Trigonometri disulap jadi aritmetika integer.

## Lantai dan plafon: bagian paling rapuh

Tembok ditangani rapi. Lantai dan plafon? Pakai algoritma mirip flood fill, dan hasilnya disimpan sebagai **visplane** — satu permukaan datar dengan kombinasi unik dari tinggi, tekstur, dan level cahaya.

Masalahnya: Doom cuma boleh punya **128 visplane**. Lewat dari itu, game crash balik ke DOS dengan pesan `R_FindPlane: no more visplanes` atau `visplane overflow`. Dan karena pengecekannya dilakukan *setelah* semuanya digambar, angka di pesan errornya kadang muncul lebih besar dari 128.

Cara paling gampang bikin map crash? Lantai kotak-kotak catur dengan dua tekstur bergantian — tiap kotak jadi visplane sendiri. Mapper menghabiskan bertahun-tahun mendesain ulang ruangan gara-gara batas 128 ini, sampai Lee Killough menggantinya dengan hash table berantai di port-nya.

## Tiga bug yang jadi kosakata komunitas

Karena renderer-nya secanggih itu tapi juga seadanya itu, muncul bug-bug khas yang sampai sekarang punya nama:

| Bug | Penyebab | Gejala |
|---|---|---|
| **Tutti-frutti** | `R_DrawColumn` pakai aritmetika modulo 128 buat offset tekstur | Bintik warna acak di tembok yang lebih tinggi dari teksturnya |
| **Medusa** | Tekstur multi-patch dipasang di tembok dua sisi yang bisa dilewati | Frame drop lebih dari 10×, tembok jadi "beriak" |
| **Slime trail** | Presisi integer hilang waktu node builder memotong garis | Pita lantai "merembes" ke tepi layar |

Tutti-frutti itu murni bug aritmetika: tekstur cuma di-tile vertikal di kelipatan 128 piksel, jadi tekstur setinggi 64 dipakai di tembok setinggi 128 menghasilkan sampah. Medusa lebih parah — engine harus ngecek tiap patch per kolom, dan itu meledak jadi lambat. Slime trail bahkan nggak bisa dihindari sepenuhnya: koordinat vertex Doom integer, sementara pemotongan BSP butuh koordinat pecahan.

## Yang hilang: kemampuan noleh ke atas

Karena semua tembok digambar sebagai kolom vertikal, kamera Doom secara matematis selalu **sejajar lantai**. Lo nggak bisa mendongak atau menunduk. Heretic dan Hexen "menambal" ini dengan trik bernama **y-shearing**: seluruh gambar digeser naik/turun di dalam layar. Kelihatan kayak noleh, tapi garis vertikal tetap vertikal — perspektifnya salah, dan kalau dipaksa 90° ke atas, area yang harus dirender jadi tak terhingga.

Warisan sebenarnya dari Doom bukan "3D pertama", tapi **cara mengubah batasan jadi desain**. Peta 2D memaksa level jadi labirin, bukan gedung. Tanpa z-buffer, mapper dipaksa mikir soal keterlihatan. Quake datang setahun kemudian dengan BSP 3D beneran dan bikin semua trik ini usang — tapi 30 tahun kemudian, orang masih bikin map baru buat engine yang nggak pernah bisa mendongak.
