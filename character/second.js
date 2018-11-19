const pro = ['iqcwvfiatvib', 'nhlcse',
    'fbgnonjh',
    'ldgvvhrwk',
    'bkhudqq',
    'bfdmtwstywbq',
    'ohxbuvq',
    'yurcsbuee',
    'rijfwgj',
    'afcwoyofmgc',
    'ktogmxxamxfeds',
    'owlaxpyrbxhuar',
    'hh',
    'gtdhrjxe']

let words;

const vowels = ['a', 'i', 'e', 'o', 'u', 'r'];
const frameCount = 10
let currIdx = 0;//what?

/**
 * 整个源代码都没看见frameCount在哪定义的
 */
function preload() {
    avenir = loadFont('Avenir-Medium.otf');
}

function setup() {
    createCanvas(800, 600, WEBGL);
    frameRate(1)
    textFont(avenir);
    //加载first.js中生成的字符串数组,在浏览器上加载这个txt个能会有问题，直接用pro中的内容代替
    words = loadStrings("words.txt");
    words = pro;
}

function draw() {
    translate(128, 0);
    background(255);
    textAlign(CENTER);
    textSize(24);
    fill(0);
    stroke(0);
    strokeWeight(1);
    text(words[currIdx],126, 0);
    visualizeWord(words[currIdx]);//??? 从列表中获取一个字符串
    if (0 === frameCount % 10) {
        currIdx++;
    }
    if (currIdx >= words.length) {
        currIdx = 0;
    }
    /*translate(128, 0);
    background(255);
    textAlign(CENTER);
    textSize(24);
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(0, 0, 256, 256);
    fill(0);
    text(words[currIdx], 128, height - 188);
    //visualizeWord(words[currIdx]);//???

    if (0 === frameCount % 10) {
        currIdx++;
    }
    if (currIdx >= words.length) {
        currIdx = 0;
    }*/
}

function visualizeWord(word) {
    // number of letters
    // ascii value of current letters

    /**
     * 这里的r并没有太具体的意义，只是决定了背景上画的圈有多大，换成20就会更大一些。
     * 这一段代码的意思是，根据字符串的长度画圈，字符串越长，圈越大。
     * @type {number}
     */
    const r = word.length * 16;//why *16?
    noFill();
    ellipse(128, 128, r, r);

    /**
     * for循环是在瓶装一组线段，画线段的规则有：
     * 1）如果是原因字母用红色表示，如果是辅音就用黑色
     * 2）字符的ASC编码约大，线段越长，ASC取值 97~122
     */
    strokeWeight(6);
    for (let i = 0; i < word.length; i++) {
        const c = word.charAt(i);//what's CharAt? charAt表示取指定下面的字符

        if (isVowel(c)) {
            stroke(255, 0, 0);
        } else {
            stroke(127);
        }

        let n = c.charCodeAt(0)// int(c); 将字符串转换为ASC编码
        n = round(map(n, 97, 122, 8, 128));//round??
        line(128 - n, 64 + i * 8, 128 + n, 64 + i * 8);
        //line(64 + i * 8, 20, 64 + i * 8, 75);
    }

}

function isVowel(c) {
    for (let i = 0; i < vowels.length; i++) {
        if (c == vowels[i]) {
            return true;
        }
    }
    return false;
}