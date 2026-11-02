/**
 * Angga Restu Adi — Portfolio Script
 * Pure Vanilla JavaScript (ES6+) - Versi Bahasa Indonesia
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundBubbles();
  initNavigation();
  initScrollAnimations();
  initProjectModals();
  initContactForm();
  initEmailCopy();
});

/* ==========================================================================
   1. Generator Gelembung Latar Belakang (Ringan & Berbasis CSS Keyframe)
   ========================================================================== */
function initBackgroundBubbles() {
  const container = document.getElementById('bubble-container');
  if (!container) return;

  const bubbleConfigs = [
    // Gelembung besar ambient glow
    { size: 360, top: '10%', left: '8%', anim: 'animate-float-1', theme: 'bubble-cyan', glow: true, blur: 'blur(35px)', opacity: 0.15 },
    { size: 460, top: '55%', left: '75%', anim: 'animate-float-2', theme: 'bubble-sky', glow: true, blur: 'blur(40px)', opacity: 0.12 },
    { size: 380, top: '70%', left: '15%', anim: 'animate-float-3', theme: 'bubble-royal', glow: false, blur: 'blur(28px)', opacity: 0.14 },

    // Gelembung medium liquid
    { size: 180, top: '22%', left: '82%', anim: 'animate-float-4', theme: 'bubble-cyan', glow: true, blur: 'blur(4px)', opacity: 0.20 },
    { size: 140, top: '38%', left: '4%', anim: 'animate-float-1', theme: 'bubble-sky', glow: false, blur: 'blur(3px)', opacity: 0.18 },
    { size: 220, top: '78%', left: '42%', anim: 'animate-float-2', theme: 'bubble-cyan', glow: true, blur: 'blur(6px)', opacity: 0.18 },
    { size: 160, top: '12%', left: '45%', anim: 'animate-float-3', theme: 'bubble-white', glow: false, blur: 'blur(4px)', opacity: 0.20 },

    // Gelembung halus berkilau
    { size: 75, top: '6%', left: '28%', anim: 'animate-float-2', theme: 'bubble-cyan', glow: true, blur: 'none', opacity: 0.25 },
    { size: 90, top: '48%', left: '92%', anim: 'animate-float-1', theme: 'bubble-sky', glow: true, blur: 'none', opacity: 0.22 },
    { size: 60, top: '65%', left: '2%', anim: 'animate-float-3', theme: 'bubble-white', glow: false, blur: 'none', opacity: 0.26 },
    { size: 110, top: '88%', left: '88%', anim: 'animate-float-4', theme: 'bubble-cyan', glow: true, blur: 'blur(2px)', opacity: 0.20 },
    { size: 50, top: '30%', left: '50%', anim: 'animate-float-1', theme: 'bubble-sky', glow: false, blur: 'none', opacity: 0.28 },
    { size: 80, top: '82%', left: '20%', anim: 'animate-float-2', theme: 'bubble-cyan', glow: true, blur: 'none', opacity: 0.24 }
  ];

  const fragment = document.createDocumentFragment();

  bubbleConfigs.forEach((cfg) => {
    const bubble = document.createElement('div');
    bubble.className = `bubble ${cfg.anim} ${cfg.theme} ${cfg.glow ? 'has-glow' : ''}`;
    bubble.style.width = `${cfg.size}px`;
    bubble.style.height = `${cfg.size}px`;
    bubble.style.top = cfg.top;
    bubble.style.left = cfg.left;
    bubble.style.opacity = cfg.opacity;
    if (cfg.blur !== 'none') {
      bubble.style.filter = cfg.blur;
    }

    const inner = document.createElement('div');
    inner.className = 'bubble-inner';

    const highlight = document.createElement('div');
    highlight.className = 'bubble-highlight';

    inner.appendChild(highlight);
    bubble.appendChild(inner);
    fragment.appendChild(bubble);
  });

  container.appendChild(fragment);
}

/* ==========================================================================
   2. Navigasi Atas & Smooth Scrolling & Scroll-Spy
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('.top-nav-link');
  const sections = ['home', 'about', 'project', 'contact'].map(id => document.getElementById(id)).filter(Boolean);

  // Smooth scroll click handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveNavLink(targetId);
      }
    });
  });

  // Intersection Observer untuk sinkronisasi posisi scroll
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          setActiveNavLink(sectionId);
        }
      });
    }, {
      root: null,
      rootMargin: '-25% 0px -45% 0px',
      threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
  }

  function setActiveNavLink(id) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Tombol Kembali ke Atas
  const backTopBtn = document.getElementById('back-to-top');
  if (backTopBtn) {
    backTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   3. Animasi Reveal saat Scroll
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-section');
  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  animatedElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   4. Modal Detail Proyek (Data 2 Proyek dalam Bahasa Indonesia)
   ========================================================================== */
const PROJECTS_DATA = {
  'project-1': {
    title: 'Optimalisasi Throughput Lini Otomasi',
    category: 'Otomasi',
    date: 'Operasional Terkini',
    image: 'images/project1.jpeg',
    description: 'Melakukan pemantauan performa tingkat shift dan rutinitas kalibrasi untuk mengatasi kendala berulang pada sistem konveyor otomatis. Menyempurnakan serah terima operasional dan standarisasi checklist changeover sehingga meningkatkan waktu operasional (uptime) dan kelancaran siklus produksi.',
    metrics: [
      '+14% Throughput Harian',
      '99.6% Kontinuitas Lini',
      '18 Menit Dihemat per Shift'
    ],
    highlights: [
      'Mengidentifikasi titik jeda sensor kritis dan mengalibrasi waktu pengumpanan bersama tim pemeliharaan.',
      'Menyusun panduan ringkas 5 langkah changeover terstandarisasi untuk personel shift.',
      'Nihil insiden keselamatan kerja sepanjang periode implementasi optimalisasi.'
    ],
    tags: ['Optimalisasi Siklus', 'Standar Kerja (SOP)', 'Titik Inspeksi Preventif']
  },
  'project-2': {
    title: 'Monitoring Operasional & Tinjauan Telemetri SCADA',
    category: 'Kendali Proses',
    date: 'Inisiatif Berjalan',
    image: 'images/project2.jpeg',
    description: 'Menjaga kewaspadaan berkelanjutan terhadap parameter operasional langsung (real-time), ambang batas sensor, dan pemicu peringatan sistem. Menerapkan panduan triase terstruktur untuk alarm prioritas tinggi guna mencegah penghentian mesin yang tidak direncanakan.',
    metrics: [
      '< 90 detik Triase Insiden',
      '100% Verifikasi Parameter',
      '99.9% Target Uptime'
    ],
    highlights: [
      'Memantau lebih dari 20 sensor operasional langsung dan kanal variabel telemetri secara simultan.',
      'Menerapkan eskalasi alarm terstruktur untuk pengiriman teknisi yang cepat dan tepat sasaran.',
      'Menyampaikan laporan serah terima shift secara konsisten dengan data operasional terverifikasi.'
    ],
    tags: ['Pengawasan SCADA', 'Penanganan Telemetri', 'Respons Cepat']
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalCategory = document.getElementById('modal-category');
  const modalDate = document.getElementById('modal-date');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalMetrics = document.getElementById('modal-metrics');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalTags = document.getElementById('modal-tags');

  if (!modalOverlay) return;

  const openButtons = document.querySelectorAll('[data-project-id]');
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      const data = PROJECTS_DATA[projectId];
      if (!data) return;

      modalImg.src = data.image;
      modalImg.alt = data.title;
      modalCategory.textContent = data.category;
      modalDate.textContent = data.date;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.description;

      // Render metrik
      modalMetrics.innerHTML = data.metrics.map(m => `
        <div class="glass-card" style="padding: 0.75rem; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
          <span style="font-size: 0.8rem; font-weight: 700; color: #FFFFFF;">${m}</span>
        </div>
      `).join('');

      // Render poin utama
      modalHighlights.innerHTML = data.highlights.map(h => `
        <li style="font-size: 0.85rem; color: rgba(224, 242, 254, 0.9); display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem;">
          <span style="color: #2DD4BF; font-weight: bold;">•</span>
          <span>${h}</span>
        </li>
      `).join('');

      // Render tags
      modalTags.innerHTML = data.tags.map((t, idx) => `
        <span>${t}${idx < data.tags.length - 1 ? ' · ' : ''}</span>
      `).join('');

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}


function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span style="display: inline-block; width: 14px; height: 14px; border: 2px solid #FFFFFF; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; margin-right: 6px;"></span>
        <span>Mengirim Pesan...</span>
      `;
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          <span>Kirim Pesan</span>
        `;
      }

      if (alertBox) {
        alertBox.textContent = `Terima kasih, ${name}! Pesan Anda telah berhasil dikirim. Angga akan segera menghubungi Anda kembali.`;
        alertBox.classList.add('visible');
        setTimeout(() => {
          alertBox.classList.remove('visible');
        }, 6000);
      }
    }, 850);
  });
}


function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const emailText = 'angga.restu.adi@gmail.com';
    navigator.clipboard.writeText(emailText).then(() => {
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span style="color: #2DD4BF;">Tersalin!</span>
      `;
      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
      }, 2500);
    }).catch(err => {
      console.warn('Gagal menyalin email', err);
    });
  });
}
