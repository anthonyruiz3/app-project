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


// Confetti function
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

// Show goals in vertical boxes
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

// Start the app
showGoals();
updateStats();

function showGoals() {
    let goalsGrid = document.getElementById("goals-grid");
    
    for (let i = 0; i < presetGoals.length; i++) {
        let goal = presetGoals[i];
        
        // Create the main container for each goal
        let goalBox = document.createElement("div");
        goalBox.style.backgroundColor = "white";
        goalBox.style.padding = "20px";
        goalBox.style.borderRadius = "12px";
        goalBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        goalBox.style.display = "flex";
        goalBox.style.justifyContent = "space-between";
        goalBox.style.alignItems = "center";
        
        // Create the text that shows goal progress
        let goalText = document.createElement("span");
        goalText.innerText = goal.name + " (" + goal.current + "/" + goal.target + ")";
        goalText.style.fontSize = "18px";
        
        // Create container to hold all buttons
        let buttonContainer = document.createElement("div");
        
        // Check what type of goal this is and create appropriate buttons
        if (goal.name.includes("Read") || goal.name.includes("Sleep")) {
            // For reading/sleeping - create "Done" button
            let doneButton = document.createElement("button");
            doneButton.innerText = "Done";
            doneButton.style.backgroundColor = "#2196F3"; // Blue color
            
            doneButton.addEventListener("click", function() {
                // Set current to equal target (marks as complete)
                updateGoal(goal, goalText, goal.target);
            });
            
            buttonContainer.appendChild(doneButton);
            
        } else if (goal.target >= 1000) {
            // For big numbers like steps
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
            // For smaller numbers like water glasses
            let addButton = document.createElement("button");
            addButton.innerText = "+1";
            addButton.addEventListener("click", function() {
                updateGoal(goal, goalText, 1);
            });
            buttonContainer.appendChild(addButton);
        }
        
        // Add everything to the page
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

// Function to add custom goals
function addCustomGoal() {
    // Get the values from the input fields
    let goalName = document.getElementById("goal-name").value;
    let goalTarget = document.getElementById("goal-target").value;
    
    // Check if both fields have values
    if (goalName && goalTarget) {
        // Create a new goal object
        let newGoal = {
            name: goalName,
            target: parseInt(goalTarget), // Convert text to number
            current: 0,
            reward: 10 // Give 10 coins for custom goals
        };
        
        // Add the new goal to our goals array
        presetGoals.push(newGoal);
        
        // Clear the input fields
        document.getElementById("goal-name").value = "";
        document.getElementById("goal-target").value = "";
        
       
        refreshGoalsDisplay();
        
        alert("Goal added successfully!");
    } else {
        alert("fill in the amount and goal");
    }
}


function refreshGoalsDisplay() {
    // Clear the current goals
    let goalsGrid = document.getElementById("goals-grid");
    goalsGrid.innerHTML = "";
    

    showGoals();
}


document.getElementById("add-goal-btn").addEventListener("click", addCustomGoal);

// Save goals to local storage
function saveGoals() {
    localStorage.setItem("presetGoals", JSON.stringify(presetGoals));
}

// Load goals from local storage
function loadGoals() {
    let savedGoals = localStorage.getItem("presetGoals");
    
    if (savedGoals) {
        return JSON.parse(savedGoals);
    } else {
        // Return default goals if nothing saved
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

