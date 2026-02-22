// e开头：小数点
var pgf = new Image();
pgf.src = "./assets/mine/e0.png";

// fgf 对应 d0、d1、d2（你注释里的计时器数字）
var fgf = [];
fgf[0] = "./assets/mine/d0.png";
fgf[1] = "./assets/mine/d1.png";
fgf[2] = "./assets/mine/d2.png";

// sgf 对应 c0~c3：未点开、标记、触雷、雷
var sgf = [];
for(var i = 0; i < 4; i++) {
  sgf[i] = new Image();
}
sgf[0].src = "./assets/mine/c0.png";
sgf[1].src = "./assets/mine/c1.png";
sgf[2].src = "./assets/mine/c2.png";
sgf[3].src = "./assets/mine/c3.png";

// dgf 对应 d0~d9：表情包
var dgf = [];
for(var i = 0; i < 10; i++) {
  dgf[i] = new Image();
  dgf[i].src = "./assets/mine/b" + i + ".png";
}

// bgf 对应 a0~a8：棋盘数字0~8
var bgf = [];
for(var i = 0; i < 9; i++) {
  bgf[i] = new Image();
  bgf[i].src = "./assets/mine/a" + i + ".png";
}
