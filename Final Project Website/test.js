document.addEventListener('DOMContentLoaded', function () {
    // Sample menu items in different categories
    const appetizers = [
        { name: 'Onion Rings', price: 8 },
        { name: 'Mozzarella Sticks', price: 6 },
    ];

    const tacos = [
        { name: 'Taco Salad', price: 8 },
        { name: 'Taco Supreme', price: 10 },
    ];

    const entrees = [
        { name: 'Salmon Ravioli', price: 12 },
        { name: 'Chicken Chicken Chicken What Combo Are you Pickin\'', price: 15 },
    ];

    const desserts = [
        { name: 'Salmon Dessert', price: 7.99 },
        { name: 'Chocolate Surprise', price: 5.85 },
    ];

    const drinks = [
        { name: 'Soda', price: 2 },
        { name: 'Iced Tea', price: 3 },
        { name: 'Raspberry Lemonade', price: 2.50 },
    ];



    // Function to generate the menu based on category
    function generateMenu(category, containerId, categoryName) {
        const menuContainer = document.getElementById(containerId);

        // Add an H1 element for the category
        const categoryHeading = document.createElement('h1');
        categoryHeading.textContent = categoryName;
        menuContainer.appendChild(categoryHeading);

        // Generate menu items for the category
        category.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.innerHTML = `
                <p>${item.name} - $${item.price}</p>
                <button class="addToCartBtn">Add to Cart</button>
            `;
            menuItem.querySelector('.addToCartBtn').addEventListener('click', () => addToCart(item.name, item.price));
            menuContainer.appendChild(menuItem);
        });
    }

    // Function to add an item to the cart
    function addToCart(name, price) {
        const cartItemsContainer = document.getElementById('cart-items');
        
        // Check if the item is already in the cart
        const existingCartItem = Array.from(cartItemsContainer.children).find(item => item.dataset.name === name);

        if (existingCartItem) {
            // If the item is already in the cart, increment quantity
            existingCartItem.dataset.quantity = parseInt(existingCartItem.dataset.quantity) + 1;
            existingCartItem.textContent = `${name} x${existingCartItem.dataset.quantity} - $${price * existingCartItem.dataset.quantity}`;
        } else {
            // If the item is not in the cart, add a new item
            const cartItem = document.createElement('li');
            cartItem.dataset.name = name;
            cartItem.dataset.quantity = 1;
            cartItem.textContent = `${name} x${cartItem.dataset.quantity} - $${price * cartItem.dataset.quantity}`;
            cartItemsContainer.appendChild(cartItem);
        }

        // Update total value
        updateTotalValue();
    }

    // Function to list the total value of items in the cart
    function updateTotalValue() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalValueElement = document.getElementById('total-value');

        let totalValue = 0;

        // Calculate total value by iterating through cart items
        Array.from(cartItemsContainer.children).forEach(item => {
            const price = parseInt(item.textContent.match(/\$\d+/)[0].slice(1)); // Finds the price through the text in the array.
            
            totalValue += price;
        });

        // Tells the HTML what number to generate for the total value
        totalValueElement.textContent = totalValue;
    }

    // Generate the menu for each category
    generateMenu(appetizers, 'menu', 'Appetizers');
    generateMenu(tacos, 'menu', 'Tacos');
    generateMenu(entrees, 'menu', 'Entrees');
    generateMenu(desserts, 'menu', 'Desserts');
    generateMenu(drinks, 'menu', 'Drinks');
    
});
