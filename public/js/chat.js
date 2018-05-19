var x = 0;
var was = false;
var socket = io.connect('localhost:4000');

// Query DOM
let body = document.querySelector('body');
let len = document.querySelector('.len');

// მესიჯის input
var message = document.getElementById('message');
// პერსონის intput
var p_input = document.getElementById('p_input');
// პერსონის chose
var chose = document.getElementById('chose');
// პერსონის output
var p_output = document.getElementById('p_output');
// მიღებული მესიჯები
var output = document.getElementById('output');

 
p_input.addEventListener('click', function() {
    chose.style.display = "none";
    output.className = "in";
    
})

p_output.addEventListener('click', function() {
    chose.style.display = "none";
    message.style.display = "none";
    chose.style.display = "none";
    was = true;

    
})

// წერილის გაგზავნის ფუნქცია 
message.addEventListener('keyup', function() {
    if (event.keyCode == 13 ) {
        socket.emit('chat', {
            name: message.value.replace("\n", ""),
        })

        message.value = "";

    }
});

// Edit Customer Name
socket.on('edit', function(data) {
    var mes = document.querySelectorAll('#output p');
    mes[data.u_id].innerText = data.input;
    
})

// Delete Customer
socket.on('del', function(data) {
    output.removeChild(output.childNodes[data.del_id]);    
})
// Customers Length 
socket.on('lens', function(data) {
    len.innerText = data.leng;  
})

// Add Customer Name
socket.on('chat', function(data) {
    
    output.innerHTML += '<p contenteditable="true" tabindex="' + x + '">' + data.name + '</p>';
    var text = document.querySelectorAll('#output p');
    
    if (output.children.length > 4 & was) {
        output.removeChild(output.children[0]);    
    }
    
    for (let i = 0; i < text.length; i++ ) {
        text[i].addEventListener('keyup', function(){


            if (event.keyCode != 46) {
                socket.emit('edit', {
                    input: this.innerText,
                    u_id: this.tabIndex
                })            
            } else{
                
                socket.emit('del', {
                    del_id: this.tabIndex,
                    
                }) 

            }
        })    
    }
    x++;
});
