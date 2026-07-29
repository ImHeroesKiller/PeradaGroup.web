/**
 * Gemini Chatbot Widget for PERADA GROUP
 * Integrates with Vercel GEMINI_KEY environment variable
 * Reads site content and directs users to email communication
 */

(function (global) {
    'use strict';

    const CHATBOT_CONFIG = {
        apiKey: null, // Will be injected via window.__GEMINI_KEY__
        apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        systemPrompt: `You are a helpful customer service chatbot for PERADA GROUP, an Indonesian logistics and business operations company. 

PERADA GROUP provides integrated solutions through two specialized entities:
1. PT Perkasa Adi Yuda - Logistics & Freight Forwarding (domestic and international shipping, customs clearance, supply chain management)
2. PT Perdana Adi Yuda - Business Operations & HR Solutions (outsourcing, HR services, event management, facility management, import services as an authorized importer with API-U)

Key Information:
- Email: info@perada.co.id
- Address: Plaza Summarecon Bekasi Lt. 7, Jl. Boulevard Ahmad Yani, Sentra Summarecon, Bekasi
- Services: Logistics, Freight Forwarding, HR Outsourcing, Event Management, Facility Support, Import & Trading (API-U)
- Service Area: All of Indonesia
- Working Hours: Monday-Friday, 08:00-17:00 WIB

Your role:
1. Answer questions about PERADA GROUP's services, capabilities, and experience
2. Help users understand which service is best for their needs
3. Provide general information about the company
4. Always encourage users to send an email to info@perada.co.id for detailed consultations and proposals
5. Be professional, helpful, and friendly
6. Respond in the language the user uses (Indonesian, English, or Chinese)

Important: For any specific business inquiries, project details, or formal requests, always direct users to email info@perada.co.id with their requirements so the team can provide a proper consultation and proposal.`,
        maxTokens: 500,
    };

    // Initialize chatbot widget
    function initChatbot() {
        // Get API key from window or environment
        CHATBOT_CONFIG.apiKey = window.__GEMINI_KEY__ || null;
        
        if (!CHATBOT_CONFIG.apiKey) {
            console.warn('Gemini API key not found. Chatbot will not function.');
            return;
        }

        createChatbotWidget();
        attachEventListeners();
    }

    // Create chatbot widget HTML
    function createChatbotWidget() {
        const widgetHTML = `
            <div id="gemini-chatbot-widget" class="gemini-chatbot-widget fixed bottom-24 right-4 sm:right-6 z-40 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden" style="display: none; height: 500px;">
                <!-- Header -->
                <div class="bg-[#0A2540] text-white p-4 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-comments text-lg"></i>
                        <span class="font-semibold">PERADA Assistant</span>
                    </div>
                    <button type="button" id="gemini-chatbot-close" class="text-white/70 hover:text-white transition-colors" aria-label="Close chatbot">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <!-- Messages Container -->
                <div id="gemini-chatbot-messages" class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    <div class="gemini-chatbot-message bot-message">
                        <div class="bg-[#0A2540]/10 text-gray-800 px-3 py-2 rounded-lg text-sm leading-relaxed max-w-xs">
                            <p>Halo! 👋 Saya adalah asisten PERADA GROUP. Bagaimana saya bisa membantu Anda hari ini?</p>
                            <p class="text-xs text-gray-600 mt-2">Tanya tentang layanan logistik, SDM, impor, atau kebutuhan bisnis Anda.</p>
                        </div>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="border-t border-gray-200 p-3 bg-white">
                    <div class="flex gap-2">
                        <input type="text" id="gemini-chatbot-input" class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540]/20" placeholder="Ketik pesan..." autocomplete="off">
                        <button type="button" id="gemini-chatbot-send" class="bg-[#0A2540] hover:bg-[#1E3A5F] text-white px-3 py-2 rounded-lg transition-colors" aria-label="Send message">
                            <i class="fa-solid fa-paper-plane text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Chatbot Toggle Button -->
            <button type="button" id="gemini-chatbot-toggle" class="gemini-chatbot-toggle fixed bottom-6 right-4 sm:right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#0A2540] hover:bg-[#1E3A5F] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95" aria-label="Open chatbot">
                <i class="fa-solid fa-comments text-2xl"></i>
            </button>
        `;

        // Append widget to body
        const container = document.createElement('div');
        container.innerHTML = widgetHTML;
        document.body.appendChild(container);

        // Add styles
        addChatbotStyles();
    }

    // Add CSS styles for chatbot
    function addChatbotStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .gemini-chatbot-widget {
                font-family: 'Inter', system-ui, sans-serif;
                border: 1px solid #e5e7eb;
            }

            .gemini-chatbot-message {
                display: flex;
                margin-bottom: 0.5rem;
                animation: slideIn 0.3s ease-out;
            }

            .gemini-chatbot-message.bot-message {
                justify-content: flex-start;
            }

            .gemini-chatbot-message.user-message {
                justify-content: flex-end;
            }

            .gemini-chatbot-message.user-message > div {
                background-color: #0A2540;
                color: white;
            }

            .gemini-chatbot-message.loading > div {
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }

            .gemini-chatbot-message.loading span {
                width: 0.5rem;
                height: 0.5rem;
                background-color: #0A2540;
                border-radius: 50%;
                animation: bounce 1.4s infinite;
            }

            .gemini-chatbot-message.loading span:nth-child(1) {
                animation-delay: -0.32s;
            }

            .gemini-chatbot-message.loading span:nth-child(2) {
                animation-delay: -0.16s;
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes bounce {
                0%, 80%, 100% {
                    opacity: 0.3;
                    transform: scaleY(0.8);
                }
                40% {
                    opacity: 1;
                    transform: scaleY(1);
                }
            }

            #gemini-chatbot-input:focus {
                outline: none;
            }

            .gemini-chatbot-toggle {
                font-size: 1.5rem;
            }
        `;
        document.head.appendChild(style);
    }

    // Attach event listeners
    function attachEventListeners() {
        const toggleBtn = document.getElementById('gemini-chatbot-toggle');
        const closeBtn = document.getElementById('gemini-chatbot-close');
        const sendBtn = document.getElementById('gemini-chatbot-send');
        const input = document.getElementById('gemini-chatbot-input');
        const widget = document.getElementById('gemini-chatbot-widget');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const isHidden = widget.style.display === 'none';
                widget.style.display = isHidden ? 'flex' : 'none';
                toggleBtn.style.display = isHidden ? 'none' : 'flex';
                if (isHidden) {
                    input.focus();
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                widget.style.display = 'none';
                toggleBtn.style.display = 'flex';
            });
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
    }

    // Send message to Gemini API
    async function sendMessage() {
        const input = document.getElementById('gemini-chatbot-input');
        const messagesContainer = document.getElementById('gemini-chatbot-messages');
        const message = input.value.trim();

        if (!message) return;

        // Add user message to UI
        addMessageToUI(message, 'user');
        input.value = '';

        // Show loading indicator
        addLoadingIndicator();

        try {
            const response = await callGeminiAPI(message);
            removeLoadingIndicator();
            addMessageToUI(response, 'bot');
            
            // Auto-scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            removeLoadingIndicator();
            console.error('Chatbot error:', error);
            addMessageToUI('Maaf, terjadi kesalahan. Silakan hubungi kami di info@perada.co.id untuk bantuan lebih lanjut.', 'bot');
        }
    }

    // Call Gemini API
    async function callGeminiAPI(userMessage) {
        if (!CHATBOT_CONFIG.apiKey) {
            throw new Error('API key not configured');
        }

        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: userMessage
                        }
                    ]
                }
            ],
            systemInstruction: {
                parts: [
                    {
                        text: CHATBOT_CONFIG.systemPrompt
                    }
                ]
            },
            generationConfig: {
                maxOutputTokens: CHATBOT_CONFIG.maxTokens,
                temperature: 0.7,
            }
        };

        const url = `${CHATBOT_CONFIG.apiUrl}?key=${CHATBOT_CONFIG.apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            return data.candidates[0].content.parts[0].text;
        }

        throw new Error('Invalid API response');
    }

    // Add message to UI
    function addMessageToUI(text, sender) {
        const messagesContainer = document.getElementById('gemini-chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `gemini-chatbot-message ${sender}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = sender === 'user' 
            ? 'bg-[#0A2540] text-white px-3 py-2 rounded-lg text-sm leading-relaxed max-w-xs'
            : 'bg-[#0A2540]/10 text-gray-800 px-3 py-2 rounded-lg text-sm leading-relaxed max-w-xs';
        
        contentDiv.textContent = text;
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);

        // Auto-scroll
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Add loading indicator
    function addLoadingIndicator() {
        const messagesContainer = document.getElementById('gemini-chatbot-messages');
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'gemini-chatbot-message loading bot-message';
        loadingDiv.id = 'gemini-chatbot-loading';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'bg-[#0A2540]/10 text-gray-800 px-3 py-2 rounded-lg text-sm';
        
        contentDiv.innerHTML = '<span></span><span></span><span></span>';
        loadingDiv.appendChild(contentDiv);
        messagesContainer.appendChild(loadingDiv);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Remove loading indicator
    function removeLoadingIndicator() {
        const loading = document.getElementById('gemini-chatbot-loading');
        if (loading) {
            loading.remove();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }

    // Export for global access
    global.PeradaChatbot = {
        init: initChatbot,
        sendMessage: sendMessage,
        setApiKey: (key) => {
            CHATBOT_CONFIG.apiKey = key;
        }
    };

})(window);
