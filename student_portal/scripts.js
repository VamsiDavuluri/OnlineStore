document.addEventListener('DOMContentLoaded', () => {
    const sellForm = document.getElementById('sell-form');
    const booksContainer = document.getElementById('books');
    const searchInput = document.getElementById('search');



    if (booksContainer) {
        const fetchBooks = async (query = '', category = 'all') => {
            const response = await fetch(`/api/books?search=${query}&category=${category}`);
            const books = await response.json();
            booksContainer.innerHTML = '';
            books.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book-item');
                bookDiv.innerHTML = `
                    <img src="${book.image}" alt="${book.title}">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p>Price: ₹${book.price}</p>
                    <p class="seller">Seller: ${book.sellerName}</p>
                    <p class="phone">Phone: ${book.phone}</p>
                    <button>Add to Cart</button>
                `;
                booksContainer.appendChild(bookDiv);
            });
        };
    
        searchInput.addEventListener('input', () => {
            fetchBooks(searchInput.value);
        });
    
        categoryLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const category = event.target.getAttribute('data-category');
                fetchBooks(searchInput.value, category);
            });
        });
    
        fetchBooks();
    }

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const books = booksContainer.querySelectorAll('.book');
            books.forEach(book => {
                const title = book.querySelector('h3').textContent.toLowerCase();
                const author = book.querySelector('p:first-of-type').textContent.toLowerCase();
                const subject = book.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
                if (title.includes(query) || author.includes(query) || subject.includes(query)) {
                    book.style.display = '';
                } else {
                    book.style.display = 'none';
                }
            });
        });
    }
);


