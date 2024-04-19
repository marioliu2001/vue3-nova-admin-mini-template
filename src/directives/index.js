import debounce from './modules/debounce';

const directivesList = {
  debounce
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
