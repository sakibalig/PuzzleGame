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
    let best=document.getElementById('best');
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
    const applyPauseStyle=()=>{
        alert.style.opacity=1;
        alert.style.zIndex='10';
        moves.innerHTML=movesCount;
        animateAgain(digId);
        contStyle.backgroundColor='white';
        contStyle.borderRadius='2em';
        contStyle.zIndex="-1";
        contStyle.opacity=0.45;
        clearInterval(myTimer);
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
    const handleLeftPress=()=>{
        let i=parseInt(id);
        i=(i%3?i:10);
        // console.log("l",i);
        // console.log(i+1);
        if(document.getElementById(i+1)!=null){
            handleAfterStart();
            againAnimation([i,i+1]);
            swap(i,i+1);
            aroundMaster();
            colourSetter();
        }
    }
    const handleRightPress=()=>{
        let i=parseInt(id);
        i=((i-1)%3?i:11);
        // console.log("r",i);
        if(document.getElementById(i-1)!=null){
            handleAfterStart();
            againAnimation([i,i-1]);
            swap(i,i-1);
            aroundMaster();
            colourSetter();
        }
    }
    const handleDownPress=()=>{
        // console.log("d",id);
        if(document.getElementById(id-3)!=null){
            handleAfterStart();
            againAnimation([id,id-3]);
            swap(id,id-3);
            aroundMaster();
            colourSetter();
        }
    }
    const handleUpPress=()=>{
        let i=parseInt(id);
        // console.log("u",i);
        if(document.getElementById(i+3)!=null){
            handleAfterStart();
            againAnimation([i,i+3]);
            swap(i,i+3);
            aroundMaster();
            colourSetter();
        }
    }
    const handleAfterStart=()=>{
        pause.style.cursor='pointer';
        // console.log(movableButton);
        movesCount++;
        if(tempTimer==0){
            // console.log("start");
            myTimer = setInterval(myClock, 1000);
            setTimeout(()=>{
                tempTimer++;
            },1)
        }
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
        let finished=0;
        if(matchCount==8){
            pause.style.cursor="not-allowed";
            applyPauseStyle();
            totalMoves.innerHTML=movesCount;
            if(best.innerHTML==0){
                best.innerHTML=movesCount;
                localStorage.setItem(best, movesCount);
            }
            else if(best.innerHTML>movesCount){
                best.innerHTML=movesCount;
                localStorage.setItem(best, movesCount);
            }
            finished=1;
        }
        moves.innerHTML=movesCount;
        if(finished){
            movesCount=0;
        }
    }
    const handleKeyPress=(e)=>{
        let key=e.keyCode;
        if((pause.innerHTML=="Pause")&&(key==37||key==38||key==39||key==40)){
            e.preventDefault();
            if(key==37){
                handleLeftPress();
            }
            else if(key==38){
                handleUpPress();
            }
            else if(key==39){
                handleRightPress();
            }
            else{
                handleDownPress();
            }
        }
    }
    window.addEventListener("keydown",handleKeyPress);
    let havePersonalBest=localStorage.getItem(best)!=null;
    // console.log(havePersonalBest);
    best.innerHTML=(havePersonalBest?localStorage.getItem(best):0);
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
                    colourSetter();
                    handleAfterStart();
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
        contStyle.backgroundColor='transparent';
        contStyle.borderRadius='none';
        contStyle.zIndex="10";
        contStyle.opacity=1;
        alert.style.opacity=0;
        alert.style.zIndex='-10';
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
        console.log("clicked");
        handleNewGame();
    }
}
window.addEventListener('DOMContentLoaded',AfterLoad);
