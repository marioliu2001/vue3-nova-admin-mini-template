/*
  需求：给整个页面添加背景水印。

  思路：
    1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
    2、将其设置为背景图片，从而实现页面或组件水印效果

  使用：设置水印文案，颜色，字体大小即可
  <div v-waterMarker="{text:'YU-ADMIN',textColor: '#D9D9D9'}"></div>
*/

// 定义水印指令
const addWaterMarker = (str, parentNode, font, textColor) => {
  // 水印文字，父元素，字体，文字颜色
  // 创建一个画布元素
  let can = document.createElement('canvas');
  parentNode.appendChild(can);
  can.width = 205;
  can.height = 140;
  can.style.display = 'none';
  // 获取2D渲染上下文
  let cans = can.getContext('2d');
  // 旋转画布（可选）
  cans.rotate((-20 * Math.PI) / 180);
  // 设置字体属性
  cans.font = font || '20px 宋体';
  // 设置文字颜色
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)';
  // 设置文字对齐方式
  cans.textAlign = 'left';
  cans.textBaseline = 'Middle';
  // 绘制水印文本
  cans.fillText(str, can.width / 10, can.height / 2);
  // 将画布设置为背景图像
  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
};

const waterMarker = {
  mounted(el, binding) {
    addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor);
  }
};

export default waterMarker;
