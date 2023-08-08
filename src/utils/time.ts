let helloTime = '你好'
// 封装一个函数：获取一个结果：当前早上|上午|下午|晚上
function getTime() {
    // 通过内置的构造函数Date
    let hours = new Date().getHours()
    if (hours <= 9 && hours > 5) {
        helloTime = '早上'
    } else if (hours > 9 && hours < 14) {
        helloTime = '上午'
    } else if (hours > 14 && hours < 18) {
        helloTime = '下午'
    } else {
        helloTime = '晚上'
    }
}
getTime()
export default helloTime