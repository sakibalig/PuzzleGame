async function AfterLoad(){
    let movesCount=0;
    let time=0;
    let myTimer;
    const timer=document.getElementById('time');
    // const alert=document.getElementById('finish-alert');
    // const pause=document.getElementById('pause-icon');
    // alert.style.opacity=0;
    // alert.style.zIndex='-1'
    // pause.style.zIndex="-1";
    // function animateAgain(){
    //     alert.classList.remove("animate");
    //     void alert.offsetWidth;
    //     alert.classList.add("animate");
    // }
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
                    // console.log(movableButton);
                    movesCount++;
                    if(timer.innerHTML=='0 s'){
                        console.log("start");
                        myTimer = setInterval(myClock, 1000);
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
                    // if(matchCount==8){
                    //     document.getElementById('finish-alert').style.opacity=1;
                    //     document.getElementById('finish-alert').style.zIndex='10';
                    //     document.getElementById('total-moves').innerHTML=movesCount;
                    //     animateAgain();
                    //     document.getElementById('puzzle-container').style.backgroundColor='white';
                    //     document.getElementById('puzzle-container').style.borderRadius='2em';
                    //     document.getElementById('puzzle-container').style.opacity=0.45;
                    //     clearInterval(myTimer);
                    //     document.getElementById('pause-btn').disabled=true;
                    //     if(document.getElementById('record-count').innerHTML==0){
                    //         document.getElementById('record-count').innerHTML=movesCount;
                    //     }
                    //     else if(document.getElementById('record-count').innerHTML>movesCount){
                    //         document.getElementById('record-count').innerHTML=movesCount;
                    //     }
                    // }
                    document.getElementById('moves').innerHTML=movesCount;
                }
            })
        }
    })
    let pause=document.getElementById('pause-btn');
    let contStyle=document.querySelector('.puzzle-container').style;
    pause.onclick=()=>{
        if(movesCount!=0){
            pause.style.cursor='default';
            if(pause.innerHTML=='Pause'){
                // document.getElementById('pause-icon').style.zIndex="0";
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
                // document.getElementById('pause-icon').onclick=()=>{
                //     document.getElementById('pause-icon').style.zIndex="0";
                //     document.getElementById('pause-btn').innerHTML='Pause';
                //     document.getElementById('pause-btn').style='none';
                //     document.getElementById('puzzle-container').style='none';
                //     document.getElementById('pause-icon').style.opacity=0;
                //     myTimer = setInterval(myClock, 1000);
                // }
                pause.innerHTML='Pause';
                pause.style='none';
                contStyle.backgroundColor='transparent';
                contStyle.borderRadius='none';
                contStyle.zIndex="1";
                contStyle.opacity=1;
                // console.log(contStyle);
                // document.getElementById('pause-icon').style.opacity=0;
                myTimer = setInterval(myClock, 1000);
            }
        }
        else{
            pause.style.cursor='not-allowed';
        }
    }
    document.getElementById('new-game').onclick=function(){
        document.getElementById('pause-btn').disabled=false;
        againAnimation(digId);
        time=0;
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
        document.getElementById('pause-btn').disabled=false;
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
        time=0;
        clearInterval(myTimer);
        document.getElementById('time-count').innerHTML='0 s';
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                swap(Math.floor(Math.random()*9+1),Math.floor(Math.random()*9+1));
            }
        }
        colourSetter();
    }
}
window.addEventListener('DOMContentLoaded',AfterLoad);
