/*all is array for all images in document*/
var all=document.querySelectorAll('.backCard');

/* implementation of 2 arrays with my size*/
var imageArray=new Array();
for(var i=0;i<36;i++) imageArray[i]=new Image();
var imageArray2=new Array();
for(var i=0;i<36;i++) imageArray2[i]=new Image();

/* I will put all my images in one array (imageArray)*/
                /*we sould add 36 images here*/
    for(var i=0;i<18;i++)
        imageArray[i].src='images/me.jpg';
    for(var i=0;i<18;i++)
        imageArray[18+i].src='images/zattout.jpg';
                /*we sould add 36 images here*/


/* moving images to another array(imageArray2) in random order*/
for(var i=0;i<36;i++){
    var rand=Math.floor(Math.random() * (36-i));
    imageArray2[i]=imageArray[rand];
    imageArray.splice(rand,1);
}
/* function wait make system wait for ms mile seconds*/
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
/* core of implementation */
/*flag to keep track of is it the first or second image to click*/
var flag=0;
/*prev to save last image clicked */
var prev;
/* myFunction1 just flip the clicked image*/
function myFunction1(e) {
    var i=0;
    while(event.target!=all[i]) {i++;}
    event.target.src=imageArray2[i].src;
    console.log(event.target.src);
}
/* myFunction2 have 2 options */
function myFunction2(e){
    /* if it is the first click it save the clicked images in prev */
    if(flag===0){
        prev=event.target;
        flag=1;
    } 
    /*if it is the second click it compares the 2 images*/
    else{
        if(prev.src!=event.target.src){
            wait(2000);
            prev.src='images/cardback1.jpg';
            event.target.src='images/cardback1.jpg';
        }
        flag=0;
    }
}

/* add event listener for all images in the document*/
for(var j = 0; j < 36; j++) {
    all[j].addEventListener('click',function(e){myFunction1(e);});
    all[j].addEventListener('click',function(e){myFunction2(e);});
}
