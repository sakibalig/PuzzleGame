async function AfterLoad(){
    let movesCount=0;
    let time=0;
    let myTimer,tempTimer=0;
    const timer=document.getElementById('time');
    let pause=document.getElementById('pause-btn');
    let contStyle=document.querySelector('.puzzle-container').style;
    const alert=document.getElementById('finish-alert');
    const pauseIcon=document.getElementById('pause-icon');
    const moves=document.getElementById('moves');
    const totalMoves=document.getElementById('total-moves');
    let best=document.getElementById('record-count')
    const newGame=document.getElementById('new-game');
    const playAgain=document.getElementById('play-again');
    alert.style.opacity=0;
    alert.style.zIndex='-10';
    pauseIcon.style.zIndex="-10";
    function animateAgain(){
        alert.classList.remove("animate");
        void alert.offsetWidth;
        alert.classList.add("animate");
    }
    let dig,digArr,masterBox,arr,movableButton,id,digId;
    const aroundMaster=()=>{
        dig=document.getElementsByClassName('digit');
        digArr=[dig[0],dig[1],dig[2],dig[3],dig[4],dig[5],dig[6],dig[7],dig[8]];
        digId=digArr.map(e=>parseInt(e.id));
        masterBox=digArr.filter(e=>document.getElementById(e.id).innerHTML==0);
        id=masterBox[0].id;
        arr=[id-3,parseInt(id)+3,((id-1)%3?(id-1):10),((id)%3?(parseInt(id)+1):10)];
        movableButton=arr.filter(ele=>document.getElementById(ele)!=null);
    }
    const swap=(elem1,elem2)=>{
        const e1=document.getElementById(elem1);
        const e2=document.getElementById(elem2);
        [e1.innerHTML,e2.innerHTML]=[e2.innerHTML,e1.innerHTML];
    }
    const suffle=()=>{
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                swap(Math.floor(Math.random()*9+1),Math.floor(Math.random()*9+1));
            }
        }
    }
    const againAnimation=(elem)=>{
        elem.map(e=>{
            const ele=document.getElementById(e);
            // console.log(1,ele.classList);
            ele.classList.remove("animation");
            // console.log(2,ele.classList);
            void ele.offsetWidth;
            ele.classList.add("animation");
            // console.log(3,ele.classList);
        })
    }
    const colourSetter=()=> {
        digArr.map(e=>{
            // console.log(e);
            const ele=document.getElementById(e.id);
            if(ele.innerHTML==0){
                ele.style.backgroundColor = 'rgb(170, 0, 255)';
            }
            else if(parseInt(ele.innerHTML)==e.id){
                ele.style.backgroundColor='rgb(255, 0, 106)';
            }
            else{
                ele.style.backgroundColor = 'rgb(162, 255, 0)';
            }
        })
    }
    const myClock=()=>{
        ++time;
        // console.log(time);
        timer.innerHTML = time+' s';
    }
    suffle();
    aroundMaster();
    againAnimation(digId);
    colourSetter();
    digId.map((e)=>{
        // console.log(e.id);
        document.getElementById(e).onclick=()=>{
            let searchId=e;
            // console.log(movableButton.includes(e.id));
            // console.log(movableButton);
            movableButton.map(e=>{
                if(e==searchId){
                    // console.log(id);
                    // console.log(e);
                    againAnimation([e,parseInt(id)]);
                    swap(e,id);
                    aroundMaster();
                    pause.style.cursor='pointer';
                    // console.log(movableButton);
                    movesCount++;
                    if(tempTimer==0){
                        console.log("start");
                        myTimer = setInterval(myClock, 1000);
                        setTimeout(()=>{
                            tempTimer++;
                        },1)
                    }
                    colourSetter();
                    let matchCount=0;
                    for(let j=1;j<9;j++){
                        if(document.getElementById(j).innerHTML==j){
                            matchCount++;
                            continue;
                        }
                        else{
                            matchCount=0;
                            break;
                        }
                    }
                    if(matchCount==8){
                        alert.style.opacity=1;
                        alert.style.zIndex='10';
                        moves.innerHTML=movesCount;
                        animateAgain(digId);
                        contStyle.backgroundColor='white';
                        contStyle.borderRadius='2em';
                        clearInterval(myTimer);
                        totalMoves.innerHTML=movesCount;
                        if(best.innerHTML>movesCount){
                            best.innerHTML=movesCount;
                        }
                    }
                    document.getElementById('moves').innerHTML=movesCount;
                }
            })
        }
    })
    const play=()=>{
        pauseIcon.style.zIndex="0";
        pause.innerHTML='Pause';
        pause.style='none';
        pause.style.cursor="pointer";
        contStyle.backgroundColor='transparent';
        contStyle.borderRadius='none';
        contStyle.zIndex="10";
        contStyle.opacity=1;
        pauseIcon.style.opacity=0;
    }
    pauseIcon.onclick=()=>{
        play();
        myTimer = setInterval(myClock, 1000);
    }
    pause.onclick=()=>{
        if(movesCount!=0){
            if(pause.innerHTML=='Pause'){
                pauseIcon.style.zIndex="10";
                pauseIcon.style.opacity=1;
                pause.innerHTML='Play';
                pause.style.backgroundColor="white";
                pause.style.color="black";
                // console.log(contStyle);
                contStyle.backgroundColor='white';
                contStyle.borderRadius='2em';
                contStyle.zIndex="-1";
                contStyle.opacity=0.45;
                clearInterval(myTimer);
            }
            else{
                play();
                myTimer = setInterval(myClock, 1000);
                // console.log(contStyle);
            }
        }
        else{
            pause.style.cursor='not-allowed';
        }
    }
    const handleNewGame=()=>{
        pause.style.cursor="not-allowed";
        time=0;
        tempTimer=0;
        clearInterval(myTimer);
        timer.innerHTML='0 s';
        movesCount=0;
        moves.innerHTML=movesCount;
        if(pause.innerHTML=='Play'){
            play();
        }
        suffle();
        aroundMaster();
        againAnimation(digId);
        colourSetter();
    }
    newGame.onclick=function(){
        handleNewGame();
    }
    playAgain.onclick=function(){
        handleNewGame();
    }
}
window.addEventListener('DOMContentLoaded',AfterLoad);
