
var box1 = document.getElementById('box');
box1.addEventListener('mouseover',function(){
    console.log('Mouse-Over');
});

box1.addEventListener('mouseout',function(){
    console.log('Mouse-Out');
});

var searchInput = document.getElementById('search');
// searchInput.addEventListener('keypress',function(){
//     console.log('Key Pressed');
// });


document.addEventListener('keydown',function(event){
    console.log('Key down',event.keyCode);
});
