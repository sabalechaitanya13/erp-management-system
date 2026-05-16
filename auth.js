(function(){

const ERPAuth = {

login(email,password){

if(
email === "admin@erp.com" &&
password === "admin123"
){

const user = {

name:"Administrator",
email:"admin@erp.com",
role:"ADMIN"

};

sessionStorage.setItem(
"erpUser",
JSON.stringify(user)
);

window.location.href =
"dashboard.html";

}else{

alert("Invalid Credentials");

}

},

logout(){

sessionStorage.clear();

window.location.href =
"login.html";

},

isAuthenticated(){

return !!sessionStorage.getItem(
"erpUser"
);

}

};

window.ERPAuth = ERPAuth;

})();