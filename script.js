document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       INITIALIZE LUCIDE ICONS
       ========================================================================== */
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       LOADING SCREEN
       ========================================================================== */
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1000); // Smooth loading exit
    });

    /* ==========================================================================
       CUSTOM CURSOR GLOW
       ========================================================================== */
    const cursorGlow = document.getElementById('custom-cursor-glow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursorPosition() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        
        if (cursorGlow) {
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;
        }
        requestAnimationFrame(updateCursorPosition);
    }
    updateCursorPosition();

    // Cursor hover adjustments
    const hoverables = document.querySelectorAll('a, button, input, textarea, .glass-card, .floating-tech-icon, .achievement-timeline-item');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorGlow) {
                cursorGlow.style.width = '350px';
                cursorGlow.style.height = '350px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.04) 50%, transparent 70%)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursorGlow) {
                cursorGlow.style.width = '250px';
                cursorGlow.style.height = '250px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(16, 185, 129, 0.04) 50%, transparent 70%)';
            }
        });
    });


    /* ==========================================================================
       HERO AUTO-TYPING EFFECT
       ========================================================================== */
    const typingElement = document.getElementById('typing-element');
    const words = [
        "Computer Science Student",
        "Java Developer",
        "Python Enthusiast",
        "Spring Boot Learner",
        "Future Software Engineer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeLoop() {
        if (!typingElement) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40; 
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90; 
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1500; 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 300; 
        }

        setTimeout(typeLoop, typeSpeed);
    }
    
    setTimeout(typeLoop, 1000);


    /* ==========================================================================
       STICKY NAV & SCROLL PROGRESS BAR
       ========================================================================== */
    const header = document.getElementById('main-header');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Sticky Header styling
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Progress bar width
        if (scrollProgressBar && totalHeight > 0) {
            const pct = (scrollY / totalHeight) * 100;
            scrollProgressBar.style.width = `${pct}%`;
        }

        // Scroll to Top visibility
        if (scrollToTopBtn) {
            if (scrollY > 400) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* ==========================================================================
       MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menuClose = document.getElementById('mobile-menu-close');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openDrawer() {
        if (mobileDrawer && drawerOverlay) {
            mobileDrawer.classList.add('open');
            drawerOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }
    }

    function closeDrawer() {
        if (mobileDrawer && drawerOverlay) {
            mobileDrawer.classList.remove('open');
            drawerOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
        }
    }

    if (menuToggle) menuToggle.addEventListener('click', openDrawer);
    if (menuClose) menuClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });


    /* ==========================================================================
       SCROLL OBSERVERS (REVEALS & SCROLL SPY)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const revealElements = document.querySelectorAll('.scroll-reveal');

    // Scroll Fade-in Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Scroll Spy active page links
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -50% 0px' 
    });

    sections.forEach(sec => spyObserver.observe(sec));


    /* ==========================================================================
       STATS NUMBER COUNTER ANIMATOR
       ========================================================================== */
    const statsContainer = document.getElementById('stats-counter-box');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function countUpStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const animDuration = 1800; 
            const intervalTime = Math.max(Math.floor(animDuration / target), 15);
            
            const countInterval = setInterval(() => {
                current += 1;
                stat.textContent = `${current}%`;
                
                if (current >= target) {
                    stat.textContent = `${target}%`;
                    clearInterval(countInterval);
                }
            }, intervalTime);
        });
    }

    if (statsContainer) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    countUpStats();
                    statsAnimated = true;
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        statsObserver.observe(statsContainer);
    }


    /* ==========================================================================
       SKILL PROGRESS BARS FILL ANIMATION
       ========================================================================== */
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    let skillBarsFilled = false;

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const widthVal = bar.style.getPropertyValue('--width');
            bar.style.width = widthVal;
        });
    }

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillBarsFilled) {
                    animateSkillBars();
                    skillBarsFilled = true;
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        skillsObserver.observe(skillsSection);
    }


    /* ==========================================================================
       MODAL CONTENT PARSING (PROJECTS & BLOGS)
       ========================================================================== */
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalDynamicContent = document.getElementById('modal-dynamic-content');

    const projectData = {
        fampulse: {
            title: "FamPulse",
            subtitle: "Real-Time Family Safety & Location Tracking Platform",
            badge: "Spring Boot",
            image: "assets/images/hero_developer.png",
            techs: ["Java", "Spring Boot", "MySQL", "WebSockets", "Leaflet Maps API", "JWT Authentication"],
            demoLink: "#contact",
            githubLink: "https://github.com/SharveshShiva",
            description: `
                <p><strong>FamPulse</strong> is a security-focused real-time location sharing and automated alert portal designed to support families. Built with a robust Java backend, it bridges web socket connectivity and coordinates translation to yield instant positioning data.</p>
                
                <h4>Key Features Implemented:</h4>
                <ul>
                    <li><strong>Live Tracking Map:</strong> Seamless integration with Map APIs using LeafletJS to project instant marker tracking for family cluster groups.</li>
                    <li><strong>Geofencing Alerts:</strong> Establish circle barriers; the Spring Boot engine monitors coordinate breaches and fires real-time alerts.</li>
                    <li><strong>Check-in System:</strong> One-tap automated location-based status updates broadcasted to all connected members instantly.</li>
                    <li><strong>Enterprise Security:</strong> Secured client endpoints via stateless JSON Web Tokens (JWT) and role authority parameters.</li>
                </ul>

                <h4>My Architectural Role:</h4>
                <p>I structured the SQL schemas for relational clustering and implemented the WebSocket channels to broadcast geographic updates with minimal latency. I integrated scheduled Java loops to clean stale caching logs and verify alert queues.</p>
            `
        },
        smarttask: {
            title: "SmartTask",
            subtitle: "Role-Based Project & Task Management Platform",
            badge: "Java Enterprise",
            image: "assets/images/hero_developer.png",
            techs: ["Java", "Spring Boot", "MySQL", "Spring Security", "Thymeleaf", "Bootstrap"],
            demoLink: "#contact",
            githubLink: "https://github.com/SharveshShiva",
            description: `
                <p><strong>SmartTask</strong> is an intuitive project management ecosystem built to scale coordinate task allocation within academic or industry workspaces. It ensures structural authority permissions using robust role-based security configurations.</p>
                
                <h4>Key Features Implemented:</h4>
                <ul>
                    <li><strong>Hierarchical Role Access:</strong> Managed administrative channels separate from team members, guarding access to project configurations.</li>
                    <li><strong>Interactive Task Board:</strong> Drag, track, and update task statuses from Backlog, In-Progress, and Review to Completed.</li>
                    <li><strong>Analytics Dashboard:</strong> Glassmorphic visualization of task completion percentages and team workload distributions.</li>
                    <li><strong>Email Notifications:</strong> Hooked Java Mail sender protocols to auto-alert members on task assignments or deadlines.</li>
                </ul>

                <h4>My Architectural Role:</h4>
                <p>I constructed the MySQL data model representing Many-to-Many associations between Projects and Developers. I built custom Spring Security filters to manage session expirations and configured the controller routes implementing full REST APIs.</p>
            `
        }
    };

    const blogData = {
        java: {
            title: "Why Java is Still Relevant in 2026",
            category: "Java",
            readTime: "5 min read",
            image: "assets/images/blog_java.png",
            description: `
                <p>As we navigate through 2026, the programming landscape is more diverse than ever. New languages crop up claiming to replace legacy architectures, yet <strong>Java stands taller than ever.</strong> Why does this 30-year-old language continue to power global enterprise grids?</p>
                
                <h4>1. Project Loom and Virtual Threads</h4>
                <p>With the stable release and widespread adoption of Project Loom's Virtual Threads (Java 21+), high-concurrency programming has changed forever. Developers can now spawn millions of concurrent threads without exhausting memory, bringing async levels of performance with clean, readable block-and-wait code syntax.</p>

                <h4>2. GraalVM & Native Compilation</h4>
                <p>Java's slow startup time used to be its Achilles' heel in containerized environments. GraalVM native images compile Java bytecode directly to native machine code, achieving sub-millisecond startup times and tiny memory footprints ideal for Kubernetes clusters and Serverless setups.</p>

                <h4>3. The Spring Boot Catalyst</h4>
                <p>Frameworks like Spring Boot continue to evolve, making developer onboarding, cloud integration, security setups, and microservices management exceptionally smooth. In 2026, Java is not just a language; it is a mature, high-performance ecosystem backed by a community of millions.</p>
            `
        },
        springboot: {
            title: "Learning Spring Boot from Scratch",
            category: "Backend",
            readTime: "7 min read",
            image: "assets/images/blog_springboot.png",
            description: `
                <p>Entering backend engineering can feel overwhelming. With so many components—databases, servers, routing, and configurations—it is easy to get lost. <strong>Spring Boot solves this by prioritizing convention over configuration.</strong> Here is your roadmap to master Spring Boot starting today.</p>

                <h4>Step 1: Master the Java Core</h4>
                <p>Before touching Spring Boot, ensure you are comfortable with Java Object-Oriented Programming (OOP) concepts, collection frameworks (Lists, Maps), Lambdas, and Stream APIs. Spring Boot relies heavily on these features.</p>

                <h4>Step 2: Understand Dependency Injection (DI)</h4>
                <p>DI is the beating heart of the Spring framework. Master how Spring handles Bean creation and scope, and how to use <code>@Autowired</code>, <code>@Component</code>, and <code>@Service</code> annotations to write loose, modular code components.</p>

                <h4>Step 3: Build your first REST API</h4>
                <p>Create simple endpoints using <code>@RestController</code> and <code>@GetMapping</code>. Learn to pass parameters and capture JSON request bodies. Hook this up to a database using <strong>Spring Data JPA</strong> and MySQL to store persistent state records.</p>

                <h4>Step 4: Secure and Deploy</h4>
                <p>Secure routes using Spring Security, validate incoming request objects, and learn to package your app as a containerized jar file. Keep practice consistent by building platforms like task trackers or student scoreboard!</p>
            `
        },
        journey: {
            title: "My Journey into Software Development",
            category: "Career",
            readTime: "6 min read",
            image: "assets/images/blog_journey.png",
            description: `
                <p>Every software developer remembers the day they wrote their first line of code. For me, it was the start of an ongoing, fascinating adventure of problem-solving. Balancing a B.Tech in Computer Science and Business Systems with self-guided projects has taught me valuable lessons.</p>

                <h4>Embracing the Struggle</h4>
                <p>In the beginning, compile errors and stack traces were frustrating. Over time, I learned that debugging is not an obstacle; it is the core work of software development. Every bug solved is a concept learned.</p>

                <h4>The Power of Projects</h4>
                <p>Learning syntax is only 10% of the game. The turning point in my learning journey happened when I stopped watching tutorials and started coding real things, like <strong>FamPulse</strong> and <strong>SmartTask</strong>. Designing relational schemas and handling authentication gave me practical insights that theory books never could.</p>

                <h4>Looking Ahead</h4>
                <p>As a Computer Science and Business Systems student, I understand both the code and the organizational systems it supports. The journey is continuous, and in software development, the learning never stops. I am excited to see what the next milestone brings!</p>
            `
        }
    };

    function openModal(htmlContent) {
        if (modalDynamicContent && modalOverlay) {
            modalDynamicContent.innerHTML = htmlContent;
            modalOverlay.classList.add('open');
            document.body.style.overflow = 'hidden'; 
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('open');
            document.body.style.overflow = ''; 
            setTimeout(() => {
                if (modalDynamicContent) modalDynamicContent.innerHTML = '';
            }, 300);
        }
    }

    // Modal button bindings
    const projectModalButtons = document.querySelectorAll('.open-project-modal');
    projectModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-project');
            const data = projectData[key];
            if (data) {
                const tagsHtml = data.techs.map(t => `<span>${t}</span>`).join('');
                const modalHtml = `
                    <h3 class="project-badge" style="margin-bottom:12px;">${data.badge}</h3>
                    <h2 class="modal-heading">${data.title}</h2>
                    <h3 style="font-size:1rem; font-weight:500; color:var(--color-text-secondary); margin-top:-10px; margin-bottom:20px;">${data.subtitle}</h3>
                    
                    <div class="modal-tech-tags">
                        ${tagsHtml}
                    </div>
                    
                    <div class="modal-body-text">
                        ${data.description}
                    </div>
                    
                    <div class="modal-actions">
                        <a href="${data.demoLink}" class="btn btn-primary" onclick="closeModal()">
                            <span>Connect to Discuss</span>
                            <i data-lucide="arrow-right"></i>
                        </a>
                        <a href="${data.githubLink}" target="_blank" rel="noopener" class="btn btn-outline">
                            <i data-lucide="github"></i>
                            <span>View Source</span>
                        </a>
                    </div>
                `;
                openModal(modalHtml);
            }
        });
    });

    const blogModalButtons = document.querySelectorAll('.open-blog-modal');
    blogModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-blog');
            const data = blogData[key];
            if (data) {
                const modalHtml = `
                    <div class="modal-meta-row">
                        <span class="modal-meta-cat">${data.category}</span>
                        <span>•</span>
                        <span>${data.readTime}</span>
                    </div>
                    <h2 class="modal-heading">${data.title}</h2>
                    <img src="${data.image}" alt="${data.title}" class="modal-img">
                    <div class="modal-body-text">
                        ${data.description}
                    </div>
                    <div class="modal-actions" style="margin-top: 30px;">
                        <button class="btn btn-outline" onclick="closeModal()">
                            <span>Close Article</span>
                        </button>
                    </div>
                `;
                openModal(modalHtml);
            }
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    window.closeModal = closeModal;


    /* ==========================================================================
       CONTACT FORM VALIDATION & SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('contact-success-toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();
            
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill out all contact fields.');
                return;
            }

            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitBtnText = submitBtn.querySelector('span');
            
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Sending...';

            setTimeout(() => {
                if (toast) {
                    toast.classList.add('show');
                    
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 4000);
                }

                contactForm.reset();
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Send Message';
            }, 1200);
        });
    }
});
