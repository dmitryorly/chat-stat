import FileInfo from './components/FileInfo'
import ChatInfo from './components/ChatInfo'
import Data from './components/Data'
import Filters from './components/Filters'

const app = {
    data: new Data
}

window.app = app

let input = document.querySelector('[data-file-input]')
let submitBtn = document.querySelector('[data-btn="submit"]')
let fileInfo = new FileInfo
let chatInfo = new ChatInfo
let filters = new Filters({data: app.data})
let fr = new FileReader()

fr.addEventListener('load', onLoad)
input.addEventListener('change', onChange)
submitBtn.addEventListener('click', onClick)

function onChange() {
    if (!this.files.length) return
    let file = this.files[0]
    app.data.source = file

    fileInfo.render(file)
}

function onLoad(e) {
    let result = JSON.parse(e.target.result)
    console.log(result);
    let messages = result.messages
    let name = result.name

    app.data.getDataFromJSON(result)

    chatInfo.render({
        name,
        count: messages.length,
        table: {
            el: document.querySelector('[data-chart]'),
            caption: 'Самые частые слова',
            messages: app.data.unique,
            messagesCount: 5,
            className: 'table'
        }
    })
}

function onClick(e) {
    e.preventDefault()
    if (!app.data.source) return
    fr.readAsText(app.data.source)
}