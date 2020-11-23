var projectChosed = "";
var id = "";
var idproject= "";
var idgroup= "";
var nomgroup= "";
var idtimer = "";
var groupChosed = "";
var idprojectforchrono= "";
var idgroupforchrono = "";


document.getElementById('chrono').addEventListener("click", function(e) {
    //console.log(groupChosed =  $("#grouplistfinal").find(":selected").text());
    //console.log(groupChosed =  $("#projectlistfinal").find(":selected").text());
    projectChosed = $("#projectlistfinal").find(":selected").text();
    groupChosed =  $("#grouplistfinal").find(":selected").text();
    console.log(groupChosed)
    console.log(projectChosed)
    if (passage == 0 && projectChosed != "") {
        //console.log(projectChosed);
        intervale = setInterval(setTime, 1000);
        setTime();
        passage++;
    }else console.log("Déjà lancé ou il faut sélectionner un projet")


});

document.getElementById('stopChrono').addEventListener("click", function(e) {
    clearInterval(intervale);
    passage = 0;
});

var intervale;
var passage = 0;
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;  //Timer de départ

function setTime() {
    //console.log("work");
    ++totalSeconds;
    updatetimergroupfromproject();
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

$('#stopChrono').click(function()   {
    createChrono();
});

$('#chrono').click(function()   {

});

document.addEventListener("load", getproject());

function getproject(){
    //console.log("start get project");
    var settings = {
        "url": "http://127.0.0.1:3000/project",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        checkproject(response);
    });
}

function checkproject(response)   {


    for(let i = 0; i < response.length; i++)    {
        //console.log("Project name : " + response[i].nomproject);
        var projectname = response[i].nomproject;
        id = response[i]._id;
        $("#projectlist").append("<OPTION id="+id+">"+ projectname+ "</OPTION>");
    }
}

$("#projectlist").change(function(event){

    idgroup= "";
    nomgroup= "";
    projectChosed = "";
    $("#grouplist").empty();
    $("#seconds").text("00");
    $("#minutes").text("00");
    id = $('#projectlist').find(":selected").attr('id');
    projectChosed = event.target.value;
    //console.log("project : "+projectChosed);
    //console.log("group : "+groupChosed);
    //idgroup = $('#grouplist').find(":selected").attr('id').text("");
    getgroup();
    //Test
});


function getgroup(){
    //console.log("start get group");
    var settings = {
        "url": "http://127.0.0.1:3000/project/" + id,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {

        checkGroup(response);
        //console.log(response.idgroups + "= group");
    });
}


function checkGroup(response) {

    //console.log(response.idgroups.length);
    for (var i = 0; i < response.idgroups.length; i++) {
        //console.log("start append");
        //console.log(response.idgroups[i] + "= ID du groupe");
        idgroup = response.idgroups[i];
        getgroupname(idgroup);

    }

}
function getidtimergroupfromproject(){
    var settings = {
        "url": "http://127.0.0.1:3000/project/"+id,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        idtimer = response.idtimer;
        gettimergroupfromproject();
    });
}

function gettimergroupfromproject(){
    var settings = {
        "url": "http://127.0.0.1:3000/timer/"+idtimer,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {

        var idrecup = response.idtypeEntity.indexOf(idgroup);
        //Si group find into timer of project
        if(idrecup != -1){
            console.log(response.timerEntity[idrecup]);
            totalSeconds = response.timerEntity[idrecup];

        }
        idtimer = response.idtimer;
    });
}


function updatetimergroupfromproject(){
    //var string = "http://127.0.0.1:3000/project/"+idproject+"/"+idgroup+"/"+1;
    //console.log(string);
    console.log(id);
    console.log("ID du groupe : " + idgroup);
    idgroupforchrono = $("#grouplistfinal").find('option:selected').attr('id');
    idprojectforchrono = $("#projectlistfinal").find('option:selected').attr('id');
    console.log("ID projet avant put : " + idprojectforchrono);
    console.log("ID group avant put " + idgroupforchrono);
    var settings = {
        "url": "http://127.0.0.1:3000/project/"+idprojectforchrono+"/"+idgroupforchrono+"/"+ 1,
        "method": "PUT"
    };
    $.ajax(settings).done(function (response) {
        console.log("success");
    });

}

function getgroupname(idgroup){
    //console.log("start get group");
    var settings = {
        "url": "http://127.0.0.1:3000/group/"+idgroup,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        nomgroup = response.nomgroup;

        // console.log(nomgroup);
        //console.log("début append");
        $("#grouplist").append("<option id="+idgroup+">"+ nomgroup +"</option>");
        groupChosed = $("#grouplist").find(":selected").text();
        getidtimergroupfromproject();
        console.log("Fin append");
    });
}



$("#listchrono").ready(function()    {
    if($("#listchrono").attr('class') == "groups")   {
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
                    $("#grouplist").append("<OPTION id="+id+">"+ groupname+ "</OPTION>");

                }
            }
        }
    }
});










var projectlistID
var listeidprojet
var idprojetrecup

$("#listderoulantegroup").ready(function() {
    if ($("#listderoulantegroup").attr('class') == "groups") {
        var settings = {
            "url": "http://127.0.0.1:3000/group",
            "method": "GET"
        };
        $.ajax(settings).done(function (response) {
            groupslist(response);
        });

        function groupslist(response) {
            for (let i = 0; i < response.length; i++) {
                console.log("Début de boucle");
                for (let j = 0; j < response[i].users.length; j++) {
                    console.log("enter if users");
                    console.log(response[i].users);
                    console.log(sessionStorage.getItem("userconnected"));
                    if (response[i].users[j] == sessionStorage.getItem("userconnected")) {
                        console.log("user connected : " + response[i].users);
                        var groupname = response[i].nomgroup;
                        var user = response[i].users;
                        var groupid = response[i]._id;
                        console.log(groupid);
                        console.log(groupname);
                        sessionStorage.setItem("groupid", response[i]._id);
                        console.log("Ecriture des groups dans la liste ");
                        $("#grouplistfinal").append("<OPTION id=" + groupid + ">" + groupname + "</OPTION>");
                        //$("#listderoulantegroup").append("<li id=" + groupname + ">" + groupname + "</li>");
                        for (let j = 0; j < user.length; j++) {
                        }
                    }
                }


            }
        }
    }
});

$( ".test" ).change(function() {
    $('#projectlistfinal')
        .find('option')
        .remove()
    console.log("hello");
    console.log(groupChosed = $("#grouplistfinal").find(":selected").text());
    console.log(groupChosed = $("#projectlist").find(":selected").text());
    var id = $("#grouplistfinal").find('option:selected').attr('id');
    console.log(id);

    var settings = {
        "url": "http://127.0.0.1:3000/group/"+id,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        projectdisplay(response);
    });

    function projectdisplay(response) {
        listeidprojet = response.idproject;
        console.log(listeidprojet);
        for (let i = 0; i < listeidprojet.length; i++) {
            idprojetrecup = listeidprojet[i];
            console.log("projet id display : ");
            console.log(idprojetrecup);
            var settings = {
                "url": "http://127.0.0.1:3000/project/"+idprojetrecup,
                "method": "GET"
            };
            $.ajax(settings).done(function (response) {
                idprojetrecup = listeidprojet[i];
                console.log("projet id display 2 : ");
                console.log(idprojetrecup);
                $("#projectlistfinal").append("<OPTION id=" + idprojetrecup + ">" + response.nomproject + "</OPTION>");
            });
        }
    }

});

$( ".selectprojet" ).change(function() {
    var projectselectedforUserstory = $("#projectlistfinal").find(":selected").text();
    console.log(projectselectedforUserstory);
    $('#userstorydisplay')
        .find('div')
        .remove();
    $("#userstorydisplay").append("<div>"+ "<p>" + projectselectedforUserstory + "<br>" + "hello2" + "</p>" + "<h5>" +
        "Create a UserStory for the project : " + projectselectedforUserstory  + "</h5>" + "<input id=" + "UserStoryName"+ " type =" + "text" + " placeholder=" + "UserStory" + "_Name" + ">"
        + "<input id=" + "DescriptionUserStory"+ " type =" + "text" + " placeholder=" + "UserStory" + "_Description" + ">"
        + "<input id=" + "TimeUserStory"+ " type =" + "number" + " placeholder=" + "Time_in_minutes" +  ">"
        + "<button id =" + "userstory" + " class=" + "buttonforuserstory"+  " onclick=" + "CREATE(this)" + ">" + "CREATE" + "</button>" +  "</div>");



        //<button id="invite" class="ludo" onclick="inviteuser(this)">INVITE</button>

    /* <h5>Create a UserStory</h5>
        <input id="UserStoryName" type="text" placeholder="UserStory name">
            <input id="DescriptionUserStory" type="text" placeholder="UserStory description">
            <input id="TimeUserStory" type="number" placeholder="Time in minutes">
            <br>
            <input type="button" id="CREATE" value="CREATE"><br><br>
            <button type="button" class="btn btn-secondary btn-lg btn-block"><a href="Userpage.html">Back to main page</a></button> */


});

document.addEventListener("load", getUserStory());

//$("#CREATE").click(function()  {
function CREATE() {
    console.log("start")
    createUserStory();
    alert("The userstory was created successfully")
    console.log("done")
}

function createUserStory()   {
    var userStoryname = document.getElementById("UserStoryName").value;
    var descriptionUserStory = document.getElementById("DescriptionUserStory").value;
    var timeUserStory = document.getElementById("TimeUserStory").value;
    var projectidchrono = $('#projectlistfinal').find(":selected").attr('id');
    console.log(projectidchrono);
    console.log(userStoryname);
    console.log(descriptionUserStory);
    console.log(timeUserStory);

    $.ajax({
        url : 'http://127.0.0.1:3000/userstory', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            nomuserstory: userStoryname,
            descriptionstory: descriptionUserStory,
            timeruserstory: timeUserStory,
            idprojectchrono: projectidchrono,
        },

        success: function(data){
            console.log("success");
        },
        error: function(e) {
            console.log("fail");

        }
    });
}



function getUserStory(){
    console.log("start get UserStory");
    var settings = {
        "url": "http://127.0.0.1:3000/userstory",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        checkUserStory(response);
        console.log(response);
    });
}

function checkUserStory(response)   {


    for(let i = 0; i < response.length; i++)    {
        console.log("UserStory name : " + response[i].nomuserstory);
        console.log("UserStory description : " + response[i].descriptionstory);
        console.log("UserStory time to do : " + response[i].timeruserstory);
        var userstoryname = response[i].nomuserstory;
        var userstorydescription = response[i].descriptionstory;
        var userstorytime = response[i].timeruserstory;
        $("ol").append("<li>"+ "user story: " + userstoryname + "<br>" + "description: " + userstorydescription + "<br>" + "Time: " + userstorytime + "</li>");
    }
}



$("#userconnected").ready(function() {
    if (sessionStorage.getItem("userconnected") != null)  {
        document.getElementById("connected").style.display = "block";
        document.getElementById("notconnected").style.display = "none";
    }
});














$("#userconnected").ready(function() {
    if (sessionStorage.getItem("userconnected") != null)  {
        console.log(sessionStorage.getItem("userconnected"));
        document.getElementById("connected").style.display = "block";
        document.getElementById("notconnected").style.display = "none";
        document.getElementById("userconnected").innerHTML = "Welcome " + sessionStorage.getItem("userconnected") + ", from here you can start joining or creating groups and projects to time you and your team !";
    }
});


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




