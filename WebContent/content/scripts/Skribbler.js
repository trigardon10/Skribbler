

if (window.addEventListener('load', function () {

    //var gameManger = new gameManger();
    
    var canvas, c, tool;
    var btn_clear, btn_color;
    var strokeStyle = "#000000";
    var imgPoints=[];
    var timeoutSend;
    var timeoutGet;
    var get = false;

    function init() {
        canvas = document.getElementById("canvas");
        c = canvas.getContext("2d");

        btn_clear = document.getElementById("clear");
        btn_get = document.getElementById("get");
        btn_color = document.getElementById("colorpicker");

        tool = new tool_pencil();

        canvas.addEventListener("mousedown", ev_canvas, false);
        canvas.addEventListener("mousemove", ev_canvas, false);
        canvas.addEventListener("mouseup", ev_canvas, false);


        btn_clear.addEventListener("click", clear, false);
        btn_get.addEventListener("click", toggleGet, false);
        btn_color.addEventListener("change", color, false);
    }

    function tool_pencil() {
        var tool = this;
        this.started = false;

        this.mousedown = function (ev) {
//        	if(!get){
        		c.beginPath();
                c.moveTo(ev._x, ev._y);
                imgPoints.push([{x:ev._x, y:ev._y}]);
                tool.started = true;
//        	}
        };

        this.mousemove = function (ev) {
            if (tool.started) {
                c.lineTo(ev._x, ev._y);
                imgPoints[imgPoints.length-1].push({x:ev._x, y:ev._y});
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
        imgPoints = [];
        
    }

    function color(ev) {
        console.log(this.value);
        strokeStyle = this.value;
    }
    
    function draw(points){
    	c.clearRect(0, 0, canvas.width, canvas.height);
    	imgPoints = points;
    	if(points.length > 0){
    		for(var i = 0; i < points.length; i++){
    			if(points[i].length > 0){
    				c.beginPath();
                    c.moveTo(points[i][0].x, points[i][0].y);
                	for(var j = 1; j < points[i].length; j++){
                		c.lineTo(points[i][j].x, points[i][j].y);
                        c.strokeStyle = strokeStyle;
                        c.stroke();
                	}
    			}
    		}
    	}
    }
    
    function toggleGet(){
    	get = !get;
    }
    
    function sendImage() {
    	var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && (xmlHttp.status >= 200 && xmlHttp.status <= 299)){
            	timeoutSend = setTimeout(function(){
            		if(get){
            			getImage();
            		}
            		else{
            			sendImage();
            		}
            	},50)
            }
        }
        xmlHttp.open("PUT", "/Sribblio2/rest/endpoint/img", true); // true for asynchronous 
        xmlHttp.send(JSON.stringify(imgPoints));
    }

    function getImage() {
    	var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && (xmlHttp.status >= 200 && xmlHttp.status <= 299)){
            	draw(JSON.parse(xmlHttp.responseText));
            	timeoutGet = setTimeout(function(){
            		if(get){
            			getImage();
            		}
            		else{
            			sendImage();
            		}
            	},50)
            }
        }
        xmlHttp.open("GET", "/Sribblio2/rest/endpoint/img", true); // true for asynchronous 
        xmlHttp.send();
    }
    
    init();
    timeoutSend = setTimeout(function(){
    	sendImage();
//        getImage();
    })

}, false));

