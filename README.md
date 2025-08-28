# AI Girlfriend - Khushi 💕

A voice-powered AI companion web application that creates an interactive chat experience with an AI girlfriend named Khushi. Built with Node.js and powered by Google's Gemini AI.

## 🌟 Features

- **Voice Recognition**: Speak naturally and have conversations using Web Speech API
- **Text-to-Speech**: Khushi responds with a natural-sounding voice
- **Real-time Chat Interface**: Beautiful, responsive chat UI with animated interactions
- **Personality-driven AI**: Khushi has a warm, loving personality designed to be caring and supportive
- **Mobile-friendly**: Responsive design that works on all devices
- **Real-time Animations**: Visual feedback with pulsing animations during voice interactions

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Google Gemini API key
- Modern web browser with microphone access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhi0065/AI_Girlfriend.git
   cd AI_Girlfriend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Edit the `.env` file and add your Gemini API key:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Start the application**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5000` and start chatting with Khushi!

## 🎯 How to Use

1. **Grant Microphone Permission**: Allow microphone access when prompted
2. **Press the Microphone Button**: Click the purple microphone button to start speaking
3. **Speak Naturally**: Talk to Khushi as you would with a friend
4. **Listen to Response**: Khushi will respond both in text and voice
5. **Continue Conversation**: Keep the conversation going by pressing the mic button again

## 🛠️ Technical Stack

- **Backend**: Node.js with Express
- **AI Model**: Google Gemini 2.0 Flash
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Voice**: Web Speech API (Speech Recognition & Speech Synthesis)
- **Styling**: Custom CSS with gradient themes and animations

## 📁 Project Structure

```
AI_Girlfriend/
├── public/
│   ├── css/
│   │   └── style.css          # Styling and animations
│   ├── js/
│   │   └── app.js             # Frontend JavaScript logic
│   └── index.html             # Main HTML interface
├── index.js                   # Express server and API routes
├── package.json               # Dependencies and scripts
├── .env                       # Environment variables
└── README.md                  # This file
```

## 🎨 Customization

### Personality Modification

You can customize Khushi's personality by editing the `system_instruction` in `index.js`:

```javascript
text: `Your name is Khushi. You are a loving, caring girlfriend...`
```

### Voice Settings

Modify voice preferences in `public/js/app.js`:

```javascript
utterance.rate = 1.1;    // Speech speed
utterance.pitch = 1;     // Voice pitch
utterance.lang = 'en-IN'; // Language/accent
```

### Styling

Customize the appearance by editing CSS variables in `public/css/style.css`:

```css
:root {
  --primary: #7f5af0;      /* Primary color */
  --secondary: #ff6b6b;    /* Secondary color */
  --background: #2c2c2c;   /* Background color */
}
```

## 🔧 Configuration

### Environment Variables

| Variable         | Description                 | Required |
|------------------|-----------------------------|----------|
| `PORT`           | Server port (default: 3000) | No       |
| `GEMINI_API_KEY` | Your Google Gemini API key  | Yes      |

### API Key Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

## 🌐 Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support  
- **Safari**: Full support (iOS 14.5+)
- **Mobile browsers**: Supported with touch interface

## 📱 Mobile Usage

The app is fully responsive and works great on mobile devices. The microphone button is optimized for touch interfaces.

## 🔒 Privacy & Security

- Voice data is processed locally in your browser
- Only text prompts are sent to the Gemini API
- No conversation history is stored on servers
- API keys are securely managed through environment variables

## 🚨 Troubleshooting

### Common Issues

**Microphone not working:**
- Ensure microphone permissions are granted
- Check if your browser supports Web Speech API
- Try refreshing the page

**API errors:**
- Verify your Gemini API key is correct
- Check your internet connection
- Ensure you have API credits available

**Voice not playing:**
- Check browser audio settings
- Ensure speakers/headphones are connected
- Try a different browser

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with ❤️ by [Abhishek (Abhi0065)](https://github.com/Abhi0065)
- Powered by Google Gemini AI
- Voice technology using Web Speech API
