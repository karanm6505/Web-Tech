var events = require('events');
var Em = new events.EventEmitter();
var listener1 = function() 
{
    console.log("listener 1");
};
var listener2 = function()
{
    console.log("listener 2");
};
var listener3 = () => console.log("listener 3");
console.log("All three connections");
Em.on('connection',listener1);
Em.on('connection',listener2);
Em.on('connection',listener3);
Em.emit('connection');
Em.removeListener('connection',listener1);
console.log("Connection 1 no more");
Em.emit('connection');
Em.removeAllListeners('connection');
console.log("Removed all listeners");
Em.emit('connection');

