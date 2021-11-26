
var box = document.getElementsByClassName('box');
var clicks = document.getElementById('cnt');
var count=0;
box = addEventListener('click',function(){
    count++;
    console.log(count);
    clicks.innerText= count+" ";
});
