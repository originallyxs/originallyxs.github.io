var Bk1="#ddddd9",Bk2="#000",_color1=["rgba(65, 105, 225, 0.7)","rgba(65, 105, 225, 0.3)",Bk1,"black","blue","green"],_color2=["#6699cc","#336699",Bk2,"#e7e7e7","#99ccff","#ffff00"],_color=Array.from(_color2);
function setcolor(){
  var r=document.body.style,e=document.getElementsByTagName("a");
  if(document.getElementById("bcolor").checked){
    localStorage.setItem("night","1"),r.backgroundColor=Bk2,r.color="silver";
    for(var o=0;o<e.length;o++)e[o].style.color="silver";
    _color=Array.from(_color2)
  }else{
    localStorage.removeItem("night"),r.backgroundColor=Bk1,r.color="black";
    for(o=0;o<e.length;o++)e[o].style.color="";
    _color=Array.from(_color1)
  }
}
let cw=document.documentElement.clientHeight/13,cw2=cw/2,cw3=2*cw/3,cw4=9*cw/20,cw5=68*cw/100;
for(var wid=[4,2,2,4,2,2,4,2,2,4],pos=[],temp=0,i=0;i<10;i++)temp+=wid[i],pos[i]=temp,temp+=cw;
var arr=[],arr2=[];
let myA=document.getElementById("canA"),myB=document.getElementById("canB"),w=9*cw+24;
let penA=myA.getContext("2d"),penB=myB.getContext("2d");
function ArrNum(){var o=[];for(let r=1,e=0;r<=9;r++,e++)o[e]=r;return o}
function scramble(){
  let arrA=ArrNum();
  return arrA.sort(function(r,e){return 0.5-Math.random()}),arrA
}
function ok(){document.getElementById("info").style.display="none"}
function getArrB(e,o){
  var t=ArrNum();
  for(let r=0;r<9;r++)0!=arr[e][r]&&t.splice(t.indexOf(arr[e][r]),1);
  for(let r=0;r<9;r++)0!=arr[r][o]&&t.splice(t.indexOf(arr[r][o]),1);
  var r=3*Math.floor(e/3),n=3*Math.floor(o/3);
  for(let e=r;e<3+r;e++)for(let r=n;r<3+n;r++)0!=arr[e][r]&&t.splice(t.indexOf(arr[e][r]),1);
  return t
}
function rArrB(r){return Math.floor(Math.random()*r.length)}
function calc(){
  for(let e=0;e<9;e++)for(let r=0;r<9;r++){
    if(0==arr[e][r]){
      var o=getArrB(e,r);
      if(0==o.length)return!1;
      var t=rArrB(o);
      arr[e][r]=o[t]
    }
  }
  return!0
}
function dupArr(o){
  var t=[];
  for(let e=0;e<9;e++){t[e]=[];for(let r=0;r<9;r++)t[e][r]=o[e][r]}
  return t
}
null!=localStorage.getItem("night")&&(document.getElementById("bcolor").checked=!0);
var knum=localStorage.getItem("knum");
function $(r){return document.getElementById(r)}
function drawframe(){
  penA.lineWidth=4,penA.strokeStyle=_color[0],penA.beginPath();
  for(var r=0;r<4;r++){
    var e=pos[3*r]-2;
    penA.moveTo(0,e),penA.lineTo(w,e),penA.moveTo(e,0),penA.lineTo(e,w)
  }
  penA.lineTo(e,w+4),penA.closePath(),penA.stroke(),penA.lineWidth=2,penA.strokeStyle=_color[1],penA.beginPath();
  for(r=0;r<9;r++)r%3!=0&&(e=pos[r]-1,penA.moveTo(1,e),penA.lineTo(w,e),penA.moveTo(e,1),penA.lineTo(e,w));
  penA.closePath(),penA.stroke();
  penA.font=cw5+"px CurrentFont, sans-serif";
  penA.textAlign="center";
  penB.font=cw5+"px CurrentFont, sans-serif";
  penB.textAlign="center"
}
function drawA(){
  var o=0,t=2*Math.PI;
  for(let e=0;e<9;e++)for(let r=0;r<9;r++){
    var n=arr[e][r],a=(penA.fillStyle=_color[2],penA.fillRect(pos[r],pos[e],cw,cw),9==carr[n]);
    0!=n?(penA.fillStyle=1==arr2[e][r]?_color[5]:a?"orange":_color[3],penA.fillText(arr[e][r].toString(),pos[r]+cw2,pos[e]+cw3),curnum==n&&(penA.beginPath(),penA.arc(pos[r]+cw2,pos[e]+cw2,cw4,0,t),penA.strokeStyle=a?"orange":_color[4],penA.stroke())):o++
  }
  if(isValidSudoku()&&o==0){
    setTimeout(function(){document.getElementById("info").style.display="block"},200)
  }
  penB.fillStyle=_color[2],penB.fillRect(0,0,myB.width,myB.height);
  let tpos=1;
  for(var r=1;r<10;r++){
    var e=9==carr[r];
    penB.fillStyle=e?"orange":_color[3],penB.fillText(r.toString(),tpos+cw2,cw3),r==curnum&&(penB.beginPath(),penB.arc(tpos+cw2,cw2,cw4,0,t),penB.strokeStyle=e?"orange":_color[4],penB.stroke()),tpos+=cw
  }
}
function isValidSudoku(){
  for(let i=0;i<9;i++){
    let row=new Set(),col=new Set();
    for(let j=0;j<9;j++){
      if(arr[i][j]!=0&&row.has(arr[i][j]))return false;
      row.add(arr[i][j]);
      if(arr[j][i]!=0&&col.has(arr[j][i]))return false;
      col.add(arr[j][i]);
    }
  }
  for(let i=0;i<9;i+=3){
    for(let j=0;j<9;j+=3){
      let box=new Set();
      for(let x=i;x<i+3;x++){
        for(let y=j;y<j+3;y++){
          if(arr[x][y]!=0&&box.has(arr[x][y]))return false;
          box.add(arr[x][y]);
        }
      }
    }
  }
  return true;
}
null==knum&&(knum=init_num);
document.getElementById("knum").value=knum;
let carr=[];
function toAlign(){window.scrollTo(0,document.getElementById("startbtn").offsetTop-10)}
var curnum=1;
function start(){
  for(var r=0;r<9;r++){arr[r]=new Array;for(var e=0;e<9;e++)arr[r][e]=0}
  for(let t=0;t<3;t++){
    var n=scramble(1,9);
    let o=0;
    for(let e=3*t;e<3*t+3;e++)for(let r=3*t;r<3*t+3;r++)arr[e][r]=n[o],o++
  }
  let retry=0;
  for(var o=dupArr(arr);!calc()&&retry<100;){arr=dupArr(o);retry++}
  knum=parseInt(document.getElementById("knum").value);
  knum=81<knum?81:knum;
  knum<0&&(knum=0);
  document.getElementById("knum").value=knum;
  localStorage.setItem("knum",knum);
  for(var t=0;t<knum;){
    var a=Math.floor(9*Math.random()),c=Math.floor(9*Math.random());
    0!=arr[a][c]&&(arr[a][c]=0,t++)
  }
  for(let r=0;r<10;r++)carr[r]=0;
  for(let e=0;e<9;e++)for(let r=0;r<9;r++)carr[arr[e][r]]++;
  curnum=1;
  for(r=0;r<9;r++){arr2[r]=new Array;for(e=0;e<9;e++)arr2[r][e]=0}
  drawA()
}
function redraw(){setcolor(),drawframe(),drawA()}
function err(r,e){
  penA.fillStyle="red",penA.fillRect(pos[r],pos[e],cw,cw);
  penA.fillStyle=_color[3],penA.fillText(arr[e][r].toString(),pos[r]+cw2,pos[e]+cw3);
  setTimeout(()=>{drawA()},600)
}
function Check(r,e){
  var hasErr=0;
  for(var o=0,t=0;t<9;t++)arr[e][t]==curnum&&(err(t,e),hasErr=1);
  for(t=0;t<9;t++)arr[t][r]==curnum&&(err(r,t),hasErr=1);
  for(var n=3*Math.floor(r/3),a=3*Math.floor(e/3),c=3+n,l=3+a,f=a;f<l;f++)for(t=n;t<c;t++)arr[f][t]==curnum&&(err(t,f),hasErr=1);
  return hasErr
}
setcolor(),drawframe();
myA.onclick=function(e){
  e=e||window.event;
  var col=0;
  while(col<9&&e.offsetX>=pos[col])col++;
  col--;
  var row=0;
  while(row<9&&e.offsetY>=pos[row])row++;
  row--;
  var t=arr[row][col];
  0==t?0==Check(col,row)?(arr[row][col]=curnum,arr2[row][col]=1,carr[curnum]++,drawA()):void 0:(curnum!=t?curnum=t:1==arr2[row][col]&&(arr[row][col]=0,arr2[row][col]=0,carr[curnum]--),drawA())
};
myB.onclick=function(e){
  e=e||window.event;
  var col=0;
  while(col<9&&e.offsetX>=pos[col])col++;
  curnum=col,drawA()
};
