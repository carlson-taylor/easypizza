document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    let data;

    fetch("db.json")
        .then((response) => response.json())
        .then((jsonData) => {
            data = jsonData;

            const menu = document.getElementById("menu");
            data.pizzas.forEach((pizza) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <img src="${pizza.image}" alt="${pizza.name}">
                    <h3>${pizza.name}</h3>
                    <p>$${pizza.price}</p>
                    <button class="add-to-cart-btn" data-id="${pizza.id}">Add to Cart</button>
                `;
                menu.appendChild(card);
            });

            const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
            addToCartButtons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    const pizzaId = parseInt(button.getAttribute("data-id"));
                    addToCart(pizzaId);
                    button.disabled = true;
                    button.textContent = "Added to Cart";
                });
            });
        });

    function addToCart(pizzaId) {
        if (!data) {
            console.error("Data not loaded yet");
            return;
        }

        const pizza = data.pizzas.find((pizza) => pizza.id === pizzaId);
        if (pizza) {
            console.log(pizza)
            cart.push(pizza);
            displayCart();
        } else {
            console.error("Pizza not found");
        }
    }

    function removeFromCart(pizzaId) {
        const index = cart.findIndex((item) => item.id === pizzaId);
        if (index !== -1) {
            cart.splice(index, 1);
            displayCart();
        }
    }

    function displayCart() {
        console.log("Displaying Cart",cart)
        const cartContainer = document.getElementById("cart");
        cartContainer.innerHTML = "";

        cart.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.classList.add("card");
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price}</p>
                <button class="remove-from-cart" data-id="${item.id}">Remove from Cart</button>
            `;
            cartContainer.appendChild(cartItem);
            const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
            removeFromCartButtons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    const pizzaId = parseInt(button.getAttribute("data-id"));
                    removeFromCart(pizzaId);
                    
                });
            });

        });
    }

    document.getElementById("checkoutLink").addEventListener("click", () => {
        document.getElementById("checkoutForm").style.display = "block";
    });

    document.getElementById("checkoutFormFields").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        console.log(formDataObject);
        this.reset();
        document.getElementById("checkoutForm").style.display = "none";
    });
});