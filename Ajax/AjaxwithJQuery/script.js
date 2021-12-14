
 fetchRandomDog = ()=>{
//  $.ajax({
//      url:'https://dog.ceo/api/breeds/image/random',
//      method: 'GET',
//      success: (data)=>{
//         var imageURL = data.message;
//         $('#dog-image').attr('src',imageURL);
//      }
//  })
// Or we can write in this way in a single line as well

$.get('https://dog.ceo/api/breeds/image/random',(data)=>{
    var imageURL = data.message;
    $('#dog-image').attr('src',imageURL);
 });
}

$('#btnfetch').click(fetchRandomDog);
