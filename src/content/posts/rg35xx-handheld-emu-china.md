---
title: "Handheld Emu China Rp 400 Ribuan: Kenapa Bisa Semurah Itu?"
pubDatetime: 2026-10-06T13:02:10.000Z
modDatetime: 2026-10-06T13:02:10.000Z
slug: rg35xx-handheld-emu-china
tags: ["retro", "hardware", "handheld"]
description: "Di balik harga murah handheld emulator China, ternyata ada chip TV box yang cuma 'dipindah' jadi konsol genggam."
---

Ada satu pertanyaan yang bikin banyak orang menggaruk kepala: kok bisa ada konsol genggam seharga tiga gelas kopi, tapi sanggup menjalankan game PlayStation 1 dan sebagian Nintendo 64? Pabrikan besar butuh puluhan tahun dan miliaran dolar buat bangun ekosistem konsol. Ini cuma satu perusahaan kecil di Shenzhen yang jual lewat Aliexpress.

Jawabannya bukan karena ada teknologi baru yang bikin hardware jadi murah. Justru sebaliknya — jawabannya ada di **sampah sisa supply chain** yang dipakai ulang.

![Handheld emulator retro bergaya vertikal dengan layar dan tombol klasik](/images/rg35xx-handheld-emu-china-1.jpg)

*Ilustrasi: handheld emulator retro. Foto: Wikimedia Commons (CC0).*

## Chip di dalamnya bukan dirancang buat main game

Ambil contoh Anbernic RG35XX Plus atau RG40XX H. Di dalamnya ada **Allwinner H700**: CPU quad-core ARM Cortex-A53 @1,5 GHz plus GPU Mali-G31 MP2, dipasangkan RAM LPDDR4 1 GB. Angka segini tidak istimewa. Yang bikin menarik justru asal-usulnya.

Allwinner H700 itu **bukan chip baru**. Dia masih keluarga besar SoC Allwinner H616 — chip yang dirancang buat **Android TV box**, set-top box murah yang nyolok ke televisi. Varian-variannya: H313 (versi paling murah), H618 (cache L2 lebih besar), dan H700. Bedanya H700 dengan keluarganya cuma satu hal kecil yang krusial: **pin RGB LCD-nya dibuka** — di-expose — supaya bisa nyambung ke panel layar kecil. Itu saja.

Jadi logikanya kira-kira begini: bukannya mengembangkan chip khusus konsol, pabrikan China cukup ambil chip TV box yang sudah diproduksi massal jutaan unit, buka satu fitur pin, lalu bungkus dengan layar, baterai, dan casing. Biaya riset chip? Nol. Chip-nya sudah ada, sudah matang, dan harganya sudah ditekan habis-habisan oleh pasar box streaming yang jauh lebih besar.

Pola yang sama muncul di perangkat lain. R36S, handheld murah yang sempat viral di bawah $35, pakai **Rockchip RK3326** — chip tablet/entry-level generasi lama yang juga sudah dipakai bertahun-tahun sebelumnya. Bukan silicon baru, tapi silicon yang sudah terlanjur murah.

| Perangkat | Chip | Asal chip |
|---|---|---|
| Anbernic RG35XX Plus / RG40XX | Allwinner H700 | Varian H616 (TV box) |
| R36S | Rockchip RK3326 | Chip tablet entry-level lama |
| Anbernic RG35XX (2022) | Actions ATM7039S | Chip media player lama |

## Nama sama, isi beda: neraka produk Anbernic

Nah, ini bagian yang paling jarang disebut orang dan bikin komunitas frustrasi. Anbernic itu terkenal gila dalam meluncurkan model. Satu catatan komunitas menghitung **11 handheld dirilis sepanjang 2024**, naik dari 7 di 2023. Cuma belasan nama, tapi tiap nama punya beberapa revisi hardware.

Contoh paling nyata: **RG35XX original (2022) sama sekali bukan RG35XX Plus**. Yang original pakai chip **Actions ATM7039S** dengan RAM DDR3 cuma 256 MB. Yang Plus generasi 2023 pindah ke Allwinner H700 dengan 1 GB LPDDR4. Nama produknya sama-sama "RG35XX", tapi dalamnya beda generasi chip. Konsekuensinya nyata: firmware komunitas yang jalan di satu belum tentu jalan di yang lain. GarlicOS versi 1 dibuat khusus buat chip ATM7039S yang kolot itu, sementara GarlicOS 2 menyasar keluarga H700.

Buat pembeli, ini jebakan. Beli "RG35XX" dengan asumsi tertentu, eh dapetnya hardware yang beda. Itu sebabnya komunitas sampai bikin panduan khusus buat "cek tipe device" sebelum nge-flash firmware.

## Yang bikin perangkat ini hidup: firmware orang lain

Kalau hardware-nya cuma chip TV box bekas, apa yang bikin pengalamannya enak? Jawabannya: **komunitas, bukan pabrikan.**

Firmware bawaan alias stock OS dari pabrik biasanya di bawah rata-rata — antarmuka kaku, emulator belum dioptimalkan, kadang buggy. Yang menyelamatkan perangkat ini adalah firmware buatan orang lain yang dirilis gratis:

- **OnionOS** buat Miyoo Mini — launcher rapi, tema, ports game native.
- **GarlicOS** (garapan developer Black-Seraph) buat jajaran RG35XX, sengaja dibikin mirip OnionOS biar pengguna satu ekosistem kerasa.
- **muOS** dan **ArkOS** buat keluarga H700 dan R36S.

Artinya, nilai jual utama perangkat-perangkat ini bukan hardware-nya, tapi perangkat lunak yang nggak mereka bayar. Pabrikan bikin casing dan menu — komunitas yang bikin konsolnya beneran enak dipakai. Waktu chip baru muncul (misal H700), yang membuatnya jadi "worth it" adalah scene yang ngulik driver dan emulator sampai stabil.

## Sisi kelabunya: kartu SD murahan & ROM bawaan

Ada dua hal yang hampir selalu diperingatkan komunitas ke pembeli baru.

Pertama, **kartu microSD bawaan itu sering jadi titik kegagalan paling umum**. Seringkali kartu murahan, lambat, dan cepat korup — taruh OS di situ, sekali corrupt, device nggak mau boot. Rekomendasi standar: langsung ganti dengan kartu kualitas bagus sebelum dipakai serius.

Kedua, banyak perangkat ini **dijual dengan mikroSD berisi ratusan sampai ribuan ROM dan BIOS game yang sudah preload**. Dijual bareng hardware-nya, di marketplace biasa. Ini wilayah abu-abu hukum: emulator sendiri legal, tapi distribusi ROM komersial jelas bukan. Banyak juga ROM preload ini kualitasnya payah — korup, versi salah, atau romhack aneh. Jadi pembeli serius biasanya tetap bikin library sendiri.

## Kenapa fenomena ini penting

Kalau ditarik jauh, boom handheld emulator China ini bukan cerita teknologi. Ini cerita ekonomi sirkular: chip TV box yang produksinya sudah melimpah, panel LCD 3,5 inci 640×480 sisa supply chain, dan firmware Linux gratis yang ditulis suka rela. Semua sisa-sisa industri lain dirakit jadi produk baru yang sebenarnya jalan mulus.

Dan seperti banyak fenomena retro lain, yang bikin produk ini disayang bukan spesifikasinya. Tapi komunitas yang nemenin dia hidup.
