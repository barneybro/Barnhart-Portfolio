
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

        // Add an H2 element for the category
        const categoryHeading = document.createElement('h2');
        categoryHeading.textContent = categoryName;
        categoryHeading.classList.add('category');
        menuContainer.appendChild(categoryHeading);

        // Generate menu items for the category
        category.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('item-container');

            menuItem.innerHTML = `
                <ul class="menu-block">
                    <li class="menu-item">
                        <span>${item.name}</span>
                        <span>$${item.price.toFixed(2)}<button class="pushable-add"><span class="front-add"> + </span></button></span> 
                    </li>
                </ul>
            `;

            menuItem.querySelector('.pushable-add').addEventListener('click', () => addToCart(item.name, item.price));
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
            const price = parseFloat(item.textContent.match(/\$\d+(\.\d{1,2})?/)[0].slice(1)); // Locates the price of the item through the array to the 2nd decimal place.
            
            totalValue += price;
        });

        // Round the total value to two decimal places
        totalValue = parseFloat(totalValue.toFixed(2));

        // Tells the HTML what number to show for the total value
        totalValueElement.textContent = totalValue.toFixed(2);
    }

    // Generate the menu for each category
    generateMenu(appetizers, 'menu', 'Appetizers');
    generateMenu(tacos, 'menu', 'Tacos');
    generateMenu(entrees, 'menu', 'Entrees');
    generateMenu(desserts, 'menu', 'Desserts');
    generateMenu(drinks, 'menu', 'Drinks');
    
});


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

function addItem() {
    const category = document.getElementById('category').value;
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (category && itemName && !isNaN(itemPrice)) {
        const result = findItem(category, itemName, itemPrice);

        if (result.found) {
            if (result.differentPrice) {
                // Removes the existing item with a different price and changes the price to the new value
                category.splice(result.index, 1);
                addNewItem(category, itemName, itemPrice);
            } else {
                // Item added is identical to an existing item.
                alert('Error. This item already exists.');
            }
        } else {
            // Add a new item to the selected category
            addNewItem(category, itemName, itemPrice);
        }

        updateMenu();
    }

    // Resets the input values to default after adding an item
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
}

function addNewItem(category, itemName, itemPrice) {
    const newItem = { name: itemName, price: itemPrice };
    category.push(newItem);
}

// Function to remove an item from a category
function removeItem(category, index) {
    category.splice(index, 1);
    updateMenu();
}

function updateMenu() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = '';

    // Array of categories
    const categories = [appetizers, tacos, entrees, desserts, drinks];

    categories.forEach((categoryArray, categoryIndex) => {
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'menu-category';

        const categoryHeader = document.createElement('h3');
        categoryHeader.className = 'category-header';
        categoryHeader.textContent = getCategoryName(categoryIndex);
        categoryContainer.appendChild(categoryHeader);

        const categoryItemsContainer = document.createElement('div');
        categoryItemsContainer.className = 'category-items';

        categoryArray.forEach((item, index) => {
            const menuItemElement = document.createElement('div');
            menuItemElement.className = 'menu-item-manager';
            menuItemElement.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="dotted-line"></div>
                <div class="price">$${item.price.toFixed(2)}</div>
                <span class="delete-icon" onclick="removeItem(categories[${categoryIndex}], ${index})">&#10006;</span>
            `;
            categoryItemsContainer.appendChild(menuItemElement);
        });

        categoryContainer.appendChild(categoryItemsContainer);
        menuContainer.appendChild(categoryContainer);
    });
}

function findItem(category, itemName, itemPrice) {
    const index = category.findIndex(item => item.name === itemName);
    const found = index !== -1;
    const differentPrice = found && category[index].price !== itemPrice;
    return { index, found, differentPrice };
}

// Function to get category name based on index
function getCategoryName(index) {
    const categoryNames = ['Appetizers', 'Tacos', 'Entrees', 'Desserts', 'Drinks'];
    return categoryNames[index];
}

// Initial update
updateMenu();





















        





const login = [
    {
        "username": "admin",
        "password": "admin"
    },
];

