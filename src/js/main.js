import FileInfo from './components/FileInfo'
import ChatInfo from './components/ChatInfo'
import Data from './components/Data'
import Filters from './components/Filters'
import Cloud from './components/Cloud'

const app = {
    data: new Data
}

window.app = app

let input = document.querySelector('[data-file-input]')
let submitBtn = document.querySelector('[data-btn="submit"]')
let fileInfo = new FileInfo
let chatInfo = new ChatInfo
let filters = new Filters({ data: app.data })
let fr = new FileReader()
let cloud = new Cloud()

fr.addEventListener('load', onLoad)
input.addEventListener('change', onChange)
submitBtn.addEventListener('click', onClick)

function onChange() {
    if (!this.files.length) return
    let file = this.files[0]

    fileInfo.render(file)
    fr.readAsText(file)
}

function onLoad(e) {
    let result = JSON.parse(e.target.result)
    let messages = result.messages
    let name = result.name

    app.data.name = name
    app.data.messagesCount = messages.length
    app.data.source = result

    submitBtn.removeAttribute('disabled')
}

function onClick(e) {
    e.preventDefault()
    if (!app.data.source) return
    app.data.getDataFromJSON(app.data.source)

    filters.applyFilters()
}