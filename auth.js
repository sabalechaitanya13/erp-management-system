const ERPAuth = {

login(email,password){

if(
email === "admin@erp.com" &&
password === "admin123"
){

localStorage.setItem(
"erpUser",
JSON.stringify({
email:email
})
);

window.location.href =
"./dashboard.html";

}else{

const error =
document.getElementById(
"errorText"
);

if(error){

error.innerText =
"Invalid Email or Password";

}

}

},

logout(){

localStorage.removeItem(
"erpUser"
);

window.location.href =
"./index.html";

},

isAuthenticated(){

return localStorage.getItem(
"erpUser"
) !== null;

}

};
