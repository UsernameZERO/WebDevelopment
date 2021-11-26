
var toggle=false;

var Ht = document.getElementsByTagName('h1')[0];
var Btag = document.getElementsByTagName('body')[0];
var circle = document.getElementById('circle');

document.getElementById('toggle').onclick = function(){
    if(!toggle){

        Ht.classList.add("color-white");
        Btag.classList.add("color-black");
        circle.style.marginLeft="115px";

        toggle=true;
    }else{
        Ht.classList.remove("color-white");
        Btag.classList.remove("color-black");
        circle.style.marginLeft="1px";

        toggle=false;
    }
}