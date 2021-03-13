import { createElement } from '../utils'

class ChatInfo {
    constructor() {
        this.nameOut = document.querySelector('[data-chat-out="name"]')
        this.countOut = document.querySelector('[data-chat-out="count"]')
        window.addEventListener('filter', this.render.bind(this))
    }

    render() {
        let data = {
            name: app.data.name,
            count: app.data.messagesCount,
            table: {
                el: document.querySelector('[data-chart]'),
                caption: 'Частота слов',
                messages: app.data.byPerson,
                messagesCount: 5,
                className: 'table'
            }
        }

        this.nameOut.innerText = data.name
        this.countOut.innerText = data.count.toLocaleString()

        if (data.table) {
            let t = data.table

            this.renderTable({
                caption: t.caption,
                messages: t.messages,
                messagesCount: t.messagesCount,
                className: t.className
            }, t.el)
        }
    }

    renderTable(data, targetElement) {
        let persons = ''
        let content = ''

        Object.keys(data.messages).forEach(function (person) {
            persons += `<td style="color: ${app.data.byPerson[person].color};" colspan="2">${person}</td>`
        })

        for (let i = 0; i < data.messagesCount; i++) {
            let tr = '<tr>'
            for (let person in data.messages) {
                let message = data.messages[person].filtered[i]
                tr += `<td>${message[0]}</td><td>${message[1].toLocaleString()}</td>`
            }
            tr += '</tr>'
            content += tr
        }

        let table = createElement(`
            <table ${data.className ? 'class="' + data.className + '"' : ''}>
                <caption>${data.caption}</caption>
                <tbody>
                    <tr>${persons}</tr>
                    ${content}
                </tbody>
            </table>
        `, targetElement)

        return table
    }
}

export default ChatInfo