var oPrev = document.getElementById('prev'),
    oNext = document.getElementById('next'),
    oMain = document.getElementsByClassName('main')[0],
    oList = document.getElementsByClassName('list')[0],
    oLi = oList.getElementsByTagName('li'),
    oContainer = document.getElementsByClassName('container')[0];
var timer,timer2,
    oLiLength = oLi.length
    index = 0,
    flag = true;                                                                           
function moveImg(dis){
    flag = false;
    // dis想要移动的值
    var time = 400;// 每次轮播需要时间time为400毫秒
    var eachTime = 20 ; // 每小次移动的时间 eachTime 20 毫秒
    var eachDis = dis/(time/eachTime)// (time/eachTime)轮播一张图片需要多少小次移动//dis总距离//dis/(time/eachTime)结果等于需要的距离
    var newLeft = oMain.offsetLeft+dis;
    // 目标标点=当前的值+想要移动的值
    function eachMove(){
        if(dis > 0 && oMain.offsetLeft < newLeft || dis < 0 && oMain.offsetLeft > newLeft){
            oMain.style.left = oMain.offsetLeft + eachDis + 'px';
            // oMain.offsetLeft当前的值
        }else{
            clearInterval(timer);// 计时器清空
            oMain.style.left = newLeft +'px';// 强制挪到目标标点上
            if(newLeft == -3120){
            oMain.style.left = -520 +'px';
            // 5123451图片排序，当if判断在最后的图1时，立即跳到第二张图1位置
            }
            if(newLeft == 0){
            oMain.style.left = -2600 + 'px'; 
            // 5123451图片排序，当if判断在最前的图5时，立即跳到倒数二张图5位置
            }
            flag = true;
        }
    }
    timer = setInterval(eachMove,eachTime);
}
// 向上翻页
oPrev.onclick = function (){
    if(flag == false)return;
    moveImg(520);
    if(index == 0){
        index=4;
    }else{
        index--;
    }
    oLiStyle();
}
//向下翻页
oNext.onclick = function (){
    if(flag == false)return;
    moveImg(-520);
    if(index == 4){
        index=0;
    }else{
        index++;
    }
    oLiStyle();
}
// 图片小圆点
function oLiStyle(){
    oList.getElementsByClassName('active')[0].className = '';
    oLi[index].className = 'active';
}
for(var i=0; i<oLiLength; i++){
    (function(j){
        oLi[j].onclick = function (){
            var offset = (j-index)*-520;
            // j:点击的值 index:之前的值
            moveImg(offset);
            index = j;
            oLiStyle();
        }
    })(i);
}
timer2 = setInterval(oNext.onclick,2000);
oContainer.onmouseover = function(){
    clearInterval(timer2);
}
oContainer.onmouseout = function(){
    // 每个阁2秒自动轮播一次
    timer2 = setInterval(oNext.onclick,2000);
}