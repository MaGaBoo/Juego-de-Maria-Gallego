const canvas = document.getElementById('game-canvas');

const ctx = canvas.getContext('2d');

const game = new Game(ctx);

const logo = document.getElementById('logo');
const start_button = document.getElementById('start-button');
const restart = document.getElementById('restart');

window.onload = function() {

    document.getElementById('start-button').onclick = () => {
        logo.remove();
        start_button.remove()
        game.start();
    }

    document.addEventListener('keydown', (event) => {
        game.oneKeyDown(event.keyCode);
    })

    document.addEventListener('keyup', (event) => {
        game.oneKeyUp(event.keyCode);
    })
    // don't scroll when arrow keys are pressed
    var keys = {};
    window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            e.preventDefault(); break; 
            default: break; // do not block other keys
        }
    },
    false);

    // dispatch event reload btn
    document.addEventListener('reload', () => {
        restart.classList.remove("hidden");
      });

    // re-start btn
    restart.onclick = () => {
        location.reload();
    };  
}



