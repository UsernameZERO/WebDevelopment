
//for events we use in this way

// $('#para2').click(()=>{
//     alert("clicked");
// })

// or we can use by handler
$('#para2').css('cursor','pointer');
$('#para2').on("click",()=>{
    alert("clicked");
})

$('a').on("click",(e)=>{
    // to prevent from redirecting we use
    e.preventDefault();
    alert("a is clicked");
})

