
var curr="square";

var shape = ["square", "triangle-bottomleft", "triangle-topright", "triangle-down", "oval", "circle", "rectangle"];

var color =["red", "orange", "green", "maroon", "pink", "violet"];

document.getElementById("shape").onclick = function () {
    var rand = shape[Math.floor(Math.random() * shape.length)];
    document.getElementById(curr).setAttribute("id", rand);
    curr = rand;
}

document.getElementById("color").onclick = function () {
    var randColor = color[Math.floor(Math.random() * color.length)];
    document.getElementById("round").style.backgroundColor = randColor;
}
