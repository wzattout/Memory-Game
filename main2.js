        /*selecting document elements*/
//all is array for all images in document
var all = document.querySelectorAll('.backCard');
//restart buttom
var restart = document.getElementById("restart");
//solve button
var solve = document.getElementById("solve");
// Time Area
var time = document.getElementById("time");
// number of tries area
var tries = document.getElementById("tries");
// congratulation and finish area
var congratulations = document.getElementById("congratulations");
var finish =document.getElementById("finish");

//update time every second
var intervalTime;
//keep track of current time and number of tries
var seconds;
var numberTries;
//startFlag changes vaule when images fliped and refliped at the start of game
var startFlag;
//save number of hidden pairs
var endGame;
//save the hidden images src
var imageArray2;
//flag to keep track of is it the first or second image to click
var flag = 0;
//save clicked images
var image1, image2;

preStart();
//the game stage before click start
function preStart() {
    //reseting every thing
    startFlag=0;
    afterover();
    numberTries = 0;
    tries.innerHTML = "Number of tries " + numberTries;
    resetTime();
    restart.innerHTML = "Start";
    restart.removeEventListener('click', preStart);
    restart.addEventListener('click', start);
    solve.removeEventListener('click', solveClick);
    for (var i = 0; i < 36; i++)
        all[i].removeEventListener('click', myFunction);
    
    // implementation of 2 arrays with my size
    var imageArray = new Array();
    for (var i = 0; i < 36; i++) imageArray[i] = new Image();
    imageArray2 = new Array();
    for (var i = 0; i < 36; i++) imageArray2[i] = new Image();

    // I will put all my images in one array (imageArray)
    imageArray[0].src = 'images/image1.jpg';
    imageArray[1].src = 'images/image2.jpg';
    imageArray[2].src = 'images/image3.jpg';
    imageArray[3].src = 'images/image4.jpg';
    imageArray[4].src = 'images/image5.jpg';
    imageArray[5].src = 'images/image6.jpg';
    imageArray[6].src = 'images/image7.jpg';
    imageArray[7].src = 'images/image8.jpg';
    imageArray[8].src = 'images/image9.jpg';
    imageArray[9].src = 'images/image10.jpg';
    imageArray[10].src = 'images/image11.jpg';
    imageArray[11].src = 'images/image12.jpg';
    imageArray[12].src = 'images/image13.jpg';
    imageArray[13].src = 'images/image14.jpg';
    imageArray[14].src = 'images/image15.jpg';
    imageArray[15].src = 'images/image16.jpg';
    imageArray[16].src = 'images/image17.jpg';
    imageArray[17].src = 'images/image18.jpg';
    imageArray[18].src = 'images/image1.jpg';
    imageArray[19].src = 'images/image2.jpg';
    imageArray[20].src = 'images/image3.jpg';
    imageArray[21].src = 'images/image4.jpg';
    imageArray[22].src = 'images/image5.jpg';
    imageArray[23].src = 'images/image6.jpg';
    imageArray[24].src = 'images/image7.jpg';
    imageArray[25].src = 'images/image8.jpg';
    imageArray[26].src = 'images/image9.jpg';
    imageArray[27].src = 'images/image10.jpg';
    imageArray[28].src = 'images/image11.jpg';
    imageArray[29].src = 'images/image12.jpg';
    imageArray[30].src = 'images/image13.jpg';
    imageArray[31].src = 'images/image14.jpg';
    imageArray[32].src = 'images/image15.jpg';
    imageArray[33].src = 'images/image16.jpg';
    imageArray[34].src = 'images/image17.jpg';
    imageArray[35].src = 'images/image18.jpg';
    
    // moving images to another array(imageArray2) in random order
    for (var i = 0; i < 36; i++) {
        var rand = Math.floor(Math.random() * (36 - i));
        imageArray2[i] = imageArray[rand];
        imageArray.splice(rand, 1);
        //flip all cards to back
        all[i].src = 'images/cardback.jpg';
    }
}
//the game stage after click start
function start(e) {
    for (var i = 0; i < 36; i++) 
        all[i].src=imageArray2[i].src;
    startFlag=1;
    endGame = 18;
    startTime();
    solve.addEventListener('click', solveClick);
    restart.removeEventListener('click', start);
    restart.addEventListener('click', preStart);
    restart.innerHTML = "restart";
    
    for (var i = 0; i < 36; i++) {
        //remove event listners and readd them 
        all[i].removeEventListener('click', myFunction);
        all[i].addEventListener('click', myFunction);
    }
    flag = 0;
}
// function wait make system wait for ms mile seconds
function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

// myFunction flip the clicked image and save them
function myFunction(e) {
    var i = 0;
    while (event.target != all[i]) { i++; }
    event.target.src = imageArray2[i].src;
    // if it is the first click it save the clicked images in prev 
    if (flag === 0) {
        image1 = event.target;
        event.target.removeEventListener('click', myFunction);
        flag = 1;
    }
    // if it is the second click it compares the 2 images
    else {
        image2 = event.target;
        event.target.removeEventListener('click', myFunction);
        flag = 2;
    }
}


var intervalID = window.setInterval(myCallback, 500);
// myCallback works on 2 things showen below 
function myCallback() {
     // if 2 images clicked it checks conditions for them 
    if (flag === 2) {
        numberTries++;
        tries.innerHTML = "Number of tries " + numberTries;
        if (image1.src != image2.src) {
            wait(500);
            image1.src = 'images/cardback.jpg';
            image2.src = 'images/cardback.jpg';
            image1.addEventListener('click', myFunction);
            image2.addEventListener('click', myFunction);
        } else {
            endGame--;
            if (endGame == 0) GameOver();
        }
        flag = 0;
    }
    // works to reflip images when start button clicked
    if(startFlag === 1){
        startFlag=0;
        wait(2000);
        for (var i = 0; i < 36; i++) 
            all[i].src = 'images/cardback.jpg';
    }
}
//works when solve button clicked
function solveClick() {
    for (var i = 0; i < 36; i++) {
        all[i].src = imageArray2[i].src;
        all[i].removeEventListener('click', myFunction);
    }
    solve.removeEventListener('click', solveClick);
    window.clearInterval(intervalTime);
}
// start time from zero 
function startTime() {
    seconds = 0;
    intervalTime = window.setInterval(updateTime, 1000);
    function updateTime() {
        seconds++;
        time.innerHTML = "Time " + leftZero(Math.floor(seconds / 60)) + ":" +leftZero( seconds % 60);
    }
}
//add leading zeros
function leftZero(seconds){
    if(seconds<10){
        return "0"+seconds;
    }
    return seconds;
}
// show time in initial form 
function resetTime() {
    window.clearInterval(intervalTime);
    seconds = 0;
    time.innerHTML = "Time " + "00" + ":" + "00";
}
// GameOver stop time and change color when game done 
function GameOver() {
    window.clearInterval(intervalTime);
    congratulations.innerHTML = "congratulations";
    finish.innerHTML = "you have finished the game in the following";
    tries.style.color="green";
    time.style.color="green";
}
// afterover works if restart clicked after finishing game
function afterover(){
    congratulations.innerHTML = "";
    finish.innerHTML = "";
    tries.style.color="indigo";
    time.style.color="indigo";
}
