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
                window.location.href = "../loginPage/login.html";
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
