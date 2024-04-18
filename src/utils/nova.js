/* 使用 Element Plus UI 库的通知工具函数 */
// 导入 Element Plus 的默认主题
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
import 'element-plus/es/components/notification/style/css';

// 从 Element Plus 导入所需的通知组件
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';

/**
 * 封装提示通知
 * @param {string|any} message - 要显示的消息
 * @param {string} [title="温馨提示"] - 通知标题
 * @param {number} [duration=2000] - 通知持续时间
 * @param {'info'|'success'|'error'|'warning'} [type='info'] - 通知类型
 * @param {boolean} [parseHtml=false] - 是否解析 HTML 内容
 */
function novaNotice(
  message,
  title = '温馨提示',
  duration = 2000,
  type = 'info',
  parseHtml = false
) {
  ElNotification.closeAll();
  ElNotification({
    message,
    title,
    type,
    duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}

// 导出不同类型的通知函数
export function novaNoticeSuccess(message, title, duration, parseHtml) {
  novaNotice(message, title, duration, 'success', parseHtml);
}

export function novaNoticeError(message, title, duration, parseHtml) {
  novaNotice(message, title, duration, 'error', parseHtml);
}

export function novaNoticeWarning(message, title, duration, parseHtml) {
  novaNotice(message, title, duration, 'warning', parseHtml);
}

export function novaNoticeInfo(message, title, duration, parseHtml) {
  novaNotice(message, title, duration, 'info', parseHtml);
}

/**
 * 封装提示信息
 * @param {string|any} message - 要显示的消息
 * @param {number} [duration=2000] - 信息持续时间
 * @param {'info'|'success'|'error'|'warning'} [type='info'] - 信息类型
 * @param {boolean} [parseHtml=false] - 是否解析 HTML 内容
 */
function novaMsg(message, duration = 2000, type = 'info', parseHtml = false) {
  ElMessage.closeAll();
  ElMessage({
    message,
    type,
    duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}

// 导出不同类型的信息函数
export function novaMsgSuccess(message, duration, parseHtml) {
  novaMsg(message, duration, 'success', parseHtml);
}

export function novaMsgError(message, duration, parseHtml) {
  novaMsg(message, duration, 'error', parseHtml);
}

export function novaMsgWarning(message, duration, parseHtml) {
  novaMsg(message, duration, 'warning', parseHtml);
}

export function novaMsgInfo(message, duration, parseHtml) {
  novaMsg(message, duration, 'info', parseHtml);
}

/**
 * 封装消息框
 * @param {string|any} [message='您确定进行关闭么？'] - 消息框中显示的内容
 * @param {string} [title='温馨提示：'] - 消息框的标题
 * @param {string} [confirmButtonText='确定'] - 确认按钮的文本
 * @param {string} [cancelButtonText='取消'] - 取消按钮的文本
 * @param {'info'|'success'|'error'|'warning'} [type='warning'] - 消息框的类型
 * @returns {Promise<boolean>} - 用户操作的结果
 */
function novaMsgBox(
  message = '您确定进行关闭么？',
  title = '温馨提示：',
  confirmButtonText = '确定',
  cancelButtonText = '取消',
  type = 'warning'
) {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(message, title, {
      confirmButtonText,
      cancelButtonText,
      type,
      draggable: true,
      dangerouslyUseHTMLString: true
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

/**
 * 封装带 HTML 内容的消息框
 * @param {string} [message='<p style="color: teal">您确定进行关闭么？</p>'] - 消息框中显示的 HTML 内容
 * @param {string} [title='温馨提示：'] - 消息框的标题
 * @param {string} [confirmButtonText='确定'] - 确认按钮的文本
 * @param {string} [cancelButtonText='取消'] - 取消按钮的文本
 * @param {'info'|'success'|'error'|'warning'} [type='warning'] - 消息框的类型
 * @returns {Promise<boolean>} - 用户操作的结果
 */
function novaMsgBoxHtml(
  message = '<p style="color: teal">您确定进行关闭么？</p>',
  title = '温馨提示：',
  confirmButtonText = '确定',
  cancelButtonText = '取消',
  type = 'warning'
) {
  return novaMsgBox(message, title, confirmButtonText, cancelButtonText, type);
}

/**
 * 封装带输入框的消息框
 * @param {string} [message='请输入需要修改的数据？'] - 消息框中显示的内容
 * @param {string} [title='温馨提示：'] - 消息框的标题
 * @param {string} [confirmButtonText='确定'] - 确认按钮的文本
 * @param {string} [cancelButtonText='取消'] - 取消按钮的文本
 * @param {'info'|'success'|'error'|'warning'} [type='info'] - 消息框的类型
 * @param {RegExp} [inputPattern=''] - 输入框的验证正则表达式
 * @param {string} [inputErrorMessage='无效输入'] - 输入验证失败时的错误消息
 * @returns {Promise<any>} - 用户操作的结果
 */
function novaMsgBoxPrompt(
  message = '请输入需要修改的数据？',
  title = '温馨提示：',
  confirmButtonText = '确定',
  cancelButtonText = '取消',
  type = 'info',
  inputPattern = /.*/,
  inputErrorMessage = '无效输入'
) {
  return new Promise((resolve, reject) => {
    ElMessageBox.prompt(message, title, {
      confirmButtonText,
      cancelButtonText,
      type,
      inputPattern,
      inputErrorMessage,
      draggable: true
    })
      .then((res) => {
        resolve(res.value);
      })
      .catch(() => {
        reject(false);
      });
  });
}

/**
 * 封装警告消息框
 * @param {string} [message='请输入需要修改的数据？'] - 消息框中显示的内容
 * @param {string} [title='温馨提示：'] - 消息框的标题
 * @param {string} [confirmButtonText='确定'] - 确认按钮的文本
 * @param {'info'|'success'|'error'|'warning'} [type='info'] - 消息框的类型
 * @returns {Promise<boolean>} - 用户操作的结果
 */
function novaMsgBoxAlert(
  message = '请输入需要修改的数据？',
  title = '温馨提示：',
  confirmButtonText = '确定',
  type = 'info'
) {
  return new Promise((resolve, reject) => {
    ElMessageBox.alert(message, title, {
      confirmButtonText,
      type,
      draggable: true
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

export { novaMsgBox, novaMsgBoxHtml, novaMsgBoxPrompt, novaMsgBoxAlert };
