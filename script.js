document.addEventListener('DOMContentLoaded', function() {
    console.log('Script.js: DOMContentLoaded event fired. Script is running.'); // DEBUGGING LOG 1

    // Smooth scrolling for all internal anchor links (e.g., <a href="#section_id">)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const header = document.querySelector('header');
                    const headerOffset = header ? header.offsetHeight : 0;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerOffset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll-reveal effect for sections
    const sections = document.querySelectorAll('.hero, .portfolio-section, .about-section, .experience-section, .skills-section, .contact-section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    const sectionObserver = new IntersectionObserver(revealSection, { root: null, threshold: 0.15 });
    sections.forEach(section => { sectionObserver.observe(section); });

    // Modal functionality (untuk sertifikat dan sekarang analitik portofolio)
    const certificateModal = document.getElementById('certificateModal');
    const closeButton = document.querySelector('.modal .close-button');
    const modalImage = document.getElementById('modalCertificateImage');
    const modalPdf = document.getElementById('modalCertificatePdf'); // Tetap ada untuk CV
    const modalDescription = document.getElementById('modalDescription');
    const slideCounter = document.getElementById('slideCounter'); // Elemen untuk menampilkan nomor slide
    const prevBtn = document.querySelector('.slider-btn.prev-btn');
    const nextBtn = document.querySelector('.slider-btn.next-btn');

    let currentImages = []; // Array untuk menyimpan gambar-gambar slider saat ini
    let currentImageIndex = 0; // Index gambar yang sedang ditampilkan

    // Fungsi untuk menampilkan gambar pada slider
    function showImage(index) {
        if (currentImages.length === 0) {
            modalImage.style.display = 'none';
            if (slideCounter) slideCounter.textContent = ''; // Conditional check for slideCounter
            if (prevBtn) prevBtn.style.display = 'none'; // Conditional check for prevBtn
            if (nextBtn) nextBtn.style.display = 'none'; // Conditional check for nextBtn
            console.log('showImage: No images in currentImages array.'); // DEBUGGING LOG
            return;
        }

        currentImageIndex = index;
        if (currentImageIndex < 0) {
            currentImageIndex = currentImages.length - 1;
        } else if (currentImageIndex >= currentImages.length) {
            currentImageIndex = 0;
        }

        modalImage.src = currentImages[currentImageIndex].path;
        modalImage.style.display = 'block';
        modalPdf.style.display = 'none'; // Sembunyikan PDF saat menampilkan gambar

        modalDescription.textContent = currentImages[currentImageIndex].description;
        if (slideCounter) slideCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`; // Conditional check for slideCounter

        // Tampilkan/sembunyikan tombol navigasi jika hanya ada satu gambar
        if (currentImages.length > 1) {
            if (prevBtn) prevBtn.style.display = 'block'; // Conditional check for prevBtn
            if (nextBtn) nextBtn.style.display = 'block'; // Conditional check for nextBtn
        } else {
            if (prevBtn) prevBtn.style.display = 'none'; // Conditional check for prevBtn
            if (nextBtn) nextBtn.style.display = 'none'; // Conditional check for nextBtn
        }
        console.log('showImage: Displaying image at index', currentImageIndex, 'Path:', currentImages[currentImageIndex].path); // DEBUGGING LOG
    }

    // Event listeners untuk tombol navigasi slider
    // TAMBAHKAN PENGECEKAN KONDISIONAL DI SINI
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showImage(currentImageIndex - 1));
        nextBtn.addEventListener('click', () => showImage(currentImageIndex + 1));
        console.log('Script.js: Slider navigation buttons event listeners attached.'); // DEBUGGING LOG
    } else {
        console.log('Script.js: Slider navigation buttons not found, skipping event listeners.'); // DEBUGGING LOG
    }


    // Definisi array gambar analitik (placeholder)
    const youtubeAnalyticsImages = [
        { path: 'assets/portfolio_img/Live_Analytics2.png', description: 'Analitik YouTube Live - Halaman 1: Ringkasan performa streaming.' },
        { path: 'assets/portfolio_img/Analytic_Penonton.png', description: 'Analitik YouTube Live - Halaman 2: Detail interaksi penonton.' },
        { path: 'assets/portfolio_img/Demografi_YT.png', description: 'Analitik YouTube Live - Halaman 3: Data demografi audiens.' }
    ];

    const tiktokAnalyticsImages = [
        { path: 'assets/portfolio_img/tt_analytic_live.jpeg', description: 'Analitik TikTok Live - Halaman 1: Statistik penonton dan hadiah.' },
        { path: 'assets/portfolio_img/tt_analytic_audience.jpeg', description: 'Analitik TikTok Live - Halaman 2: Data durasi tonton dan engagement.' },
        { path: 'assets/portfolio_img/tt_analytic.jpeg', description: 'Analitik TikTok Live - Halaman 3: Metrik pertumbuhan akun.' }
    ];

    // Listener untuk item keahlian (skill-item) di CV
    const skillItems = document.querySelectorAll('.skill-item[data-detail]');
    console.log('Script.js: Found skill items:', skillItems.length, 'elements.'); // DEBUGGING LOG 2

    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Skill item clicked:', this.dataset.detail); // DEBUGGING LOG 3
            const detailType = this.dataset.detail;
            let contentPath = '';
            let descriptionText = '';

            // Reset slider state for skill-items (they are not sliders)
            currentImages = [];
            currentImageIndex = 0;
            if (prevBtn) prevBtn.style.display = 'none'; // Conditional check
            if (nextBtn) nextBtn.style.display = 'none'; // Conditional check
            if (slideCounter) slideCounter.textContent = ''; // Conditional check


            switch (detailType) {
                case 'toefl':
                    contentPath = 'assets/sertifikat/TOEFL_Sertificate.pdf';
                    descriptionText = 'Sertifikat TOEFL ITP dengan skor 580.';
                    break;
                case 'efset':
                    contentPath = 'assets/sertifikat/EF_SET_Certificate.pdf';
                    descriptionText = 'Sertifikat EF SET dengan level C1 Advanced.';
                    break;
                case 'public-speaking':
                    contentPath = 'assets/sertifikat/Public_Speaking_Certificate.jpg';
                    descriptionText = 'Sertifikat telah mengikuti pelatihan Public Speaking.';
                    break;
                case 'ti-certified':
                    contentPath = 'assets/sertifikat/Sertifikat_TI.pdf';
                    descriptionText = 'Sertifikat Teknologi Informasi (Microsoft Office Desktop Application).';
                    break;
                case 'pkl-disbudpar':
                    contentPath = 'assets/sertifikat/Sertif_PKL_DISBUDPAR.jpeg';
                    descriptionText = 'Sertifikat Pengalaman Kerja Lapangan di Dinas Kebudayaan dan Pariwisata Jatim.';
                    break;
                case 'magang-pdi-p':
                    contentPath = 'assets/sertifikat/SK_Magang_Unit_Media_PDI.pdf';
                    descriptionText = 'Sertifikat Magang di Dewan Pimpinan Daerah PDI Perjuangan Jawa Timur.';
                    break;
                case 'komunikasi-interpersonal':
                    contentPath = '';
                    descriptionText = 'Kemampuan untuk berinteraksi dan berkomunikasi secara efektif dengan orang lain, membangun hubungan baik, dan memecahkan konflik.';
                    break;
                case 'kerja-sama-tim':
                    contentPath = '';
                    descriptionText = 'Kemampuan untuk berkolaborasi secara efektif dengan anggota tim, berbagi tanggung jawab, dan bekerja sama menuju tujuan bersama.';
                    break;
                case 'negosiasi':
                    contentPath = '';
                    descriptionText = 'Keahlian dalam berdiskusi dan mencapai kesepakatan yang saling menguntungkan.';
                    break;
                case 'riset-data':
                    contentPath = '';
                    descriptionText = 'Keahlian dalam mengumpulkan, mengolah, dan menganalisis data untuk mendapatkan informasi yang relevan.';
                    break;
                case 'analisis-kebijakan':
                    contentPath = '';
                    descriptionText = 'Kemampuan untuk mengevaluasi kebijakan yang ada atau mengusulkan kebijakan baru berdasarkan analisis data dan kebutuhan.';
                    break;
                case 'microsoft-office':
                    contentPath = '';
                    descriptionText = 'Menguasai penggunaan Microsoft Office Suite (Word, Excel, PowerPoint) untuk keperluan pengolahan dokumen, data, dan presentasi.';
                    break;
                default:
                    console.log('Detail untuk keahlian ini belum tersedia: ' + detailType);
                    return;
            }

            // Tentukan apakah file adalah gambar atau PDF dan tampilkan yang sesuai
            if (contentPath.endsWith('.pdf')) {
                modalPdf.src = contentPath;
                modalPdf.style.display = 'block';
                modalImage.style.display = 'none';
                console.log('Skill item: Displaying PDF from', contentPath); // DEBUGGING LOG
            } else if (contentPath.endsWith('.png') || contentPath.endsWith('.jpg') || contentPath.endsWith('.jpeg') || contentPath.endsWith('.gif')) {
                modalImage.src = contentPath;
                modalImage.style.display = 'block';
                modalPdf.style.display = 'none';
                console.log('Skill item: Displaying image from', contentPath); // DEBUGGING LOG
            } else {
                modalImage.style.display = 'none';
                modalPdf.style.display = 'none';
                console.log('Skill item: No image or PDF path provided, showing text only.'); // DEBUGGING LOG
            }

            modalDescription.textContent = descriptionText;
            certificateModal.style.display = 'flex';
            console.log('Skill item: Modal should now be displayed.'); // DEBUGGING LOG
        });
    });

    // Listener untuk item portofolio analitik di index.html (sekarang sebagai slider)
    document.querySelectorAll('.portfolio-detail-trigger[data-detail]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah tautan default
            const detailType = this.dataset.detail;
            console.log('Portfolio item clicked:', detailType); // DEBUGGING LOG

            // Reset modalPdf visibility
            modalPdf.style.display = 'none';

            switch (detailType) {
                case 'youtube-analytics':
                    currentImages = youtubeAnalyticsImages;
                    modalDescription.textContent = 'Analitik Performa YouTube Live'; // Deskripsi umum untuk slider
                    break;
                case 'tiktok-analytics':
                    currentImages = tiktokAnalyticsImages;
                    modalDescription.textContent = 'Analitik Performa TikTok Live'; // Deskripsi umum untuk slider
                    break;
                default:
                    console.log('Detail untuk portofolio ini belum tersedia: ' + detailType);
                    return;
            }

            if (currentImages.length > 0) {
                showImage(0); // Tampilkan gambar pertama dari slider
            } else {
                modalImage.style.display = 'none';
                if (slideCounter) slideCounter.textContent = ''; // Conditional check
                if (prevBtn) prevBtn.style.display = 'none'; // Conditional check
                if (nextBtn) nextBtn.style.display = 'none'; // Conditional check
                modalDescription.textContent = 'Tidak ada gambar analitik yang tersedia.';
            }

            certificateModal.style.display = 'flex'; // Tampilkan modal
            console.log('Portfolio item: Modal should now be displayed.'); // DEBUGGING LOG
        });
    });


    // Event listener untuk tombol tutup modal
    closeButton.addEventListener('click', () => {
        console.log('Close button clicked.'); // DEBUGGING LOG
        certificateModal.style.display = 'none';
        modalImage.src = '';
        modalPdf.src = '';
        currentImages = []; // Bersihkan array gambar slider
        currentImageIndex = 0; // Reset index
        if (prevBtn) prevBtn.style.display = 'none'; /* Pastikan tombol slider tersembunyi saat ditutup */
        if (nextBtn) nextBtn.style.display = 'none'; /* Pastikan tombol slider tersembunyi saat ditutup */
        if (slideCounter) slideCounter.textContent = ''; /* Kosongkan penghitung slide */
    });

    // Event listener untuk menutup modal ketika mengklik di luar konten modal
    window.addEventListener('click', (event) => {
        if (event.target == certificateModal) {
            console.log('Clicked outside modal, closing.'); // DEBUGGING LOG
            certificateModal.style.display = 'none';
            modalImage.src = '';
            modalPdf.src = '';
            currentImages = []; // Bersihkan array gambar slider
            currentImageIndex = 0; // Reset index
            if (prevBtn) prevBtn.style.display = 'none'; /* Pastikan tombol slider tersembunyi saat ditutup */
            if (nextBtn) nextBtn.style.display = 'none'; /* Pastikan tombol slider tersembunyi saat ditutup */
            if (slideCounter) slideCounter.textContent = ''; /* Kosongkan penghitung slide */
        }
    });

});
