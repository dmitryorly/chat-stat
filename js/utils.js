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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export { createElement, sortWordsByCount, shuffleArray }