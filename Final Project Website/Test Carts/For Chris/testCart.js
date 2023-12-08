// Menu Items
const menuItems = [
    { name: 'Borgar', price: 11.50, quantity: 0 },
    { name: 'Spensive Fries', price: 15, quantity: 0 },
    { name: '$20 Tip Because youre nice :-) ', price: 20, quantity: 0 },
    
];

document.addEventListener('DOMContentLoaded', function () {
    const menuContainer = document.querySelector('.menu-container');
    const cartContainer = document.querySelector('.cart-container');

    // Function to render the menu
    function renderMenu() {
        menuContainer.innerHTML = '';
        menuItems.forEach(item => {
            const menuItemDiv = document.createElement('div');
            menuItemDiv.innerHTML = `
                <p>${item.name} - $${item.price}</p>
                <button onclick="addToCart('${item.name}')">Add to Cart</button>
            `;
            menuContainer.appendChild(menuItemDiv);
        });
    }

    // Function to render the cart
    function renderCart() {
        cartContainer.innerHTML = '';
        const cartItems = menuItems.filter(item => item.quantity > 0);
        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.innerHTML = `
                <p>${item.name} - $${item.price} - Quantity: ${item.quantity}</p>
            `;
            cartContainer.appendChild(cartItemDiv);
        });
    }

    // Function to add an item to the cart
    window.addToCart = function (itemName) {
        const selectedItem = menuItems.find(item => item.name === itemName);
        if (selectedItem) {
            selectedItem.quantity += 1;
            renderCart();
        }
    };

    // Initial render
    renderMenu();
    renderCart();
});