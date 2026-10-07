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
  initTypewriter();
  initCardTilt();
  initEarthCanvas();
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
  const navbar = document.getElementById("navbar");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (hamburger) hamburger.classList.remove("active");
      if (navMenu) navMenu.classList.remove("active");
    });
  });

  // Navbar Scrolled Effect
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.pageYOffset > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
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

// ==========================================
// 11. Typewriter Animation (Portfolio Feature)
// ==========================================
const HERO_TYPE_WORDS = [
  "Romantic Private Cabins",
  "Artisanal Coffee & Shakes",
  "Birthday & Anniversary Celebrations",
  "Royal North Indian Curries",
  "Intimate Candlelight Moments",
  "Metropolitan Luxury Ambience"
];

function initTypewriter() {
  const el = document.getElementById("heroTypingText");
  if (!el) return;

  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 90;

  function type() {
    const currentWord = HERO_TYPE_WORDS[wordIdx];
    if (isDeleting) {
      charIdx--;
      el.textContent = currentWord.substring(0, charIdx);
      delay = 45;
    } else {
      charIdx++;
      el.textContent = currentWord.substring(0, charIdx);
      delay = 85;
    }

    if (!isDeleting && charIdx === currentWord.length) {
      delay = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % HERO_TYPE_WORDS.length;
      delay = 400; // Brief pause before typing next word
    }

    setTimeout(type, delay);
  }

  type();
}

// ==========================================
// 12. 3D Card Tilt Micro-Interaction (Portfolio ServiceCard Tilt)
// ==========================================
function initCardTilt() {
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const tiltCards = document.querySelectorAll(".experience-card, .gastro-card, .review-card");

    tiltCards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((centerY - y) / centerY) * 7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
}

// ==========================================
// 13. 3D Interactive Realistic Earth Globe (Portfolio Replica)
//     With Tarkulwa, Deoria Interactive Pin -> Google Maps
// ==========================================
function initEarthCanvas() {
  const container = document.getElementById("earthCanvasContainer");
  const spinner = document.getElementById("earthLoadingSpinner");
  if (!container) return;

  if (typeof THREE === "undefined") {
    console.warn("Three.js not loaded. Earth canvas skipped.");
    if (spinner) spinner.style.display = "none";
    return;
  }

  // Dimensions
  let width = container.clientWidth || 450;
  let height = container.clientHeight || 450;
  const isMobile = window.innerWidth < 768;
  const radius = isMobile ? 1.62 : 1.54; // Phone: medium prominent size, Desktop: 1.54

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, isMobile ? 5.2 : 6.3);

  // WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  if (THREE.SRGBColorSpace) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  } else if (THREE.sRGBEncoding) {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }
  container.appendChild(renderer.domElement);

  // Lighting (Identical to portfolio Earth.jsx)
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
  sunLight.position.set(6, 3, 6);
  scene.add(sunLight);

  const bluePointLight = new THREE.PointLight(0x38bdf8, 0.85);
  bluePointLight.position.set(-6, -3, -6);
  scene.add(bluePointLight);

  const softDirLight = new THREE.DirectionalLight(0x93c5fd, 0.5);
  softDirLight.position.set(-4, 2, -2);
  scene.add(softDirLight);

  // Controls (OrbitControls from CDN)
  let controls = null;
  if (typeof THREE.OrbitControls !== "undefined") {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Prevent hijack of page scroll
    controls.maxPolarAngle = Math.PI / 1.6;
    controls.minPolarAngle = Math.PI / 2.6;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableRotate = true;
  }

  // Texture Loader with cache & manager
  const manager = new THREE.LoadingManager();
  manager.onLoad = () => {
    if (spinner) {
      spinner.classList.add("hidden");
      setTimeout(() => { spinner.style.display = "none"; }, 450);
    }
  };
  manager.onError = (url) => {
    console.warn("Failed to load texture:", url);
    if (spinner) spinner.style.display = "none";
  };

  const textureLoader = new THREE.TextureLoader(manager);
  const dayMap = textureLoader.load("images/earth/earth_day.jpg");
  const normalMap = textureLoader.load("images/earth/earth_normal.jpg");
  const specularMap = textureLoader.load("images/earth/earth_specular.jpg");
  const cloudsMap = textureLoader.load("images/earth/earth_clouds.png");

  if (THREE.SRGBColorSpace) {
    dayMap.colorSpace = THREE.SRGBColorSpace;
    cloudsMap.colorSpace = THREE.SRGBColorSpace;
  } else if (THREE.sRGBEncoding) {
    dayMap.encoding = THREE.sRGBEncoding;
    cloudsMap.encoding = THREE.sRGBEncoding;
  }

  // Earth Group tilted like Earth's axial tilt (0.2 rad ~ 11.5 deg display tilt)
  const earthGroup = new THREE.Group();
  earthGroup.rotation.x = 0.2;
  scene.add(earthGroup);

  // 1. Realistic Earth Mesh
  const earthGeo = new THREE.SphereGeometry(radius, 64, 64);
  const earthMat = new THREE.MeshStandardMaterial({
    map: dayMap,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.85, 0.85),
    roughnessMap: specularMap,
    roughness: 0.65,
    metalness: 0.12,
  });
  const earthMesh = new THREE.Mesh(earthGeo, earthMat);
  earthGroup.add(earthMesh);

  // 2. Realistic Floating Clouds Mesh
  const cloudsGeo = new THREE.SphereGeometry(radius + 0.026, 64, 64);
  const cloudsMat = new THREE.MeshStandardMaterial({
    map: cloudsMap,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
  earthGroup.add(cloudsMesh);

  // 3. Atmospheric Fresnel Soft Blue Rim Glow
  const atmosGeo = new THREE.SphereGeometry(radius + 0.08, 48, 48);
  const atmosMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
  earthGroup.add(atmosMesh);

  // 4. Tarkulwa, Deoria Location Pin Marker
  // Coordinates: 26.6375° N, 83.8974° E
  const LAT = 26.6375;
  const LON = 83.8974;
  const phi = (90 - LAT) * (Math.PI / 180);
  const theta = (LON + 180) * (Math.PI / 180);

  const pinX = -(radius * Math.sin(phi) * Math.cos(theta));
  const pinY = radius * Math.cos(phi);
  const pinZ = radius * Math.sin(phi) * Math.sin(theta);
  const pinPos = new THREE.Vector3(pinX, pinY, pinZ);

  const pinGroup = new THREE.Group();
  pinGroup.position.copy(pinPos);

  // Orient pin to point outward from Earth's center
  const normal = pinPos.clone().normalize();
  pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

  // A. Glowing Base Ring on Ground
  const ringGeo = new THREE.RingGeometry(0.018, 0.048, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xef4444,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2;
  pinGroup.add(ringMesh);

  // B. Golden Stem / Needle
  const stemHeight = 0.18;
  const stemGeo = new THREE.CylinderGeometry(0.008, 0.003, stemHeight, 14);
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.9,
    roughness: 0.2
  });
  const stemMesh = new THREE.Mesh(stemGeo, stemMat);
  stemMesh.position.y = stemHeight / 2;
  pinGroup.add(stemMesh);

  // C. Glowing Crimson Head
  const headRadius = 0.052;
  const headGeo = new THREE.SphereGeometry(headRadius, 20, 20);
  const headMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xd97706,
    emissiveIntensity: 0.9,
    roughness: 0.25,
    metalness: 0.3
  });
  const headMesh = new THREE.Mesh(headGeo, headMat);
  headMesh.position.y = stemHeight + headRadius;
  pinGroup.add(headMesh);

  // D. Pulsing Beacon Halo Wave
  const pulseGeo = new THREE.RingGeometry(0.04, 0.11, 32);
  const pulseMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });
  const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
  pulseMesh.position.y = stemHeight + headRadius;
  pulseMesh.rotation.x = Math.PI / 2;
  pinGroup.add(pulseMesh);

  // E. Larger Clickable Hit Target Sphere for easy tap/click
  const hitGeo = new THREE.SphereGeometry(0.28, 12, 12);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false, wireframe: false });
  const hitMesh = new THREE.Mesh(hitGeo, hitMat);
  hitMesh.position.y = stemHeight + headRadius;
  hitMesh.name = "pinHitTarget";
  pinGroup.add(hitMesh);

  // Attach pinGroup directly to earthMesh so it rotates synchronously with the globe
  earthMesh.add(pinGroup);

  // Initial rotation angle to present Tarkulwa / India facing nicely towards user
  earthMesh.rotation.y = -theta + Math.PI * 0.45;

  // Interactivity: Click on Pin -> Google Maps Direct
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let pointerDownPos = { x: 0, y: 0 };
  let isPointerDown = false;

  const clickableObjects = [hitMesh, headMesh, stemMesh, ringMesh, pulseMesh];

  function openGoogleMapsDirections() {
    const mapsUrl = "https://maps.google.com/?q=26.6374995,83.897364";
    showToast("Opening Amour Cafe in Google Maps...");
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  }

  // Pointer event listeners to distinguish between Drag-to-rotate vs Click
  renderer.domElement.addEventListener("pointerdown", (e) => {
    isPointerDown = true;
    pointerDownPos = { x: e.clientX, y: e.clientY };
  });

  renderer.domElement.addEventListener("pointerup", (e) => {
    if (!isPointerDown) return;
    isPointerDown = false;

    // Check if pointer moved significantly (if > 6px, it was a drag, not a click)
    const dx = e.clientX - pointerDownPos.x;
    const dy = e.clientY - pointerDownPos.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 8) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects, true);

      if (intersects.length > 0) {
        openGoogleMapsDirections();
      } else {
        // Also check if user clicked on Earth surface near the pin
        const earthIntersects = raycaster.intersectObject(earthMesh, false);
        if (earthIntersects.length > 0) {
          const hitPoint = earthIntersects[0].point;
          const worldPinPos = new THREE.Vector3();
          headMesh.getWorldPosition(worldPinPos);
          if (hitPoint.distanceTo(worldPinPos) < 0.45) {
            openGoogleMapsDirections();
          }
        }
      }
    }
  });

  // Hover cursor feedback
  renderer.domElement.addEventListener("pointermove", (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableObjects, true);

    if (intersects.length > 0) {
      renderer.domElement.style.cursor = "pointer";
    } else {
      renderer.domElement.style.cursor = isPointerDown ? "grabbing" : "grab";
    }
  });

  // Responsive Resize
  function handleResize() {
    if (!container) return;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    if (newWidth === 0 || newHeight === 0) return;

    camera.aspect = newWidth / newHeight;
    const currentlyMobile = window.innerWidth < 768;
    camera.position.z = currentlyMobile ? 5.2 : 6.3;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }
  window.addEventListener("resize", handleResize);

  // Animation Loop
  const clock = new THREE.Clock();
  let animId = null;

  function animate() {
    animId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Gentle realistic rotation (pauses slightly on user drag)
    if (!isPointerDown) {
      earthMesh.rotation.y += delta * 0.08;
      cloudsMesh.rotation.y += delta * 0.12;
    }

    // Beacon pulse animation
    const pulseFactor = (Math.sin(elapsedTime * 3.5) + 1) * 0.5; // 0 to 1
    const currentScale = 0.9 + pulseFactor * 0.7;
    pulseMesh.scale.set(currentScale, currentScale, currentScale);
    pulseMat.opacity = 0.85 - pulseFactor * 0.65;

    // Head gentle breathing glow
    headMat.emissiveIntensity = 0.65 + pulseFactor * 0.45;

    if (controls) {
      controls.update();
    }

    renderer.render(scene, camera);
  }

  animate();
}

