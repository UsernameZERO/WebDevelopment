
var sec=10;
function countDownto1(){
    if(sec == 1) clearInterval(id);
console.log(sec);
sec--;
};

var id = setInterval(countDownto1,500);

