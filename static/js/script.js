// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader when page is loaded
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader-container');
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Typing Animation
    function type() {
        const typingText = document.getElementById('typing-text');
        const phrases = [
            'Frontend Developer',
            'UI/UX Designer',
            'Web Developer',
            'React Developer',
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

    // Start typing animation
    type();

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
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (in a real app, you would send data to a server)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(function() {
                // Reset form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Show success message
                showFormAlert('Your message has been sent successfully!', 'success');
            }, 2000);
        });
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

    // Theme toggle functionality (optional)
    const createThemeToggle = function() {
        // Create toggle button
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(themeToggle);
        
        // Add styles
        const themeStyles = document.createElement('style');
        themeStyles.textContent = `
            .theme-toggle {
                position: fixed;
                bottom: 30px;
                left: 30px;
                width: 50px;
                height: 50px;
                background: var(--gradient-primary);
                color: white;
                border-radius: var(--radius-full);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: var(--text-xl);
                box-shadow: var(--shadow-md);
                cursor: pointer;
                z-index: 99;
                transition: var(--transition-fast);
            }
            
            .theme-toggle:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-lg);
            }
            
            body.light-theme {
                --bg-color: #f8f9fa;
                --bg-light: #ffffff;
                --text-color: #333333;
                --text-light: #555555;
                --text-dark: #888888;
            }
            
            body.light-theme .skill-item,
            body.light-theme .contact-form {
                background: #ffffff;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
            }
        `;
        document.head.appendChild(themeStyles);
        
        // Toggle theme on click
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    };
    
    // Uncomment to enable theme toggle
    // createThemeToggle();

    // Preload images for better performance
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }
    
    // Call preload function
    preloadImages();

    // Add a simple page transition effect
    function addPageTransitions() {
        const style = document.createElement('style');
        style.textContent = `
            body {
                animation: fadeIn 1s ease-in-out;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Call page transitions
    addPageTransitions();

    // Tambahkan fungsi ini di bagian akhir file script.js, sebelum kurung tutup terakhir

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
        
        // Add particles container
        const particles = document.createElement('div');
        particles.className = 'particles';
        bgContainer.appendChild(particles);
        
        // Create particles
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(particles);
        }
        
        // Add mouse interaction
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Move orbs slightly based on mouse position
            document.querySelectorAll('.orb').forEach(orb => {
                const offsetX = (mouseX - 0.5) * 20;
                const offsetY = (mouseY - 0.5) * 20;
                orb.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }

    // Function to create a single particle
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        const color = getRandomColor();
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.backgroundColor = color;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }

    // Function to generate random color from theme colors
    function getRandomColor() {
        const colors = [
            'var(--primary-color)',
            'var(--secondary-color)',
            'var(--accent-color)',
            '#4158d0',
            '#c850c0',
            '#0093E9',
            '#80D0C7'
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Call the function to create the animated background
    createAnimatedBackground();

    // Recreate background on window resize
    window.addEventListener('resize', function() {
        createAnimatedBackground();
    });
});