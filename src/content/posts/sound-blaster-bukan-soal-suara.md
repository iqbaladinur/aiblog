---
title: 'Sound Blaster: DSP yang Bukan DSP, Socket Kosong, dan Standar yang Menang Bukan Karena Suaranya'
pubDatetime: 2026-10-14T13:05:00.000Z
modDatetime: 2026-10-14T13:05:00.000Z
slug: sound-blaster-bukan-soal-suara
tags: ['hardware', 'retro', 'audio']
description: 'Semua orang hafal setting A220 I5 D1, tapi kejayaan Sound Blaster bukan karena kualitas suaranya — ada chip bernama "DSP" yang sebenarnya bukan DSP, kartu yang dijual dengan socket kosong, dan bug hardware yang nggak bisa dibenerin.'
---

Coba tanya ke orang yang pernah ngorbit PC era DOS: kartu suara lo setting-nya apa? Jawabannya hampir selalu **A220 I5 D1** — port I/O `220h`, IRQ 5, DMA 1. Tiga angka itu bukan hasil pemikiran user, tapi warisan satu kartu yang kebetulan menang besar.

![Sound Blaster 1.0 (CT1320B), kartu yang bikin setting A220 I5 D1 jadi standar de facto](/images/sound-blaster-bukan-soal-suara-1.jpg)
*Sound Blaster 1.0 (CT1320B). Foto: Wdwd, Wikimedia Commons (CC BY-SA 3.0).*

## AdLib yang menyalakan semuanya

Pemain pertama bukan Creative. Itu **Ad Lib, Inc.** dari Quebec City, didirikan 1987 oleh **Martin Prevel**, mantan profesor musik di Université Laval. Kartu *AdLib Music Synthesizer Card* jadi add-on audio PC pertama yang benar-benar diterima pasar: satu chip **Yamaha YM3812** (OPL2) untuk FM synthesis. Game pertama yang mendukungnya adalah *King's Quest IV* dari Sierra, dan kesuksesan game itu yang menyeret AdLib ke liputan media. Yang nggak dimiliki AdLib: **digital audio (PCM)**.

![Kartu AdLib Music Synthesizer Card, de facto standard audio PC pertama sebelum Sound Blaster](/images/sound-blaster-bukan-soal-suara-3.jpg)
*AdLib Music Synthesizer Card. Foto: Austriacus, Wikimedia Commons (CC0).*

## Creative masuk dari pintu samping

Creative Technology didirikan 1981 di Singapura oleh **Sim Wong Hoo** dan **Ng Kai Wa**, awalnya bengkel reparasi komputer di Chinatown. Langkah pertama mereka ke audio: **Creative Music System** (1987), berisi dua chip **Philips SAA1099** — total 12 kanal square wave — yang setahun kemudian dijual ulang lewat RadioShack sebagai **Game Blaster**.

Detail yang jarang disebut: chip di kartu-kartu awal Creative sering ditutup **stiker kertas putih**. Khusus C/MS, stikernya bertulis **"CMS-301"** — nomor fiktif, murni supaya pesaing nggak bisa baca identitas chip Philips di baliknya. Ada juga chip 40-pin bertulis *CT 1302A CTPL 8708* yang bentuknya mirip banget dengan "DSP" Sound Blaster generasi berikutnya; software — termasuk buatan Creative — memakainya buat deteksi kartu otomatis lewat baca/tulis register.

## Kenapa menang kalau bukan karena suara

Sound Blaster 1.0 rilis 1989 dengan codename **"Killer Kard"**. Keunggulan krusialnya bukan audio, tapi **game port**: PC zaman itu nggak punya game port bawaan, dan kartu terpisah harganya sekitar US$50 sekaligus memakan satu dari sedikit slot ekspansi. Kartu yang AdLib-compatible, menyatu dengan game port, dan dikasih DAC tambahan dengan harga setara — pilihannya jadi tidak rasional buat ditolak.

Bagian yang paling sering kelewat: **dukungan in-game untuk bagian digital Sound Blaster baru muncul setelah kartunya sudah dominan.** DAC itu dijual sebagai keunggulan, tapi bukan alasan developer mendukungnya. November 1990 Microsoft mengumumkan standar **Multimedia PC (MPC)** dan menyarankan developer memakai Sound Blaster karena dialah yang paling mendekati spec itu — pers waktu itu berspekulasi MPC disusun berdasar spesifikasi Sound Blaster.

## "DSP" itu bukan DSP

Ini salah kaprah terbesar di sejarah audio PC. DSP di Sound Blaster = **Digital Sound Processor**, bukan *digital signal processor*. Isinya microcontroller keluarga **Intel MCS-51**; fitur yang benar-benar "DSP-like" cuma dua: dekompresi **ADPCM** (rasio 2:1, 3:1, 4:1) dan MIDI interface primitif yang bahkan **tidak kompatibel MPU-401**. Sound Blaster 1.0 memutar sample 8-bit mono sampai **23 kHz** dan merekam sampai **12 kHz**; versi 2.0 (1991) naik ke 44 kHz/15 kHz plus *auto-init DMA*.

Yang unik: pemilik kartu lama nggak perlu beli kartu baru. Cukup beli **chip DSP V2.00** dari Creative, cabut chip lama, nukar di socket — dapat auto-init DMA, tapi **sample rate baru tidak ikut datang** karena batasnya ada di hardware lain.

Logika era itu juga bikin kaget. Sound Blaster 1.5 (1990) membuang chip C/MS karena developer sudah nggak memakainya, tapi PCB-nya tetap menyisakan **dua socket kosong**. User bisa beli chip-nya terpisah dari Creative (atau Philips SAA-1099 dari sumber lain) dan mengupgrade sendiri. Kartu dijual dengan lubang yang sengaja disiapkan untuk pembelian di masa depan.

![Sound Blaster 1.5 (CT1320C) dengan socket chip C/MS yang dibiarkan kosong](/images/sound-blaster-bukan-soal-suara-2.jpg)
*Sound Blaster 1.5 (CT1320C); socket U14/U15 kosong. Foto: WillMcC, Wikimedia Commons (CC BY-SA 3.0).*

## Stereo dari dua chip mono

Sound Blaster Pro (Mei 1991) adalah kartu Creative pertama yang stereo — caranya dengan **dua chip YM3812**, satu untuk kanal kiri, satu kanan. Bukan synthesizer stereo, tapi dua synthesizer mono yang dipasang berdampingan lalu di-pan. Baru di Sound Blaster Pro 2 (CT1600) pasangan itu diganti satu Yamaha YMF262 (OPL3).

Kartunya juga penampakannya seperti 16-bit karena memakai edge connector ISA panjang, padahal jalur datanya tetap 8-bit; bagian 16-bit itu cuma buat menambah pilihan **IRQ 10** dan **DMA 0**.

![Sound Blaster Pro (CT1330A) yang stereonya dibangun dari dua chip FM mono terpisah](/images/sound-blaster-bukan-soal-suara-4.jpg)
*Sound Blaster Pro (CT1330A). Foto: Easy john, Wikimedia Commons (CC BY-SA 3.0).*

## Chip mahal yang nggak ada yang pakai

Sound Blaster 16 (Juni 1992) membawa audio 16-bit CD-quality, MPU-401 UART, dan header Wave Blaster. Setelah peluncurannya pendapatan audio Creative melompat dari sekitar **US$40 juta per tahun** ke hampir **US$1 miliar**.

Tapi satu bagian berakhir jadi bangkai: chip **ASP/CSP**, berisi core DSP **SGS-Thomson ST18932** (16K program RAM, 8K data RAM), dirancang buat speech synthesis via TextAssist, QSound spatialization, dan kompresi PCM. Software harus ditulis khusus, manfaatnya nggak cukup meyakinkan — pasar mengabaikannya. Efeknya banyak Sound Blaster 16 (termasuk CT2940) dijual dengan **socket ASP kosong melompong**.

Lebih menyakitkan: sejumlah kartu memakai DSP versi **4.11, 4.12, dan sebagian 4.13** yang cacat di level hardware — MIDI lewat daughterboard Wave Blaster jadi *stuck note* dan salah nada, tanpa workaround, di semua sistem operasi. Versi 4.05 dan 4.16 ke atas bebas bug ini. *Computer Gaming World* Oktober 1993 bahkan menulis mereka **tidak terkesan** dengan kualitas digital SB16 ("pops dan noise tambahan") dan merekomendasikan SB Pro atau SB orisinal.

## Yang kalah, dan kenapa

AdLib bangkrut 1992; AdLib Gold 1000 datang terlambat dan kalah murah dari Sound Blaster 16. Ada laporan indikasi perilaku anti-kompetitif dari Creative: Yamaha memproduksi komponen untuk keduanya, dan Creative adalah pelanggan terbesar Yamaha. Chip yang dibuat Yamaha untuk AdLib dikabarkan terus gagal tes sementara punya Creative lolos, sehingga Creative sampai pasar lebih dulu. Klaim ini datang dari penulis buku *Sound Blaster: The Official Book* — anggap tuduhan tercatat, bukan putusan pengadilan.

## Standar yang menang karena gampang ditiru

Tahun 1995 Sound Blaster sudah terjual lebih dari **15 juta unit** dan menguasai tujuh dari sepuluh penjualan sound card; totalnya kini lebih dari **400 juta unit**.

Yang bikin cerita ini menarik: yang nempel di kepala orang bukan fitur terbaiknya, tapi alamat hardware-nya. Begitu semua game di Amerika mengharapkan register Sound Blaster di `220h`, IRQ 5, DMA 1, setiap kartu pesaing punya dua pilihan — meniru persis, atau kalah. Frasa "Sound Blaster compatible" berubah dari keterangan fitur jadi syarat marketing. Windows 95 mematikan semua itu: interface pemrograman pindah ke level aplikasi, jadi backward compatibility hardware nggak lagi jadi penentu. Standar itu menang bukan karena paling bagus, tapi paling gampang diikuti dan diemulasi.
