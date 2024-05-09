
const http = require('http');
const fs = require('fs');

// Define port number
const port = 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set response headers
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Read index.html file
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write('File not found!');
    } else {
      // Send index.html contents in response
      res.write(data);
    }
    // End response
    res.end();
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
