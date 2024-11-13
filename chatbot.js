class StampChatbot {
    constructor() {
        this.responses = {
            greetings: [
                "Hello! Welcome to StampPedia. How can I help you today?",
                "Hi there! I'm your stamp collecting assistant. What would you like to know?",
                "Welcome! I can help you learn about stamps and their values. What interests you?"
            ],
            farewell: [
                "Goodbye! Happy stamp collecting!",
                "Thanks for chatting! Come back if you have more questions.",
                "Have a great day! Don't forget to check our stamp catalog."
            ],
            unknown: [
                "I'm not sure about that. Would you like to know about stamp values or history?",
                "I don't have that information. Can I help you with stamp identification or valuation?",
                "I'm still learning about that. Meanwhile, would you like to explore our stamp catalog?"
            ],
            topics: {
                value: {
                    patterns: ['worth', 'value', 'price', 'cost', 'expensive'],
                    responses: [
                        "Stamp values depend on various factors including age, condition, and rarity. Would you like to use our value calculator?",
                        "I can help you estimate a stamp's value. Do you have specific details about the stamp?",
                        "The value of stamps can vary greatly. Have you tried our stamp value calculator tool?"
                    ]
                },
                history: {
                    patterns: ['history', 'old', 'ancient', 'vintage', 'origin'],
                    responses: [
                        "Stamp collecting began with the first postage stamp, the Penny Black, in 1840. Would you like to learn more?",
                        "Stamps have a rich history dating back to the Victorian era. What period interests you?",
                        "Each stamp tells a historical story. Are you interested in a specific time period?"
                    ]
                },
                collecting: {
                    patterns: ['collect', 'start', 'begin', 'hobby', 'tips'],
                    responses: [
                        "Starting a stamp collection is exciting! Would you like some tips for beginners?",
                        "I can help you begin your stamp collecting journey. What type of stamps interest you?",
                        "There are many ways to start collecting stamps. Would you like to know the basics?"
                    ]
                }
            }
        };
        
        this.conversation = [];
        this.init();
    }

    init() {
        this.addMessage('bot', this.getRandomResponse(this.responses.greetings));
    }

    addMessage(type, text) {
        const messagesDiv = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = text;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        this.conversation.push({ type, text });
    }

    processMessage(userInput) {
        const input = userInput.toLowerCase();
        
        // Add user message
        this.addMessage('user', userInput);
        
        // Check for farewell
        if (this.isFarewell(input)) {
            this.addMessage('bot', this.getRandomResponse(this.responses.farewell));
            return;
        }
        
        // Check for topics
        let responded = false;
        for (const [topic, data] of Object.entries(this.responses.topics)) {
            if (data.patterns.some(pattern => input.includes(pattern))) {
                this.addMessage('bot', this.getRandomResponse(data.responses));
                responded = true;
                break;
            }
        }
        
        // Default response
        if (!responded) {
            this.addMessage('bot', this.getRandomResponse(this.responses.unknown));
        }
    }

    isFarewell(input) {
        const farewellWords = ['bye', 'goodbye', 'see you', 'farewell'];
        return farewellWords.some(word => input.includes(word));
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize chatbot
const chatbot = new StampChatbot();

// Toggle chat window
function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = chatbot.style.display === 'none' ? 'flex' : 'none';
}

// Send message
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        chatbot.processMessage(message);
        input.value = '';
    }
}

// Handle enter key
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});