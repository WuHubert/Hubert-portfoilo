// 自訂 JavaScript 功能

// 等待 DOM 載入完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 平滑滾動效果
    initSmoothScrolling();
    
    // 導航列背景變化
    initNavbarScroll();
    
    // 技能進度條動畫
    initSkillsAnimation();
    
    // 表單提交處理
    initFormSubmission();
    
    // 載入動畫
    initLoadingAnimations();
    
    // 作品集圖片懶載入
    initLazyLoading();
});

// 平滑滾動功能
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 導航列滾動效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// 技能進度條動畫
function initSkillsAnimation() {
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    let animated = false;
    
    function animateSkills() {
        if (animated) return;
        
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
        
        animated = true;
    }
    
    // 使用 Intersection Observer 來觸發動畫
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// 表單提交處理
function initFormSubmission() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 獲取表單數據
            const formData = new FormData(this);
            const name = this.querySelector('input[placeholder="您的姓名"]').value;
            const email = this.querySelector('input[placeholder="您的信箱"]').value;
            const subject = this.querySelector('input[placeholder="主旨"]').value;
            const message = this.querySelector('textarea').value;
            
            // 簡單的表單驗證
            if (!name || !email || !subject || !message) {
                showNotification('請填寫所有必填欄位', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('請輸入有效的電子郵件地址', 'error');
                return;
            }
            
            // 顯示載入狀態
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> 傳送中...';
            submitBtn.disabled = true;
            
            // 模擬表單提交（實際使用時需要連接到後端）
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                showNotification('訊息已成功傳送！', 'success');
                this.reset();
            }, 2000);
        });
    }
}

// 載入動畫
function initLoadingAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 圖片懶載入
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// 工具函數
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // 創建通知元素
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : 'success'} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 顯示動畫
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自動隱藏
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 動態載入作品集
function loadPortfolioItems() {
    // 這裡可以從 API 或 JSON 檔案載入作品集數據
    const portfolioData = [
        {
            title: '響應式電商網站',
            description: '使用 React 和 Node.js 開發的全功能電商平台',
            image: 'images/project1.jpg',
            technologies: ['React', 'Node.js', 'MongoDB'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: '行動裝置應用程式',
            description: '使用 React Native 開發的跨平台行動應用',
            image: 'images/project2.jpg',
            technologies: ['React Native', 'Firebase'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'UI/UX 設計專案',
            description: '完整的使用者體驗設計流程與原型製作',
            image: 'images/project3.jpg',
            technologies: ['Figma', 'Adobe XD'],
            demoUrl: '#',
            githubUrl: '#'
        }
    ];
    
    return portfolioData;
}

// 主題切換功能（可選）
function initThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
        });
        
        // 載入儲存的主題設定
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
        }
    }
}
