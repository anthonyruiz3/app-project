
function loadCoins() {
    let savedCoins = localStorage.getItem("userCoins");
    
    if (savedCoins) {
        // If coins exist in storage, use them
        return parseInt(savedCoins);
    } else {
        // If no coins saved, start with 0
        return 0;
    }
}

// Save coins to local storage
function saveCoins(coins) {
    localStorage.setItem("userCoins", coins);
}

// Get current coins
let userCoins = loadCoins();

// Update the coin display on the page
function updateCoinDisplay() {
    document.getElementById("shop-currency-display").innerText = userCoins;
}

// Buy an item
function buyItem(cost, itemName) {
    if (userCoins >= cost) {
        // User has enough coins
        userCoins = userCoins - cost;
        saveCoins(userCoins);
        updateCoinDisplay();
        alert("You bought " + itemName + "! You have " + userCoins + " coins left.");
    } else {
        // Not enough coins
        let needed = cost - userCoins;
        alert("Not enough coins! You need " + needed + " more coins to buy " + itemName + ".");
    }
}

// Buy an item
function buyItem(cost, itemName) {
    if (userCoins >= cost) {
        userCoins = userCoins - cost;
        saveCoins(userCoins);
        updateCoinDisplay();
        
        // Check which item was bought
        if (itemName === "Dark Theme") {
            activateDarkTheme();
        }
        
        alert("You bought " + itemName + "! You have " + userCoins + " coins left.");
    } else {
        let needed = cost - userCoins;
        alert("Not enough coins! You need " + needed + " more coins to buy " + itemName + ".");
    }
}

// Activate dark theme
function activateDarkTheme() {
    localStorage.setItem("darkTheme", "true");
    applyDarkTheme();
}

// Apply dark theme styles
function applyDarkTheme() {
    document.body.style.backgroundColor = "#1a1a1a";
    
    let header = document.querySelector(".header");
    header.style.backgroundColor = "#2d2d2d";
    
    let shopItems = document.querySelectorAll(".shop-item");
    for (let i = 0; i < shopItems.length; i++) {
        shopItems[i].style.backgroundColor = "#2d2d2d";
        shopItems[i].style.color = "#ffffff";
    }
    
    let shopContainer = document.querySelector(".shop-container h2");
    shopContainer.style.color = "#ffffff";
}

// Check if dark theme is active when page loads
function checkDarkTheme() {
    let darkThemeActive = localStorage.getItem("darkTheme");
    if (darkThemeActive === "true") {
        applyDarkTheme();
    }
}

// Call this when page loads
checkDarkTheme();


// Show coins when page loads
updateCoinDisplay();
