//event that login a user by checking credentials in the db and then redirect to the userpage
$("#connect").submit(function(e)  {
    e.preventDefault();
    console.log("click");
    getUser();
});

function getUser()   {

    var user = document.getElementById("username").value;
    var pass = document.getElementById("userpwd").value;

    console.log(pass + " " + user)

    $.ajax({
        url : 'http://127.0.0.1:3000/user/login', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            nomdecompte: user,
            password: pass,
        },

        success: function(data){
            console.log("success" + data);
            var tab = Object.values(data);
            var id = tab[0];
            var compteRecup = tab[1];
            console.log(tab);

            sessionStorage.setItem("userconnected", compteRecup);
            sessionStorage.setItem("userid", id);
            createtokenforuser();
            // window.location.href = "../indexPage/index.html";
        },
        error: function(e) {
            console.log(e);
            alert("Wrong password or username !")

        }
    });
}


function createtokenforuser(){
    console.log("création de token")
    var user = document.getElementById("username").value;
    $.ajax({
        url : 'http://127.0.0.1:3000/user/token', // La ressource ciblée
        type : 'POST',
        data : {
            nomdecompte: user
        },
        success: function(token){
            console.log('token : '+ token)
            const Promesse = new Promise(function(resolve,reject){
                sessionStorage.setItem("token",token);
                console.log("promesse")
                resolve(true);
            })
            Promesse.then(function(){
                console.log("promesse 2")
                //assigntokentouser(idroom,newplayer);
                window.location.href = "../indexPage/index.html";
            })

            console.log(sessionStorage.getItem("token"));
        },
        error: function(e) {
            console.log("fail création token");
            console.log("Code error : " + e);
        }
    })
    //callback();
}
