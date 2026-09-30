---
title: "Kenapa Emulator Butuh BIOS (dan Kenapa Sony Kalah di Pengadilan)"
pubDatetime: 2026-09-30T02:00:00.000Z
modDatetime: 2026-09-30T02:00:00.000Z
slug: kenapa-emulator-butuh-bios
tags:
  - emulator
  - retro
  - hukum
description: "Emulator PlayStation pertama yang sah secara hukum dibangun dengan cara yang terdengar ilegal, yaitu menyalin firmware Sony berkali-kali. Pengadilan bilang itu boleh."
---

Kalau lo pernah setup emulator PlayStation atau PS2, pasti ketemu langkah yang sama: *taruh file BIOS di folder ini*. Emulator-nya gratis, tapi BIOS-nya harus cari sendiri. Kenapa emulator nggak bisa bawa BIOS-nya sekalian?

Jawabannya ternyata nyambung ke kasus pengadilan tahun 2000 yang mengubah cara dunia memandang emulasi. Dan ironisnya, pemenangnya menang justru *karena* menyalin kode Sony berkali-kali.

## BIOS itu sebenarnya apa

Di dalam PlayStation ada dua hal yang harus ditiru emulator: **hardware** (CPU, GPU, chip suara) dan **firmware** yang tertanam di chip ROM. Firmware itulah BIOS. Dia yang ngurus boot, baca CD, dan nyediain fungsi dasar yang dipanggil game.

Masalahnya, BIOS adalah software yang punya hak cipta. Hardware bisa ditiru dari perilakunya, tapi BIOS itu kode tulisan orang. Jadi emulator punya dua jalan:

| Jalan | Cara | Risiko |
|---|---|---|
| Pakai BIOS asli | User dump sendiri dari konsolnya | Emulator bersih, user yang urus file |
| Bikin BIOS tiruan | Tulis ulang dari nol | Butuh paham persis perilaku BIOS asli |

Jalan kedua jauh lebih susah, dan di sinilah kisah Connectix dimulai.

## Connectix dan proyek yang terdengar nekat

Awal Juli 1998, Connectix mulai bikin **Virtual Game Station** (VGS), emulator PlayStation untuk Macintosh. Mereka sempat minta bantuan teknis ke Sony, dan bertemu pada September 1998. Sony menolak.

Jadi Connectix reverse engineering sendiri. Menurut putusan pengadilan, engineer mereka membeli konsol PlayStation, **mengekstrak BIOS dari chip di dalamnya**, lalu menjalankannya di komputer bersama software emulasi hardware yang lagi dikembangkan. Pakai debugger, mereka mengamati sinyal antara BIOS dan emulator. Tiap kali komputer di-boot, BIOS tersalin lagi ke RAM, dan itu dihitung sebagai salinan.

Tahap kedua lebih sensitif: mereka mulai bikin BIOS buatan sendiri, dan memakai BIOS Sony sebagai alat debug. Bahkan untuk versi Windows, mereka tetap pakai BIOS Sony karena BIOS mereka belum punya **kode CD-ROM** yang dibutuhkan.

![Motherboard PlayStation SCPH-1001](/images/kenapa-emulator-butuh-bios-1.jpg)
*Motherboard PlayStation SCPH-1001. Foto: Ya boi TJ Fox via Wikimedia Commons, CC BY-SA 4.0.*

### Detail yang jarang disebut

Ada satu detail kecil di dokumen putusan: salah satu engineer, Aaron Giles, pernah membongkar (disassemble) **seluruh** BIOS Sony hasil unduhan dari internet. Tujuannya bukan buat nyontek, tapi buat ngetes disassembler buatannya sendiri. Hasil cetakannya, kata pengadilan, tidak dipakai mengembangkan emulator. Mereka juga sempat memakai salinan itu di awal, lalu meninggalkannya setelah sadar itu BIOS versi Jepang.

Kalau dipikir, ini persis skenario yang kedengarannya paling buruk di mata hukum, tapi dicatat apa adanya di pengadilan.

## Sony menuntut, lalu kalah

VGS diumumkan di MacWorld Expo, 5 Januari 1999, dipasarkan terang-terangan sebagai 'PlayStation emulator'. Tanggal 27 Januari 1999 Sony menggugat. Pengadilan tingkat pertama mengabulkan injunction: Connectix dilarang menjual VGS, dan semua salinan BIOS Sony disita.

Tapi Ninth Circuit membalik putusan itu (3-0, Februari 2000). Logikanya:

- Produk akhir VGS **tidak mengandung** kode Sony sama sekali.
- Salinan sementara (*intermediate copy*) diperlukan untuk mengakses elemen fungsional BIOS yang tidak dilindungi hak cipta.
- Sony sendiri mengakui info teknis BIOS nyaris tidak tersedia publik, dan BIOS tidak menampilkan apa pun di layar yang bisa diamati.
- Argumen Sony bahwa Connectix seharusnya membuat lebih sedikit salinan (misalnya dengan tidak mematikan komputer) ditolak. Pengadilan bilang aturan begitu mudah dimanipulasi dan memaksa engineer memilih cara paling tidak efisien.

Putusan ini bersandar pada kasus Sega v. Accolade (1993): kalau disassembly satu-satunya cara mengakses ide dan elemen fungsional, dan ada alasan sah untuk itu, hasilnya fair use.

## Pemenangnya tetap kalah

Twist pahitnya: walau menang, Connectix sempat tidak bisa jualan selama injunction berlaku. Tak lama kemudian **Sony membeli VGS dari Connectix dan menghentikannya**.

Pesaingnya, **Bleem!**, nasibnya lebih buruk. Bleem! rilis Maret 1999 untuk Windows dan Dreamcast, dan memakai akselerasi 3D PC sehingga bisa resolusi lebih tinggi dan tekstur ter-filter. Sony terus menuntut Bleem! meski sudah kalah lawan Connectix. Bleem! tidak sanggup membiayai pembelaan dan tutup.

Menang di hukum belum tentu menang di kantong.

## Jalan pintas: emulasi tanpa BIOS

Ada jalan lain yang dipakai **UltraHLE** (1999), emulator Nintendo 64. Karena game N64 ditulis dalam C, dua penulisnya, Epsilon dan RealityMan, menyadari mereka bisa mencegat panggilan ke library C (jumlahnya jauh lebih sedikit dibanding instruksi level mesin) lalu menulis ulang fungsinya. Teknik ini disebut **high-level emulation (HLE)**.

Kelemahannya: saat rilis, UltraHLE hanya bisa memainkan sekitar 20 game dengan layak, karena hanya memalsukan panggilan yang dibutuhkan game-game itu.

Teknik serupa dipakai emulator modern. Dolphin (GameCube/Wii) memakai HLE untuk mereimplementasi sistem operasi IOS milik Wii, sehingga nggak butuh kode Nintendo untuk bagian itu.

## Jadi, kenapa sampai sekarang butuh BIOS?

Bukan karena developer emulator malas. Bikin pengganti BIOS yang kompatibel itu susah dan hasilnya sering kurang akurat dibanding yang asli. Jadi banyak emulator memilih menyuruh user menyediakan sendiri, sambil menghindari distribusi kode berhak cipta.

Satu putusan pengadilan tahun 2000 membuat proses reverse engineering-nya sah. Tapi file BIOS-nya sendiri tetap milik pembuatnya, dan itu alasan file kecil itu masih harus lo cari sendiri sampai hari ini.
