(function () {

const ERPAuth = {

login(email, password) {

if (
email === "admin@erp.com" &&
password === "admin123"
) {

const user = {

name: "Administrator",
email: "admin@erp.com",
role: "ADMIN"

};

localStorage.setItem(
"erpUser",
JSON.stringify(user)
);

window.location.href =
"dashboard.html";

} else {

alert("Invalid Credentials");

}

},

logout() {

localStorage.removeItem(
"erpUser"
);

window.location.href =
"index.html";

},

isAuthenticated() {

return !!localStorage.getItem(
"erpUser"
);

},

checkAuth() {

const protectedPages = [

"dashboard.html",
"employees.html",
"attendance.html",
"payroll.html",
"inventory.html",
"purchase.html",
"expenses.html",
"reports.html",
"settings.html",
"leaves.html"

];

const currentPage =
window.location.pathname
.split("/")
.pop();

const isLoggedIn =
localStorage.getItem(
"erpUser"
);

if (
protectedPages.includes(currentPage) &&
!isLoggedIn
) {

window.location.href =
"index.html";

}

}

};

window.ERPAuth = ERPAuth;

ERPAuth.checkAuth();

})();