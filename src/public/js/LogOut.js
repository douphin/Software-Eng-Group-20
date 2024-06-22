function LogOut(){
    sessionStorage.removeItem('profileJSON');
    window.location.replace("/");
}