var txt = "abcDEfghIJk";
a = txt.charAt(0);
document.write(a+"<br>");
b = txt.charCodeAt(0);
document.write(b+"<br>");
c = txt.substring(1,3);
document.write(c+"<br>");
d = txt.substr(1,1);
document.write(d+"<br>");
document.writeln(d+"<br>")
document.write(txt.slice(1,3)+"<br>");
document.write(txt.toUpperCase()+"<br>");
document.write(txt.toLowerCase()+"<br>");
var txt1 = "lmnoPQrStuvWxyz";
document.write(txt.concat(txt1)+"<br>")
document.write(txt.trim()+"<br>")
var text4 = "       Hello World!     ";
console.log(text4);
console.log(text4.trim());


const college1 = {fn:"PES",ln:"Uni",age:50};
document.write(college1.fn + "<t>" + college1.ln + "<t>" + college1.age + "<br>")
const college2 = new Object
    college2.fn = "PES"
    college2.ln = "IT"
    college2.age = 49
document.write(college2.fn + "<t>" + college2.ln + "<t>" + college2.age + "<br>")


function Person(first,age,eye)
{                                   
    this.firstname = first
    this.age = age
    this.eye = eye
    this.fullname = function()
    {
        document.write("Hi")
    };
}

const f = new Person("john",50,"blue");
f.fullname();

class X
{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
    }
        z()
        {
            document.write(this.x+this.y)
        };
    
}
var a = new X(1,2)
a.z();
var b = new X(3,4)










