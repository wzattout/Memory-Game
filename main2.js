/*all is array for all images in document*/
var all=document.querySelectorAll('.backCard');
var restart=document.getElementById("restart");
var solve=document.getElementById("solve");
var time=document.getElementById("time");
var tries=document.getElementById("tries");
var congratulations=document.getElementById("congratulations");
var seconds;
var intervalTime;
var numberTries;
//save number of hidden pairs
var endGame;

var imageArray2;
/*flag to keep track of is it the first or second image to click*/
var flag=0;
/*save clicked images */
var image1,image2;

preStart();


function preStart(){
    numberTries=0;
    tries.innerHTML="number of tries "+numberTries;
    resetTime();
    restart.innerHTML="Start";
    restart.removeEventListener('click',preStart);
    restart.addEventListener('click',start);
    for(var i=0;i<36;i++)    
        all[i].addEventListener('click',start);
    /* implementation of 2 arrays with my size*/
        var imageArray=new Array();
        for(var i=0;i<36;i++) imageArray[i]=new Image();
        imageArray2=new Array();
        for(var i=0;i<36;i++) imageArray2[i]=new Image();
        
        /* I will put all my images in one array (imageArray)*/
            imageArray[0].src='images/image1.jpg';
            imageArray[1].src='images/image2.jpg';
            imageArray[2].src='images/image3.jpg';
            imageArray[3].src='images/image4.jpg';
            imageArray[4].src='images/image5.jpg';
            imageArray[5].src='images/image6.jpg';
            imageArray[6].src='images/image7.jpg';
            imageArray[7].src='images/image8.jpg';
            imageArray[8].src='images/image9.jpg';
            imageArray[9].src='images/image10.jpg';
            imageArray[10].src='images/image11.jpg';
            imageArray[11].src='images/image12.jpg';
            imageArray[12].src='images/image13.jpg';
            imageArray[13].src='images/image14.jpg';
            imageArray[14].src='images/image15.jpg';
            imageArray[15].src='images/image16.jpg';
            imageArray[16].src='images/image17.jpg';
            imageArray[17].src='images/image18.jpg';
            imageArray[18].src='images/image1.jpg';
            imageArray[19].src='images/image2.jpg';
            imageArray[20].src='images/image3.jpg';
            imageArray[21].src='images/image4.jpg';
            imageArray[22].src='images/image5.jpg';
            imageArray[23].src='images/image6.jpg';
            imageArray[24].src='images/image7.jpg';
            imageArray[25].src='images/image8.jpg';
            imageArray[26].src='images/image9.jpg';
            imageArray[27].src='images/image10.jpg';
            imageArray[28].src='images/image11.jpg';
            imageArray[29].src='images/image12.jpg';
            imageArray[30].src='images/image13.jpg';
            imageArray[31].src='images/image14.jpg';
            imageArray[32].src='images/image15.jpg';
            imageArray[33].src='images/image16.jpg';
            imageArray[34].src='images/image17.jpg';
            imageArray[35].src='images/image18.jpg';
            for(var i=0;i<36;i++){
                /* moving images to another array(imageArray2) in random order*/
                var rand=Math.floor(Math.random() * (36-i));
                imageArray2[i]=imageArray[rand];
                imageArray.splice(rand,1);
                //flip all cards to back
                all[i].src='images/cardback.jpg';
            }
            solve.removeEventListener('click',solveClick);
}
function start(e){
    endGame=18;
    startTime();
    solve.addEventListener('click',solveClick);
    restart.removeEventListener('click',start);
    restart.addEventListener('click',preStart);
    for(var i=0;i<36;i++)    
        all[i].removeEventListener('click',start);
    
        restart.innerHTML="restart";
    for(var i=0;i<36;i++){
        //remove event listners and readd them 
        all[i].removeEventListener('click',myFunction);
        all[i].addEventListener('click',myFunction);
    }
    flag=0;
    
    if(event.target.innerHTML!="restart"){
        var i=0;
        while(event.target!=all[i]) {i++;}
        event.target.src=imageArray2[i].src;
        image1=event.target;
        event.target.removeEventListener('click',myFunction);
        flag=1;
    }
}
/* function wait make system wait for ms mile seconds*/
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

/* myFunction1 just flip the clicked image*/
function myFunction(e) {
    var i=0;
    while(event.target!=all[i]) {i++;}
    event.target.src=imageArray2[i].src;
    console.log(flag);
    /* if it is the first click it save the clicked images in prev */
    if(flag===0){
        image1=event.target;
        event.target.removeEventListener('click',myFunction);
        flag=1;
    } 
    /*if it is the second click it compares the 2 images*/
    else{
        image2=event.target;
        event.target.removeEventListener('click',myFunction);
        flag=2;
    }
}




var intervalID = window.setInterval(myCallback, 500);

function myCallback() {
    if(flag===2){
        numberTries++;
        tries.innerHTML="number of tries "+numberTries;
        if(image1.src!=image2.src){
            wait(500);
            image1.src='images/cardback.jpg';
            image2.src='images/cardback.jpg';
            image1.addEventListener('click',myFunction);
            image2.addEventListener('click',myFunction);
        }else{
            endGame--;
            if(endGame==0) GameOver();
        }
        flag=0;
    }
}
function solveClick(){
    for(var i=0;i<36;i++){
        all[i].src=imageArray2[i].src;
        all[i].removeEventListener('click',myFunction);
    }
    solve.removeEventListener('click',solveClick);
    window.clearInterval(intervalTime);
}
function startTime(){
    seconds=0;
    intervalTime=window.setInterval(updateTime,1000);
    function updateTime(){
        seconds++;
        time.innerHTML="Time "+Math.floor(seconds/60)+":"+seconds%60;
        console.log(seconds);
    }
}
function resetTime(){
    window.clearInterval(intervalTime);
    seconds=0;
    time.innerHTML="Time "+0+":"+0;
}
function GameOver(){
    window.clearInterval(intervalTime);
    congratulations.innerHTML="congratulations";
}