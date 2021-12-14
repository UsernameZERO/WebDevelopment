
var corse = document.getElementById("courses");
var butn = document.getElementById("btn");
var cntr = document.getElementById("cntr");

function newCourses(){

    var xhreq = new XMLHttpRequest();
    xhreq.onload = ()=>{
        var resJson = JSON.parse(xhreq.response);
        var courses = resJson.data.courses;
        for(let course of courses){
            cntr.remove();
            const divv = document.createElement('div');
            divv.setAttribute("class","imaage");
            var img = document.createElement('img');
            img.setAttribute('src',course.preview_image_url);
            img.setAttribute("class","space");
            img.setAttribute("alt","...");
            var divv1 = document.createElement('div');
            divv1.setAttribute("class","details");
            var p1 = document.createElement('p');
            var p2 = document.createElement('p');
            p1.setAttribute("class","names");
            p1.innerHTML=course.name;
            p2.innerHTML=course.level;
            p2.setAttribute("class","names right");
            divv1.append(p1,p2);
            divv.append(img,divv1);
            corse.appendChild(divv);
        }
    }
    xhreq.open("get","https://codingninjas.in/api/v3/courses",true);
    xhreq.send();
}

butn.addEventListener('click',newCourses);
