// Application data
const weeklyProgram = [
    {
        week: 1,
        carb_intake: 15,
        duration: 1.5,
        focus: "Xây dựng khả năng dung nạp",
        notes: "Bắt đầu với đồ uống thể thao loãng"
    },
    {
        week: 2,
        carb_intake: 20,
        duration: 1.5,
        focus: "Xây dựng khả năng dung nạp",
        notes: "Thêm lượng nhỏ gel"
    },
    {
        week: 3,
        carb_intake: 25,
        duration: 2.0,
        focus: "Tăng khối lượng",
        notes: "Luyện tập cho ăn đều đặn"
    },
    {
        week: 4,
        carb_intake: 30,
        duration: 2.0,
        focus: "Tăng khối lượng",
        notes: "Theo dõi sự thoải mái của đường ruột"
    },
    {
        week: 5,
        carb_intake: 40,
        duration: 2.5,
        focus: "Thêm cường độ",
        notes: "Thêm các khoảng với tốc độ đua"
    },
    {
        week: 6,
        carb_intake: 50,
        duration: 2.5,
        focus: "Thêm cường độ",
        notes: "Thử nghiệm sản phẩm dinh dưỡng đua"
    },
    {
        week: 7,
        carb_intake: 60,
        duration: 3.0,
        focus: "Mô phỏng đua",
        notes: "Chiến lược dinh dưỡng đua đầy đủ"
    },
    {
        week: 8,
        carb_intake: 70,
        duration: 3.0,
        focus: "Mô phỏng đua",
        notes: "Tinh chỉnh và xác nhận chiến lược"
    }
];

const carbRecommendations = [
    {
        duration: "< 45 phút",
        intake: "0 g/giờ",
        sources: "Chỉ nước",
        notes: "Không cần bổ sung nhiên liệu"
    },
    {
        duration: "45-75 phút",
        intake: "0-30 g/giờ",
        sources: "Đồ uống thể thao hoặc lượng nhỏ",
        notes: "Luyện tập khả năng dung nạp"
    },
    {
        duration: "1-2 giờ",
        intake: "30-60 g/giờ",
        sources: "Nguồn carbohydrate đơn",
        notes: "Bắt đầu luyện ruột 2-4 tuần trước sự kiện"
    },
    {
        duration: "2-3 giờ",
        intake: "60-90 g/giờ",
        sources: "Nhiều loại carbohydrate (glucose:fructose 2:1)",
        notes: "Cần thiết luyện ruột cho lượng cao hơn"
    },
    {
        duration: "> 3 giờ (siêu bền)",
        intake: "90-120 g/giờ",
        sources: "Nhiều nguồn + thức ăn thật",
        notes: "Cần luyện ruột mở rộng và thực hành thức ăn thật"
    }
];

// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Close mobile menu if open
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Progress tracker functionality
function updateProgress() {
    const weekSelect = document.getElementById('week-select');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    if (!weekSelect || !progressFill || !progressText) return;

    const currentWeek = parseInt(weekSelect.value);
    const progressPercentage = (currentWeek / 8) * 100;

    progressFill.style.width = `${progressPercentage}%`;
    
    const weekData = weeklyProgram.find(week => week.week === currentWeek);
    if (weekData) {
        progressText.textContent = `Tuần ${currentWeek}/8 - ${weekData.focus} (${weekData.carb_intake}g carbs/giờ)`;
    }
}

// Carbohydrate calculator
function calculateCarbs() {
    const weightInput = document.getElementById('weight-input');
    const durationInput = document.getElementById('duration-input');
    const resultDiv = document.getElementById('calculation-result');

    if (!weightInput || !durationInput || !resultDiv) return;

    const weight = parseFloat(weightInput.value);
    const duration = parseFloat(durationInput.value);

    if (isNaN(weight) || isNaN(duration) || weight <= 0 || duration <= 0) {
        resultDiv.innerHTML = '<p style="color: var(--color-error);">Vui lòng nhập đúng cân nặng và thời gian.</p>';
        resultDiv.classList.add('show');
        return;
    }

    let recommendation;
    let carbsPerHour;
    let totalCarbs;

    if (duration < 0.75) {
        recommendation = "Không cần bổ sung carbohydrate";
        carbsPerHour = 0;
    } else if (duration <= 1.25) {
        carbsPerHour = 15;
        recommendation = "Lượng nhỏ để luyện tập khả năng dung nạp";
    } else if (duration <= 2) {
        carbsPerHour = 45;
        recommendation = "Nguồn carbohydrate đơn (glucose)";
    } else if (duration <= 3) {
        carbsPerHour = 75;
        recommendation = "Nhiều loại carbohydrate (glucose + fructose)";
    } else {
        carbsPerHour = 105;
        recommendation = "Nhiều nguồn carbohydrate + thức ăn thật";
    }

    totalCarbs = carbsPerHour * duration;

    const preWorkoutCarbs = weight * 1; // 1g/kg trước tập
    const postWorkoutCarbs = weight * 1.2; // 1.2g/kg sau tập

    let resultHTML = `
        <h4>Kết quả tính toán cho bạn (${weight}kg, ${duration}h):</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin: 16px 0;">
            <div style="text-align: center; padding: 12px; background: var(--color-secondary); border-radius: 8px;">
                <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">${carbsPerHour}g</div>
                <div style="font-size: 12px; color: var(--color-text-secondary);">CARBS/GIỜ</div>
            </div>
            <div style="text-align: center; padding: 12px; background: var(--color-secondary); border-radius: 8px;">
                <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">${totalCarbs}g</div>
                <div style="font-size: 12px; color: var(--color-text-secondary);">TỔNG CARBS</div>
            </div>
            <div style="text-align: center; padding: 12px; background: var(--color-secondary); border-radius: 8px;">
                <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">${preWorkoutCarbs}g</div>
                <div style="font-size: 12px; color: var(--color-text-secondary);">TRƯỚC TẬP</div>
            </div>
        </div>
        <p><strong>Khuyến nghị:</strong> ${recommendation}</p>
    `;

    if (duration > 1) {
        resultHTML += `
            <div style="margin-top: 16px; padding: 12px; background: rgba(var(--color-info-rgb), 0.1); border-radius: 8px;">
                <p><strong>Lưu ý:</strong> Với thời gian tập luyện ${duration} giờ, bạn cần luyện tập đường ruột trước khi áp dụng lượng carbohydrate này trong thi đấu.</p>
            </div>
        `;
    }

    resultDiv.innerHTML = resultHTML;
    resultDiv.classList.add('show');
}

// Populate weekly program
function populateWeeklyProgram() {
    const container = document.getElementById('weeks-container');
    if (!container) return;

    container.innerHTML = '';

    weeklyProgram.forEach(week => {
        const weekCard = document.createElement('div');
        weekCard.className = 'week-card';
        
        weekCard.innerHTML = `
            <div class="week-header">
                <div class="week-number">Tuần ${week.week}</div>
                <div class="week-focus">${week.focus}</div>
            </div>
            <div class="week-details">
                <div class="week-detail">
                    <div class="detail-value">${week.carb_intake}g</div>
                    <div class="detail-label">Carbs/giờ</div>
                </div>
                <div class="week-detail">
                    <div class="detail-value">${week.duration}h</div>
                    <div class="detail-label">Thời gian</div>
                </div>
            </div>
            <div class="week-notes">${week.notes}</div>
        `;

        container.appendChild(weekCard);
    });
}

// Populate nutrition recommendations table
function populateNutritionTable() {
    const container = document.getElementById('recommendations-table');
    if (!container) return;

    let tableHTML = `
        <div class="table-header">
            <div>Thời gian</div>
            <div>Lượng carbs</div>
            <div>Nguồn carbohydrate</div>
            <div>Ghi chú</div>
        </div>
    `;

    carbRecommendations.forEach(rec => {
        tableHTML += `
            <div class="table-row">
                <div style="font-weight: var(--font-weight-semibold);">${rec.duration}</div>
                <div style="color: var(--color-primary); font-weight: var(--font-weight-bold);">${rec.intake}</div>
                <div>${rec.sources}</div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">${rec.notes}</div>
            </div>
        `;
    });

    container.innerHTML = tableHTML;
}

// Initialize application
function initializeApp() {
    // Set up navigation
    const navLinks = document.querySelectorAll('.nav-menu a[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Set up mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Set up progress tracker
    const weekSelect = document.getElementById('week-select');
    if (weekSelect) {
        weekSelect.addEventListener('change', updateProgress);
        updateProgress(); // Initialize
    }

    // Populate dynamic content
    populateWeeklyProgram();
    populateNutritionTable();

    // Set up smooth scrolling for internal links
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            showSection(targetId);
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
        } else {
            showSection('home');
        }
    });

    // Initialize with home section or hash
    const initialSection = window.location.hash.substring(1) || 'home';
    showSection(initialSection);

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Add loading animation for dynamic content
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe week cards for animation
    setTimeout(() => {
        const weekCards = document.querySelectorAll('.week-card');
        weekCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            observer.observe(card);
        });
    }, 100);

    // Add form validation for calculator
    const weightInput = document.getElementById('weight-input');
    const durationInput = document.getElementById('duration-input');

    if (weightInput) {
        weightInput.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            if (value < 0 || value > 200) {
                e.target.style.borderColor = 'var(--color-error)';
            } else {
                e.target.style.borderColor = 'var(--color-border)';
            }
        });
    }

    if (durationInput) {
        durationInput.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            if (value < 0 || value > 24) {
                e.target.style.borderColor = 'var(--color-error)';
            } else {
                e.target.style.borderColor = 'var(--color-border)';
            }
        });
    }

    // Add enter key support for calculator
    [weightInput, durationInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    calculateCarbs();
                }
            });
        }
    });

    console.log('Gut Training VN App initialized successfully!');
}

// Utility functions
function formatNumber(num) {
    return new Intl.NumberFormat('vi-VN').format(num);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.showSection = showSection;
window.calculateCarbs = calculateCarbs;
window.updateProgress = updateProgress;
window.toggleMobileMenu = toggleMobileMenu;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}