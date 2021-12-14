var btnfetch = document.getElementById('btnfetch');
let dog = document.getElementsByClassName('dogAtrandom');
var dImage = document.getElementById('dog-image');

function fetchImage(){
    var xreq = new XMLHttpRequest();
    xreq.onload = ()=>{
        console.log(xreq.response);
        var responseJson = JSON.parse(xreq.response);
        console.log(responseJson);
        var imageURL = responseJson.message;
        dImage.setAttribute('src',imageURL);
    };

    xreq.open('get','https://dog.ceo/api/breeds/image/random',true);
    xreq.send();

}

btnfetch.addEventListener('click',fetchImage);
