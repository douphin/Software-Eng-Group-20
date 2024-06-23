

function FindJSON(){
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login"); 
    //xhr.onload = function(event){ 
    //    document.getElementById("TestDiv").innerHTML = "hey there"
    //    //alert("Success, server responded with: " + event.target.response); // raw response
    //}; 
    // or onerror, onabort
    var formData = new FormData(document.getElementById("LoginForm"));
    
    xhr.send(formData);
    xhr.onload = function(event){
        //document.getElementById("TestDiv").innerHTML = "hey there";
        //console.log(xhr.responseText);
        //window.location.replace("/Weather.html");
        //document.getElementById("TestDiv").innerHTML = xhr.responseText;
        //document.getElementById("profileJSON").textContent = xhr.responseText;
        //document.getElementById("SendHome").su
        if (xhr.responseText == "NoProfile"){
            document.getElementById("TestDiv").innerHTML = "Username or Password is incorrect";
        }
        else{
            sessionStorage.removeItem('profileJSON');
            sessionStorage.setItem('profileJSON', xhr.responseText);
            window.location.replace("/HomePage");
            //var apikey = 
        }
    }
    
    return false;
}

