import debounce from './modules/debounce';
import throttle from './modules/throttle.js';
import copy from './modules/copy.js';
import throttleInput from './modules/throttleInput.js';
import adaptive from './modules/adaptive.js';

const directivesList = {
  debounce,
  throttle,
  copy,
  throttleInput,
  adaptive
};

const directives = {
  install: function (app) {
    Object.keys(directivesList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;
