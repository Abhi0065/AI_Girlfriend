const micButton = document.getElementById('mic-button');
const statusIndicator = document.getElementById('status');
const chatSection = document.getElementById('chat-section');
const emptyState = document.getElementById('empty-state');
const conversation = document.getElementById('conversation');

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = 'en-IN';
recognition.maxAlternatives = 1;

let isListening = false;
let finalTranscript = '';
let conversationStarted = false;

micButton.onclick = () => {
  if (!isListening) {
    recognition.start();
  } else {
    recognition.stop();
  }
};

recognition.onstart = () => {
  isListening = true;
  micButton.classList.add('listening');
  statusIndicator.textContent = 'Listening...';
};

recognition.onresult = (event) => {
  finalTranscript = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    finalTranscript += event.results[i][0].transcript;
  }
  statusIndicator.textContent = 'Processing...';
};

recognition.onend = () => {
  if (finalTranscript.trim()) {
    if (!conversationStarted) {
      hideEmptyState();
      conversationStarted = true;
    }
    addUserMessage(finalTranscript.trim());
    sendToServer(finalTranscript.trim());
  }
  micButton.classList.remove('listening');
  isListening = false;
  statusIndicator.textContent = 'Press to speak';
};

recognition.onerror = (event) => {
  statusIndicator.textContent = 'Error: ' + event.error;
  micButton.classList.remove('listening');
  isListening = false;
  finalTranscript = '';
  setTimeout(() => {
    statusIndicator.textContent = 'Press to speak';
  }, 3000);
};

function hideEmptyState() {
  emptyState.style.display = 'none';
}

function addUserMessage(text) {
  const userBox = document.createElement('div');
  userBox.className = 'chat-box user';
  userBox.innerHTML = `
    <div class="profile">
      <div class="profile-icon"><i class="fas fa-user"></i></div>
      <div class="profile-name">You</div>
    </div>
    <div class="chat-bubble">${text}</div>
  `;
  conversation.appendChild(userBox);
  scrollToBottom();
}

function addAIMessage(text) {
  const aiBox = document.createElement('div');
  aiBox.className = 'chat-box ai';
  aiBox.innerHTML = `
    <div class="profile">
      <div class="profile-icon" id="ai-icon-${Date.now()}"><i class="fas fa-heart"></i></div>
      <div class="profile-name">Khushi</div>
    </div>
    <div class="chat-bubble">${text}</div>
  `;
  conversation.appendChild(aiBox);
  scrollToBottom();
  return aiBox.querySelector('.profile-icon').id;
}

function scrollToBottom() {
  chatSection.scrollTop = chatSection.scrollHeight;
}

async function sendToServer(prompt) {
  statusIndicator.textContent = 'Getting response...';

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    const speechText = result.message;
   const speech = result.message
     .replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g,'')
     .replace(/[^a-zA-Z\s,\.?!]/g, '')

    const iconId = addAIMessage(speechText);
    textToSpeech(speech, iconId);
    finalTranscript = '';
    statusIndicator.textContent = 'Press to speak';
  } catch (error) {
    console.error('Error:', error);
    finalTranscript = '';
    addAIMessage(
      "I'm sorry, I couldn't process your message. Please try again.",
    );
    statusIndicator.textContent = 'Press to speak';
  }
}

let selectedVoice = null;

function loadVoices() {
  const voices = speechSynthesis.getVoices();
  selectedVoice =
    voices.find(
      (v) =>
        v.name.includes('Google') && v.name.toLowerCase().includes('female'),
    ) ||
    voices.find(
      (v) => v.lang === 'en-IN' && v.name.toLowerCase().includes('female'),
    ) ||
    voices.find((v) => v.lang === 'en-IN') ||
    voices.find(
      (v) => v.lang.includes('en') && v.name.toLowerCase().includes('female'),
    );
}

speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function textToSpeech(text, iconId) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;
  utterance.lang = 'en-IN';
  utterance.rate = 1.1;
  utterance.pitch = 1;

  const icon = document.getElementById(iconId);
  if (icon) {
    icon.classList.add('speaking');

    utterance.onend = () => {
      icon.classList.remove('speaking');
    };
  }

  speechSynthesis.speak(utterance);
}
