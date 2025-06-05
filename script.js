document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - document.querySelector('header').offsetHeight, // Sesuaikan dengan tinggi header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll-reveal effect for sections
    const sections = document.querySelectorAll('.about-section, .experience-section, .skills-section, .contact-section');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, // viewport as the root
        threshold: 0.15 // percentage of target visibility to trigger
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Fungsionalitas Modal untuk Sertifikat
    const certificateModal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalCertificateImage');
    const modalPdf = document.getElementById('modalCertificatePdf');
    const modalDescription = document.getElementById('modalDescription');
    const closeButton = document.querySelector('.close-button');

    // Menutup modal saat tombol 'X' diklik
    closeButton.addEventListener('click', function() {
        certificateModal.style.display = 'none';
        modalImage.src = ''; // Bersihkan src agar tidak ada sisa gambar
        modalPdf.src = '';   // Bersihkan src agar tidak ada sisa PDF
        modalImage.style.display = 'none'; // Sembunyikan lagi
        modalPdf.style.display = 'none';   // Sembunyikan lagi
    });

    // Menutup modal saat mengklik di luar konten modal
    window.addEventListener('click', function(event) {
        if (event.target === certificateModal) {
            certificateModal.style.display = 'none';
            modalImage.src = '';
            modalPdf.src = '';
            modalImage.style.display = 'none';
            modalPdf.style.display = 'none';
        }
    });

    // Fungsionalitas untuk item keahlian yang dapat diklik
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', function() {
            const detailName = this.dataset.detail; // Mengambil nilai dari data-detail atribut
            let contentPath = ''; // Ini akan menjadi path ke file gambar atau PDF
            let descriptionText = ''; // Deskripsi opsional

            // Tentukan path konten berdasarkan nilai data-detail
            switch (detailName) {
                case 'toefl':
                    contentPath = 'assets/sertifikat/TOEFL_Sertificate.pdf'; // Pastikan nama file dan ekstensi benar
                    descriptionText = 'Sertifikat TOEFL Anda. Mengukur kemahiran Bahasa Inggris.';
                    break;
                case 'efset':
                    contentPath = 'assets/sertifikat/EF_SET_Certificate.pdf'; // Pastikan nama file dan ekstensi benar
                    descriptionText = 'Sertifikat EF SET Anda. Penilaian kemampuan Bahasa Inggris global.';
                    break;
                case 'public-speaking':
                    contentPath = 'assets/sertifikat/Public_Speaking_Certificate.jpg'; // Pastikan nama file dan ekstensi benar
                    descriptionText = 'Sertifikasi ini menegaskan keterampilan komunikasi dan presentasi yang efektif.';
                    break;
                case 'ti-certified':
                    contentPath = 'assets/sertifikat/Sertifikat_TI.pdf'; // Pastikan nama file dan ekstensi benar
                    descriptionText = 'Sertifikasi di bidang Teknologi Informasi, menunjukkan kompetensi teknis.';
                    break;
                case 'pkl-disbudpar':
                    // Saya tidak melihat file sertifikat PKL Disbudpar dalam daftar yang Anda berikan.
                    // Jika ada, mohon ganti 'nama_file_pkl_disbudpar.pdf' dengan nama yang benar.
                    // Jika belum ada, Anda bisa tetap menggunakan placeholder atau menghapus case ini sementara.
                    contentPath = 'assets/sertifikat/nama_file_pkl_disbudpar.pdf'; // <<< Sesuaikan jika ada file ini >>>
                    descriptionText = 'Sertifikat Pengalaman Kerja Lapangan di Dinas Kebudayaan dan Pariwisata Jatim.';
                    break;
                case 'magang-pdi-p':
    contentPath = 'assets/sertifikat/SK_Magang_Unit_Media_PDI.pdf'; // UBAH KE .PDF
    descriptionText = 'Sertifikat Magang di Dewan Pimpinan Daerah PDI Perjuangan Jawa Timur.';
    break;
                default:
                    alert('Sertifikat untuk keahlian ini belum tersedia.');
                    return; // Menghentikan eksekusi lebih lanjut
            }

            // Tentukan apakah file adalah gambar atau PDF dan tampilkan yang sesuai
            if (contentPath.endsWith('.pdf')) {
                modalPdf.src = contentPath;
                modalPdf.style.display = 'block';
                modalImage.style.display = 'none';
            } else if (contentPath.endsWith('.png') || contentPath.endsWith('.jpg') || contentPath.endsWith('.jpeg') || contentPath.endsWith('.gif')) {
                modalImage.src = contentPath;
                modalImage.style.display = 'block';
                modalPdf.style.display = 'none';
            } else {
                alert('Tipe file tidak didukung untuk ditampilkan di modal.');
                return;
            }

            modalDescription.textContent = descriptionText;
            certificateModal.style.display = 'flex'; // Tampilkan modal
        });
    });

}); // Pastikan kurung kurawal penutup ini ada dan tidak terhapus