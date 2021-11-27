

var student1={
    name:'abc',
    marks:50,
    rollNo:10
};

var student2={
    name:'abcd',
    marks:80,
    rollNo:20
};

console.log(student1);
console.log(student2);

function createStudent(name,marks,rollNo){
    var obj = {};
    obj.name = name;
    obj.marks = marks;
    obj.rollNo=rollNo;
    return obj;

}
var student3=createStudent('zxcc',90,13);
// console.log(student3);