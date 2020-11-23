//event that create an user in the database
$("#register").submit(function(e)  {
    createUser();
    alert("The user was created successfully")
});

function createUser()   {
    if(document.getElementById("adduserpwd").value == document.getElementById("adduserpwd2").value)  {
        var user = document.getElementById("addusername").value;
        var pass = document.getElementById("adduserpwd").value;

        $.ajax({
            url : 'http://127.0.0.1:3000/user', // La ressource ciblée
            type : 'POST', // Le type de la requête HTTP.

            data : {
                nomdecompte: user,
                password: pass,
            },

            success: function(data){
                console.log("success" + data);
            },
            error: function(e) {
                //alert("THe username you want to use is already taken");
                console.log(e);
            }
        });
    } else {
        alert("Please make sure to confirm your password.");
    }
}

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
            window.location.href = "../indexPage/index.html";
        },
        error: function(e) {
            console.log(e);
            alert("Wrong password or username !")

        }
    });
}


