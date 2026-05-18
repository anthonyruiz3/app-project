console.log("Script started");

function loadCoins() {
    let savedCoins = localStorage.getItem("userCoins");
    
    if (savedCoins) {
        return parseInt(savedCoins);
    } else {
        return 0;
    }
}

function saveCoins(coins) {
    localStorage.setItem("userCoins", coins);
}

let userCoins = loadCoins();

function updateCoinDisplay() {
    document.getElementById("shop-currency-display").innerText = userCoins;
}

let goalPack1 = [
    {name: "Meditate for 10 minutes", target: 10, current: 0, reward: 12},
    {name: "Eat 5 servings of fruits/vegetables", target: 5, current: 0, reward: 15},
    {name: "Study for 45 minutes", target: 45, current: 0, reward: 18},
    {name: "Drink a healthy smoothie", target: 1, current: 0, reward: 10},
    {name: "Practice a hobby for 20 minutes", target: 20, current: 0, reward: 12}
];

function addGoalPack() {
    let currentGoals = localStorage.getItem("presetGoals");
    let goalsArray = currentGoals ? JSON.parse(currentGoals) : [];
    
    for (let i = 0; i < goalPack1.length; i++) {
        goalsArray.push(goalPack1[i]);
    }
    
    localStorage.setItem("presetGoals", JSON.stringify(goalsArray));
}

function buyItem(cost, itemName) {
    if (userCoins >= cost) {
        userCoins = userCoins - cost;
        saveCoins(userCoins);
        updateCoinDisplay();
        
        if (itemName === "Dark Theme") {
            activateDarkTheme();
        }
        
        if (itemName === "New Goal Pack") {
            addGoalPack();
        }
        
        alert("You bought " + itemName + "! You have " + userCoins + " coins left.");
    } else {
        let needed = cost - userCoins;
        alert("Not enough coins! You need " + needed + " more coins to buy " + itemName + ".");
    }
}

function activateDarkTheme() {
    localStorage.setItem("darkTheme", "true");
    applyDarkTheme();
}

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

function checkDarkTheme() {
    let darkThemeActive = localStorage.getItem("darkTheme");
    if (darkThemeActive === "true") {
        applyDarkTheme();
    }
}

checkDarkTheme();
updateCoinDisplay();
