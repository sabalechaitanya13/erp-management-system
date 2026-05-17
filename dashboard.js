/* =========================
   ERP DASHBOARD SCRIPT
========================= */

document.addEventListener(
"DOMContentLoaded",
function(){

initializeDashboard();

}
);

/* =========================
   INITIALIZE
========================= */

function initializeDashboard(){

loadTheme();

setUserName();

loadDashboardData();

loadCurrentDate();

animateCards();

}

/* =========================
   LOAD DASHBOARD DATA
========================= */

function loadDashboardData(){

showLoading(true);

try{

const employees =
JSON.parse(
localStorage.getItem(
"employees"
)
) || [];

const attendance =
JSON.parse(
localStorage.getItem(
"attendance"
)
) || [];

const expenses =
JSON.parse(
localStorage.getItem(
"expenses"
)
) || [];

const inventory =
JSON.parse(
localStorage.getItem(
"inventory"
)
) || [];

const payroll =
JSON.parse(
localStorage.getItem(
"payrollHistory"
)
) || [];

const purchases =
JSON.parse(
localStorage.getItem(
"purchases"
)
) || [];

displayMetrics({

employees,
attendance,
expenses,
inventory,
payroll,
purchases

});

generateRecentActivity(
employees,
expenses,
purchases
);

}
catch(error){

console.error(error);

showToast(
"Failed to load dashboard data",
"error"
);

}
finally{

showLoading(false);

}

}

/* =========================
   DISPLAY METRICS
========================= */

function displayMetrics(data){

const totalEmployees =
data.employees.length;

const presentToday =
data.attendance.filter((record)=>{

return (
record.status &&
record.status.toLowerCase() ===
"present"
);

}).length;

let totalExpense = 0;

data.expenses.forEach((expense)=>{

totalExpense +=
Number(expense.amount || 0);

});

let inventoryValue = 0;

data.inventory.forEach((item)=>{

inventoryValue +=
Number(item.qty || 0) *
Number(item.price || 0);

});

let payrollAmount = 0;

data.payroll.forEach((salary)=>{

payrollAmount +=
Number(salary.netSalary || 0);

});

const purchaseCount =
data.purchases.length;

/* UPDATE HTML */

updateElement(
"employeeCount",
totalEmployees
);

updateElement(
"presentToday",
presentToday
);

updateElement(
"expenseTotal",
"₹" + totalExpense
);

updateElement(
"inventoryValue",
"₹" + inventoryValue
);

updateElement(
"payrollTotal",
"₹" + payrollAmount
);

updateElement(
"purchaseCount",
purchaseCount
);

}

/* =========================
   RECENT ACTIVITY
========================= */

function generateRecentActivity(
employees,
expenses,
purchases
){

const activityContainer =
document.getElementById(
"activityList"
);

if(!activityContainer){
return;
}

activityContainer.innerHTML = "";

/* EMPLOYEES */

employees.slice(-3).forEach((emp)=>{

activityContainer.innerHTML += `

<div class="activity-item animate-slide-up">

👤 New Employee Added:
<strong>${emp.name}</strong>

</div>

`;

});

/* EXPENSES */

expenses.slice(-2).forEach((expense)=>{

activityContainer.innerHTML += `

<div class="activity-item animate-slide-up">

💳 Expense Added:
<strong>₹${expense.amount}</strong>

</div>

`;

});

/* PURCHASES */

purchases.slice(-2).forEach((purchase)=>{

activityContainer.innerHTML += `

<div class="activity-item animate-slide-up">

🛒 Purchase Order:
<strong>${purchase.item || "Material"}</strong>

</div>

`;

});

/* EMPTY */

if(activityContainer.innerHTML === ""){

activityContainer.innerHTML = `

<div class="activity-item">

No recent activity available

</div>

`;

}

}

/* =========================
   USER NAME
========================= */

function setUserName(){

const user =
JSON.parse(
localStorage.getItem(
"erpUser"
)
);

const userName =
user?.email || "Admin";

const userNameEl =
document.getElementById(
"userName"
);

if(userNameEl){

userNameEl.textContent =
userName;

}

}

/* =========================
   CURRENT DATE
========================= */

function loadCurrentDate(){

const dateEl =
document.getElementById(
"currentDate"
);

if(!dateEl){
return;
}

const today =
new Date();

dateEl.textContent =
today.toDateString();

}

/* =========================
   THEME
========================= */

function loadTheme(){

const darkMode =
localStorage.getItem(
"darkMode"
);

if(
darkMode === "true"
){

document.body.classList.add(
"dark-mode"
);

}

}

/* =========================
   LOADING
========================= */

function showLoading(state){

const loader =
document.getElementById(
"loader"
);

if(!loader){
return;
}

loader.style.display =
state
? "flex"
: "none";

}

/* =========================
   TOAST
========================= */

function showToast(
message,
type = "success"
){

const toast =
document.createElement(
"div"
);

toast.className =
"toast animate-slide-down";

toast.innerText =
message;

toast.style.position =
"fixed";

toast.style.top =
"30px";

toast.style.right =
"30px";

toast.style.padding =
"16px 24px";

toast.style.borderRadius =
"14px";

toast.style.color =
"white";

toast.style.zIndex =
"9999";

toast.style.fontWeight =
"600";

toast.style.background =
type === "error"
? "#ff4d6d"
: "#57cc99";

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.remove();

},3000);

}

/* =========================
   ANIMATE CARDS
========================= */

function animateCards(){

const cards =
document.querySelectorAll(
".summary-card,.card"
);

cards.forEach((card,index)=>{

card.style.animation =
`slideUp 0.4s ease ${index * 0.1}s both`;

});

}

/* =========================
   HELPER
========================= */

function updateElement(
id,
value
){

const el =
document.getElementById(id);

if(el){

el.textContent = value;

}

}
