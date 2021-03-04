import { createElement } from '../utils'

function Table(data, targetElement) {
    let persons = ''
    let content = ''

    for (let person in data.messages) {
        persons += `<td colspan="2">${person}</td>`
    }

    for (let i = 0; i < data.messagesCount; i++) {
        let tr = '<tr>'
        for (let person in data.messages) {
            let message = data.messages[person][i]
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

export default Table