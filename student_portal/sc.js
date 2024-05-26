document.addEventListener('DOMContentLoaded', function () {
    const categoryLinks = document.querySelectorAll('nav ul li a');
    const books = document.querySelectorAll('.book');

    categoryLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const category = event.target.getAttribute('data-category');

            books.forEach(book => {
                if (category === 'all' || book.getAttribute('data-category') === category) {
                    book.style.display = 'block';
                } else {
                    book.style.display = 'none';
                }
            });
        });
    });

    document.getElementById('checkoutButton').addEventListener('click', function () {
        window.location.href = 'payment.html';
    });
});

let cart = [];
function addToCart(title, price) {
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const newItem = document.createElement('li');
    newItem.textContent = `${title} - ₹${price}`;
    cartItems.appendChild(newItem);
    cart.push(price);

    const totalPrice = cart.reduce((total, item) => total + item, 0);
    totalPriceElement.textContent = totalPrice;
}
