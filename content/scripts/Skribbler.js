

if (window.addEventListener('load', function () {

    //var gameManger = new gameManger();
    
    var canvas, c, tool;
    var btn_clear, btn_color;
    var strokeStyle = "#000000";

    function init() {
        canvas = document.getElementById("canvas");
        c = canvas.getContext("2d");

        btn_clear = document.getElementById("clear");
        btn_color = document.getElementById("colorpicker");

        tool = new tool_pencil();

        canvas.addEventListener("mousedown", ev_canvas, false);
        canvas.addEventListener("mousemove", ev_canvas, false);
        canvas.addEventListener("mouseup", ev_canvas, false);


        btn_clear.addEventListener("click", clear, false)
        btn_color.addEventListener("change", color, false)
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

    function color(ev) {
        console.log(this.value);
        strokeStyle = this.value;
    }

    init();

}, false));
