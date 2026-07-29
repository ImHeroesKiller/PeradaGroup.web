# Gemini Chatbot Setup Guide

## Overview
The PERADA GROUP website now includes an AI-powered chatbot powered by Google Gemini. The chatbot:
- Reads and understands all site content about PERADA GROUP services
- Answers questions about logistics, HR, import services, and business operations
- Directs users to email (info@perada.co.id) for detailed consultations and proposals
- Supports multiple languages (Indonesian, English, Chinese)

## Setup Instructions

### 1. Get Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Click "Create API Key"
3. Select or create a Google Cloud project
4. Copy the generated API key

### 2. Add to Vercel Environment Variables
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `GEMINI_KEY`
   - **Value**: Paste your API key
   - **Environments**: Select Production, Preview, and Development as needed
4. Click "Save"

### 3. Deploy
1. Push your changes to GitHub (already done)
2. Vercel will automatically redeploy with the new environment variable
3. The chatbot will be active on all pages

## File Changes

### New Files
- `js/gemini-chatbot.js` - Main chatbot widget and API integration

### Modified Files
- `index.html` - Removed WhatsApp floating button, added chatbot widget
- `contact.html` - Replaced WhatsApp card with AI Chat card
- `about.html`, `careers.html`, `faq.html`, `services.html`, `privacy.html`, `terms.html` - Added chatbot script

## Features

### Chatbot Widget
- **Toggle Button**: Fixed button at bottom-right (blue, replaces WhatsApp)
- **Chat Interface**: Clean, modern chat UI with message history
- **Auto-scroll**: Messages auto-scroll as they appear
- **Loading Indicator**: Shows animated loading state while waiting for response
- **Mobile Responsive**: Works on all screen sizes

### System Prompt
The chatbot is configured with a comprehensive system prompt that:
- Knows about both PT Perkasa Adi Yuda (Logistics) and PT Perdana Adi Yuda (HR & Operations)
- Understands all services: Freight Forwarding, HR Outsourcing, Event Management, Facility Support, Import & Trading (API-U)
- Provides accurate contact information and office hours
- Directs users to email for formal inquiries and proposals
- Maintains professional, friendly tone

## Usage

### For Users
1. Click the blue chat icon at bottom-right of any page
2. Type a question about PERADA GROUP services
3. Get instant AI-powered response
4. For detailed inquiries, chatbot will suggest emailing info@perada.co.id

### For Developers
To test locally:
```bash
# Set environment variable
export GEMINI_KEY="your-api-key-here"

# The chatbot will automatically use this key
```

## API Configuration
- **Model**: Gemini 3.5 Flash Lite
- **Max Tokens**: 500 per response
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent`

## Troubleshooting

### Chatbot not appearing
- Check that `GEMINI_KEY` is set in Vercel environment variables
- Check browser console for errors
- Ensure `js/gemini-chatbot.js` is loaded

### API errors
- Verify API key is valid and has Generative Language API enabled
- Check API quota in Google Cloud Console
- Ensure CORS is properly configured (Google's API handles this)

### Messages not sending
- Check browser console for error messages
- Verify network connection
- Try refreshing the page

## Cost Estimation
- Gemini 1.5 Flash: $0.075 per 1M input tokens, $0.30 per 1M output tokens
- Typical conversation: ~100-500 tokens per exchange
- Estimated cost: Very low for typical usage

## Next Steps
1. Deploy to production
2. Monitor chatbot usage and performance
3. Collect user feedback
4. Iterate on system prompt if needed
5. Consider upgrading to Gemini 2.0 if higher quality is needed

## Support
For issues or questions about the chatbot implementation, contact the development team.
