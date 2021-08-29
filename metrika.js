//form1
let yMon = document.querySelectorAll('[ymon]');
let xMon = document.querySelectorAll('[xmon]');
let tbody = document.getElementById('tbody');
let tKritic = document.getElementById('tKritic');
let fKritic = document.getElementById('fKritic');
let xPrognozi = document.getElementById('xPrognozi');
let yMonArray = [];
let xMonArray = [];
let num = 4;

function add() {
    let newA = `<tr>
    <td>
        <input type="text" ymon ${num++} name="mon${num}y" id="mon${num}y">
    </td>       
    <td>
        <input type="text" xmon name="mon${num}x" id="mon${num}x">
    </td>
</tr>`
    $('#tbody').append(newA)

    yMon = document.querySelectorAll('[ymon]');
    xMon = document.querySelectorAll('[xmon]');
}

function takeResults() {
    yMonArray = [];
    for (let i = 0; i < yMon.length; i++) {
        yMonArray.push(Number(yMon[i].value))
    };
    xMonArray = [];
    for (let i = 0; i < xMon.length; i++) {
        xMonArray.push(Number(xMon[i].value))
    };
    console.log(yMonArray, xMonArray);

    // საწყისი გამოთვლები:
    let n = yMonArray.length;
    let ySum = yMonArray.reduce((acc, curr) => acc + curr);
    let xSum = xMonArray.reduce((acc, curr) => acc + curr);
    let ySashualo = ySum / n;
    let xSashualo = xSum / n;
    let ykvadtebisArr = [];
    for (value of yMonArray) {
        ykvadtebisArr.push(Math.pow(value, 2))
    };
    let yKvadtebisSum = ykvadtebisArr.reduce((acc, curr) => acc + curr);
    let xkvadtebisArr = [];
    for (value of xMonArray) {
        xkvadtebisArr.push(Math.pow(value, 2))
    };
    let xKvadtebisSum = xkvadtebisArr.reduce((acc, curr) => acc + curr);
    let xyArr = [];
    for (let i = 0; i < yMonArray.length; i++) {
        xyArr.push(yMonArray[i] * xMonArray[i])
    }
    let xySum = xyArr.reduce((acc, curr) => acc + curr);

    console.log("n, ySum, xSum, ySashualo, xSashualo, yKvadtebisSum, xKvadtebisSum, xySum");
    console.log(n, ySum, xSum, ySashualo, xSashualo, yKvadtebisSum, xKvadtebisSum, xySum);

    // გამოთვლების ნაწილი 1

    let yVar = (yKvadtebisSum / n) - Math.pow(ySashualo, 2);
    let xVar = (xKvadtebisSum / n) - Math.pow(xSashualo, 2);
    let xyCov = (xySum / n) - (ySashualo * xSashualo);
    let rxy = (-xyCov) / Math.sqrt(yVar * xVar);
    let Rkvadrati = Math.pow(rxy, 2);
    console.log("yVar, xVar, xyCov, rxy, Rkvadrati");
    console.log(yVar, xVar, xyCov, rxy, Rkvadrati);

    // გამოთვლების ნაწილი 2 (რეგრესიის განტოლების აგება)

    let b = xyCov / xVar;
    let a = ySashualo - (b * xSashualo);
    let gantoleba = `y = ` + a + ` + (` + b + `)x`;
    console.log(b, a, gantoleba);

    // გამოთვლების ნაწილი 3 (სტანდარტული შეცდომები)

    let eVar = yVar * (1 - Rkvadrati);
    let SeKvadrati = (n / (n - 2)) * eVar;
    let SbKvadrati = SeKvadrati / (n * xVar);
    let SaKvadrati = (SeKvadrati / n) * (1 + (Math.pow(xSashualo, 2) / xVar));
    let Sb = Math.sqrt(SbKvadrati);
    let Sa = Math.sqrt(SaKvadrati);
    console.log("eVar, SeKvadrati, SbKvadrati, SaKvadrati, Sb, Sa");
    console.log(eVar, SeKvadrati, SbKvadrati, SaKvadrati, Sb, Sa);

    // გამოთვლების ნაწილი 4

    let ta = a / Sa;
    let tb = b / Sb;
    let F = ((n - 2) * Rkvadrati) / (1 - Rkvadrati);
    let nishani1 = '>';
    let nishani2 = '<';
    let texti1 = ' ';
    let texti2 = 'არ ';
    const gamotvlata = function () {
        if (Math.abs(ta) > tKritic.value) {
            return nishani1;
        } else {
            return nishani2;
        };
    };
    const gamotvlatatext = function () {
        if (Math.abs(ta) > tKritic.value) {
            return texti1;
        } else {
            return texti2;
        };
    };

    const gamotvlatb = function () {
        if (Math.abs(tb) > tKritic.value) {
            return nishani1;
        } else {
            return nishani2;
        };
    };
    const gamotvlatbtext = function () {
        if (Math.abs(tb) > tKritic.value) {
            return texti1;
        } else {
            return texti2;
        };
    };

    const gamotvlaF = function () {
        if (F > fKritic.value) {
            return nishani1;
        } else {
            return nishani2;
        };
    };
    const gamotvlaFtext = function () {
        if (F > fKritic.value) {
            return texti;
        } else {
            return texti2;
        };
    };

    console.log(gamotvlata(), gamotvlatb(), gamotvlaF());
    // გამოთვლების ნაწილი 6 (პროგნოზირება)

    let yPrognozi = a + (b * xPrognozi.value);
    let sKvadratYebisprSx = SeKvadrati * (1 + (1 / n) + (Math.pow((xPrognozi.value - xSashualo), 2) / (n * xVar)));
    let sYebisprSx = Math.sqrt(sKvadratYebisprSx, 2);
    let YshualedisSawyisi = yPrognozi - (tKritic.value * sYebisprSx);
    let YshualedisSaboloo = yPrognozi + (tKritic.value * sYebisprSx);

    // პასუხი
    let answer = `<p>
    Var(x)= ${xVar};  Var(y)= ${yVar};<br>
    Cov(x, y)= ${xyCov};<br>
    r<sub>xy</sub>= ${rxy};<br>
    R<sup>2</sup>= ${Rkvadrati};<br>
</p>
<h6>რეგრესიის განტოლებას აქვს შემდეგი სახე: ${gantoleba}<br>  </h6>
<h6>S<sub>a</sub>= ${Sa};  S<sub>b</sub>= ${Sb};</h6>
<p>( Var(e)= ${eVar};  S<sub>e</sub><sup>2</sup>= ${SeKvadrati};)</p>
<hr>
<p>
    H<sub>0</sub>: &alpha; = 0 <br>
    H<sub>1</sub>: &alpha; &#8800; 0 <br>

    &#10072; t<sub>a</sub>&#10072;=${Math.abs(ta)} ${gamotvlata()} ${tKritic.value}=t<sub>კრ</sub> <br>
    <b> a ${gamotvlatatext()}არის მნიშვნეოვანი; </b><br>
    H<sub>0</sub>: &beta; = 0 <br>
    H<sub>1</sub>: &beta; &#8800; 0 <br>
    
    &#10072; t<sub>b</sub>&#10072;=${Math.abs(tb)} ${gamotvlatb()} ${tKritic.value}=t<sub>კრ</sub>
    <br>
    <b> b ${gamotvlatbtext()}არის მნიშვნეოვანი;</b><br>

    H<sub>0</sub>: R<sup>2</sup> = 0 <br>
    H<sub>1</sub>: R<sup>2</sup> &#8800; 0 <br>
    F= ${F}${gamotvlaF()} ${fKritic.value}=F<sub>კრ</sub> <br>
    <b>მთლიანი მოდელი ${gamotvlaFtext()}არის მნიშვნელოვანი.</b>                
</p>
    <hr>
<h6>
    x*= ${xPrognozi.value}; <br> &#375;*= ${yPrognozi};  <br>
    ${YshualedisSawyisi} < y* < ${YshualedisSaboloo}  <br>
    (S<sub>&#375;*-y*</sub> =${sYebisprSx})
</h6>`

    $('#answer').append(answer)
}


//meore kalkilatori

let yMoni = document.querySelectorAll('[ymoni]');
let xMoni = document.querySelectorAll('[xmoni]');
let xxMoni = document.querySelectorAll('[xxmoni]');
let tbodyi = document.getElementById('tbodyi');
let tKriticuli = document.getElementById('tKriticuli');
let fKriticuli = document.getElementById('fKriticuli');
let yMoniArray = [];
let xMoniArray = [];
let xxMoniArray = [];
let numi = 4;

function addi() {
    let newB = `<tr>
    <td>
        <input type="text" ymoni ${numi++} name="moni${numi}y" id="moni${numi}y">
    </td>       
    <td>
        <input type="text" xmoni name="moni${numi}x" id="moni${numi}x">
    </td>
    <td>
        <input type="text" xxmoni name="moni${numi}xx" id="moni${numi}xx">
    </td>
</tr>`
    $('#tbodyi').append(newB)

    yMoni = document.querySelectorAll('[ymoni]');
    xMoni = document.querySelectorAll('[xmoni]');
    xxMoni = document.querySelectorAll('[xxmoni]');
}

function takeResultsi() {
    yMoniArray = [];
    for (let i = 0; i < yMoni.length; i++) {
        yMoniArray.push(Number(yMoni[i].value))
    };
    xMoniArray = [];
    for (let i = 0; i < xMoni.length; i++) {
        xMoniArray.push(Number(xMoni[i].value))
    };
    xxMoniArray = [];
    for (let i = 0; i < xxMoni.length; i++) {
        xxMoniArray.push(Number(xxMoni[i].value))
    };
    console.log(yMoniArray, xMoniArray, xxMoniArray)

    // საწყისი გამოთვლები:
    let ni = yMoniArray.length;
    let ySumi = yMoniArray.reduce((acc, curr) => acc + curr);
    let xSumi = xMoniArray.reduce((acc, curr) => acc + curr);
    let xxSumi = xxMoniArray.reduce((acc, curr) => acc + curr);
    let ySashualoi = ySumi / ni;
    let xSashualoi = xSumi / ni;
    let xxSashualoi = xxSumi / ni;

    let ykvadtebisArray = [];
    for (value of yMoniArray) {
        ykvadtebisArray.push(Math.pow(value, 2))
    };
    let yKvadtebisSumi = ykvadtebisArray.reduce((acc, curr) => acc + curr);
    let xkvadtebisArray = [];
    for (value of xMoniArray) {
        xkvadtebisArray.push(Math.pow(value, 2))
    };
    let xKvadtebisSumi = xkvadtebisArray.reduce((acc, curr) => acc + curr);
    let xxkvadtebisArray = [];
    for (value of xxMoniArray) {
        xxkvadtebisArray.push(Math.pow(value, 2))
    };
    let xxKvadtebisSumi = xxkvadtebisArray.reduce((acc, curr) => acc + curr);

    let xyArray = [];
    for (let i = 0; i < yMoniArray.length; i++) {
        xyArray.push(yMoniArray[i] * xMoniArray[i])
    }
    let xySumi = xyArray.reduce((acc, curr) => acc + curr);
    let xxyArray = [];
    for (let i = 0; i < yMoniArray.length; i++) {
        xxyArray.push(yMoniArray[i] * xxMoniArray[i])
    }
    let xxySumi = xxyArray.reduce((acc, curr) => acc + curr);
    let xxxArray = [];
    for (let i = 0; i < xMoniArray.length; i++) {
        xxxArray.push(xMoniArray[i] * xxMoniArray[i])
    }
    let xxxSumi = xxxArray.reduce((acc, curr) => acc + curr);

    console.log("ni, ySumi, xSumi, xxSumi, ySashualoi, xSashualoi, xxSashualoi, yKvadtebisSumi, xKvadtebisSumi, xxKvadtebisSumi, xySumi, xxySumi, xxxSumi");
    console.log(ni, ySumi, xSumi, xxSumi, ySashualoi, xSashualoi, xxSashualoi, yKvadtebisSumi, xKvadtebisSumi, xxKvadtebisSumi, xySumi, xxySumi, xxxSumi);

    // გამოთვლების ნაწილი 1

    let yVari = (yKvadtebisSumi / ni) - Math.pow(ySashualoi, 2);
    let xVari = (xKvadtebisSumi / ni) - Math.pow(xSashualoi, 2);
    let xxVari = (xxKvadtebisSumi / ni) - Math.pow(xxSashualoi, 2);
    let xyCova = (xySumi / ni) - (ySashualoi * xSashualoi);
    let xxyCova = (xxySumi / ni) - (ySashualoi * xxSashualoi);
    let xxxCova = (xxxSumi / ni) - (xSashualoi * xxSashualoi);
    let rxyi = (xyCova) / Math.sqrt(yVari * xVari);
    let rxxyi = (xxyCova) / Math.sqrt(yVari * xxVari);
    let rxxxi = (xxxCova) / Math.sqrt(xVari * xxVari);
    let Rkvadrat = ((Math.pow(rxyi, 2) + Math.pow(rxxyi, 2) - (2 * rxyi * rxxyi * rxxxi)) / (1 - Math.pow(rxxxi, 2)));
    console.log("yVari, xVari, xxVari, xyCova, xxyCova, xxxCova, rxyi, rxxyi, rxxxi, Rkvadrat");
    console.log(yVari, xVari, xxVari, xyCova, xxyCova, xxxCova, rxyi, rxxyi, rxxxi, Rkvadrat);

    // გამოთვლების ნაწილი 2 (რეგრესიის განტოლების აგება)

    let b1 = ((xxVari * xyCova) - (xxyCova * xxxCova)) / ((xVari * xxVari) - Math.pow(xxxCova, 2));
    let b2 = ((xVari * xxyCova) - (xyCova * xxxCova)) / ((xVari * xxVari) - Math.pow(xxxCova, 2));
    let b0 = ySashualoi - (b1 * xSashualoi) - (b2 * xxSashualoi);
    let gantoleba2 = `y = ` + b0 + ` + (` + b1 + `)x<sub>1</sub>` + ` + (` + b2 + `)x<sub>2</sub>`;
    console.log(b1, b2, b0, gantoleba2);

    // გამოთვლების ნაწილი 3

    let Sy = Math.sqrt(yVari);
    let Sx = Math.sqrt(xVari);
    let Sxx = Math.sqrt(xxVari);
    let b1Talgiani = b1 * (Sx / Sy);
    let b2Talgiani = b2 * (Sxx / Sy);
    let gantoleba2Omega = `W = ` + b1Talgiani + `z<sub>1</sub>` + ` + (` + b2Talgiani + `)z<sub>2</sub>`;
    console.log(Sy, Sx, Sxx, gantoleba2Omega);

    // გამოთვლების ნაწილი 4 (სტანდარტული შეცდომები)

    let eVari = yVari * (1 - Rkvadrat);
    let SeKvadrat = (ni / (ni - 3)) * eVari;
    let Sb1Kvadrat = SeKvadrat / (ni * (1 - Math.pow(rxxxi, 2)) * xVari);
    let Sb2Kvadrat = SeKvadrat / (ni * (1 - Math.pow(rxxxi, 2)) * xxVari);
    let Sb0Kvadrat = (SeKvadrat / (ni *(1 - Math.pow(rxxxi, 2)))) * (1 + (Math.pow(xSashualoi, 2) / xVari) + (Math.pow(xxSashualoi, 2) / xxVari) - ((Math.pow(xxxCova, 2)+(2*xSashualoi*xxSashualoi*xxxCova))/(xVari*xxVari)));
    let Sb1 = Math.sqrt(Sb1Kvadrat);
    let Sb2 = Math.sqrt(Sb2Kvadrat);
    let Sb0 = Math.sqrt(Sb0Kvadrat);
    console.log("eVari, SeKvadrat, Sb1Kvadrat, Sb2Kvadrat, Sb0Kvadrat, Sb1, Sb2, Sb0");
    console.log(eVari, SeKvadrat, Sb1Kvadrat, Sb2Kvadrat, Sb0Kvadrat, Sb1, Sb2, Sb0);

    // გამოთვლების ნაწილი 4

    let tb0 = b0 / Sb0;
    let tb1 = b1 / Sb1;
    let tb2 = b2 / Sb2;
    let RkvadratXaziani= Rkvadrat -((2/ni-3)*(1-Rkvadrat));
    let F = ((ni - 3) * Rkvadrat) / (2*(1 - Rkvadrat));
    let nishani11 = '>';
    let nishani21 = '<';
    let texti11 = ' ';
    let texti21 = 'არ ';
    const gamotvlatb0 = function () {
        if (Math.abs(tb0) > tKriticuli.value) {
            return nishani11;
        } else {
            return nishani21;
        };
    };
    const gamotvlatb0text = function () {
        if (Math.abs(tb0) > tKriticuli.value) {
            return texti11;
        } else {
            return texti21;
        };
    };

    const gamotvlatb1 = function () {
        if (Math.abs(tb1) > tKriticuli.value) {
            return nishani11;
        } else {
            return nishani21;
        };
    };
    const gamotvlatb1text = function () {
        if (Math.abs(tb1) > tKriticuli.value) {
            return texti11;
        } else {
            return texti21;
        };
    };

    const gamotvlatb2 = function () {
        if (Math.abs(tb2) > tKriticuli.value) {
            return nishani11;
        } else {
            return nishani21;
        };
    };
    const gamotvlatb2text = function () {
        if (Math.abs(tb2) > tKriticuli.value) {
            return texti11;
        } else {
            return texti21;
        };
    };

    const gamotvlaF1 = function () {
        if (F > fKriticuli.value) {
            return nishani11;
        } else {
            return nishani21;
        };
    };
    const gamotvlaF1text = function () {
        if (F > fKriticuli.value) {
            return texti11;
        } else {
            return texti21;
        };
    };

    console.log(gamotvlatb0(), gamotvlatb1(), gamotvlatb2(), gamotvlaF1());
    
    // გამოთვლების ნაწილი 5 

    let b0shualedisSawyisi = b0 - (tKriticuli.value * Sb0);
    let b0shualedisSaboloo = b0 + (tKriticuli.value * Sb0);

    let b1shualedisSawyisi = b1 - (tKriticuli.value * Sb1);
    let b1shualedisSaboloo = b1 + (tKriticuli.value * Sb1);

    let b2shualedisSawyisi = b2 - (tKriticuli.value * Sb2);
    let b2shualedisSaboloo = b2 + (tKriticuli.value * Sb2);

    // პასუხი 2
    let answeri = `<p>
    Var(x<sub>1</sub>)= ${xVari}; Var(x<sub>2</sub>)= ${xxVari};  Var(y)= ${yVari};<br>
    Cov(x<sub>1</sub>, y)= ${xyCova}; Cov(x<sub>2</sub>, y)= ${xxyCova}; Cov(x<sub>1</sub>, x<sub>2</sub>)= ${xxxCova};<br>
    r<sub>x<sub>1</sub>y</sub>= ${rxyi}; r<sub>x<sub>2</sub>y</sub>= ${rxxyi}; r<sub>x<sub>1</sub>x<sub>2</sub></sub>= ${rxxxi};<br>
    R<sup>2</sup>= ${Rkvadrat};<br>
</p>
<h6>რეგრესიის განტოლებას აქვს შემდეგი სახე: <br> ${gantoleba2}<br>
რეგრესიის განტოლება სტანდარტიზებულ მასშტაბში კი: <br> ${gantoleba2Omega} </h6>
<p>(S<sub>y</sub>=${Sy}; S<sub>x<sub>1</sub></sub>=${Sx}; S<sub>x<sub>2</sub></sub>=${Sxx}; )</p>
<h6> კოეფიციენტების სტანდარტული შეცდომებია: <br>
S<sub>b<sub>0</sub></sub>= ${Sb0};  S<sub>b<sub>1</sub></sub>= ${Sb1}; S<sub>b<sub>2</sub></sub>= ${Sb2};</h6>
<p>( Var(e)= ${eVari};  S<sub>e</sub><sup>2</sup>= ${SeKvadrat};)</p>
<hr>
<p>
    H<sub>0</sub>: &beta;<sub>0</sub> = 0 <br>
    H<sub>1</sub>: &beta;<sub>0</sub> &#8800; 0 <br>

    &#10072; t<sub>b<sub>0</sub></sub>&#10072;=${Math.abs(tb0)} ${gamotvlatb0()} ${tKriticuli.value}=t<sub>კრ</sub> <br>
    <b> b<sub>0</sub> ${gamotvlatb0text()}არის მნიშვნეოვანი; </b><br>
    H<sub>0</sub>: &beta;<sub>1</sub> = 0 <br>
    H<sub>1</sub>: &beta;<sub>1</sub> &#8800; 0 <br>
    
    &#10072; t<sub>b</sub>&#10072;=${Math.abs(tb1)} ${gamotvlatb1()} ${tKriticuli.value}=t<sub>კრ</sub>
    <br>
    <b> b<sub>1</sub> ${gamotvlatb1text()}არის მნიშვნეოვანი;</b><br>
    H<sub>0</sub>: &beta;<sub>2</sub> = 0 <br>
    H<sub>1</sub>: &beta;<sub>2</sub> &#8800; 0 <br>
    
    &#10072; t<sub>b</sub>&#10072;=${Math.abs(tb2)} ${gamotvlatb2()} ${tKriticuli.value}=t<sub>კრ</sub>
    <br>
    <b> b<sub>2</sub> ${gamotvlatb2text()}არის მნიშვნეოვანი;</b><br>

    <hr>
    კოეფიციენტების ნდობის ინტერვალები: 
    b<sub>j</sub> - t<sub>კრ</sub>* S<sub>b<sub>j</sub></sub> < &beta;<sub>j</sub> < b<sub>j</sub> + t<sub>კრ</sub>* S<sub>b<sub>j</sub></sub> <br>
    ${b0shualedisSawyisi} < &beta;<sub>0</sub> < ${b0shualedisSaboloo}  <br>
    ${b1shualedisSawyisi} < &beta;<sub>1</sub> < ${b1shualedisSaboloo}  <br>
    ${b2shualedisSawyisi} < &beta;<sub>2</sub> < ${b2shualedisSaboloo}  <br>

    <hr>
    დეტერმინაციის კოეფიციენტია: ${Rkvadrat}; <br> დეტერმინაციის კორექტირებული კოეფიციენტია: ${RkvadratXaziani};  <br>
    H<sub>0</sub>: R<sup>2</sup> = 0 <br>
    H<sub>1</sub>: R<sup>2</sup> &#8800; 0 <br>
    F= ${F}${gamotvlaF1()} ${fKriticuli.value}=F<sub>კრ</sub> <br>
    <b>მთლიანი მოდელი ${gamotvlaF1text()}არის მნიშვნელოვანი.</b>                
</p>`
    


    $('#answeri').append(answeri)
}