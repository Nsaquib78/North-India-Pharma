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

    // --- STAGE 5: Advanced Product & B2B Enquiry Platform ---
    
    // 1. Advanced Product Data Architecture
    const productsData = [
        {
            id: "product-001",
            sku: "NIP-001",
            name: "Generic Tablet Product A",
            category: "Tablets",
            type: "Tablets",
            description: "Generic pharmaceutical tablet formulated according to standard manufacturing guidelines.",
            image: "assets/placeholder.svg",
            availability: "Enquiry",
            tags: ["tablets", "pharma", "generic"]
        },
        {
            id: "product-002",
            sku: "NIP-002",
            name: "Generic Multivitamin Capsule",
            category: "Capsules",
            type: "Capsules",
            description: "Generic multivitamin capsule for daily nutritional supplementation.",
            image: "assets/placeholder.svg",
            availability: "Enquiry",
            tags: ["capsules", "vitamins", "supplement"]
        },
        {
            id: "product-003",
            sku: "NIP-003",
            name: "Generic Cough Syrup Formula",
            category: "Syrups",
            type: "Syrups",
            description: "Standard generic expectorant syrup for respiratory care.",
            image: "assets/placeholder.svg",
            availability: "Enquiry",
            tags: ["syrup", "respiratory", "liquid"]
        },
        {
            id: "product-004",
            sku: "NIP-004",
            name: "Generic Antacid Suspension",
            category: "Oral Solutions",
            type: "Oral Solutions",
            description: "Generic oral suspension for gastrointestinal comfort.",
            image: "assets/placeholder.svg",
            availability: "Enquiry",
            tags: ["antacid", "solution", "gastro"]
        },
        {
            id: "product-005",
            sku: "NIP-005",
            name: "Generic Antibacterial Ointment",
            category: "Ointments",
            type: "Ointments",
            description: "Standard generic topical ointment for minor skin abrasions.",
            image: "assets/placeholder.svg",
            availability: "Enquiry",
            tags: ["ointment", "topical", "skin"]
        },
        {
            id: "product-006",
            sku: "NIP-006",
            name: "Generic Calcium Supplement",
            category: "Tablets",
            type: "Tablets",
            description: "Generic calcium tablet formulated for bone health support.",
            image: "assets/placeholder.svg",
            availability: "Enquiry",
            tags: ["calcium", "tablets", "bone"]
        },
        {
            id: "product-007",
            sku: "NIP-007",
            name: "Generic Omeprazole Capsule",
            category: "Capsules",
            type: "Capsules",
            description: "Standard generic formulation for gastroesophageal care.",
            image: "assets/placeholder.svg",
            availability: "Enquiry",
            tags: ["capsules", "omeprazole", "gastro"]
        },
        {
            id: "product-008",
            sku: "NIP-008",
            name: "Generic Rehydration Salts",
            category: "Pharmaceutical Products",
            type: "Pharmaceutical Products",
            description: "Standard generic oral rehydration salts for fluid balance.",
            image: "assets/placeholder.svg",
            availability: "Enquiry",
            tags: ["ors", "salts", "hydration"]
        }
    ];

    const productsGrid = document.getElementById('productsGrid');
    const noProductsFound = document.getElementById('noProductsFound');
    const searchInput = document.getElementById('productSearch');
    const clearSearchBtn = document.getElementById('clearSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    const productSort = document.getElementById('productSort');
    
    // Modal Elements
    const productModal = document.getElementById('productModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalType = document.getElementById('modalType');
    const modalSku = document.getElementById('modalSku');
    const modalCategoryCrumb = document.getElementById('modalCategoryCrumb');
    const modalTitle = document.getElementById('modalTitle');
    const modalAvailability = document.getElementById('modalAvailability');
    const modalDescription = document.getElementById('modalDescription');
    const modalEnquireBtn = document.getElementById('modalEnquireBtn');
    const modalShareBtn = document.getElementById('modalShareBtn');
    const shareMessage = document.getElementById('shareMessage');
    
    // Enquiry List Elements
    const enquiryListToggle = document.getElementById('enquiryListToggle');
    const enquiryCountBadge = document.getElementById('enquiryCountBadge');
    const enquiryDrawer = document.getElementById('enquiryDrawer');
    const enquiryDrawerOverlay = document.getElementById('enquiryDrawerOverlay');
    const closeEnquiryDrawerBtn = document.getElementById('closeEnquiryDrawer');
    const enquiryDrawerItems = document.getElementById('enquiryDrawerItems');
    const clearEnquiryListBtn = document.getElementById('clearEnquiryListBtn');
    const continueEnquiryBtn = document.getElementById('continueEnquiryBtn');
    const b2bForm = document.getElementById('b2bEnquiryForm');
    
    let currentCategory = 'All';
    let currentSearchTerm = '';
    let currentSort = 'default';

    // 14. Persistence
    let enquiryList = [];
    try {
        const stored = localStorage.getItem('nipEnquiryList');
        if (stored) enquiryList = JSON.parse(stored);
    } catch (e) {
        console.error("Could not parse localStorage enquiry list.", e);
    }
    
    // Save to localStorage
    function saveEnquiryList() {
        localStorage.setItem('nipEnquiryList', JSON.stringify(enquiryList));
        updateEnquiryUI();
    }

    // Update Enquiry UI (Count & Drawer)
    function updateEnquiryUI() {
        if (enquiryCountBadge) enquiryCountBadge.textContent = enquiryList.length;
        
        if (enquiryDrawerItems) {
            if (enquiryList.length === 0) {
                enquiryDrawerItems.innerHTML = `
                    <div style="text-align: center; color: var(--text-light); padding: 2rem 0;">
                        <i class="fa-solid fa-box-open" style="font-size: 3rem; opacity: 0.2; margin-bottom: 1rem;"></i>
                        <p>Your enquiry list is empty.</p>
                    </div>`;
            } else {
                enquiryDrawerItems.innerHTML = '';
                enquiryList.forEach(id => {
                    const product = productsData.find(p => p.id === id);
                    if (product) {
                        const itemDiv = document.createElement('div');
                        itemDiv.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--border-color); border-radius: 8px; background: white;";
                        itemDiv.innerHTML = `
                            <div>
                                <h4 style="font-size: 0.95rem; margin-bottom: 0.25rem;">${product.name}</h4>
                                <span style="font-size: 0.8rem; color: var(--text-light);">${product.category} | ${product.sku}</span>
                            </div>
                            <button class="remove-enquiry-btn" data-id="${product.id}" style="background: none; border: none; color: #dc2626; cursor: pointer; padding: 0.5rem;" aria-label="Remove Product"><i class="fa-solid fa-trash-can"></i></button>
                        `;
                        enquiryDrawerItems.appendChild(itemDiv);
                    }
                });
                
                // Add listener to remove buttons
                document.querySelectorAll('.remove-enquiry-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const btnEl = e.target.closest('button');
                        if (btnEl) {
                            const productId = btnEl.getAttribute('data-id');
                            enquiryList = enquiryList.filter(id => id !== productId);
                            saveEnquiryList();
                            renderProducts(); // Update card button states
                            
                            // If modal is open for this product, update its button too
                            if (productModal.classList.contains('active')) {
                                const activeModalProduct = productsData.find(p => p.id === productId);
                                if (activeModalProduct && modalTitle.textContent === activeModalProduct.name) {
                                    updateModalEnquiryButton(productId);
                                }
                            }
                        }
                    });
                });
            }
        }
    }

    // Toggle product in enquiry
    function toggleEnquiry(productId) {
        if (enquiryList.includes(productId)) {
            enquiryList = enquiryList.filter(id => id !== productId);
        } else {
            enquiryList.push(productId);
            // Visual confirmation can be simple UI state change
        }
        saveEnquiryList();
        renderProducts();
    }
    
    // Initial UI Setup
    updateEnquiryUI();

    // Drawer event listeners
    if (enquiryListToggle) {
        enquiryListToggle.addEventListener('click', (e) => {
            e.preventDefault();
            enquiryDrawer.style.right = '0';
            enquiryDrawerOverlay.style.display = 'block';
            setTimeout(() => enquiryDrawerOverlay.style.opacity = '1', 10);
        });
    }
    
    function closeDrawer() {
        enquiryDrawer.style.right = '-400px';
        enquiryDrawerOverlay.style.opacity = '0';
        setTimeout(() => enquiryDrawerOverlay.style.display = 'none', 300);
    }
    
    if (closeEnquiryDrawerBtn) closeEnquiryDrawerBtn.addEventListener('click', closeDrawer);
    if (enquiryDrawerOverlay) enquiryDrawerOverlay.addEventListener('click', closeDrawer);
    
    if (clearEnquiryListBtn) {
        clearEnquiryListBtn.addEventListener('click', () => {
            if (confirm("Clear all items from your enquiry list?")) {
                enquiryList = [];
                saveEnquiryList();
                renderProducts();
            }
        });
    }

    if (continueEnquiryBtn) {
        continueEnquiryBtn.addEventListener('click', () => {
            closeDrawer();
            
            // Populate form
            const enqProductInput = document.getElementById('enqProduct');
            if (enqProductInput && enquiryList.length > 0) {
                const names = enquiryList.map(id => {
                    const p = productsData.find(prod => prod.id === id);
                    return p ? p.name : '';
                }).filter(n => n).join(', ');
                enqProductInput.value = names;
            }
            
            if (b2bForm) {
                b2bForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Render Products Function
    function renderProducts() {
        if (!productsGrid) return;
        
        productsGrid.innerHTML = '';
        
        let filteredProducts = productsData.filter(product => {
            const matchesCategory = currentCategory === 'All' || product.category === currentCategory;
            const searchTermLower = currentSearchTerm.toLowerCase();
            const tagsMatch = product.tags.some(tag => tag.toLowerCase().includes(searchTermLower));
            
            const matchesSearch = product.name.toLowerCase().includes(searchTermLower) ||
                                  product.category.toLowerCase().includes(searchTermLower) ||
                                  product.type.toLowerCase().includes(searchTermLower) ||
                                  product.sku.toLowerCase().includes(searchTermLower) ||
                                  tagsMatch;
            return matchesCategory && matchesSearch;
        });
        
        // Sorting
        if (currentSort === 'name-asc') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentSort === 'name-desc') {
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        } else if (currentSort === 'category-asc') {
            filteredProducts.sort((a, b) => a.category.localeCompare(b.category));
        }

        if (filteredProducts.length === 0) {
            productsGrid.style.display = 'none';
            if (noProductsFound) noProductsFound.style.display = 'block';
        } else {
            productsGrid.style.display = 'grid';
            if (noProductsFound) noProductsFound.style.display = 'none';
            
            filteredProducts.forEach(product => {
                const isAdded = enquiryList.includes(product.id);
                const card = document.createElement('div');
                card.className = 'catalog-card fade-in appear';
                
                card.innerHTML = `
                    <div class="card-image-wrapper" style="width: 100%; aspect-ratio: 4/3; overflow: hidden; background: #f8fafc;">
                        <img src="${product.image}" alt="${product.name}" class="card-image" loading="lazy" onerror="this.onerror=null;this.src='assets/placeholder.svg';" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
                    </div>
                    <div class="card-content">
                        <div class="card-tags">
                            <span class="tag tag-category">${product.category}</span>
                        </div>
                        <h3 style="margin-bottom: 0.25rem;">${product.name}</h3>
                        <p style="font-size: 0.8rem; color: var(--text-light); margin-bottom: 0.75rem;">Ref: ${product.sku}</p>
                        <p class="card-desc">${product.description}</p>
                        <div class="card-actions" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            <button class="btn btn-secondary view-details-btn" data-id="${product.id}" style="flex: 1; padding: 0.5rem; font-size: 0.85rem;">Details</button>
                            <button class="btn add-enquiry-btn ${isAdded ? 'btn-secondary' : 'btn-primary'}" data-id="${product.id}" style="flex: 1; padding: 0.5rem; font-size: 0.85rem; ${isAdded ? 'background: var(--bg-secondary); color: var(--primary-blue); border-color: var(--primary-blue);' : ''}">
                                ${isAdded ? '<i class="fa-solid fa-check"></i> Added' : '<i class="fa-solid fa-plus"></i> Add'}
                            </button>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(card);
            });

            // Add event listeners to new buttons
            document.querySelectorAll('.view-details-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = e.target.getAttribute('data-id');
                    openModal(productId);
                });
            });
            
            document.querySelectorAll('.add-enquiry-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const btnEl = e.target.closest('button');
                    if (btnEl) {
                        const productId = btnEl.getAttribute('data-id');
                        toggleEnquiry(productId);
                    }
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

    // Sort Logic
    if (productSort) {
        productSort.addEventListener('change', (e) => {
            currentSort = e.target.value;
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
            if (productSort) productSort.value = 'default';
            currentSort = 'default';
            
            filterBtns.forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('.filter-btn[data-category="All"]');
            if (allBtn) allBtn.classList.add('active');
            currentCategory = 'All';
            
            renderProducts();
        });
    }

    function updateModalEnquiryButton(productId) {
        if (!modalEnquireBtn) return;
        const isAdded = enquiryList.includes(productId);
        if (isAdded) {
            modalEnquireBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added to Enquiry';
            modalEnquireBtn.classList.remove('btn-primary');
            modalEnquireBtn.classList.add('btn-secondary');
            modalEnquireBtn.style.background = 'var(--bg-secondary)';
            modalEnquireBtn.style.color = 'var(--primary-blue)';
            modalEnquireBtn.style.borderColor = 'var(--primary-blue)';
        } else {
            modalEnquireBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add to Enquiry';
            modalEnquireBtn.classList.add('btn-primary');
            modalEnquireBtn.classList.remove('btn-secondary');
            modalEnquireBtn.style.background = '';
            modalEnquireBtn.style.color = '';
            modalEnquireBtn.style.borderColor = '';
        }
        
        // Re-attach event listener without stacking
        modalEnquireBtn.onclick = null;
        modalEnquireBtn.onclick = () => {
            toggleEnquiry(productId);
            updateModalEnquiryButton(productId);
        };
    }

    // Modal Logic
    function openModal(productId) {
        if (!productModal) return;
        
        const product = productsData.find(p => p.id === productId);
        if (!product) {
            alert('Product not found.');
            return;
        }

        // 11. Deep Linking
        window.history.replaceState(null, null, `#product=${product.id}`);

        if (modalImage) {
            modalImage.src = product.image;
            modalImage.alt = product.name;
            modalImage.onerror = function() {
                this.onerror = null;
                this.src = 'assets/placeholder.svg';
            };
        }
        if (modalCategory) modalCategory.textContent = product.category;
        if (modalCategoryCrumb) modalCategoryCrumb.textContent = product.category;
        if (modalType) modalType.textContent = product.type;
        if (modalSku) modalSku.textContent = `Ref: ${product.sku}`;
        if (modalTitle) modalTitle.textContent = product.name;
        if (modalAvailability) modalAvailability.textContent = product.availability;
        if (modalDescription) modalDescription.textContent = product.description;
        
        updateModalEnquiryButton(productId);

        // Share Feature
        if (modalShareBtn) {
            modalShareBtn.onclick = async () => {
                const url = window.location.href;
                const shareData = {
                    title: `North India Pharma - ${product.name}`,
                    text: `Check out ${product.name} at North India Pharma.`,
                    url: url
                };
                
                try {
                    if (navigator.share) {
                        await navigator.share(shareData);
                    } else {
                        await navigator.clipboard.writeText(url);
                        if (shareMessage) {
                            shareMessage.style.display = 'block';
                            setTimeout(() => shareMessage.style.display = 'none', 3000);
                        }
                    }
                } catch (err) {
                    console.error("Share failed", err);
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
            // Clear URL without refreshing
            if (window.location.hash.startsWith('#product=')) {
                window.history.replaceState(null, null, window.location.pathname + window.location.search);
            }
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

    // Deep Link Handling on Load
    function handleDeepLink() {
        if (window.location.hash.startsWith('#product=')) {
            const productId = window.location.hash.split('=')[1];
            if (productId) {
                // small delay to ensure rendering
                setTimeout(() => openModal(productId), 300);
            }
        }
    }
    
    // Initial Render
    renderProducts();
    handleDeepLink();

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

            let waText = `Hello North India Pharma,\n\nI would like to enquire about the following products:\n\n`;
            
            if (enquiryList.length > 0) {
                enquiryList.forEach((id, index) => {
                    const p = productsData.find(prod => prod.id === id);
                    if (p) {
                        waText += `${index + 1}. ${p.name}\n`;
                        waText += `   Category: ${p.category}\n`;
                        waText += `   Reference: ${p.sku}\n\n`;
                    }
                });
            } else if (product) {
                waText += `1. ${product}\n\n`;
            } else {
                waText = `Hello North India Pharma,\n\nI would like to make a business enquiry.\n\n`;
            }

            waText += `Customer Details:\n`;
            waText += `Name: ${name}\n`;
            if (company) waText += `Company: ${company}\n`;
            waText += `Phone: ${phone}\n`;
            if (email) waText += `Email: ${email}\n\n`;
            
            if (quantity) waText += `Quantity / Requirement: ${quantity}\n\n`;
            waText += `Requirement:\n${message}\n\nPlease provide further information.`;

            const whatsappNumber = "917050211778";
            const encodedText = encodeURIComponent(waText);
            
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
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
