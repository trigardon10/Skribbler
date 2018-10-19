
if (window.addEventListener('load', function () {
    
    var chat;
    var btn_chat;


    function init(){

        chat = document.getElementById("chatWrite").children[0];
        btn_chat = document.getElementById("chatWrite").children[1];
    
        btn_chat.addEventListener("click", sendMsg, false);
    
    }
    
    
    function sendMsg(ev) {
        
        if(chat.value == ""){
            return;
        }
        console.log(chat.value);
        
        var xhttp = new XMLHttpRequest();
        
        //TODO: SERVER URL
        xhttp.open("POST", "msymnick1319.cloudapp.net:8080", true);
        xhttp.send(chat.value);
        
        chat.value = "";

    }


    init();

}, false));
