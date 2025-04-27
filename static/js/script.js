// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variabel untuk melacak status loading
    let pageLoaded = false;
    let loaderHidden = false;
    
    // Fungsi untuk memulai animasi home
    function startHomeAnimations() {
        // Hanya jalankan jika kedua kondisi terpenuhi
        if (pageLoaded && loaderHidden) {
            // Animasi elemen hero
            const heroElements = [
                document.querySelector('.hero h1'),
                document.querySelector('.typing-container'),
                document.querySelector('.hero-description'),
                document.querySelector('.cta-buttons'),
                document.querySelector('.social-icons'),
                document.querySelector('.scroll-down')
            ];
            
            // Reset animasi dengan menghapus animasi yang ada dan mengatur opacity ke 0
            heroElements.forEach(el => {
                if (el) {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                }
            });
            
            // Mulai animasi segera (tanpa delay tambahan)
            if (heroElements[0]) heroElements[0].style.animation = 'fadeInUp 1s forwards';
            setTimeout(() => {
                if (heroElements[1]) heroElements[1].style.animation = 'fadeInUp 1s forwards';
            }, 200);
            setTimeout(() => {
                if (heroElements[2]) heroElements[2].style.animation = 'fadeInUp 1s forwards';
            }, 400);
            setTimeout(() => {
                if (heroElements[3]) heroElements[3].style.animation = 'fadeInUp 1s forwards';
            }, 600);
            setTimeout(() => {
                if (heroElements[4]) heroElements[4].style.animation = 'fadeInUp 1s forwards';
            }, 800);
            setTimeout(() => {
                if (heroElements[5]) {
                    heroElements[5].style.opacity = '1';
                    heroElements[5].style.animation = 'bounce 2s infinite';
                }
            }, 1000);
            
            // Mulai animasi typing setelah semua animasi hero selesai
            setTimeout(type, 1200);
        }
    }

    // Hide loader when page is loaded
    window.addEventListener('load', function() {
        pageLoaded = true;
        const loader = document.querySelector('.loader-container');
        
        // Kurangi delay penghilangan loader
        setTimeout(function() {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            
            // Kurangi delay sebelum menghilangkan loader
            setTimeout(function() {
                loader.style.display = 'none';
                loaderHidden = true;
                
                // Segera panggil fungsi untuk memulai animasi home
                startHomeAnimations();
            }, 300); // Kurangi delay dari 500ms menjadi 300ms
        }, 800); // Kurangi delay dari 1500ms menjadi 800ms
    });

    // Typing Animation
    function type() {
        const typingText = document.getElementById('typing-text');
        const phrases = [
            'AI & ML Engineer',
            'Python Developer',
            'Backend Developer',
            'Data Scientist',
            'Freelancer'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Remove character
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Add character
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            // If word is complete
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at end of word
                typingSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                // Pause before typing next word
                typingSpeed = 500;
            }

            setTimeout(typeWriter, typingSpeed);
        }

        typeWriter();
    }

    // Tambahkan CSS untuk memastikan animasi home tidak terlihat sebelum loader hilang
    const hideAnimationsStyle = document.createElement('style');
    hideAnimationsStyle.textContent = `
        .hero h1, .typing-container, .hero-description, .cta-buttons, .social-icons, .scroll-down {
            opacity: 0;
            transform: translateY(30px);
            animation: none !important;
        }
    `;
    document.head.appendChild(hideAnimationsStyle);

    // Hapus style tersebut saat loader hilang
    function removeHideAnimationsStyle() {
        if (hideAnimationsStyle && hideAnimationsStyle.parentNode) {
            hideAnimationsStyle.parentNode.removeChild(hideAnimationsStyle);
        }
    }

    // Modifikasi fungsi startHomeAnimations untuk menghapus style
    const originalStartHomeAnimations = startHomeAnimations;
    startHomeAnimations = function() {
        removeHideAnimationsStyle();
        originalStartHomeAnimations();
    };

    // Header scroll effect
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });

    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        const navLinks = document.querySelectorAll('.nav-links a');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animation on scroll using ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: false
        });

        sr.reveal('.section-header', {});
        sr.reveal('.about-image', { origin: 'left' });
        sr.reveal('.about-text', { origin: 'right' });
        sr.reveal('.skill-item', { interval: 100 });
        sr.reveal('.project-item', { interval: 200 });
        sr.reveal('.contact-info', { origin: 'left' });
        sr.reveal('.contact-form', { origin: 'right' });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Tetap cegah submit default

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation (tetap pertahankan)
            if (!name || !email || !subject || !message) {
                showFormAlert('Please fill in all fields', 'error');
                return;
            }

            // Email validation (tetap pertahankan)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormAlert('Please enter a valid email address', 'error');
                return;
            }

            // --- GANTI BAGIAN SIMULASI DENGAN KODE FETCH ---
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Data yang akan dikirim ke backend
            const formData = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };

            // Kirim data ke endpoint Flask Anda
            fetch('/api/send-message', { // Pastikan endpoint ini cocok dengan route Flask Anda
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Kirim data sebagai JSON
            })
            .then(response => {
                // Cek apakah response dari server OK (status code 2xx)
                if (!response.ok) {
                    // Jika tidak OK, coba baca pesan error dari server jika ada
                    return response.json().then(errData => {
                        throw new Error(errData.message || `Server error: ${response.status}`);
                    }).catch(() => {
                        // Jika tidak ada pesan JSON, lempar error umum
                        throw new Error(`Server error: ${response.status}`);
                    });
                }
                return response.json(); // Jika OK, parse response JSON
            })
            .then(data => {
                // Server mengembalikan sukses
                if (data.success) {
                    showFormAlert('Your message has been sent successfully!', 'success');
                    contactForm.reset(); // Reset form jika berhasil
                } else {
                    // Server mengembalikan pesan error spesifik
                    showFormAlert(data.message || 'An error occurred. Please try again.', 'error');
                }
            })
            .catch(error => {
                // Tangani error network atau error lainnya
                console.error('Error sending message:', error);
                showFormAlert(`Failed to send message: ${error.message}`, 'error');
            })
            .finally(() => {
                // Selalu kembalikan tombol ke state semula, baik sukses maupun gagal
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
            // --- AKHIR BAGIAN SIMULASI ---
        });
    }
    
        // Cari semua tombol close pada flash messages
        const closeButtons = document.querySelectorAll('.alert .close-btn');

        // Tambahkan event listener untuk setiap tombol close
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Dapatkan elemen alert parent
                const alert = this.parentElement;
                
                // Animasi fade out
                alert.style.opacity = '0';
                
                // Hapus elemen setelah animasi selesai
                setTimeout(() => {
                    alert.remove();
                }, 300);
            });
        });
        
        // Otomatis hilangkan flash message setelah 5 detik
        const flashMessages = document.querySelectorAll('.alert');
        if (flashMessages.length > 0) {
            setTimeout(() => {
                flashMessages.forEach(message => {
                    message.style.opacity = '0';
                    setTimeout(() => {
                        message.remove();
                    }, 300);
                });
            }, 5000);
        }

    // Form alert function
    function showFormAlert(message, type) {
        // Check if alert already exists and remove it
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `form-alert ${type}`;
        alert.textContent = message;
        
        // Insert alert before form
        const contactForm = document.getElementById('contactForm');
        contactForm.parentNode.insertBefore(alert, contactForm);
        
        // Auto remove alert after 5 seconds
        setTimeout(function() {
            alert.style.opacity = '0';
            setTimeout(function() {
                alert.remove();
            }, 500);
        }, 5000);
    }

    // Add CSS styles for form alerts
    const style = document.createElement('style');
    style.textContent = `
        .form-alert {
            padding: 12px 15px;
            margin-bottom: 20px;
            border-radius: var(--radius-md);
            font-size: var(--text-sm);
            font-weight: 500;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .form-alert.success {
            background-color: rgba(46, 213, 115, 0.15);
            color: #2ed573;
            border-left: 4px solid #2ed573;
        }
        
        .form-alert.error {
            background-color: rgba(255, 71, 87, 0.15);
            color: #ff4757;
            border-left: 4px solid #ff4757;
        }
    `;
    document.head.appendChild(style);

    // Animate skill bars on scroll
    const animateSkillBars = function() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.progress-bar');
            const targetWidth = progressBar.style.width;
            
            // Reset width to 0 initially
            progressBar.style.width = '0%';
            
            // Create observer
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate to target width when visible
                        setTimeout(() => {
                            progressBar.style.width = targetWidth;
                        }, 200);
                        
                        // Unobserve after animation
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            // Start observing
            observer.observe(item);
        });
    };
    
    // Call the function
    animateSkillBars();

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < window.innerHeight) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // Project hover effects
    const projectItemsHover = document.querySelectorAll('.project-item');
    
    projectItemsHover.forEach(item => {
        const img = item.querySelector('.project-img img');
        
        item.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // Create animated background
    function createAnimatedBackground() {
        // Get background container
        const bgContainer = document.querySelector('.bg-animation');
        if (!bgContainer) return;
        
        // Clear existing content
        bgContainer.innerHTML = '';
        
        // Add grid
        const grid = document.createElement('div');
        grid.className = 'grid';
        bgContainer.appendChild(grid);
        
        // Add orbs
        for (let i = 1; i <= 4; i++) {
            const orb = document.createElement('div');
            orb.className = `orb orb-${i}`;
            bgContainer.appendChild(orb);
        }
        
        // Add stars
        const stars1 = document.createElement('div');
        stars1.id = 'stars';
        bgContainer.appendChild(stars1);
        
        const stars2 = document.createElement('div');
        stars2.id = 'stars2';
        bgContainer.appendChild(stars2);
        
        const stars3 = document.createElement('div');
        stars3.id = 'stars3';
        bgContainer.appendChild(stars3);

        // --- TAMBAHKAN KODE INI UNTUK MEMBUAT PARTIKEL ---
        const numberOfParticles = 100; // Jumlah partikel
        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement('div');
            // PASTIKAN NAMA CLASS BENAR (singular)
            particle.className = 'particle'; // <-- HARUS 'particle' (singular)

            // 1. Atur Ukuran Acak (tetap sama)
            const size = Math.random() * 4 + 1.5; // Ukuran antara 1.5px dan 5.5px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // 2. Atur Posisi Acak (tetap sama)
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // 3. Buat Warna Acak (tetap sama)
            const hue = Math.random() * 360;
            const saturation = 70 + Math.random() * 30;
            const lightness = 50 + Math.random() * 20;
            const randomColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

            // 4. Set Warna sebagai CSS Variable (tetap sama)
            particle.style.setProperty('--particle-color', randomColor);

            // 5. Atur Delay dan Durasi HANYA untuk animasi 'float'
            // Delay untuk memulai animasi float
            particle.style.animationDelay = `${Math.random() * 10}s`; // Hanya SATU nilai delay
            // Durasi untuk satu siklus animasi float
            particle.style.animationDuration = `${Math.random() * 10 + 15}s`; // Hanya SATU nilai durasi (15-25s)

            bgContainer.appendChild(particle);
        }
        // --- AKHIR KODE TAMBAHAN PARTIKEL ---
    }

    // Call the function to create the animated background
    createAnimatedBackground();
});