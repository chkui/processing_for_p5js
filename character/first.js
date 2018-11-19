let word = '';
const lang = [];
let avenir;

function preload() {
    avenir = loadFont('Avenir-Medium.otf');
}

function setup() {
    createCanvas(800, 600, WEBGL);
    textFont(avenir);
    textAlign(CENTER);
    textSize(48);
}

function draw() {
    background(255);
    fill(0);
    text(word,0, height/12);
}

function updateWorld() {
    // 将word设置为空字符串，避免添加到lang队列的时候还有上一次生成字符串的信息
    word = "";

    /**
     * 这里连续调用了2个方法，random和floor
     * random的作用是随机生成一个1到15的浮点数
     * floor的作用是将random生成的浮点数转换成一个最接近的整数，比如4.15会被转换为4，4.88会被转换为5。
     *
     * 所以这一行代码的作用是随机生成一个1到15整数
     */
    const len = floor(random(1, 15));

    /**
     * 下面的for循环。
     * 1) floor(random(97, 122)和上面一样，就是随机生成一个97到122数字。
     * 2) 97到122是字符的ASCII编码，比如'a'=char(97), 'b'=char(98),
     *    所以 let c = char(floor(random(97, 122))); 这一行的作用就是随机生成'a'到'z'的字符。
     * 3) for循环会执行len次，在屏幕上就会看到随机组合len长度的字符串。
     */
    for (let i = 0; i < len; i++) {
        let c = char(floor(random(97, 122)));
        word += c; //last 4 lines codes I'm confusing.
    }

    /**
     * lang数组，作用是将前面生成的所有字符串都保存起来，
     * 比如第一次点击屏幕生成了'abcd'，第二次点击屏幕生成了'wxyz'，这2个字符串都会在land数组中。
     */
    lang.push(word);//why? //
}

function mousePressed() {
    updateWorld();
//for(int i=0; i<lang.size();i++){
//println(lang.get(i));
//}
}

function keyPressed() {
    /**
     * 下面的代码的作用是：当按下's'键时会将以及已经显示在屏幕上的所有内容保存到"word.txt"文件（p5.js是下载）
     * word.txt文件夹中有例子
     */
    if (key == 's') {
        /**
         * temLang是一个临时变量，在按下s后将land中的内容全部复制到temLang中。
         * 使用一个临时变量主要是解决多线程的问题。在JavaScript中没有这个问题，当时在C环境中这个问题会导致一些特别的后果。
         * @type {Array}
         */
        const temLang = [];//temLang?
        for (let i = 0; i < lang.length; i++) {
            temLang.push(lang[i])
            //println(lang[i]);// what's meaning about println? println的作用就是在IDE上输出一段内容。
        }
        saveStrings(temLang, "words.txt");
    }
}
