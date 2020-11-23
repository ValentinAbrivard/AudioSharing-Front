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
            window.location.href = "userpage.html";
        },
        error: function(e) {
            console.log(e);
            alert("Wrong password or username !")

        }
    });
}

//store in session the active user
$("#userconnected").ready(function() {
    if (sessionStorage.getItem("userconnected") != null)  {
        console.log(sessionStorage.getItem("userconnected"));
        document.getElementById("connected").style.display = "block";
        document.getElementById("notconnected").style.display = "none";
        document.getElementById("userconnected").innerHTML = "Welcome " + sessionStorage.getItem("userconnected") + ", from here you can start joining or creating groups and projects to time you and your team !";
    }
});

//welcome the the active user to managegroup or manageproject
$("#adminconnected").ready(function() {
    if (sessionStorage.getItem("userconnected") != null)  {
        if($('#adminconnected').attr('class') == "groups")  {
            console.log(sessionStorage.getItem("userconnected"));
            document.getElementById("connected").style.display = "block";
            document.getElementById("notconnected").style.display = "none";
            document.getElementById("adminconnected").innerHTML = "Welcome " + sessionStorage.getItem("userconnected") + ", from here you can manage your groups!";
        } else if($('#adminconnected').attr('class') == "projects") {
            console.log(sessionStorage.getItem("userconnected"));
            document.getElementById("connected").style.display = "block";
            document.getElementById("notconnected").style.display = "none";
            document.getElementById("adminconnected").innerHTML = "Welcome " + sessionStorage.getItem("userconnected") + ", from here you can manage your projects!";
        }
    }
});

//displays all existing users and offers to invite them to a group 
$("#people").ready(function()   {
    var settings = {
        "url": "http://127.0.0.1:3000/user",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        for(let i = 0; i < response.length; i++)    {
            if(response[i].nomdecompte != sessionStorage.getItem("userconnected"))  {
                $("#people").append("<li id=" + response[i].nomdecompte + ">" + response[i].nomdecompte + "<button id=" + response[i].nomdecompte + " class=\"btn btn-primary\" onclick=\"inviteuser(this)\">invite</button></li>");
                var settingsb = {
                    "url": "http://127.0.0.1:3000/group",
                    "method": "GET"
                };
                $.ajax(settingsb).done(function (responseb) {
                    var groups = [];
                    for(let j = 0; j < responseb.length; j++)    {
                        groups.push(responseb[j].nomgroup);
                    }
                    sessionStorage.setItem("group", JSON.stringify(groups));
                });
            }
        }
    });
})

//when clicking on invite, displays the groups 
function inviteuser(e)   {
    $(e).hide();
    var groups = JSON.parse(sessionStorage.getItem("group"));
    sessionStorage.setItem("usertoadd", $(e).attr("id"));
    for(g in groups)    {
        $(e.parentNode).append("<button id=" + groups[g] + " onclick='selectiongroupe(this.id)' class=\"btn btn-info\">" + groups[g] + "</button>")
    }
}

//add user selected to group selected
function selectiongroupe(e)  {
    var settings = {
        "url": "http://127.0.0.1:3000/group",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        for(i = 0; i < response.length; i++)    {
            if(response[i].nomgroup == e) {
                var groupid = response[i]._id
                var usertoadd = sessionStorage.getItem("usertoadd");
                var settingsb = {
                    "url": "http://127.0.0.1:3000/group/" + groupid + "/" + usertoadd,
                    "method": "POST"
                };
                $.ajax(settingsb).done(function (responseb) {
                    location.reload();
                })
            }
        }
    });
}

//displays all existing groups and offers to invite them to take part in a project
$("#groups").ready(function()   {
    var settings = {
        "url": "http://127.0.0.1:3000/group",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        for(let i = 0; i < response.length; i++)    {
            if(response[i].nomdecompte != sessionStorage.getItem("userconnected"))  {
                var settingsb = {
                    "url": "http://127.0.0.1:3000/project",
                    "method": "GET"
                };
                $.ajax(settingsb).done(function (responseb) {
                    var projects = [];
                    for(let j = 0; j < responseb.length; j++)    {
                        projects.push(responseb[j].nomproject);
                    }
                    sessionStorage.setItem("project", JSON.stringify(projects));
                });
                $("#groups").append("<li id=" + response[i].nomgroup + ">" + response[i].nomgroup + "<button id=" + response[i]._id + " class=\"btn btn-primary\" onclick=\"invitegroup(this)\">invite</button></li>");
            }
        }
    });
})

//when clicking on invite, displays the groups 
function invitegroup(e)   {
    $(e).hide();
    var projects = JSON.parse(sessionStorage.getItem("project"));
    console.log($(e).attr("id"));
    sessionStorage.setItem("groupidtoadd", $(e).attr('id'));
    for(p in projects)    {
        $(e.parentNode).append("<button id=" + projects[p] + " onclick='selectionprojet(this.id)' class=\"btn btn-info\">" + projects[p] + "</button>")
    }
}

//add group selected to project selected
function selectionprojet(e)  {
    var settings = {
        "url": "http://127.0.0.1:3000/project",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        for(i = 0; i < response.length; i++)    {
            if(response[i].nomproject == e) {
                var projectid = response[i]._id
                var grouptoadd = sessionStorage.getItem("groupidtoadd");
                var groupidtoadd = sessionStorage.getItem('grouptoid');
                console.log(grouptoadd);
                var settingsb = {
                    "url": "http://127.0.0.1:3000/project/" + projectid + "/" + grouptoadd,
                    "method": "POST"
                };
                $.ajax(settingsb).done(function (responseb) {
                    location.reload();
                })
            }
        }
    });
}

$("#list").ready(function()    {
    if($("#list").attr('class') == "groups")   {
        //lists groups and their users, offers to delete groups or kick some users
        var settings = {
            "url": "http://127.0.0.1:3000/group",
            "method": "GET"
        };
        $.ajax(settings).done(function (response) {
            groupslist(response);
        });
    
        function groupslist(response){
            for(let i = 0; i < response.length; i++)    {
                if(response[i].admin == sessionStorage.getItem("userconnected"))    {
                    var groupname = response[i].nomgroup;
                    var user = response[i].users;
                    sessionStorage.setItem("groupid", response[i]._id);
                    $("#list").append("<li id="+groupname+">"+ groupname+ "<button onclick=\"deletegroup(this.parentNode.id)\" id=" + groupname + " class=\"btn btn-danger\">Delete</button></li>");
                    for(let j = 0; j < user.length; j++)   {
                        if(user[j] != response[i].admin)    {
                            $("#list").append("<ul><li style=\"color: black;\" id="+user[j]+">"+user[j]+"<button onclick=\"leavegroup(this)\" id=" + response[i]._id + " class=\"btn btn-warning\">Kick</button></li></ul>");
                        } else  {
                            $("#list").append("<ul><li style=\"color: black;\" id="+user[j]+">"+user[j]+"</li></ul>");
                        }
                    }
                }
            } 
        }
    } else if($("#list").attr('class') == "projects")    {
        //lists projects and their groups, offers to delete projects or kick some groups
        var settings = {
            "url": "http://127.0.0.1:3000/project",
            "method": "GET"
        };
        $.ajax(settings).done(function (response) {
            projectlist(response);
        });
        function projectlist(response)  {
            for(let i = 0; i < response.length; i++)    {
                if(response[i].admin == sessionStorage.getItem("userconnected"))    {
                    $("#list").append("<li id="+response[i].nomproject+">"+ response[i].nomproject+ "<button onclick=\"deleteproject(this.parentNode.id)\" id=" + response[i].nomproject + " class=\"btn btn-danger\">Delete</button></li>");
                    for(let j = 0; j < response[i].idgroups.length; j++)   {
                        var settingsb = {
                            "url": "http://127.0.0.1:3000/group/" + response[i].idgroups[j],
                            "method": "GET"
                        };
                        $.ajax(settingsb).done(function (responseb){
                            var nomgroupobject = responseb.nomgroup;
                            console.log(nomgroupobject);
                            $("#"+response[i].nomproject+"").append("<ul><li style=\"color: black;\" id="+response[i].idgroups[j]+">"+ nomgroupobject +"<button onclick=\"leaveproject(this)\" id=" + response[i]._id + " class=\"btn btn-warning\">Kick</button></li></ul>");
                        });
                    }
                }
            }
        }
    }
});

// function that delete groups by id
function deletegroup(e)    {
    console.log(e)
    var settings = {
        "url": "http://127.0.0.1:3000/group",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        correctgroup(response);
    });
    function correctgroup(response) {
        for(let i = 0; i < response.length; i++)    {
            if(response[i].nomgroup == e)  {
                var settings = {
                    "url": "http://127.0.0.1:3000/group/" + response[i]._id,
                    "method": "DELETE"
                };
                $.ajax(settings).done(function () {
                    location.reload();
                });
            }
        }
    }
}

//function that kick users from groups
function leavegroup(e)    {
    var settings = {
        "url": "http://127.0.0.1:3000/group/" + e.id,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        kickuser(response);
    });
    function kickuser(response) {
        for(let i = 0; i < response.users.length; i++)    {
            console.log(response.users[i] + "//" + e.parentNode.id)
            if(response.users[i] == e.parentNode.id) {
                var settings = {
                    "url": "http://127.0.0.1:3000/group/" + e.id + "/" + response.users[i],
                    "method": "DELETE"
                };
                $.ajax(settings).done(function () {
                    location.reload();
                });
            } 
        }
    }
}

//event that logout the active user
$("#logout").click(function()   {
    console.log("hello");
    sessionStorage.clear();
    location.replace("login.html");
})

//function that delete project
function deleteproject(e)    {
    console.log(e)
    var settings = {
        "url": "http://127.0.0.1:3000/project",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        correctproject(response);
    });
    function correctproject(response) {
        for(let i = 0; i < response.length; i++)    {
            if(response[i].nomproject == e)  {
                var settings = {
                    "url": "http://127.0.0.1:3000/project/" + response[i]._id,
                    "method": "DELETE"
                };
                $.ajax(settings).done(function () {
                    location.reload();
                });
            }
        }
    }
}

//function that kick groups from projects
function leaveproject(e)    {
    var settings = {
        "url": "http://127.0.0.1:3000/project/" + e.id,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        kickgroup(response);
    });
    function kickgroup(response) {
        for(let i = 0; i < response.idgroups.length; i++)    {
            console.log(response.idgroups[i] + "//" + e.parentNode.id)
            if(response.idgroups[i] == e.parentNode.id) {
                var settings = {
                    "url": "http://127.0.0.1:3000/project/" + e.id + "/" + response.idgroups[i],
                    "method": "DELETE"
                };
                $.ajax(settings).done(function () {
                    location.reload();
                });
            }
        }
    }
}
