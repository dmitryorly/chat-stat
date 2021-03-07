class FileInfo {
    constructor() {
        this.nameOut = document.querySelector('[data-file-out="name"]')
        this.sizeOut = document.querySelector('[data-file-out="size"]')
        this.typeOut = document.querySelector('[data-file-out="type"]')
    }
}

FileInfo.prototype.render = function (data) {
    this.nameOut.innerText = data.name
    this.sizeOut.innerText = Math.round(data.size / 1024).toLocaleString() + ' Кб'
    this.typeOut.innerText = data.type
}


export default FileInfo