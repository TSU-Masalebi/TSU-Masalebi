//form1
let pv = document.getElementById('num1');
let i = document.getElementById('num2');
let n = document.getElementById('num3');
let answer = document.querySelector('[answer]');
let btn = document.getElementById('btn');

const fv = function(){
    let ii =Number(i.value)/100;
    let numi = Math.pow((1+ii),Number(n.value));
    let ansi =Number(pv.value)*numi;
    console.log(ansi);
    answer.innerText= ansi;
    answer.style.color='blue';
};
btn.onclick=fv;

///form2

let fv1 = document.getElementById('num11');
let i1 = document.getElementById('num12');
let n1 = document.getElementById('num13');
let answer1 = document.querySelector('[answer1]');
let btn1 = document.getElementById('btn1');

const pv1 = function(){
    let ii1 =Number(i1.value)/100;
    let numi1 = Math.pow((1+ii1),Number(n1.value));
    let ansi1 =Number(fv1.value)/numi1;
    console.log(ansi1);
    answer1.innerText= ansi1;
    answer1.style.color= 'green';
};
btn1.onclick=pv1;


////form3

let inv = document.getElementById('num21');
let i2 = document.getElementById('num22');
let n2 = document.getElementById('num23');
let answer2 = document.querySelector('[answer2]');
let btn2 = document.getElementById('btn2');

const fv11 = function(){
    let ii2 =Number(i2.value)/100;
    let inve =Number(inv.value);
    let numi2 = (Math.pow((1+ii2),Number(n2.value))-1)/ii2;
    let ansi2 =((inve*numi2)-inve)/Number(n2.value);
    console.log(ansi2);
    answer2.innerText= ansi2;
    answer2.style.color= 'orange';
};
btn2.onclick=fv11;
////form4

let pp = document.getElementById('num31');
let i3 = document.getElementById('num32');
let n3 = document.getElementById('num33');
let answer3 = document.querySelector('[answer3]');
let btn3 = document.getElementById('btn3');

const fv2 = function(){
    let ii3 =Number(i3.value)/100;
    let pp1 =Number(pp.value);
    let nnn=Number(n3.value);
    let numi3 = ((Math.pow((1+ii3),(nnn+1))-1)/ii3)-1;
    let ansi3 =pp1*numi3;
    console.log(ansi3);
    answer3.innerText= ansi3;
    answer3.style.color= 'gray';
};
btn3.onclick=fv2;

////form5

let pp2 = document.getElementById('num41');
let i4 = document.getElementById('num42');
let n4 = document.getElementById('num43');
let answer4 = document.querySelector('[answer4]');
let btn4 = document.getElementById('btn4');

const pv22 = function(){
    let ii4 =Number(i4.value)/100;
    let ppp =Number(pp2.value);
    let nnn4=Number(n4.value);
    let numi4 = (Math.pow((1+ii4),nnn4)-1)/(ii4*Math.pow((1+ii4),nnn4));
    let ansi4 =ppp*numi4;
    console.log(ansi4);
    answer4.innerText= ansi4;
    answer4.style.color= 'red';
};
btn4.onclick=pv22;

////form6

let pp3 = document.getElementById('num51');
let i5 = document.getElementById('num52');
let n5 = document.getElementById('num53');
let answer5 = document.querySelector('[answer5]');
let btn5 = document.getElementById('btn5');

const pv32 = function(){
    let ii5 =Number(i5.value)/100;
    let ppp1 =Number(pp3.value);
    let nnn5=Number(n5.value);
    let numi5 = ((Math.pow((1+ii5),(nnn5-1))-1)/(ii5*Math.pow((1+ii5),(nnn5-1))))+1;
    let ansi5 =ppp1*numi5;
    console.log(ansi5);
    answer5.innerText= ansi5;
    answer5.style.color= 'darkcyan';
};
btn5.onclick=pv32;

////form7

let face = document.getElementById('num61');
let i6 = document.getElementById('num62');
let r6 = document.getElementById('num64');
let n6 = document.getElementById('num63');
let answer6 = document.querySelector('[answer6]');
let btn6 = document.getElementById('btn6');

const pvb = function(){
    let ii6 =Number(i6.value)/100;
    let rr6 =Number(r6.value)/100;
    let facev =Number(face.value);
    let nn6=Number(n6.value);
    let numi6 = (Math.pow((1+ii6),nn6)-1)/(ii6*Math.pow((1+ii6),nn6));
    let bolo = Math.pow((1+ii6),nn6);
    let ansi6 =(facev*rr6*numi6)+(facev/bolo);
    console.log(ansi6);
    answer6.innerText= ansi6;
    answer6.style.color= 'dodgerblue';
};
btn6.onclick=pvb;

////form8

let urisko = document.getElementById('num71');
let mosal = document.getElementById('num72');
let beta = document.getElementById('num73');
let answer7 = document.querySelector('[answer7]');
let btn7 = document.getElementById('btn7');

const rMotx = function(){
    let urisko1 =Number(urisko.value)/100;
    let mosal1 =Number(mosal.value)/100;
    let betak =Number(beta.value);
    let ansi7 =urisko1 + ((mosal1-urisko1)*betak);
    console.log(ansi7);
    answer7.innerText= ansi7;
    answer7.style.color= 'green';
};
btn7.onclick=rMotx;