//画布宽度
const width = 600
//画布高度
const height = 400

/**
 * 单次循环执行的次数,数值越大产生的图点就越多。
 * @type {number}
 */
const totalRays = 200;

/**
 * 变动幅度。
 * Perlin Noise算法只会参数0到1之间的浮点数，再乘以stepSize，相当于将取值范围扩展到0到100
 * @type {number}
 */
const stepSize = 100; //200

/**
 * 圆半径。
 * 参数0为最小数，最大值不能超过画布大小的1/3，否则画出的图片会超出画布
 * @type {number}
 */
const radius = 150; //200

/**
 * 圆心分布，一个圆是360度，除以totalRays就是将其分成200份，每一份是一个点。参看circle的代码。
 * @type {number}
 */
const angleStep = 360.0 / totalRays;

/**
 * 梯度种子列表（算子）
 * 标准Perlin Noise算法会根据随机生成的数据生成0到1的浮点数。这个列表用于存储这些种子。
 * @type {Array}
 */
const noiseSeeds = []

function setup() {
    //在浏览器上创建一个600×400大的画布
    createCanvas(600, 400);
    //设置背景颜色
    background(220);

    /**
     * for循环创建一个随机数列表。
     * random(1,10000)表示随机获取1到10000之间的任何数据。
     *
     * 使用10000是增加随机数值散列空间，数值越小随机空间越小，图像就越接近平滑的圆形。
     * 设置为random(1,1)就是一个圆形
     */
    for (let i = 0; i < totalRays; i++) {
        noiseSeeds.push(random(1, 10000));
    }
}

function draw() {
    //位移，将画布的中心点设置到(300,200这个点)
    translate(300, 200)
    beginShape()
    /**
     * draw()中的代码实际上是先画一个圆形，然后将圆形上的点向圆心内外移动stepSize*noiseRadius
     * stepSize*noiseRadius为负值向圆形内移动，正值向圆形外移动。
     */
    for (let i = 0; i < totalRays; i++) {

        //先画一个圆形，x取正弦点，y取余弦点，radians的作用是将360度的整数值换算成弧度值
        let endX = sin(radians(i * angleStep));
        let endY = cos(radians(i * angleStep));

        //如果去掉=====这一段代码出现的就是一个圆
        let _noise = noise(noiseSeeds[i]);//使用Perlin Noise算法生成随机值
        let _range = noise(noiseSeeds[i]) * stepSize// 设定变动幅度
        let noiseRadius = radius + _range; //获取受到噪声干扰之后的半径
        //=============================

        endX = endX * noiseRadius;
        endY = endY * noiseRadius;

        /**
         * 变更噪声算法的种子。
         * 如果移除这一行代码或者设置为0，图像不会发生任何变化.
         * 0.1代表数值变动的幅度。数值越大幅度就越大，渲染出来的图像变换就越快。
         * @type {number}
         */
        noiseSeeds[i] += 0.01;
        curveVertex(endX, endY)
        endShape();

        console.log('count:', i, 'noise:', _noise, 'range:', _range, 'radius', noiseRadius, 'x', endX, 'y', endY);
    }
}