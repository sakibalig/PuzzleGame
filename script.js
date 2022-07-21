var movesCount=0;
document.getElementById('finish-alert').style.opacity=0;
document.getElementById('finish-alert').style.zIndex='-1';
document.getElementById('pause-icon').style.zIndex="-1";
function animateAgain(){
    document.getElementById('finish-alert').classList.remove("animate");
    void document.getElementById('finish-alert').offsetWidth;
    document.getElementById('finish-alert').classList.add("animate");
}
document.getElementById('puzzle-container').onclick=function(){
    for(let i=1;i<10;i++){
        let matchCount=0;
        if(document.getElementById(i).innerHTML==0){
            if(i%3==0){
                let arr=[i-3,i+3,i-1];
                let movableButton=arr.filter(ele=>document.getElementById(ele)!=null);
                for(let t=1;t<10;t++){
                    document.getElementById(t).onclick=function(){
                        if(movableButton.includes(t)){
                            swap(t,i);
                            againAnimation(i);
                            movesCount++;
                            if(document.getElementById('time-count').innerHTML=='0 s'){
                                myTimer = setInterval(myClock, 1000);
                            }
                        }
                    }
                }
                colourSetter();
            }
            else if((i-1)%3==0){
                let arr=[i-3,i+3,i+1];
                let movableButton=arr.filter(ele=>document.getElementById(ele)!=null);
                for(let t=1;t<10;t++){
                    document.getElementById(t).onclick=function(){
                        if(movableButton.includes(t)){
                            swap(t,i);
                            againAnimation(i);
                            movesCount++;
                            if(document.getElementById('time-count').innerHTML=='0 s'){
                                myTimer = setInterval(myClock,1000);
                            }
                        }
                    }
                }
                colourSetter();
            }
            else{
                let arr=[i-3,i+3,i+1,i-1];
                let movableButton=arr.filter(ele=>document.getElementById(ele)!=null);
                for(let t=1;t<10;t++){
                    document.getElementById(t).onclick=function(){
                        if(movableButton.includes(t)){
                            swap(t,i);
                            againAnimation(i);
                            movesCount++;
                            if(document.getElementById('time-count').innerHTML=='0 s'){
                                myTimer = setInterval(myClock, 1000);
                            }
                        }
                    }
                }
                colourSetter();
            }
            for(let j=1;j<9;j++){
                if(document.getElementById(j).innerHTML==j){
                    console.log('match=j');
                    matchCount++;
                    continue;
                }
                else{
                    matchCount=0;
                    break;
                }
            }
            if(matchCount==8){
                document.getElementById('finish-alert').style.opacity=1;
                document.getElementById('finish-alert').style.zIndex='10';
                document.getElementById('total-moves').innerHTML=movesCount;
                animateAgain();
                document.getElementById('puzzle-container').style.backgroundColor='white';
                document.getElementById('puzzle-container').style.borderRadius='2em';
                document.getElementById('puzzle-container').style.opacity=0.45;
                clearInterval(myTimer);
                document.getElementById('pause-btn').disable='true';
                if(document.getElementById('record-count').innerHTML==0){
                    document.getElementById('record-count').innerHTML=movesCount;
                }
                else if(document.getElementById('record-count').innerHTML>movesCount){
                    document.getElementById('record-count').innerHTML=movesCount;
                }
            }
            break;
        }
    }
    document.getElementById('moves-count').innerHTML=movesCount;
}
function colourSetter() {
    for (let k = 1; k < 10; k++) {
        if (document.getElementById(k).innerHTML <9&&document.getElementById(k).innerHTML >0) {
            document.getElementById('dig' + k).style.backgroundColor = 'rgb(162, 255, 0)';
        }
        else{
            document.getElementById('dig' + k).style.backgroundColor = 'rgb(170, 0, 255)';
        }
        if(document.getElementById(k).innerHTML==k){
            document.getElementById('dig'+k).style.backgroundColor='rgb(255, 0, 106)';
        }
    }
}
for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
        swap(Math.floor(Math.random()*9+1),Math.floor(Math.random()*9+1));
    }
}
colourSetter();
function swap(elem1,elem2){
    const element1=document.getElementById(elem1);
    const element2=document.getElementById(elem2);
    [element1.innerHTML,element2.innerHTML]=[element2.innerHTML,element1.innerHTML];
}
document.getElementById('pause-btn').onclick=()=>{
    if(movesCount!=0){
        document.getElementById('pause-btn').style.cursor='default';
        document.getElementById('pause-btn').onclick=function() {
            if(document.getElementById('pause-btn').innerHTML=='Pause'){
                document.getElementById('pause-icon').style.zIndex="10";
                document.getElementById('pause-icon').onclick=()=>{
                    document.getElementById('pause-icon').style.zIndex="0";
                    document.getElementById('pause-btn').innerHTML='Pause';
                    document.getElementById('pause-btn').style='none';
                    document.getElementById('puzzle-container').style='none';
                    document.getElementById('pause-icon').style.opacity=0;
                    myTimer = setInterval(myClock, 1000);
                }
                document.getElementById('pause-btn').innerHTML='Play';
                document.getElementById('pause-btn').style.backgroundColor='white';
                document.getElementById('pause-btn').style.color='black';
                document.getElementById('puzzle-container').style.backgroundColor='white';
                document.getElementById('puzzle-container').style.borderRadius='2em';
                document.getElementById('puzzle-container').style.opacity=0.45;
                document.getElementById('pause-icon').style.opacity=1;
                clearInterval(myTimer);
            }else{
                document.getElementById('pause-icon').style.zIndex="0";
                document.getElementById('pause-btn').innerHTML='Pause';
                document.getElementById('pause-btn').style='none';
                document.getElementById('puzzle-container').style='none';
                document.getElementById('pause-icon').style.opacity=0;
                myTimer = setInterval(myClock, 1000);
            }
        }
    }
    else{
        document.getElementById('pause-btn').style.cursor='not-allowed';
    }
}
function againAnimation(elem){
    document.getElementById('dig'+elem).classList.remove("animation");
    void document.getElementById('dig'+elem).offsetWidth;
    document.getElementById('dig'+elem).classList.add("animation");
}
document.getElementById('new-game').onclick=function(){
    document.getElementById('pause-btn').disable='false';
    for(let i=1;i<10;i++){
        againAnimation(i);
    }
    timer=0;
    clearInterval(myTimer);
    document.getElementById('time-count').innerHTML='0 s';
    movesCount=0;
    document.getElementById('moves-count').innerHTML=movesCount;
    if(document.getElementById('pause-btn').innerHTML=='Play'){
        document.getElementById('pause-btn').innerHTML='Pause';
        document.getElementById('pause-btn').style='none';
        document.getElementById('puzzle-container').style='none';
        document.getElementById('pause-icon').style.opacity=0;
    }
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            swap(Math.floor(Math.random()*9+1),Math.floor(Math.random()*9+1));
        }
    }
    colourSetter();
}
document.getElementById('play-again').onclick=function(){
    movesCount=0;
    document.getElementById('pause-btn').disable='false';
    document.getElementById('puzzle-container').style='none';
    for(let i=1;i<10;i++){
        againAnimation(i);
    }
    document.getElementById('finish-alert').style.opacity=0;
    document.getElementById('finish-alert').style.zIndex='-1';
    document.getElementById('moves-count').innerHTML=movesCount;
    if(document.getElementById('pause-btn').innerHTML=='Play'){
        document.getElementById('pause-btn').innerHTML='Pause';
        document.getElementById('pause-btn').style='none';
        document.getElementById('puzzle-container').style='none';
        document.getElementById('pause-icon').style.opacity=0;
    }
    timer=0;
    clearInterval(myTimer);
    document.getElementById('time-count').innerHTML='0 s';
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            swap(Math.floor(Math.random()*9+1),Math.floor(Math.random()*9+1));
        }
    }
    colourSetter();
}
var timer=0;
var myTimer;
function myClock() {
    ++timer
    document.getElementById('time-count').innerHTML = timer+' s';
}