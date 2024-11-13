// Sample stamp data
const stampData = {
    featured: [
        {
            id: 1,
            name: "Penny Black",
            country: "United Kingdom",
            year: 1840,
            value: 15000,
            condition: "Fine",
            description: "The world's first adhesive postage stamp used in a public postal system.",
            image: "b3.jpg",
            rarity: "Very Rare"
        },
        {
            id: 2,
            name: "Inverted Jenny",
            country: "United States",
            year: 1918,
            value: 1000000,
            condition: "Mint",
            description: "Famous U.S. stamp printing error showing an upside-down airplane.",
            image:"rare6.jpg",
            rarity: "Extremely Rare"
        },
        // Add more stamp data...
    ],
    categories: {
        rare: [],
        historical: [],
        commemorative: [],
        regional: []
    }
};

// Value calculation factors
const valueFactors = {
    condition: {
        'mint': 1.5,
        'near-mint': 1.2,
        'fine': 1.0,
        'good': 0.8,
        'fair': 0.5
    },
    age: {
        'vintage': 1.5,  // Pre-1900
        'classic': 1.2,  // 1900-1950
        'modern': 1.0    // Post-1950
    }
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedStamps();
    setupEventListeners();
    initializeValueCalculator();
});

// Load featured stamps
function loadFeaturedStamps() {
    const stampGrid = document.querySelector('.stamp-grid');
    stampGrid.innerHTML = '';

    stampData.featured.forEach(stamp => {
        const stampCard = createStampCard(stamp);
        stampGrid.appendChild(stampCard);
    });
}

// Create stamp card element
function createStampCard(stamp) {
    const card = document.createElement('div');
    card.className = 'stamp-card';
    card.innerHTML = `
        <div class="stamp-image">
            <img src="${stamp.image}" alt="${stamp.name}" width="100px" height="100px">
            <span class="rarity-badge ${stamp.rarity.toLowerCase().replace(' ', '-')}">${stamp.rarity}</span>
        </div>
        <div class="stamp-info">
            <h3>${stamp.name}</h3>
            <p class="stamp-origin">${stamp.country}, ${stamp.year}</p>
            <p class="stamp-description">${stamp.description}</p>
            <div class="stamp-details">
                <span class="condition">Condition: ${stamp.condition}</span>
                <span class="value">Value: $${stamp.value.toLocaleString()}</span>
            </div>
            <button style="background-color:white; color:#413d51; position:relative;bottom:0px; border-radius:5px ; width:100px" onclick="showStampDetails(${stamp.id})" class="details-button">
                View Details
            </button>
        </div>
    `;
    return card;
}

// Show stamp details modal
function showStampDetails(stampId) {
    const stamp = stampData.featured.find(s => s.id === stampId);
    if (!stamp) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal(this)">&times;</span>
            <div class="stamp-detail-view">
                <div class="stamp-detail-image">
                    <img src="${stamp.image}" alt="${stamp.name}">
                </div>
                <div class="stamp-detail-info">
                    <h2>${stamp.name}</h2>
                    <p class="stamp-origin">${stamp.country}, ${stamp.year}</p>
                    <p class="stamp-description">${stamp.description}</p>
                    <div class="stamp-specifications">
                        <h3>Specifications</h3>
                        <ul>
                            <li>Condition: ${stamp.condition}</li>
                            <li>Rarity: ${stamp.rarity}</li>
                            <li>Estimated Value: $${stamp.value.toLocaleString()}</li>
                        </ul>
                    </div>
                    <div class="stamp-history">
                        <h3>Historical Significance</h3>
                        <p>${stamp.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Close modal
function closeModal(element) {
    element.closest('.modal').remove();
}

// Initialize value calculator
function initializeValueCalculator() {
    const form = document.getElementById('valueCalculatorForm');
    form.addEventListener('submit', calculateStampValue);
}

// Calculate stamp value
function calculateStampValue(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const condition = formData.get('condition');
    const year = parseInt(formData.get('year'));
    
    let baseValue = 100; // Base value in dollars
    
    // Apply condition factor
    const conditionFactor = valueFactors.condition[condition] || 1.0;
    
    // Apply age factor
    let ageFactor;
    if (year < 1900) ageFactor = valueFactors.age.vintage;
    else if (year < 1950) ageFactor = valueFactors.age.classic;
    else ageFactor = valueFactors.age.modern;
    
    // Calculate final value
    const estimatedValue = baseValue * conditionFactor * ageFactor;
    
    displayCalculationResult(estimatedValue);
}

// Display calculation result
function displayCalculationResult(value) {
    const resultDiv = document.getElementById('calculationResult');
    resultDiv.innerHTML = `
        <div class="calculation-result">
            <h3>Estimated Value</h3>
            <p class="estimated-value">$${value.toFixed(2)}</p>
            <p class="note">Note: This is a rough estimate. Actual value may vary based on market conditions and specific characteristics.</p>
        </div>
    `;
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', debounce(handleSearch, 300));

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', handleNewsletterSubscription);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle search
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const stampCards = document.querySelectorAll('.stamp-card');
    
    stampCards.forEach(card => {
        const stampName = card.querySelector('h3').textContent.toLowerCase();
        const stampDescription = card.querySelector('.stamp-description').textContent.toLowerCase();
        
        if (stampName.includes(searchTerm) || stampDescription.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Handle newsletter subscription
function handleNewsletterSubscription(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Successfully subscribed to newsletter!', 'success');
        event.target.reset();
    }, 1000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Debounce function for search
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