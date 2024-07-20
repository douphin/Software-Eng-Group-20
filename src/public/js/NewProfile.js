function AddProfile(){
    
    var pass1 = document.getElementById('Password1').value;
    var pass2 = document.getElementById('Password2').value;

    if (pass1 != pass2){
        document.getElementById("TestDiv").innerHTML = "Make Sure Passwords Match";
        console.log("hey1");
        return;
    }

    var checkUser = new XMLHttpRequest();
    checkUser.open("POST", "/CheckUser"); 
    var formData = new FormData(document.getElementById("LoginForm"));
    
    checkUser.send(formData);
    checkUser.onload = function(event)
    {
        console.log(event);
        console.log(event.currentTarget.responseText);
        if (event.currentTarget.responseText == "true"){
            document.getElementById("TestDiv").innerHTML = "Username is already taken";
            console.log("hey2");
            return;
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/addprofile"); 
    var formData = new FormData(document.getElementById("LoginForm"));
    
    xhr.send(formData);
    xhr.onload = function(event){
   
        if (xhr.responseText == "NoProfile"){
            document.getElementById("TestDiv").innerHTML = "Username or Password is incorrect";
        }
        else{
            sessionStorage.removeItem('profileJSON');
            sessionStorage.setItem('profileJSON', xhr.responseText);
            window.location.replace("/HomePage");
        }
    }
    
    return false;
}

function CheckUser(){
    var checkUser = new XMLHttpRequest();
    checkUser.open("POST", "/CheckUser"); 
    var formData = new FormData(document.getElementById("LoginForm"));

    var respdiv = document.getElementById("TestDiv");
    
    checkUser.send(formData);
    checkUser.onload = function(event)
    {
        console.log(event);
        console.log(event.currentTarget.responseText);
        if (event.currentTarget.responseText == "true"){
            respdiv.innerHTML = "Username is already taken";
            console.log("hey2");
            return;
        }
        else if (respdiv.innerHTML == "Username is already taken"){
            respdiv.innerHTML = "";
        }
    }
}

function CheckPass(){
    var pass1 = document.getElementById('Password1').value;
    var pass2 = document.getElementById('Password2').value;
    var respdiv = document.getElementById("TestDiv");


    if (pass2 == ""){
        return;
    }
    else if (pass1 != pass2){
        respdiv.innerHTML = "Make Sure Passwords Match";
        console.log("hey1");
        return;
    }
    else if (respdiv.innerHTML == "Make Sure Passwords Match")
    {
        respdiv.innerHTML = "";
    }
}

