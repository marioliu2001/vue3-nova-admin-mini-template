import debounce from './modules/debounce';
import throttle from './modules/throttle.js';
import copy from './modules/copy.js';

const directivesList = {
  debounce,
  throttle,
  copy
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
