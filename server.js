const express = require('express');
const { createBareServer } = require('@tomphttp/bare-server-node');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Create bare server for Ultraviolet
const bareServer = createBareServer('/bare/');

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve Ultraviolet files from node_modules
app.use('/uv/', express.static(path.join(__dirname, 'node_modules/@titaniumnetwork-dev/ultraviolet/dist')));

// Handle bare server WebSocket upgrade
server.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

// Handle bare server HTTP requests
app.use((req, res, next) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    next();
  }
});

// Get port from environment variable or use 8080
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║      Voidagon.LLS V1 - Server          ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('');
  console.log('📝 Features:');
  console.log('   ✓ Ultraviolet proxy enabled');
  console.log('   ✓ Bare server configured');
  console.log('   ✓ Secret shortcut: Shift + ) + -');
  console.log('');
  console.log('Press Ctrl+C to stop the server');
});
