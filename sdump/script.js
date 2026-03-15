// ==================== FILTER FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterableItems = document.querySelectorAll('.gallery-item, .news-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            filterableItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                }
            });
        });
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== FORM SUBMISSION ====================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Simple validation
        const nama = formData.get('nama');
        const email = formData.get('email');
        const telepon = formData.get('telepon');
        const pesan = formData.get('pesan');

        if (nama && email && telepon && pesan) {
            // Simulate form submission
            alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda secepatnya.');
            this.reset();
        } else {
            alert('Mohon lengkapi semua field yang diperlukan.');
        }
    });
}

// ==================== NEWSLETTER SUBSCRIPTION ====================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Terima kasih telah berlangganan! Konfirmasi akan dikirim ke email Anda.');
            this.reset();
        } else {
            alert('Mohon masukkan alamat email yang valid.');
        }
    });
}

// ==================== ACTIVE NAVIGATION LINK ====================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// ==================== SCROLL TO TOP BUTTON ====================
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        createScrollTopButton();
    } else {
        removeScrollTopButton();
    }
});

function createScrollTopButton() {
    if (!document.getElementById('scrollTopBtn')) {
        const button = document.createElement('button');
        button.id = 'scrollTopBtn';
        button.innerHTML = '↑';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #e74c3c;
            color: white;
            border: none;
            border-radius: 50%;
            padding: 10px 15px;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            transition: background-color 0.3s ease;
        `;
        
        button.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#c0392b';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#e74c3c';
        });
        
        button.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.body.appendChild(button);
    }
}

function removeScrollTopButton() {
    const button = document.getElementById('scrollTopBtn');
    if (button) {
        button.remove();
    }
}

// ==================== ADD ANIMATION ON SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and items
document.querySelectorAll('.program-card, .staff-card, .activity-card, .news-card, .facility-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== IMAGE LAZY LOADING ====================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-lazy]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.lazy;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== MOBILE MENU (Optional) ====================
function initMobileMenu() {
    const nav = document.querySelector('.navbar');
    if (nav && window.innerWidth <= 768) {
        // Add mobile-friendly styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .nav-menu {
                    flex-wrap: wrap;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

initMobileMenu();

// ==================== FEEDBACK MESSAGE ====================
function showFeedback(message, type = 'success') {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 5px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    feedback.textContent = message;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => feedback.remove(), 300);
    }, 3000);
}

// ==================== ANIMATIONS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
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

// ==================== SEARCH FUNCTIONALITY (Optional) ====================
// Add search box functionality if needed
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.news-card, .gallery-item');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }
}

initSearch();

// ==================== MODAL FUNCTIONALITY (Optional) ====================
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 600px;
        width: 90%;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    modalContent.innerHTML = content + '<button onclick="this.closest(\'.modal\').remove();" style="margin-top: 20px; padding: 10px 20px; background-color: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">Tutup</button>';
    
    modal.appendChild(modalContent);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}

console.log('Script loaded successfully');
