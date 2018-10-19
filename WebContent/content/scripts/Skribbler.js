

if (window.addEventListener('load', function () {

    //var gameManger = new gameManger();
    
    var canvas, c, tool;
    var btn_clear, btn_color;
    var strokeStyle = "#000000";

    function init() {
        canvas = document.getElementById("canvas");
        c = canvas.getContext("2d");

        btn_clear = document.getElementById("clear");
        btn_send = document.getElementById("send");
        btn_get = document.getElementById("get");
        btn_color = document.getElementById("colorpicker");

        tool = new tool_pencil();

        canvas.addEventListener("mousedown", ev_canvas, false);
        canvas.addEventListener("mousemove", ev_canvas, false);
        canvas.addEventListener("mouseup", ev_canvas, false);


        btn_clear.addEventListener("click", clear, false);
        btn_send.addEventListener("click", send, false)
        btn_get.addEventListener("click", get, false)
        btn_color.addEventListener("change", color, false);
    }

    function tool_pencil() {
        var tool = this;
        this.started = false;

        this.mousedown = function (ev) {
            c.beginPath();
            c.moveTo(ev._x, ev._y);
            tool.started = true;
        };

        this.mousemove = function (ev) {
            if (tool.started) {
                c.lineTo(ev._x, ev._y);
                c.strokeStyle = strokeStyle;
                c.stroke();
            }
        };

        this.mouseup = function (ev) {
            if (tool.started) {
                tool.mousemove(ev);
                tool.started = false;
            }
        }
    }

    var started = false;
    function ev_canvas(ev) {
        var x, y;

        if (ev.layerX || ev.layerX == 0) {
            ev._x = ev.layerX;
            ev._y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) {
            ev._x = ev.offsetX;
            ev._y = ev.offsetY;
        }

        var func = tool[ev.type];
        if (func) {
            func(ev);
        }
    }

    function clear() {
    	
        c.clearRect(0, 0, canvas.width, canvas.height);
        
    }

    function send() {
    	var image = Array.from(c.getImageData(0, 0, 800, 600).data);
    	var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
        	console.log(xmlHttp.status);
            if (xmlHttp.readyState == 4 && (xmlHttp.status >= 200 && xmlHttp.status <= 299)){
            	console.log(xmlHttp.status);
            	console.log(xmlHttp.responseText);
            }
        }
        console.log(JSON.stringify(image))
        xmlHttp.open("PUT", "/Sribblio2/rest/endpoint/img", true); // true for asynchronous 
        xmlHttp.send(JSON.stringify(image));
    }
    
    function get() {
    	var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && (xmlHttp.status >= 200 && xmlHttp.status <= 299)){
            	console.log(xmlHttp.status);
            	console.log(xmlHttp.responseText);
            	var image = {};
            	image = new ImageData(Uint8ClampedArray.from(JSON.parse(xmlHttp.responseText)), 800, 600);
            	c.putImageData(image, 0, 0);
            }
        }
        xmlHttp.open("GET", "/Sribblio2/rest/endpoint/img", true); // true for asynchronous 
        xmlHttp.send();
    }

    function color(ev) {
        console.log(this.value);
        strokeStyle = this.value;
    }

    init();

}, false));

