/*
 * 写在开头
 * 欢迎您接入初源系统。
 * 本文件（mine2.js）：扫雷游戏核心逻辑。
 * 体验端：https://originallyxs.us.ci/mine.html
 * 我们采用将代码注释掉的方式删除代码，并在后方标注删除人名称。
 * 下一个版本将会把所有注释代码删除。
 * 版本号 3.0.0
 */
function c(t) { return document.getElementById(t); }

var m, v, r, B, C, d = [],
    h = [-1, -1, -1, 0, 0, 1, 1, 1, 0],
    p = [-1, 0, 1, -1, 1, -1, 0, 1, 0];

var bgf, sgf, fgf, dgf, pgf;
var D, R, E, H;

function initImages() {
    bgf = [new Image(), new Image(), new Image()];
    sgf = [new Image(), new Image(), new Image(), new Image()];
    fgf = [new Image(), new Image(), new Image()];
    dgf = Array(10).fill().map(() => new Image());
    pgf = new Image();
}

function q(t, e) {
    R.drawImage(bgf[0], 25 * t, 25 * e);
    setTimeout(() => {
        d[e][t][0] === 0 && R.drawImage(sgf[0], 25 * t, 25 * e);
    }, 120);
}

function s(t, e) {
    let n = d[e][t];
    if (n[1] === 1) return;
    if (n[0] = 1, R.drawImage(bgf[n[2]], 25 * t, 25 * e), --B === 0) J();
    else if (n[2] === 0) {
        for (let a = 0; a < 8; a++) {
            let o = e + p[a], r = t + h[a];
            o >= 0 && o < v && r >= 0 && r < m && d[o][r][0] === 0 && s(r, o);
        }
    }
}

function J() {
    for (let e = 0; e < v; e++) {
        for (let t = 0; t < m; t++) {
            d[e][t][0] === 0 && A(t, e);
        }
    }
    E(r);
    c("face").src = fgf[1];
    clearInterval(X);
}

function A(t, e) {
    let n = d[e][t];
    if (n[0] === 0) {
        n[1] = 1;
        C--;
        R.drawImage(sgf[1], 25 * t, 25 * e);
        E(C);
    } else if (n[0] === 2) {
        n[1] = 0;
        C++;
        R.drawImage(bgf[0], 25 * t, 25 * e);
        E(C);
    }
}

function U() {
    d = [];
    for (let e = 0; e < v; e++) {
        d[e] = [];
        for (let t = 0; t < m; t++) {
            d[e][t] = [0, 0, 0];
        }
    }
    let mines = 0;
    while (mines < r) {
        let t = Math.floor(Math.random() * m), e = Math.floor(Math.random() * v);
        if (d[e][t][2] !== 9) {
            d[e][t][2] = 9;
            mines++;
        }
    }
    for (let e = 0; e < v; e++) {
        for (let t = 0; t < m; t++) {
            if (d[e][t][2] !== 9) {
                let count = 0;
                for (let a = 0; a < 8; a++) {
                    let o = e + p[a], r = t + h[a];
                    o >= 0 && o < v && r >= 0 && r < m && d[o][r][2] === 9 && count++;
                }
                d[e][t][2] = count;
            }
        }
    }
    B = m * v - r;
    C = r;
}

function ft() {
    D = c("paf");
    R = D.getContext("2d");
    let t = 25 * m;
    D.style.width = 4 + t + "px";
    D.width = t;
    D.height = 25 * v;
    c("face").src = fgf[0];
    for (let e = 0; e < m; e++) {
        for (let n = 0; n < v; n++) {
            R.drawImage(sgf[0], 25 * e, 25 * n);
        }
    }
}

function startGame(size) {
    clearInterval(X);
    if (size === 'basic') { m = 9; v = 9; r = 10; }
    else if (size === 'medium') { m = 16; v = 16; r = 40; }
    else if (size === 'expert') { m = 30; v = 16; r = 99; }
    U();
    ft();
    E(r);
    H(0);
}

var X, o, st;
function gt() {
    o = Date.now();
    st = 0;
    X = setInterval(() => { H(++st); }, 1000);
}

function Q(n) {
    let canvas = c("rm"), ctx = canvas.getContext("2d");
    canvas.width = 13 * n.toString().length;
    n.toString().split('').forEach((c, i) => {
        ctx.drawImage(dgf[parseInt(c)], 13 * i, 0);
    });
}

function tt(n) {
    let canvas = c("es"), ctx = canvas.getContext("2d");
    let str = n.toString().padStart(3, '0');
    canvas.width = 13 * 3;
    ctx.drawImage(dgf[parseInt(str[0])], 0, 0);
    ctx.drawImage(dgf[parseInt(str[1])], 13, 0);
    ctx.drawImage(pgf, 26, 0);
    ctx.drawImage(dgf[parseInt(str[2])], 39, 0);
}

function start() {
    initImages();
    E = Q;
    H = tt;
    startGame('basic');
}

window.onload = start;
