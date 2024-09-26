var p1 = new Promise(
    function(resolve,reject)
    {
        const x = "apple";
        const y = "apple";
    
    if(x===y)
        {resolve();}
    else
        {reject();}
});

p1.then(function(){document.write("yes")});
p1.catch(function(){document.write("no")});

