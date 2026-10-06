/**
 * Amour Cafe & Restaurant - Interactive Scripts
 * Tarkulwa, Deoria
 */

// ==========================================
// 1. Gallery Lightbox Items Database
// ==========================================
const GALLERY_ITEMS = [
  { src: "images/hero_ambience.jpg", caption: "Main Dining Lounge & Warm Ambient Lighting" },
  { src: "images/private_cabin.jpg", caption: "Cozy Private Dining Cabins for Couples & Private Guests" },
  { src: "images/interior_dining.jpg", caption: "Spacious Family Dining Arrangement" },
  { src: "images/seating_lounge.jpg", caption: "Relaxing Wooden Architecture Lounge & Coffee Bar" },
  { src: "images/exterior_signboard.jpg", caption: "Amour Cafe Exterior Landmark - Balpur Road, Tarkulwa" },
  { src: "images/cafe_decor.jpg", caption: "Aesthetic Wall Art & Celebration Neon Backdrop" },
  { src: "images/dining_area.jpg", caption: "Comfortable Dining Booths with Gracious Hospitality" }
];

let currentLightboxIdx = 0;
let selectedStarCount = 5;

// ==========================================
// 2. Initialization on DOM Load
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initLiveHoursStatus();
  initHeroVideo();
  setupNavigation();
  initReservationDate();
  initScrollAnimations();
});

// ==========================================
// 3. Hero Background Video Controller
// ==========================================
function initHeroVideo() {
  const video = document.getElementById("heroBgVideo");
  if (!video) return;

  // Ensure autoplay works across modern browsers
  video.muted = true;
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Auto-play was prevented; show play icon state
      const icon = document.getElementById("videoControlIcon");
      const text = document.getElementById("videoControlText");
      if (icon) icon.className = "fa-solid fa-play";
      if (text) text.textContent = "Play Video";
    });
  }
}

function toggleHeroVideo() {
  const video = document.getElementById("heroBgVideo");
  const icon = document.getElementById("videoControlIcon");
  const text = document.getElementById("videoControlText");
  if (!video) return;

  if (video.paused) {
    video.play();
    if (icon) icon.className = "fa-solid fa-pause";
    if (text) text.textContent = "Pause Video";
    showToast("Background video playing");
  } else {
    video.pause();
    if (icon) icon.className = "fa-solid fa-play";
    if (text) text.textContent = "Play Video";
    showToast("Background video paused");
  }
}

// ==========================================
// 4. Live Operating Hours Status Checker
// ==========================================
function initLiveHoursStatus() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeVal = currentHour + currentMinutes / 60;

  // Open daily 10:00 AM to 10:00 PM (10.0 to 22.0)
  const isOpen = currentTimeVal >= 10.0 && currentTimeVal < 22.0;

  const liveStatusText = document.getElementById("liveStatusText");
  const contactLiveBadge = document.getElementById("contactLiveBadge");

  if (liveStatusText) {
    if (isOpen) {
      liveStatusText.innerHTML = `<strong>Open Now</strong> • Welcoming Guests until 10:00 PM`;
      liveStatusText.style.color = "#10b981";
    } else {
      liveStatusText.innerHTML = `<strong>Currently Closed</strong> • Opens at 10:00 AM Tomorrow`;
      liveStatusText.style.color = "#f43f5e";
    }
  }

  if (contactLiveBadge) {
    if (isOpen) {
      contactLiveBadge.innerHTML = `<span class="live-dot pulse"></span> Open Today until 10:00 PM`;
      contactLiveBadge.style.color = "#10b981";
    } else {
      contactLiveBadge.innerHTML = `<span class="live-dot" style="background:#f43f5e"></span> Opens Tomorrow at 10:00 AM`;
      contactLiveBadge.style.color = "#f43f5e";
    }
  }
}

// ==========================================
// 5. Table & Cabin Reservation Concierge
// ==========================================
function openReservationModal(preference = "Private Dining Cabin") {
  const modal = document.getElementById("reserveModal");
  const typeSelect = document.getElementById("resType");
  if (typeSelect && preference) {
    typeSelect.value = preference;
  }
  if (modal) {
    modal.classList.add("active");
  }
}

function closeReservationModal() {
  const modal = document.getElementById("reserveModal");
  if (modal) modal.classList.remove("active");
}

function initReservationDate() {
  const dateInput = document.getElementById("resDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;
  }
}

function handleReservationSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("resName").value.trim();
  const phone = document.getElementById("resPhone").value.trim();
  const date = document.getElementById("resDate").value;
  const time = document.getElementById("resTime").value;
  const guests = document.getElementById("resGuests").value;
  const type = document.getElementById("resType").value;
  const notes = document.getElementById("resNotes").value.trim();

  let message = `🥂 *Table / Private Cabin Booking Request*\n\n`;
  message += `👤 *Guest Name:* ${name}\n`;
  message += `📱 *Contact Number:* ${phone}\n`;
  message += `📅 *Date:* ${date}\n`;
  message += `⏰ *Time Slot:* ${time}\n`;
  message += `👥 *Number of Guests:* ${guests}\n`;
  message += `💺 *Seating Preference:* ${type}\n`;
  if (notes) {
    message += `📝 *Special Requests:* ${notes}\n`;
  }
  message += `\n_Request submitted via Amour Cafe & Restaurant Official Website._`;

  const waUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");

  closeReservationModal();
  showToast("Reservation request sent to Amour Cafe via WhatsApp!");
  document.getElementById("reservationForm").reset();
  initReservationDate();
}

// ==========================================
// 6. Photo Lightbox Gallery
// ==========================================
function openLightbox(index) {
  currentLightboxIdx = index;
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");

  if (modal && img && GALLERY_ITEMS[index]) {
    img.src = GALLERY_ITEMS[index].src;
    caption.textContent = GALLERY_ITEMS[index].caption;
    modal.classList.add("active");
  }
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("active");
}

function changeLightbox(delta) {
  currentLightboxIdx = (currentLightboxIdx + delta + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  const img = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");
  if (img && caption && GALLERY_ITEMS[currentLightboxIdx]) {
    img.src = GALLERY_ITEMS[currentLightboxIdx].src;
    caption.textContent = GALLERY_ITEMS[currentLightboxIdx].caption;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
    closeReservationModal();
    closeReviewModal();
  } else if (e.key === "ArrowLeft") {
    changeLightbox(-1);
  } else if (e.key === "ArrowRight") {
    changeLightbox(1);
  }
});

// ==========================================
// 7. Reviews & Guest Feedback
// ==========================================
function openReviewModal() {
  const modal = document.getElementById("reviewModal");
  if (modal) modal.classList.add("active");
}

function closeReviewModal() {
  const modal = document.getElementById("reviewModal");
  if (modal) modal.classList.remove("active");
}

function selectStar(rating) {
  selectedStarCount = rating;
  const stars = document.querySelectorAll(".star-opt");
  stars.forEach((s, idx) => {
    if (idx < rating) {
      s.classList.add("active");
    } else {
      s.classList.remove("active");
    }
  });
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("revAuthor").value.trim();
  const text = document.getElementById("revComment").value.trim();

  const track = document.getElementById("reviewsTrack");
  if (track) {
    const card = document.createElement("div");
    card.className = "review-card";
    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "G";
    const starString = "★".repeat(selectedStarCount) + "☆".repeat(5 - selectedStarCount);

    card.innerHTML = `
      <div class="review-stars">${starString}</div>
      <p class="review-text">"${text}"</p>
      <div class="reviewer-meta">
        <div class="reviewer-avatar">${initials}</div>
        <div class="reviewer-info">
          <h5>${name}</h5>
          <span>Just Now • Verified Patron</span>
        </div>
        <i class="fa-solid fa-certificate text-gold review-source-icon"></i>
      </div>
    `;
    track.prepend(card);
  }

  closeReviewModal();
  showToast("Thank you for sharing your experience!");
  e.target.reset();
  selectStar(5);
}

// ==========================================
// 8. Navigation & UI Helpers
// ==========================================
function setupNavigation() {
  const hamburger = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("active");
    });
  });

  // Accordion Logic
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const isCurrentActive = item.classList.contains("active");
        faqItems.forEach(i => i.classList.remove("active"));
        if (!isCurrentActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // Scrollspy
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  });
}

function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const msgEl = document.getElementById("toastMessage");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 3200);
}

// ==========================================
// 10. Scroll-Triggered Reveal Animations (AOS & IntersectionObserver)
// ==========================================
function initScrollAnimations() {
  // Initialize AOS (Animate On Scroll) Library
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      once: true,
      offset: 50,
      delay: 50
    });
  }

  // Native IntersectionObserver for .reveal-on-scroll elements
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (revealElements.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px"
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add("is-visible"));
    }
  }
}
