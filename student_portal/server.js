const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const booksFile = path.join(__dirname, 'books.json');

app.post('/api/books', (req, res) => {
    const book = req.body;
    fs.readFile(booksFile, (err, data) => {
        if (err) throw err;
        const books = JSON.parse(data);
        books.push(book);
        fs.writeFile(booksFile, JSON.stringify(books, null, 2), (err) => {
            if (err) throw err;
            res.status(201).send('Book added');
        });
    });
});

app.get('/api/books', (req, res) => {
    const { search = '', category = 'all' } = req.query;
    fs.readFile(booksFile, (err, data) => {
        if (err) throw err;
        let books = JSON.parse(data);

        if (category !== 'all') {
            books = books.filter(book => book.category.toLowerCase() === category.toLowerCase());
        }

        if (search) {
            books = books.filter(book => 
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase()) ||
                book.subject.toLowerCase().includes(search.toLowerCase())
            );
        }

        res.json(books);
    });
});

// Fallback to index.html for any other requests (Single Page Application setup)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
