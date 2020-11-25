//import { createApp } from 'vue'
//import App from '../src/App.vue'
//import './index.css'
//import Room from '../src/Room.vue'

//createApp(App).mount('#app')
//createApp(Room).mount('#room')

import { createApp } from 'vue'
                import '../src/index.css'
                import Room from '../src/Room.vue'


window.onload = (function() {
    var settings = {
        "url": "http://127.0.0.1:3000/room",
        "method": "GET"
    };
    $.ajax(settings).done(function (response){
        var roomCount = 0
        for(let i = 0; i < response.length; i++) {
            console.log("test");
            console.log(response[i].live)
            if(response[i].live == false) {
                console.log("inside if");
                roomCount = roomCount + 1;
                console.log(roomCount);
                $("#roomsDisplay").append("<div id=" + "room" + roomCount + "></div>");
                
                
                createApp(Room).mount('#room' + roomCount);


                //$("#people").append("<li>" + "test" + "</li>"); 
            }else {
                //console.log("Le live de : " + response[i].nomderoom + " n'a pas commencé");
            }
        }
    })
})
