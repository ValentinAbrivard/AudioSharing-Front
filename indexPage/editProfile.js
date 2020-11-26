$("#updateuser").submit(function(e){
    e.preventDefault();
    console.log("click");
    gettk();
})

function gettk () {
    let token = sessionStorage.getItem("token")
    $.ajax({
        url : 'http://127.0.0.1:3000/user/token', // La ressource ciblée
        type : 'GET',
        data: {
            token: token
        },
        success: function(res){
            updateUserRoom(res);
            console.log(res);
            return(res);
        },
        error: function(e) {
            console.log("fail recup token");
            console.log(e);
        }
    })
    //callback();
}

function updateUserRoom(user) {
    console.log("update");
    console.log(user);
    let roomid = user.roomid;
    let userid = user.userid;
    let username = document.getElementById("nom").value;
    let description = document.getElementById("description").value;
    let photo = document.getElementById("photo").value;
    let roomname = document.getElementById("nameroom").value;

    if (roomname != "") {
      console.log("room");
      console.log(roomname);
      $.ajax({
          url : 'http://127.0.0.1:3000/user/' + userid,
          type: 'GET',
          success: function(res){
            console.log(res);
            $.ajax({
                url : 'http://127.0.0.1:3000/room/' + res.idRoom,
                type: 'POST',
                data: {
                  nomderoom: roomname
                },
                success: function(res){
                    console.log(res);
                }
            })
          }
      })
    }
    if (username != "") {
      console.log("username");
      console.log(username);
      $.ajax({
          url : 'http://127.0.0.1:3000/user/' + userid, //get profile user from id
          type: 'POST',
          data: {
            nomdecompte: username
          },
          success: function(res){
              console.log(res);
          }
      })
    }
    if (description != "") {
      console.log("description");
      console.log(description);
      $.ajax({
          url : 'http://127.0.0.1:3000/user/' + userid, //get profile user from id
          type: 'POST',
          data: {
            description: description
          },
          success: function(res){
              console.log(res);
          }
      })
    }
    if (photo != "") {
      console.log("photo");
      console.log(photo);
      $.ajax({
          url : 'http://127.0.0.1:3000/user/' + userid, //get profile user from id
          type: 'POST',
          data: {
            photo: photo
          },
          success: function(res){
              console.log(res);
          }
      })
    }
}
