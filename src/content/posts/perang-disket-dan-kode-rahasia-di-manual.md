---
title: "Kenapa Instal Software Zaman Disket Bisa Butuh 46 Kali Ganti Disk?"
pubDatetime: 2026-09-19T13:30:00.000Z
modDatetime: 2026-09-19T13:30:00.000Z
slug: perang-disket-dan-kode-rahasia-di-manual
tags: ["retro", "pc", "sejarah"]
description: "Sebelum CD-ROM, install software bisa berarti gonta-ganti puluhan disket sambil berdoa nggak ada yang corrupt — dan itu belum termasuk kode rahasia yang cuma ada di manual cetak."
---

Bayangin lagi install sesuatu, disket ke-44 dari 46 kepasang, terus tiba-tiba drive bunyi klik aneh. Disket itu rusak. Nggak ada opsi "retry dari sana" — harus ulang dari disket nomor 1. Itu bukan cerita karangan, itu pengalaman nyata pengguna Microsoft Office 97 versi floppy di pertengahan 90-an.

## Satu Disket, 1,68 MB — Trik yang Jarang Disadari

Disket 3,5 inci high-density standar cuma nampung 1,44 MB. Tapi kalau lo pernah megang disket instalasi Windows 95 atau Office, kapasitasnya sering lebih gede dari itu tanpa disket-nya keliatan beda. Rahasianya ada di format bernama **DMF (Distribution Media Format)** — trik Microsoft yang naikin track per disket dari 80 jadi tetap 80 tapi sektor per track-nya dipadetin, plus ngilangin gap antar-sektor, sehingga satu disket bisa nampung 1.680 KiB alih-alih 1.440 KiB. Produk pertama yang pakai format ini adalah revisi "c" dari Office 4.x — sekalian jadi software pertama yang makai format kompresi CAB (awalnya dinamain "Diamond").

Meski udah diperas segitu rupa, jumlah disketnya tetap bikin ngelus dada:

| Software | Jumlah disket |
|---|---|
| Windows 95 retail (DMF) | 13 disket |
| Windows 95 OSR2.1 | 26 disket |
| Beneath a Steel Sky (Amiga) | 16 disket |
| MS Office 97 (versi disket, klaim pengguna) | ~46 disket |

Windows 95 aja, versi ritelnya butuh 13 disket 1,68 MB — kalau makai disket 1,44 MB biasa (bukan format DMF), butuh lebih banyak lagi, ada yang nyebut sampai 27-28 keping di foto-foto koleksi lawas.

![Setumpuk disket instalasi 3,5 inci untuk MS-DOS 6.22](/images/instalasi-puluhan-disket-1.jpg)
*Disket instalasi era DOS/Windows 90-an. Foto: Blake Patterson via Wikimedia Commons (CC BY 2.0)*

## Perang Kedua: Bukan Cuma Disketnya, tapi Manualnya

Sebelum masalah "kapasitas", developer game udah lebih dulu perang lawan pembajakan pakai cara yang sekarang kedengeran absurd: bikin proteksi yang nempel di buku manual cetak, bukan di disketnya.

Contoh paling terkenal, **King's Quest** dari Sierra. Pas game jalan, layar minta lo masukin kata tertentu — misalnya "kata ke-9 di Tip nomor 5, bagian Tips" pada manual. Salah jawab, lemparan balik ke DOS. Nggak ada hint di dalam game; satu-satunya cara lolos ya buka buku fisiknya. **Zak McKracken and the Alien Mindbenders** dari Lucasfilm Games malah lebih niat: minta kode "exit visa" buat pindah negara dalam game, dan kode itu cuma tercetak di manual — desain proteksi yang sekaligus jadi bagian dari fiksi cerita.

Metode serupa yang lebih ikonik lagi: **code wheel** — dua lingkaran karton yang diputer buat nyocokin simbol dan dapetin kode. Elegan karena disketnya sendiri bisa dikopi bebas tanpa masalah, yang jadi kunci ya si roda kertas itu. Masalahnya, begitu mesin fotokopi murah menyebar, orang tinggal fotokopi manual dan code wheel-nya sekalian — proteksi yang dirancang buat physical medium kalah sama teknologi fotokopi biasa.

## Level Lebih Teknis: "Weak Bits" yang Nggak Bisa Dikopi Persis

Ada juga proteksi yang mainnya di level magnetik, bukan sekadar file. Namanya **weak bits** (kadang disebut fuzzy bits) — area kecil di track disket yang sengaja ditulis dengan transisi flux magnetik yang ambigu, sehingga kalau dibaca berkali-kali hasilnya bisa beda-beda (kadang kebaca 0, kadang 1). Drive disket standar dan software copy biasa nggak bisa mereproduksi ketidakpastian ini secara persis — begitu dikopi pakai cara normal, hasil salinannya jadi "terlalu konsisten" dan game bisa ngedeteksi itu sebagai disket bajakan.

Salah satu implementasi proteksi berbasis flux ini, **Formaster Copy-Lock**, bahkan melewati BIOS sama sekali dan ngomong langsung ke floppy disk controller. Triknya: kode proteksi coba baca track 6 sektor 1 lewat rutin BIOS standar (INT 13h) yang secara sengaja *diharapkan gagal* karena sektor itu memang nggak ada secara normal — kalau ternyata berhasil dibaca dengan cara "biasa", itu tandanya disket udah dimodifikasi/dikopi, bukan orisinal.

## Kenapa Ini Penting Dikenang

Kombinasi disket kecil, software makin gede, dan proteksi anti-kopi yang makin nyeleneh ini yang bikin era pra-CD-ROM jadi salah satu periode paling penuh akal-akalan dalam sejarah software PC. Begitu CD-ROM (dan burner-nya belum umum) masuk pasar, banyak publisher malah sengaja **ngilangin** proteksi rumit ini dari versi CD — karena mengkopi cakram 650 MB jauh lebih ribet buat orang awam ketimbang disket. Ironisnya, disket yang dulu jadi arena kucing-kucingan justru yang paling banyak diselamatkan komunitas preservasi lewat dumping flux-level presisi tinggi — supaya trik-trik macam weak bits dan code wheel ini nggak ikut lenyap ditelan waktu.
