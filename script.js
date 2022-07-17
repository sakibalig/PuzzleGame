var movesCount=1;
function swap(elem1,elem2){
    [document.getElementById(elem1).innerHTML,document.getElementById(elem2).innerHTML]=[document.getElementById(elem2).innerHTML,document.getElementById(elem1).innerHTML];
    [document.getElementById(elem1).style.background,document.getElementById(elem2).style.background]=[document.getElementById(elem2).style.background,document.getElementById(elem1).style.background];
}
if(movesCount==0){
    document.querySelector('#pause-btn').disabled=true;
}
else{
    document.getElementById('pause-btn').onclick=function() {
        if(document.getElementById('pause-btn').innerHTML=='Pause'){
            document.getElementById('pause-icon').onclick=()=>{
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
            document.getElementById('pause-btn').innerHTML='Pause';
            document.getElementById('pause-btn').style='none';
            document.getElementById('puzzle-container').style='none';
            document.getElementById('pause-icon').style.opacity=0;
            myTimer = setInterval(myClock, 1000);
        }
    }
}
document.getElementById('new-game').onclick=function(){
    document.getElementById('dig'+1).style.backgroundColor='rgb(162, 255, 0)';
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
    for(let i=1;i<9;i++){
        if(document.getElementById(i).innerHTML<9){
            document.getElementById('dig'+i).style.backgroundColor='rgb(162, 255, 0)';
        }
        else{
            document.getElementById('dig'+i).style.backgroundColor='rgb(208, 80, 29)';
        }
    }
}
var timer=0;
var myTimer;
function myClock() {
    ++timer
    document.getElementById('time-count').innerHTML = timer+' s';
}


