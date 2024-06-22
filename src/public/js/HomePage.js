var JSONdataString = sessionStorage.getItem('profileJSON') + "";


if (JSONdataString.length > 5)
{
    //document.getElementById("TestDiv").innerHTML = JSONdataString;
    var JSONdata = JSON.parse(JSONdataString);
    document.getElementById("JSONprofileName").innerHTML = JSONdata.ProfileName;
    document.getElementById("TODOitem1").innerHTML = JSONdata.TodoItems[0].ItemName;
    document.getElementById("TODOitem2").innerHTML = JSONdata.TodoItems[1].ItemName;
    
}
else
{
    window.location.replace("/");
}

