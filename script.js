console.log("Script started");

function loadCoins() {
    let savedCoins = localStorage.getItem("userCoins");
    return savedCoins ? parseInt(savedCoins) : 0;
}

function saveCoins(coins) {
    localStorage.setItem("userCoins", coins);
}

let presetGoals =  [
    {
        name: "Drink 8 glasses of water",
        target: 8,
        current: 0,
        reward: 10
    },
    {
        name: "Do 10 pushups", 
        target: 10,
        current: 0,
        reward: 15
    },
    {
        name: "Walk 10,000 steps",
        target: 10000,
        current: 0,
        reward: 20
    },
    {
        name: "Read for 30 minutes",
        target: 30,
        current: 0,
        reward: 12
    },
    {
        name: "Sleep 8 hours",
        target: 8,
        current: 0,
        reward: 10
    }
];

let userCoins = loadCoins();
let completedToday = 0;


function updateStats() {
    document.getElementById("currency-display").innerText = userCoins;
    document.getElementById("completed-today").innerText = completedToday;
    document.getElementById("total-coins").innerText = userCoins;
    saveCoins(userCoins); 
}



function applyDarkTheme() {
    document.body.style.backgroundColor = "#1a1a1a";
    
    let header = document.querySelector(".header");
    header.style.backgroundColor = "#2d2d2d";
    
    let statsCards = document.querySelectorAll(".stat-card");
    for (let i = 0; i < statsCards.length; i++) {
        statsCards[i].style.backgroundColor = "#2d2d2d";
        statsCards[i].style.color = "#ffffff";
    }
    
    let goalsDashboard = document.querySelector(".goals-dashboard h2");
    goalsDashboard.style.color = "#ffffff";
    
    let addGoalSection = document.querySelector(".add-goal-section");
    addGoalSection.style.backgroundColor = "#2d2d2d";
    addGoalSection.style.color = "#ffffff";
}


function checkDarkTheme() {
    let darkThemeActive = localStorage.getItem("darkTheme");
    if (darkThemeActive === "true") {
        applyDarkTheme();
    }
}


checkDarkTheme();



function showConfetti() {
    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement("div");
        confetti.innerText = "🎉";
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.top = "-10px";
        confetti.style.fontSize = "20px";
        confetti.style.pointerEvents = "none";
        
        document.body.appendChild(confetti);
        
        let fallSpeed = Math.random() * 3 + 2;
        let moveConfetti = function() {
            let currentTop = parseInt(confetti.style.top);
            confetti.style.top = currentTop + fallSpeed + "px";
            
            if (currentTop > window.innerHeight) {
                document.body.removeChild(confetti);
            } else {
                setTimeout(moveConfetti, 20);
            }
        };
        
        setTimeout(moveConfetti, i * 10);
    }
}


function showGoals() {
    let goalsGrid = document.getElementById("goals-grid");
    
    for (let i = 0; i < presetGoals.length; i++) {
        let goal = presetGoals[i];
        
        let goalBox = document.createElement("div");
        goalBox.style.backgroundColor = "white";
        goalBox.style.padding = "20px";
        goalBox.style.borderRadius = "12px";
        goalBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        goalBox.style.display = "flex";
        goalBox.style.justifyContent = "space-between";
        goalBox.style.alignItems = "center";
        
        let goalText = document.createElement("span");
        goalText.innerText = goal.name + " (" + goal.current + "/" + goal.target + ")";
        goalText.style.fontSize = "18px";
        
        let addButton = document.createElement("button");
        addButton.innerText = "+1";
        
        addButton.addEventListener("click", function() {
            if (goal.current < goal.target) {
                goal.current = goal.current + 1;
                goalText.innerText = goal.name + " (" + goal.current + "/" + goal.target + ")";
                
                if (goal.current === goal.target) {
                    showConfetti();
                    userCoins = userCoins + goal.reward;
                    completedToday = completedToday + 1;
                    updateStats();
                    alert("Goal completed! You earned " + goal.reward + " coins!");
                }
            }
        });
        
        goalBox.appendChild(goalText);
        goalBox.appendChild(addButton);
        goalsGrid.appendChild(goalBox);
    }
}


showGoals();
updateStats();

function showGoals() {
    let goalsGrid = document.getElementById("goals-grid");
    
    for (let i = 0; i < presetGoals.length; i++) {
        let goal = presetGoals[i];
        
       
        let goalBox = document.createElement("div");
        goalBox.style.backgroundColor = "white";
        goalBox.style.padding = "20px";
        goalBox.style.borderRadius = "12px";
        goalBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        goalBox.style.display = "flex";
        goalBox.style.justifyContent = "space-between";
        goalBox.style.alignItems = "center";
        
        
        let goalText = document.createElement("span");
        goalText.innerText = goal.name + " (" + goal.current + "/" + goal.target + ")";
        goalText.style.fontSize = "18px";
        
        
        let buttonContainer = document.createElement("div");
        
       
        if (goal.name.includes("Read") || goal.name.includes("Sleep")) {
            
            let doneButton = document.createElement("button");
            doneButton.innerText = "Done";
            doneButton.style.backgroundColor = "#2196F3"; 
            
            doneButton.addEventListener("click", function() {
                
                updateGoal(goal, goalText, goal.target);
            });
            
            buttonContainer.appendChild(doneButton);
            
        } else if (goal.target >= 1000) {
            
            let add100Button = document.createElement("button");
            add100Button.innerText = "+100";
            add100Button.addEventListener("click", function() {
                updateGoal(goal, goalText, 100);
            });
            
            let add1000Button = document.createElement("button");
            add1000Button.innerText = "+1000";
            add1000Button.addEventListener("click", function() {
                updateGoal(goal, goalText, 1000);
            });
            
            buttonContainer.appendChild(add100Button);
            buttonContainer.appendChild(add1000Button);
            
        } else {
            
            let addButton = document.createElement("button");
            addButton.innerText = "+1";
            addButton.addEventListener("click", function() {
                updateGoal(goal, goalText, 1);
            });
            buttonContainer.appendChild(addButton);
        }
        
        
        goalBox.appendChild(goalText);
        goalBox.appendChild(buttonContainer);
        goalsGrid.appendChild(goalBox);
    }
}


function updateGoal(goal, goalText, amount) {
    if (goal.current < goal.target) {
        goal.current = Math.min(goal.current + amount, goal.target);
        goalText.innerText = goal.name + " (" + goal.current + "/" + goal.target + ")";
        
        if (goal.current === goal.target) {
            showConfetti();
            userCoins = userCoins + goal.reward;
            completedToday = completedToday + 1;
            updateStats();
            alert("Goal completed! You earned " + goal.reward + " coins!");
        }
    }
}


function addCustomGoal() {
  
    let goalName = document.getElementById("goal-name").value;
    let goalTarget = document.getElementById("goal-target").value;
    
    
    if (goalName && goalTarget) {
        
        let newGoal = {
            name: goalName,
            target: parseInt(goalTarget), 
            current: 0,
            reward: 10 
        };
        
       
        presetGoals.push(newGoal);
        
       
        document.getElementById("goal-name").value = "";
        document.getElementById("goal-target").value = "";
        
       
        refreshGoalsDisplay();
        
        alert("Goal added successfully!");
    } else {
        alert("fill in the amount and goal");
    }
}


function refreshGoalsDisplay() {
    
    let goalsGrid = document.getElementById("goals-grid");
    goalsGrid.innerHTML = "";
    

    showGoals();
}


document.getElementById("add-goal-btn").addEventListener("click", addCustomGoal);


function saveGoals() {
    localStorage.setItem("presetGoals", JSON.stringify(presetGoals));
}


function loadGoals() {
    let savedGoals = localStorage.getItem("presetGoals");
    
    if (savedGoals) {
        return JSON.parse(savedGoals);
    } else {
       
        return [
            {
                name: "Drink 8 glasses of water",
                target: 8,
                current: 0,
                reward: 10
            },
            {
                name: "Do 10 pushups", 
                target: 10,
                current: 0,
                reward: 15
            },
            {
                name: "Walk 10,000 steps",
                target: 10000,
                current: 0,
                reward: 20
            },
            {
                name: "Read for 30 minutes",
                target: 30,
                current: 0,
                reward: 12
            },
            {
                name: "Sleep 8 hours",
                target: 8,
                current: 0,
                reward: 10
            }
        ];
    }
}

function resetApp() {
    localStorage.clear();
    location.reload();
}

function resetApp() {
    if (confirm("Are you sure? This will delete ALL your progress and coins!")) {
        localStorage.clear();
        location.reload();
    }
}

let goalPack1 = [
    {name: "Meditate for 10 minutes", target: 10, current: 0, reward: 12},
    {name: "Eat 5 servings of fruits/vegetables", target: 5, current: 0, reward: 15},
    {name: "Study for 45 minutes", target: 45, current: 0, reward: 18}
];


