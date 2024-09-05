alert("shiva")
let playerTurn=document.getElementsByClassName("playbut1")


const socket = io('http://127.0.0.1:5000');

// Event listener for successful connection
socket.on('connect', () => {
    console.log('Connected to server')
    socket.emit("default",1,2,"red")
    
});
let playId=0
let playercolor=document.getElementById("chose");
socket.on('playerColor',(color)=>{
    color1=color
    console.log(`Hello player ${color}`);
    
    if(color1==='blue'){
        console.log("blue ball")
        playercolor.classList.add('blue-box');
        playId=1
        playerTurn[0].textContent="Player  Turn"
    }else {
        playercolor.classList.add('red-box')
        console.log("red ball")
        playId=2
        console.log(playId)
        playerTurn[0].textContent="Player Blue Turn"
    }

});
socket.on('update',(id,no)=>{
    console.log(id);
    const buttons = document.querySelectorAll('.box');
    if(no==1){
    buttons[id].classList.add('blue-box')
    }else{
        buttons[id].classList.add('red-box')
    }
})
// JavaScript for sending button clicks to the server
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.box');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const buttonId = button.dataset.column;
            console.log(buttonId,playId)

            socket.emit('colorAndId', parseInt(buttonId, 10),playId);
        });
    });
});


// Event listener for disconnection
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

