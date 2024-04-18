import mitt from 'mitt';

// 创建一个事件总线实例，用于在应用程序中进行事件的发布和订阅
const mittBus = mitt();

export default mittBus;
