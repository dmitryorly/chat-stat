function createElement(html, targetElement) {
    targetElement.innerHTML = html
}

function sortWordsByCount(words) {
    let sortable = []

    for (let word in words) {
        sortable.push([word, words[word]])
    }

    return sortable.sort((a, b) => b[1] - a[1])
}

// TODO Принимать массив, чтобы избавиться от split и join
function min(str, min) {
    if (!min) return str
    return str.split(' ').filter(word => word.length > min).join(' ')
}

function exclude(str, excludes) {
    if (!excludes || !excludes.length) return str
    return str.split(' ').filter(word => !excludes.includes(word)).join(' ')
}

export { createElement, sortWordsByCount, min, exclude }