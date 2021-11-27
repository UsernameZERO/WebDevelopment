//This Keyword

// console.log(this);
'use strict';
 function demo(a,b){
    console.log(this);
    console.log(a,b);
 } 
//demo();

var obj = {
    'prop1':12,
    // 'print':() => console.log(this)
    'print':function(){
        console.log(this);
    }
}


//demo();//In case of "use strict"; mode it is undefined
obj.print();
//demo.call(obj);
//demo.apply(obj);
demo.call(obj,2,3);
demo.apply(obj,[3,4]);