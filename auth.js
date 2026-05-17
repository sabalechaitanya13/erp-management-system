/* =========================
   ERP AUTH SYSTEM
========================= */

const ERPAuth = {

/* =========================
   LOGIN
========================= */

login(email,password){

if(

email === "admin@erp.com" &&
password === "admin123"

){

localStorage.setItem(

"erpUser",

JSON.stringify({

email:email,
loginTime:new Date()

})

);

/* REDIRECT */

window.location.href =
"./dashboard.html";

}else{

const errorText =
document.getElementById(
"errorText"
);

if(errorText){

errorText.innerText =
"Invalid Email or Password";

}

}

},

/* =========================
   LOGOUT
========================= */

logout(){

localStorage.removeItem(
"erpUser"
);

window.location.href =
"./index.html";

},

/* =========================
   CHECK LOGIN
========================= */

isAuthenticated(){

return localStorage.getItem(
"erpUser"
) !== null;

},

/* =========================
   GET USER
========================= */

getUser(){

return JSON.parse(

localStorage.getItem(
"erpUser"
)

);

}

};

/* =========================
   AUTO REDIRECT
========================= */

document.addEventListener(

"DOMContentLoaded",

function(){

const currentPage =
window.location.pathname
.split("/")
.pop();

/* IF USER NOT LOGGED IN */

if(

!ERPAuth.isAuthenticated() &&

currentPage !== "index.html" &&

currentPage !== ""

){

window.location.href =
"./index.html";

}

/* IF USER ALREADY LOGGED IN */

if(

ERPAuth.isAuthenticated() &&

(
currentPage === "index.html" ||
currentPage === ""
)

){

window.location.href =
"./dashboard.html";

}

}

);
