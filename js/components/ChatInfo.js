import Table from './Table'

class ChatInfo {
    constructor() {
        this.nameOut = document.querySelector('[data-chat-out="name"]')
        this.countOut = document.querySelector('[data-chat-out="count"]')
    }
}

ChatInfo.prototype.render = function (data) {
    this.nameOut.innerText = data.name
    this.countOut.innerText = data.count.toLocaleString()

    if (data.table) {
        let t = data.table

        Table({
            caption: t.caption,
            messages: t.messages,
            messagesCount: t.messagesCount,
            className: t.className
        }, t.el)
    }
}

export default ChatInfo