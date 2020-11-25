$(document).ready(function(){
    gettoken()
})

function gettoken () {

    console.log("récupération token :");
    console.log(sessionStorage.getItem("token"));
    let token = sessionStorage.getItem("token")
    console.log("TOKEN VARIABLE : " + token);
   
    $.ajax({
        url : 'http://127.0.0.1:3000/user/token', // La ressource ciblée
        type : 'GET',

        data: {
            token: token
        },
        
        success: function(res){
            console.log(res)
            
                console.log("promesse")
                console.log(res.username);
                console.log(res.userid);
                displayProfile(res.userid)
        },
        error: function(e) {
            console.log("fail recup token");
            console.log(e);
        }
    })
    //callback();
}

function displayProfile(useridfromjwt) {
    console.log("TEST : " + useridfromjwt);
    $.ajax({
        url : 'http://127.0.0.1:3000/user/' + useridfromjwt, //get profile user from id
        type: 'GET',
        success: function(res){
            console.log("Success getting user information from jwt");
            document.getElementById("username").innerHTML = "Welcome : " + res.nomdecompte;
            document.getElementById("description").innerHTML = res.description;
        }
    })
}

