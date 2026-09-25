document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = navLinks.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // Sticky Navbar shadow on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05), 0 10px 15px rgba(0,0,0,0.05)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
    });

    // Intersection Observer for scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // --- STAGE 1: Products Catalog Logic ---
    
    // 1. Centralized Product Data
    const productsData = [
        {
            id: 1,
            name: "Generic Paracetamol Tablets 500mg",
            category: "Tablets",
            type: "Analgesic & Antipyretic",
            description: "Standard formulation for fever and mild to moderate pain relief. Manufactured under strict quality guidelines to ensure efficacy.",
            image: "assets/placeholder.svg",
            availability: "In Stock"
        },
        {
            id: 2,
            name: "Multivitamin & Mineral Capsules",
            category: "Capsules",
            type: "Dietary Supplement",
            description: "Comprehensive multivitamin and mineral supplement to support overall daily nutritional requirements and maintain general well-being.",
            image: "assets/placeholder.svg",
            availability: "In Stock"
        },
        {
            id: 3,
            name: "Cough Syrup - Expectorant Formula",
            category: "Syrups",
            type: "Respiratory Care",
            description: "Effective expectorant formula designed to relieve chest congestion, soothe throat irritation, and help clear respiratory passages.",
            image: "assets/placeholder.svg",
            availability: "Available on Order"
        },
        {
            id: 4,
            name: "Antacid Oral Suspension",
            category: "Oral Solutions",
            type: "Gastrointestinal",
            description: "Fast-acting oral suspension for the relief of acidity, heartburn, and stomach upset. Provides quick and lasting comfort.",
            image: "assets/placeholder.svg",
            availability: "In Stock"
        },
        {
            id: 5,
            name: "Antibacterial Skin Ointment",
            category: "Ointments",
            type: "Topical Application",
            description: "Topical formulation intended for preventing and treating minor skin infections, cuts, and abrasions.",
            image: "assets/placeholder.svg",
            availability: "In Stock"
        },
        {
            id: 6,
            name: "Calcium Supplements with Vitamin D3",
            category: "Tablets",
            type: "Bone Health",
            description: "Formulated to support bone density and strength. Essential for maintaining healthy skeletal structure.",
            image: "assets/placeholder.svg",
            availability: "In Stock"
        },
        {
            id: 7,
            name: "Omeprazole Capsules 20mg",
            category: "Capsules",
            type: "Gastrointestinal",
            description: "Standard formulation used for the management of gastroesophageal reflux disease and excess stomach acid.",
            image: "assets/placeholder.svg",
            availability: "In Stock"
        },
        {
            id: 8,
            name: "Rehydration Oral Salts (ORS)",
            category: "Pharmaceutical Products",
            type: "Electrolyte Replenishment",
            description: "Standard ORS formulation used to restore fluid and electrolyte balance in the body.",
            image: "assets/placeholder.svg",
            availability: "In Stock"
        }
    ];

    const productsGrid = document.getElementById('productsGrid');
    const noProductsFound = document.getElementById('noProductsFound');
    const searchInput = document.getElementById('productSearch');
    const clearSearchBtn = document.getElementById('clearSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    
    // Modal Elements
    const productModal = document.getElementById('productModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalType = document.getElementById('modalType');
    const modalTitle = document.getElementById('modalTitle');
    const modalAvailability = document.getElementById('modalAvailability');
    const modalDescription = document.getElementById('modalDescription');
    const modalEnquireBtn = document.getElementById('modalEnquireBtn');
    
    let currentCategory = 'All';
    let currentSearchTerm = '';

    // Render Products Function
    function renderProducts() {
        if (!productsGrid) return;
        
        productsGrid.innerHTML = '';
        
        const filteredProducts = productsData.filter(product => {
            const matchesCategory = currentCategory === 'All' || product.category === currentCategory;
            const searchTermLower = currentSearchTerm.toLowerCase();
            const matchesSearch = product.name.toLowerCase().includes(searchTermLower) ||
                                  product.category.toLowerCase().includes(searchTermLower) ||
                                  product.type.toLowerCase().includes(searchTermLower);
            return matchesCategory && matchesSearch;
        });

        if (filteredProducts.length === 0) {
            productsGrid.style.display = 'none';
            if (noProductsFound) noProductsFound.style.display = 'block';
        } else {
            productsGrid.style.display = 'grid';
            if (noProductsFound) noProductsFound.style.display = 'none';
            
            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'catalog-card fade-in appear';
                
                card.innerHTML = `
                    <div class="card-image-wrapper" style="width: 100%; aspect-ratio: 4/3; overflow: hidden; background: #f8fafc;">
                        <img src="${product.image}" alt="${product.name}" class="card-image" loading="lazy" onerror="this.onerror=null;this.src='assets/placeholder.svg';" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
                    </div>
                    <div class="card-content">
                        <div class="card-tags">
                            <span class="tag tag-category">${product.category}</span>
                            <span class="tag tag-type">${product.type}</span>
                        </div>
                        <h3>${product.name}</h3>
                        <p class="card-desc">${product.description}</p>
                        <div class="card-actions">
                            <button class="btn btn-secondary view-details-btn" data-id="${product.id}">View Details</button>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(card);
            });

            // Add event listeners to new buttons
            document.querySelectorAll('.view-details-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.getAttribute('data-id'));
                    openModal(productId);
                });
            });
        }
    }

    // Search Logic
    if (searchInput && clearSearchBtn) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value;
            clearSearchBtn.style.display = currentSearchTerm.length > 0 ? 'block' : 'none';
            renderProducts();
        });

        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchTerm = '';
            clearSearchBtn.style.display = 'none';
            renderProducts();
        });
    }

    // Filter Logic
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentCategory = e.target.getAttribute('data-category');
                renderProducts();
            });
        });
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            currentSearchTerm = '';
            if (clearSearchBtn) clearSearchBtn.style.display = 'none';
            
            filterBtns.forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('.filter-btn[data-category="All"]');
            if (allBtn) allBtn.classList.add('active');
            currentCategory = 'All';
            
            renderProducts();
        });
    }

    // Modal Logic
    function openModal(productId) {
        if (!productModal) return;
        
        const product = productsData.find(p => p.id === productId);
        if (!product) return;

        if (modalImage) {
            modalImage.src = product.image;
            modalImage.alt = product.name;
            modalImage.onerror = function() {
                this.onerror = null;
                this.src = 'assets/placeholder.svg';
            };
        }
        if (modalCategory) modalCategory.textContent = product.category;
        if (modalType) modalType.textContent = product.type;
        if (modalTitle) modalTitle.textContent = product.name;
        if (modalAvailability) modalAvailability.textContent = product.availability;
        if (modalDescription) modalDescription.textContent = product.description;
        
        // Setup Modal Enquire Button to scroll to B2B Form
        if (modalEnquireBtn) {
            modalEnquireBtn.onclick = () => {
                closeModal();
                const enqProductInput = document.getElementById('enqProduct');
                if (enqProductInput) {
                    enqProductInput.value = `${product.name} (${product.category})`;
                }
                const enquiryForm = document.getElementById('enquiryFormCard');
                if (enquiryForm) {
                    enquiryForm.scrollIntoView({ behavior: 'smooth' });
                }
            };
        }

        productModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        if (productModal) {
            productModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal && productModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Initial Render
    renderProducts();

    // --- STAGE 2: B2B Enquiry & FAQ Logic ---

    // FAQ Toggles
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            const isOpen = answer.style.display === 'block';
            
            // Close all open answers within faq-container
            document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
            document.querySelectorAll('.faq-question i').forEach(i => {
                i.classList.remove('fa-chevron-up');
                i.classList.add('fa-chevron-down');
            });

            if (!isOpen) {
                answer.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });

    // B2B Form Submission via WhatsApp
    const b2bForm = document.getElementById('b2bEnquiryForm');
    if (b2bForm) {
        b2bForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('enqName').value.trim();
            const company = document.getElementById('enqCompany').value.trim();
            const phone = document.getElementById('enqPhone').value.trim();
            const email = document.getElementById('enqEmail').value.trim();
            const product = document.getElementById('enqProduct').value.trim();
            const quantity = document.getElementById('enqQuantity').value.trim();
            const message = document.getElementById('enqMessage').value.trim();

            let waText = `Hello North India Pharma,\n\nI would like to enquire about the following.\n\n`;
            if (product) waText += `Product: ${product}\n`;
            waText += `Name: ${name}\n`;
            if (company) waText += `Company: ${company}\n`;
            waText += `Phone: ${phone}\n`;
            if (email) waText += `Email: ${email}\n`;
            if (quantity) waText += `Required Quantity: ${quantity}\n`;
            waText += `\nRequirement:\n${message}\n\nPlease provide further information.`;

            const whatsappNumber = "917050211778";
            const encodedText = encodeURIComponent(waText);
            
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
        });
        });
    }

    // Scroll Animations using Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in:not(.appear)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        fadeElements.forEach(el => el.classList.add('appear'));
    } else if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);
        
        fadeElements.forEach(el => {
            appearOnScroll.observe(el);
        });
    } else {
        fadeElements.forEach(el => el.classList.add('appear'));
    }
});
