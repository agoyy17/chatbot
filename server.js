const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 8080;
const directory = 'history';


// Middleware untuk mengizinkan penggunaan body parser
app.use(bodyParser.json());

// Endpoint untuk mengambil riwayat chat
app.get('/api/history', (req, res) => {
    fs.readFile(path.join(__dirname, directory, 'history.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error('Gagal membaca file riwayat chat:', err);
            res.status(500).send('Gagal membaca riwayat chat');
            return;
        }
        res.send(data);
    });
});


http.createServer(function (req, res) {
    // Mengambil path file yang diminta
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Membaca file yang diminta
    fs.readFile(filePath, function(err, data) {
        if (err) {
            // Jika file tidak ditemukan, kirimkan status 404
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }

        // Tentukan tipe konten file yang akan dikirimkan
        let contentType = 'text/html';
        if (filePath.endsWith('.css')) {
            contentType = 'text/css';
        }

        // Kirimkan file yang diminta
        res.writeHead(200, {'Content-Type': contentType});
        res.end(data);
    });
}).listen(port);

console.log(`Server berjalan di http://localhost:${port}/`);
