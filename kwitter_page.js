var firebaseConfig = {
      apiKey: "AIzaSyDLI3vttHndlhl4-po2s-V52sLRyXkfx7E",
      authDomain: "kwitter4-8eacf.firebaseapp.com",
      databaseURL: "https://kwitter4-8eacf-default-rtdb.firebaseio.com",
      projectId: "kwitter4-8eacf",
      storageBucket: "kwitter4-8eacf.appspot.com",
      messagingSenderId: "207209163976",
      appId: "1:207209163976:web:79771f82d43e8e1872c9fd"
    };
    
  
    firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function send(){
      msg=socument.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            mesaage:msg,
            like:0
      })
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message=message_data["message"];
like = message_data["like"];

name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this_id)'>"; 
span_with_tag = "<"
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like+"</span></button><hr>";
 
row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementsByid("output").innerHTML += row;
//End code
      } });  }); }
getData();


function updateLike(message_id)
{
      console.log("clicked on like button - "+ message_id);
      button_id=message_id;
      like = document.getElementsByid(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
      like : updated_likes
      });
}

function logout()
{
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      localStorage.replace("index.html");
}