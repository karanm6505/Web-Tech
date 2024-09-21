function asc(a,b)
{
    if(a>b)
        return 1;
    if(a<b)
        return -1;
    if(a==b)
        return 0;
}
const a =['a','b','c','d'];
document.write(a+"<br>");
a.push("e");
document.write(a+"<br>");
a.pop();
document.write(a+"<br>");
var x = a.at(1);
document.write(x+"<br>");
a.shift();
document.write(a+"<br>");
a.unshift("m");
document.write(a+"<br>");
a.splice(2,2,"o","p");
document.write(a+"<br>");

document.write(a.slice(1,3)+"<br>");
a.sort();
document.write(a+"<br>");
a.reverse();
document.write(a+"<br>");
document.write(a.join("*")+"<br>");
delete(a[1]);
document.write(a+"<br>");
var alp=["a","b","c"];
var num=["1","2","3"];
document.write(num.concat(alp));
function myGreeting()
{
    document.write("Timeout"+"<br>");
}
function myGreeting1()
{
    document.write("Interval"+"<br>");
}
const myTimeout = setTimeout(myGreeting,5000);
const myInterval = setInterval(myGreeting1,6000);

