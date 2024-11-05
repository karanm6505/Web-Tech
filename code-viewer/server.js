const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const PORT = 3000;

// // Function to serve static files
// const serveFile = (filePath, response) => {
//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             response.writeHead(404, { 'Content-Type': 'text/plain' });
//             response.end('404 Not Found');
//             return;
//         }

//         const extname = path.extname(filePath);
//         let contentType = 'text/html';

//         if (extname === '.js') {
//             contentType = 'application/javascript';
//         } else if (extname === '.css') {
//             contentType = 'text/css';
//         } else if (extname === '.json') {
//             contentType = 'application/json';
//         } else if (extname === '.png') {
//             contentType = 'image/png';
//         } else if (extname === '.jpg' || extname === '.jpeg') {
//             contentType = 'image/jpeg';
//         } else if (extname === '.gif') {
//             contentType = 'image/gif';
//         }

//         response.writeHead(200, { 'Content-Type': contentType });
//         response.end(data);
//     });
// };

// // Create HTTP server
// const server = http.createServer((req, res) => {
//     let filePath = './public' + req.url; // Serve from the 'public' directory

//     if (filePath === './public/') {
//         filePath = './public/index.html'; // Default file
//     }

//     serveFile(filePath, res); // Call the function to serve the file
// });

// // Start the server
// server.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });
