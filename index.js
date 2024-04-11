document.addEventListener("DOMContentLoaded", function() {
    // Cart array to store items
    let cart = [];
    let data; // Global variable to hold pizza data

    // Fetch data from db.json
    fetch('db.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData; // Assign the fetched data to the global variable

            // Generate menu cards
            const menu = document.getElementById('menu');
            data.pizzas.forEach(pizza => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${pizza.image}" alt="${pizza.name}">
                    <h3>${pizza.name}</h3>
                    <p>$${pizza.price}</p>
                    <button onclick="addToCart(${JSON.stringify(pizza)})">Add to Cart</button>
                `;
                menu.appendChild(card);
            });
        });

    // Function to add item to cart
    function addToCart(pizza) {
        // Add the pizza to the cart array
        cart.push(pizza);

        // Update the cart display
        displayCart();
    }

    // Function to remove item from cart
    function removeFromCart(pizzaId) {
        // Find index of item in cart array
        const index = cart.findIndex(item => item.id === pizzaId);
        
        // Remove item from cart array
        if (index !== -1) {
            cart.splice(index, 1);
        }

        // Update the cart display
        displayCart();
    }

    // Function to display cart items
    function displayCart() {
        const cartContainer = document.getElementById('cart');
        cartContainer.innerHTML = ''; // Clear previous content
        
        // Display each item in the cart
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price}</p>
                <button onclick="removeFromCart(${item.id})">Remove from Cart</button>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    // Checkout link functionality
    document.getElementById('checkoutLink').addEventListener('click', () => {
        document.getElementById('checkoutForm').style.display = 'block';
    });

    // Checkout form submission
    document.getElementById('checkoutFormFields').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve form data
        const formData = new FormData(this);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        
        // Process the form data (e.g., validate, send to server)
        console.log(formDataObject);

        // Reset form fields
        this.reset();

        // Optionally, hide the form after submission
        document.getElementById('checkoutForm').style.display = 'none';
    });
});
