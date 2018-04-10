
var socket = io.connect('http://localhost:4000');

// Query DOM
let body = document.querySelector('body');
// მომხმარებლის სურათი 
let user = document.getElementById('user');
// მესიჯის input
var message = document.getElementById('message');
// მომხმარებლის სახელი
var handle = document.querySelector('#me strong');
// გასაგზავნი ღილაკი
var btn = document.getElementById('send');
// მიღებული მესიჯები
var output = document.getElementById('output');
// ფონის შესაცვლელი
var background = document.getElementById('background');
// მეორე მომხმარებლის წერის ტექსტი
var feedback = document.getElementById('feedback');
var now = document.getElementById('now');
// წერილის ხმა
var song = document.getElementById('req');
// ფონის დასაყენებელი ღილაკი
var send_url = document.getElementById('su');
// ფონის დასაყენებელის დამალვა
var close_wall = document.getElementById('close-wall');
var wall = document.getElementById('wall');
var btn_change = document.getElementById('ch-w');
// ქალის სახელები
let girl = ['guka', 'maka', 'nino', 'mari', 'ani', 'anano', 'mariami', 'guranda', 'natia', 'nana', 'gvanca'];
// კაცის სახელები
let boy =  ['giorgi', 'avto', 'miriani', 'gurami', 'lasha', 'zura', 'tazo', 'tamazi', 'dato', 'irakli', 'gela']; 
// მომხმარებლის სახელის ჩაწერა
var name = prompt("შენი სახელი");
// მომხმარებლის სახელი
handle.innerText = name;

close_wall.addEventListener('click', function() {
    background.style.transform = "translateY(100%)";
})
// ფონის შესაცვლელი input-ის event
btn_change.addEventListener('click', function() {
    background.style.transform = "translateY(0)";
});
// მომხმარებლის სურათის სქესის მიხედვით ამოცნობას
for (let l = 0; l < boy.length; l++) {
    // ქალის ამოცნობა
    if (name == girl[l]) {
        user.style.backgroundImage = 'url("girl.png")';
        break;
    }
    // კაცის ამოცნობა
    else if(name == boy[l]){
        user.style.backgroundImage = 'url("boy.png")';
        break;
    }
    
};


// Emit Listen
// ფონის შეცვლის ფუნქცია

send_url.addEventListener('click', function() {
    socket.emit('change',{
        wallpaper: wall.value,
        name: handle.innerText
    });
    body.style.backgroundImage = 'url("' + wall.value + '")';
});

// წერილის გაგზავნის ფუნქცია 
btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.innerText
    })

    message.value = "";

});
// შეტყობინება 
message.addEventListener('keyup', function() {
    socket.emit('typing', handle.innerText);
});

socket.emit('online', name);

socket.on('online', function(data){
    now.innerHTML += '<li class="btn btn-success">ჩატს დაემატა '+ data + '</li>';
});

socket.on('change', function(data){
    body.style.backgroundImage = 'url("' + data.wallpaper + '")';
    now.innerHTML += '<li class="btn btn-primary"> ფონი შემცველი: '+ data.name + '</li>';
});

socket.on('chat', function(data) {
    output.innerHTML += '<p><strong>' + data.handle + '</strong><b>:</b>' + data.message + '</p>';
    feedback.innerHTML = "";
    if (handle.innerText != data.handle) {
        song.play();
    }
    you();
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing message...</em></p>';
});

//  YOU
function you() {
    var output_p = document.querySelectorAll('#output p strong');

    var i;
    for(i = 0; i < output_p.length; i++){

        if(output_p[i].innerText == handle.innerText){
            output_p[i].parentNode.className = "other btn";
        }else{
            output_p[i].parentNode.className = " btn";
        }
    }
}
