const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Voidagon.LLS V1...');

// Create directories
const dirs = ['public'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created ${dir} directory`);
  }
});

// Create index.html with embedded CSS
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Voidagon.LLS V1</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #111827;
      color: #fff;
    }

    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .header {
      background: #1f2937;
      border-bottom: 1px solid #374151;
      padding: 1rem;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .icon {
      width: 24px;
      height: 24px;
      color: #60a5fa;
    }

    h1 {
      font-size: 1.25rem;
      font-weight: bold;
    }

    .nav-bar {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .nav-btn {
      padding: 0.5rem;
      background: #374151;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      color: #fff;
      transition: background 0.2s;
    }

    .nav-btn:hover {
      background: #4b5563;
    }

    .nav-btn svg {
      width: 18px;
      height: 18px;
      stroke-width: 2;
    }

    .url-container {
      flex: 1;
      position: relative;
    }

    #urlInput {
      width: 100%;
      padding: 0.5rem 2.5rem 0.5rem 1rem;
      background: #374151;
      border: 1px solid #4b5563;
      border-radius: 0.375rem;
      color: #fff;
      font-size: 0.875rem;
    }

    #urlInput:focus {
      outline: none;
      border-color: #60a5fa;
    }

    .search-icon {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      color: #9ca3af;
      stroke-width: 2;
    }

    .go-btn {
      padding: 0.5rem 1.5rem;
      background: #2563eb;
      border: none;
      border-radius: 0.375rem;
      color: #fff;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .go-btn:hover {
      background: #1d4ed8;
    }

    .current-url {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: #9ca3af;
      display: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .content {
      flex: 1;
      position: relative;
      background: #111827;
    }

    .welcome {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 2rem;
      text-align: center;
    }

    .welcome-icon {
      width: 64px;
      height: 64px;
      color: #60a5fa;
      margin-bottom: 1rem;
      stroke-width: 1.5;
    }

    .welcome h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .welcome > p {
      color: #9ca3af;
      margin-bottom: 1.5rem;
    }

    .info-box {
      background: #1f2937;
      border-radius: 0.5rem;
      padding: 1rem;
      text-align: left;
      max-width: 28rem;
    }

    .info-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .info-box ul {
      list-style: disc;
      padding-left: 1.5rem;
      color: #d1d5db;
      font-size: 0.875rem;
    }

    .info-box li {
      margin: 0.25rem 0;
    }

    #proxyFrame {
      width: 100%;
      height: 100%;
      border: none;
    }

    .loading {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #111827;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 2px solid #374151;
      border-top-color: #2563eb;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading p {
      color: #9ca3af;
    }

    .footer {
      background: #1f2937;
      border-top: 1px solid #374151;
      padding: 0.5rem 1rem;
      text-align: center;
      font-size: 0.75rem;
      color: #6b7280;
    }

    /* Hidden Sparx iframe */
    #sparxFrame {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      z-index: 9999;
      display: none;
      background: white;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-title">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <h1>Voidagon.LLS V1</h1>
      </div>
      
      <div class="nav-bar">
        <button id="homeBtn" class="nav-btn" title="Home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>
        
        <button id="reloadBtn" class="nav-btn" title="Reload">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </button>

        <div class="url-container">
          <input type="text" id="urlInput" placeholder="Enter URL or search term..." />
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        
        <button id="goBtn" class="go-btn">Go</button>
      </div>

      <div id="currentUrl" class="current-url"></div>
    </div>

    <!-- Content Area -->
    <div class="content">
      <div id="welcome" class="welcome">
        <svg class="welcome-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <h2>Welcome to Voidagon.LLS V1</h2>
        <p>Enter a URL or search term above to browse the web through the proxy.</p>
        <div class="info-box">
          <p class="info-title">Quick Start:</p>
          <ul>
            <li>Enter a full URL (e.g., example.com)</li>
            <li>Or enter search terms to use Google</li>
            <li>Navigate using the buttons above</li>
            <li>Press Shift + ) + - for a special feature</li>
          </ul>
        </div>
      </div>
      
      <iframe id="proxyFrame" style="display: none;"></iframe>
      
      <div id="loading" class="loading" style="display: none;">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      ✓ Voidagon.LLS V1 - Full Ultraviolet proxy with backend server
    </div>
  </div>

  <!-- Hidden Sparx Maths iframe -->
  <iframe id="sparxFrame" src="about:blank"></iframe>

  <script src="/uv/uv.bundle.js"></script>
  <script src="/uv/uv.config.js"></script>
  <script src="app.js"></script>
</body>
</html>`;

fs.writeFileSync('public/index.html', indexHtml);
console.log('✓ Created index.html with embedded CSS');

// Create uv.config.js
const uvConfig = `self.__uv$config = {
  prefix: '/service/',
  bare: '/bare/',
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: '/uv/uv.handler.js',
  bundle: '/uv/uv.bundle.js',
  config: '/uv/uv.config.js',
  sw: '/uv/uv.sw.js',
};`;

fs.writeFileSync('public/uv.config.js', uvConfig);
console.log('✓ Created uv.config.js');

// Create app.js with Sparx Maths toggle
const appJs = `const urlInput = document.getElementById('urlInput');
const goBtn = document.getElementById('goBtn');
const homeBtn = document.getElementById('homeBtn');
const reloadBtn = document.getElementById('reloadBtn');
const proxyFrame = document.getElementById('proxyFrame');
const welcome = document.getElementById('welcome');
const loading = document.getElementById('loading');
const currentUrl = document.getElementById('currentUrl');
const sparxFrame = document.getElementById('sparxFrame');

// Track key presses for Shift + ) + -
let keysPressed = {};
let sparxVisible = false;

// Register service worker
async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/uv/uv.sw.js', {
        scope: __uv$config.prefix,
      });
      console.log('Service Worker registered');
    } catch (err) {
      console.error('Service Worker registration failed:', err);
    }
  }
}

registerSW();

function go() {
  let url = urlInput.value.trim();
  if (!url) return;

  // Add protocol if missing
  if (!url.match(/^https?:\\/\\//i)) {
    if (url.includes('.') && !url.includes(' ')) {
      url = 'https://' + url;
    } else {
      url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    }
  }

  // Show loading
  welcome.style.display = 'none';
  proxyFrame.style.display = 'none';
  loading.style.display = 'flex';

  // Encode URL with Ultraviolet
  const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
  
  // Update display
  currentUrl.textContent = 'Proxying: ' + url;
  currentUrl.style.display = 'block';

  // Load in iframe
  proxyFrame.src = encodedUrl;
  proxyFrame.style.display = 'block';
  
  // Hide loading when iframe loads
  proxyFrame.onload = () => {
    loading.style.display = 'none';
  };
}

function goHome() {
  urlInput.value = '';
  currentUrl.style.display = 'none';
  proxyFrame.style.display = 'none';
  proxyFrame.src = '';
  loading.style.display = 'none';
  welcome.style.display = 'flex';
}

function reload() {
  if (proxyFrame.src) {
    loading.style.display = 'flex';
    proxyFrame.style.display = 'none';
    proxyFrame.src = proxyFrame.src;
  }
}

// Toggle Sparx Maths
function toggleSparx() {
  sparxVisible = !sparxVisible;
  
  if (sparxVisible) {
    // Load Sparx Maths if not already loaded
    if (sparxFrame.src === 'about:blank' || sparxFrame.src === '') {
      sparxFrame.src = 'https://sparxmaths.com';
    }
    sparxFrame.style.display = 'block';
  } else {
    sparxFrame.style.display = 'none';
  }
}

// Keyboard shortcut handler: Shift + ) + -
document.addEventListener('keydown', (e) => {
  keysPressed[e.key] = true;
  
  // Check for Shift + ) + -
  // ) is Shift+0 on most keyboards
  // - is the minus key
  if (keysPressed['Shift'] && keysPressed[')'] && keysPressed['-']) {
    toggleSparx();
    // Clear the keys
    keysPressed = {};
  }
});

document.addEventListener('keyup', (e) => {
  delete keysPressed[e.key];
});

// Event listeners
goBtn.addEventListener('click', go);
homeBtn.addEventListener('click', goHome);
reloadBtn.addEventListener('click', reload);
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') go();
});`;

fs.writeFileSync('public/app.js', appJs);
console.log('✓ Created app.js with Sparx Maths toggle');

console.log('✅ Setup complete! All files created successfully.');
console.log('📝 Voidagon.LLS V1 features:');
console.log('   - Full Ultraviolet proxy functionality');
console.log('   - Press Shift + ) + - to toggle Sparx Maths');
console.log('   - Embedded CSS for faster loading');
console.log('');
console.log('🚀 Next steps:');
console.log('   1. Run: npm start');
console.log('   2. Visit: http://localhost:8080');
console.log('   3. Try the secret shortcut: Shift + ) + -');
