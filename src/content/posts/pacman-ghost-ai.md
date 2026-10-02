---
title: "AI Pac-Man Cuma Berbekal Satu Petak Tujuan, dan Itu Cukup Bikin Kita Kalah 40 Tahun"
pubDatetime: 2026-10-02T02:00:00.000Z
modDatetime: 2026-10-02T02:00:00.000Z
slug: pacman-ghost-ai
tags:
  - game
  - arcade
  - sejarah
description: Empat hantu Pac-Man kelihatan punya kepribadian, tapi tiap-tiap cuma mengejar satu petak tujuan. Nama Jepang aslinya ternyata deskripsi algoritmanya.
---

Pernah kesel karena Clyde justru kabur pas dia harusnya ngejar? Atau bingung kenapa Pinky selalu nyegat di depan, bukan nempel di belakang? Itu bukan hoki, dan bukan AI pintar. Empat hantu Pac-Man bergerak pakai aturan yang bisa ditebak sampai frame — dan di pergerakan mereka nggak ada satu pun angka acak.

Yang bikin mereka kelihatan "punya kepribadian" justru sesuatu yang lebih sederhana dari dugaan orang.

![Kabinet arcade Pac-Man original](/images/pacman-ghost-ai-1.jpg)
*Kabinet arcade Pac-Man di De Notaris, Schaijk, Belanda. Foto: YosemiteYamper via Wikimedia Commons (CC BY-SA 4.0).*

## Satu petak, empat otak

Resep dasarnya cuma satu: **tiap hantu punya satu "petak tujuan" (target tile).** Setiap hantu menghitung ulang petak itu puluhan kali per detik, lalu di tiap persimpangan dia cuma memilih arah yang bikin jaraknya ke petak itu paling dekat. Sesederhana itu.

Tiga aturan tambahan bikin hasilnya kelihatan cerdas:

- **Nggak boleh putar balik.** Hantu hanya jalan lurus sampai persimpangan berikutnya, baru boleh pilih arah baru. Arah balik cuma dimaksa saat mode game berubah.
- **Kalau seri, ada urutan prioritas.** Saat dua arah sama-sama dekat, hantunya memilih dengan urutan tetap: atas, kiri, bawah, kanan.
- **Kepintaran "AI" ini sesungguhnya cuma jarak lurus.** Bukan pathfinding canggih — cukup tebak mana dari arah yang tersedia yang bikin dia makin dekat ke petak tujuan.

Bedanya tiap hantu cuma satu: petak tujuan itu dihitung dari mana.

| Hantu | Warna | Target saat mengejar | Target saat "scatter" |
|---|---|---|---|
| Blinky | merah | petak Pac-Man saat itu juga | pojok kanan atas |
| Pinky | pink | 4 petak di depan arah jalan Pac-Man | pojok kiri atas |
| Inky | biru | bergantung posisi Blinky (lihat bawah) | pojok kanan bawah |
| Clyde | oranye | kejar langsung kalau jauh, kabur kalau dekat | pojok kiri bawah |

## Nama Jepang mereka sebenarnya "spesifikasi teknis"

Ini bagian favorit gw. Di versi asli Jepang (game-nya dulu bernama **Puck-Man**), keempat hantu punya nama julukan: **Oikake** (追いかけ), **Machibuse** (待ち伏せ), **Kimagure** (気まぐれ), dan **Otoboke** (おとぼけ).

Terjemahan lepasnya: *si Pengejar*, *si Penyergap*, *si Angin-anginan*, dan *si Bego*.

Itu bukan sebutan hiasan. Nama-nama itu deskripsi perilaku mereka yang sebenarnya:

- **Oikake/Blinky** memang cuma mengejar. Dia satu-satunya yang dibuat makin cepat diam-diam saat sisa dot di layar makin sedikit. Penggemar menyebutnya **"Cruise Elroy"**.
- **Machibuse/Pinky** memang menyergap: targetnya empat petak di depan Pac-Man, jadi dia menutup jalan, bukan menempel.
- **Kimagure/Inky** memang angin-anginan. Petak tujuannya dihitung dengan cara paling aneh: ambil titik dua petak di depan Pac-Man, tarik garis dari posisi Blinky ke titik itu, lalu gandakan. Artinya gerak Inky ikut-ikutan ditentukan posisi Blinky. Kalau Blinky lagi jauh, Inky jadi kacau.
- **Otoboke/Clyde** memang "bego" — tapi sengaja. Kalau jaraknya lebih dari delapan petak dari Pac-Man, dia mengejar seperti Blinky. Begitu masuk delapan petak, dia panik dan balik ke pojok kiri bawah. Makanya dia kelihatan bolak-balik nggak jelas.

![Kostum hantu Pac-Man di sebuah konvensi](/images/pacman-ghost-ai-2.jpg)
*Kostum hantu Pac-Man di MCM Expo 2008. Foto: internets_dairy via Wikimedia Commons (CC BY 2.0).*

## Kenapa kadang mereka muter-muter di pojok

Perhatikan: petak tujuan saat "scatter" itu semua berada di **luar labirin** — di area kosong di luar dinding. Karena target-nya di luar jangkauan, hantu-hantu ini cuma berputar-putar mengelilingi pojoknya masing-masing, lalu balik lagi mengejar. Itu bukan bug; itu efek samping dari target yang ditaruh sengaja di luar papan.

Pola scatter-nya juga pakai timer, dan grafiknya aneh:

- Level 1: scatter 7 detik → chase 20 detik → scatter 7 detik → chase 20 detik → scatter 5 detik → chase 20 detik → scatter 5 detik → **chase selamanya**.
- Level 1 chase ketiga cuma 20 detik. Tapi mulai level 2–4, periode itu melonjak jadi **1.033 detik** — lebih dari 17 menit. Praktis sejak level itu, hantu nggak pernah lagi kasih kamu jeda panjang.

Ada lagi: di empat persimpangan tertentu — dua di atas titik start Pac-Man dan dua di atas kandang hantu — hantu **dilarang belok ke atas**, kecuali saat sedang berwarna biru (frightened). Aturan ini yang bikin rute melarikan diri di dekat kandang terasa "aman" padahal sebenarnya sempit.

## Pinky dan bug yang jadi ciri khas

Kalau Pac-Man jalan ke atas, petak tujuan Pinky ternyata bukan 4 petak di atas — tapi 4 petak di atas **dan** 4 petak ke kiri. Ini berangkat dari bug di kode aslinya: tabel arah "naik" di ROM ternyata ikut membawa pergeseran ke kiri, sebuah kekeliruan yang sudah dianalisis sampai level disassembly dan sengaja dipertahankan di banyak klon modern supaya rasanya "otentik".

Ironisnya, bug itu jadi bagian dari karakter Pinky. Klon yang "memperbaiki" bug ini justru terasa aneh buat pemain lama.

## Nggak ada dadu, makanya bisa dihafal

Karena seluruh pergerakan chase dan scatter deterministik, keempat hantu bisa diprediksi sepenuhnya — asal kamu hafal situasinya. Ini alasan munculnya **buku-buku pola (pattern)**: rute langkah-demi-langkah untuk menyapu seluruh 244 titik dan memakan empat ghost tiap energizer. Satu-satunya keacakan di game ini muncul saat hantu sedang berwarna biru, dan bahkan itu pun terbatas (arah acak, dengan urutan cadangan atas–kiri–bawah–kanan kalau arahnya mentok dinding).

Dari situ lahir pencapaian ultimnya: **skor sempurna 3.333.360**, diperoleh dengan menyapu semua level tanpa kehilangan satu nyawa. Guinness mencatat Billy Mitchell sebagai orang pertama yang meraihnya, pada 3 Juli 1999.

Dan endingnya pun nggak benar-benar dirancang: counter level cuma satu byte, jadi di level ke-256 angkanya overflow dan rutin gambar "fruit" membaca data yang salah. Separuh kanan layar berubah jadi simbol berantakan, dan level itu praktis mustahil diselesaikan.

Semua ini dibuat 1980 — oleh tim sembilan orang, tanpa GPU, oleh programmer **Shigeo Funaki** yang merancang algoritma hantunya dari konsep kepribadian garapan desainer **Toru Iwatani**. "AI" mereka nggak pakai machine learning apa pun, muat di beberapa byte, dan tetap cukup buat bikin satu generasi hafal rutenya.
