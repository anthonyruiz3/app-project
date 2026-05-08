
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

// Show coins when page loads
updateCoinDisplay();
