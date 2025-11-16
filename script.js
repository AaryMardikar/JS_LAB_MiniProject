/* --------------------------------------
 PRACTICAL 1: JS SETUP + console Methods
--------------------------------------- */
/* --------------------------------------
 Single, consistent script for the app
--------------------------------------- */
console.log("Fitness Pro App Loaded");       // Practical 1 console.log
console.error("No Errors Found Yet!");       // Practical 1 console.error
console.table(["Home", "Diet", "Workout", "Dashboard"]); // Practical 1 console.table
console.trace("Trace Example Loaded");       // Practical 1 console.trace


/* --------------------------------------
 PRACTICAL 2: Variables + ES6 Features
--------------------------------------- */
let theme = "dark";  // let
const APP_NAME = "FITNESS PRO";  // const

// Practical 6 Helper — also shows ES6 function + string replace
function escapeHtml(unsafe) {
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* --------------------------------------
 PRACTICAL 10: JSON Handling + fetch()
--------------------------------------- */
function loadDiet(category) {
    fetch("data.json") // Practical 10 fetch
        .then(res => res.json()) // Practical 10 JSON parsing
        .then(data => {
            let result = data.filter(d => d.category === category); // Practical 5 filter
            let box = document.getElementById("dietContainer");
            if (!box) return;
            box.innerHTML = "";

            result.forEach(d => { // Practical 5 forEach
                box.innerHTML += `
                    <div class='diet-card'>
                        <h3>${d.category}</h3>
                        <p>Breakfast: ${d.breakfast}</p>
                        <p>Lunch: ${d.lunch}</p>
                        <p>Dinner: ${d.dinner}</p>
                    </div>
                `;
            });
        })
        .catch(err => {
            const box = document.getElementById("dietContainer");
            if (box) box.innerText = "Unable to load diet data.";
            console.error(err);
        });
}


/* --------------------------------------
 PRACTICAL 7: DOMContentLoaded + DOM Traversal
--------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------------
     PRACTICAL 8: Form Handling + Validation
    --------------------------------------- */
    const gymForm = document.getElementById("gymForm");
    if (gymForm) {
        gymForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value;
            let age = Number(document.getElementById("age").value);

            const msgEl = document.getElementById("formMessage");

            // Practical 3: Conditionals + Validation
            if (name === "" || !age || age <= 0) {
                if (msgEl) msgEl.innerText = "Invalid Input!";
                return;
            }

            if (age < 15) {
                if (msgEl) msgEl.innerText = "Minimum age is 15!";
                return;
            }

            /* --------------------------------------
             PRACTICAL 9: LocalStorage
            --------------------------------------- */
            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userAge", age);

            if (msgEl) msgEl.innerText = "Form Submitted Successfully!";
        });
    }


    /* --------------------------------------
     PRACTICAL 4: Functions + Error Handling (BMI)
    --------------------------------------- */
    const bmiBtn = document.getElementById("bmiBtn");
    const bmiResultEl = document.getElementById("bmiResult");

    function calculateBMI() {
        try {
            const wEl = document.getElementById("weight");
            const hEl = document.getElementById("height");
            if (!wEl || !hEl) return;

            let w = parseFloat(wEl.value);
            let h = parseFloat(hEl.value);

            if (Number.isNaN(w) || Number.isNaN(h) || w <= 0 || h <= 0) {
                if (bmiResultEl) bmiResultEl.innerText = "Enter valid positive numbers for weight and height.";
                return;
            }

            // Practical 3 Loop/Condition Logic
            if (h > 3) h = h / 100;

            const bmi = w / (h * h);

            if (bmiResultEl) bmiResultEl.innerText = `Your BMI: ${bmi.toFixed(2)}`;

            localStorage.setItem("bmi", bmi.toFixed(2)); // Practical 9
        }
        catch (err) {
            if (bmiResultEl) bmiResultEl.innerText = String(err);
        }
    }
    if (bmiBtn) bmiBtn.addEventListener("click", calculateBMI);
    window.calculateBMI = calculateBMI;


    /* --------------------------------------
     PRACTICAL 5: Arrays + reduce()
    --------------------------------------- */
    function calculateCalories() {
        const c1 = Number(document.getElementById("cal1")?.value || 0);
        const c2 = Number(document.getElementById("cal2")?.value || 0);
        const c3 = Number(document.getElementById("cal3")?.value || 0);

        const arr = [c1, c2, c3]; // Practical 5 array

        const total = arr.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0); // Practical 5 reduce

        const out = document.getElementById("calorieOutput");
        if (out) out.innerText = `Total Calories: ${total}`;

        localStorage.setItem("calories", total); // Practical 9
    }

    const calBtn = document.getElementById("calBtn");
    if (calBtn) calBtn.addEventListener("click", calculateCalories);
    window.calculateCalories = calculateCalories;


    /* --------------------------------------
     PRACTICAL 6: RegEx + String Methods (Diet Search)
    --------------------------------------- */
    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            const inp = document.getElementById("searchInput");
            if (!inp) return;

            let input = inp.value.trim();

            if (input === "") {
                alert("Please enter a category to search.");
                return;
            }

            let regex = /^[a-zA-Z-]+$/; // Practical 6 regex
            if (!regex.test(input)) {
                alert("Enter valid text only (letters and hyphen).");
                return;
            }

            loadDiet(input.toLowerCase()); // Practical 10 fetch
        });
    }


    /* --------------------------------------
     PRACTICAL 7: DOM Manipulation (Workout To-do)
    --------------------------------------- */
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    function addTask() {
        if (!taskInput || !taskList) return;

        const task = taskInput.value.trim();
        if (task === "") return;

        const li = document.createElement("li"); // createElement() – Practical 7
        li.innerHTML = `
            <span class="task-text">${escapeHtml(task)}</span>
            <span class="task-actions">
                <button class="edit-btn action-btn" type="button">✏️</button>
                <button class="delete-btn action-btn" type="button">❌</button>
            </span>
        `;

        taskList.appendChild(li); // appendChild() – Practical 7
        taskInput.value = "";
    }

    if (addTaskBtn) addTaskBtn.addEventListener("click", addTask);
    window.addTask = addTask;

    // Practical 7 (Event Delegation)
    if (taskList) {
        taskList.addEventListener("click", (e) => {
            const el = e.target;

            if (el.classList.contains("delete-btn")) {
                const li = el.closest("li");
                if (li) li.remove();  // Practical 7 remove()
                return;
            }

            if (el.classList.contains("edit-btn")) {
                const li = el.closest("li");
                if (!li) return;

                const textEl = li.querySelector('.task-text');
                const current = textEl ? textEl.textContent.trim() : '';
                const newTask = prompt("Edit Task:", current);

                if (newTask !== null && textEl)
                    textEl.textContent = newTask.trim();
            }
        });
    }


    /* --------------------------------------
     PRACTICAL 9: LocalStorage Dashboard Data
    --------------------------------------- */
    const userInfoEl = document.getElementById("userInfo");
    if (userInfoEl)
        userInfoEl.innerText = `${localStorage.getItem("userName") || ''} (${localStorage.getItem("userAge") || ''})`;

    const savedBMIEl = document.getElementById("savedBMI");
    if (savedBMIEl)
        savedBMIEl.innerText = localStorage.getItem("bmi") || "Not calculated yet";

    const savedCaloriesEl = document.getElementById("savedCalories");
    if (savedCaloriesEl)
        savedCaloriesEl.innerText = localStorage.getItem("calories") || "Not calculated";


    /* --------------------------------------
     PRACTICAL 11: Timer + setInterval()
    --------------------------------------- */
    const startTimerBtn = document.getElementById("startTimer");
    if (startTimerBtn) {
        startTimerBtn.addEventListener("click", () => {
            let time = 10;
            let display = document.getElementById("timerDisplay");

            let timer = setInterval(() => { // Practical 11 setInterval
                if (display) display.innerText = `${time}s remaining`;
                time--;

                if (time < 0) {
                    clearInterval(timer);  // Practical 11 clearInterval
                    alert("Time's Up!");
                }
            }, 1000);
        });
    }
});


/* --------------------------------------
 PRACTICAL 11 (Fallback Timer Handling)
--------------------------------------- */
document.getElementById("startTimer")?.addEventListener("click", () => {
    let time = 10;
    let display = document.getElementById("timerDisplay");

    let timer = setInterval(() => {
        if (display) display.innerText = `${time}s remaining`;
        time--;

        if (time < 0) {
            clearInterval(timer);
            alert("Time's Up!");
        }
    }, 1000);
});
