var runImage = 1;
var runWorker = 0;
var jumpWorker = 0;
var jumpImage = 1;
var jumpMarginTop = 300;
var backgroundWorker = 0;
var backgroundPosition = 0;
var score = 0;
var scoreWorker = 0;
var deadImage = 1;
var deadWorker = 0;
var flameMarginLeft = [500,1000,1500];
var flameWorker = 0;

var deadSound = new Audio("dead.mp3");

var runSound = new Audio("run.mp3");
runSound.loop = true;

var jumpSound = new Audio("jump.mp3");

function run(){

        runWorker = setInterval(()=>{

            runImage = runImage + 1 ;
            
            if(runImage > 8){
                runImage = 1;
        }
        document.getElementById("boy").src = "run" + runImage + ".png";

        }, 100);
}

function controller(event){
        
        if(event.key == "Enter"){

                if(runWorker == 0){
                        run();
                        moveBackground();
                        updateScore();
                        flameMarginLeft.forEach(createFlame);
                        runSound.play();
                        
                }
        }

        if(event.key == " "){
                
                if(jumpWorker == 0){

                        if(runWorker != 0){
                                clearInterval(runWorker);
                                runSound.pause();
                                jump();
                                jumpSound.play();
                        }
                        
                }
        }
}

function jump(){

        jumpWorker = setInterval(()=>{

                jumpImage = jumpImage + 1;
                
                if(jumpImage < 8){
                        jumpMarginTop = jumpMarginTop - 12;
                        document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
                }

                if(jumpImage > 7){
                        jumpMarginTop = jumpMarginTop + 12;
                        document.getElementById("boy").style.marginTop = jumpMarginTop + "px";    
                }
                
                

                if(jumpImage > 12){
                        jumpImage = 1;
                        clearInterval(jumpWorker);
                        jumpWorker = 0;
                        run();
                        runSound.play();
                }

        document.getElementById("boy").src = "jump" + jumpImage + ".png";
        },100);
}

function moveBackground(){

        backgroundWorker = setInterval(()=>{

                backgroundPosition = backgroundPosition - 10;
                document.getElementById("background").style.backgroundPositionX = backgroundPosition + "px";
        },50);
}

function updateScore(){

        scoreWorker = setInterval(()=>{

                score = score + 10;

                if(score == 5000){

                        alert("You Won");
                        window.location.reload();
                }
                document.getElementById("score").innerHTML = score;
        },100);
}

function dead(){

        deadWorker = setInterval(()=>{
                
                deadImage = deadImage + 1;

                if(deadImage > 10){

                        deadImage = 1;
                        clearInterval(deadWorker);
                        alert("Game Over");
                        window.location.reload();
        }
        document.getElementById("boy").src = "dead" + deadImage +".png";
        },100);
        
}

function createFlame(x){

        var f = document.createElement("img"); // f = <img />
        f.src = "flame.gif"; // <img src="flame.gif"/>
        f.className = "flame"; // f = <img src="flame.gif" class="flame"/>
        f.style.marginLeft = x + "px";
        document.getElementById("background").appendChild(f);

        flameWorker = setInterval(()=>{

                if(flameWorker != 0){

                        x = x - 20;
                        f.style.marginLeft = x + "px";
                }

                if(x == 200){
                        if(jumpWorker == 0){

                                clearInterval(runWorker);
                                clearInterval(scoreWorker);
                                clearInterval(backgroundWorker);
                                clearInterval(flameWorker);
                                flameWorker = 0;

                                dead();
                                deadSound.play();

                        }
                }
        },100);
}