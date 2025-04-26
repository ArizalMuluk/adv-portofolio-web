document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    // Menambahkan event listener untuk menu icon
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });

        // Menutup menu saat link di klik
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            });
        });
    } else {
        console.error('Menu icon or navbar element not found!');
    }

    // Scroll sections
    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if(top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector(`header nav a[href*='${id}']`)?.classList.add('active');
                });
            } 
        });

        // Optional: Menutup menu saat scroll
        menuIcon?.classList.remove('bx-x');
        navbar?.classList.remove('active');

        // Tambahkan handleScroll untuk animasi
        handleScroll();
    }

    // Fungsi untuk mengecek apakah elemen visible dalam viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * 0.75 && // Trigger animasi ketika elemen 75% terlihat
            rect.bottom >= 0
        );
    }

    // Fungsi untuk menambahkan class 'show' ketika elemen visible
    function handleScroll() {
        const sections = document.querySelectorAll('.education, .skills, .service, .contact');
        
        sections.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('show');
            }
        });
    }

    // Event listener untuk scroll dengan throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            handleScroll();
        });
    });

    // Panggil handleScroll saat halaman dimuat
    handleScroll();
});