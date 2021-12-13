
var para2 = document.getElementById('para2');
para2.innerHTML = "Welcome";

// instead of writing this way we write it in

$('#para1').html('Welcome');

// Here $ is a function $(query) we can
// write any query

//we can hide the para

$('#para2').hide();

// we can get and set height and width  
$('#para1').height();

console.log($('#para1').width(100));



