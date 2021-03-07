import format from './format'
import { sortWordsByCount, shuffleArray } from '../utils'
import * as d3 from 'd3'
import cloud from 'd3-cloud'

export default class Data {
    constructor() {
        window.addEventListener('filter', () => {
            this.buildCloud(this.byPerson, 20)
        })

        return this
    }

    getDataFromJSON(json) {
        let messages = json.messages
        let colors = ['#f5a174', '#73f5f0']
        let rotates = [-45, 45]

        this.byPerson = this.getWordsByPerson(messages)
        Object.keys(this.byPerson).forEach((key, i) => {
            let byPerson = this.byPerson[key]
            byPerson.sortedUnique = this.getSortedUnique(byPerson.unique)
            byPerson.filtered = Object.assign({}, byPerson.sortedUnique)
            byPerson.color = colors[i]
            byPerson.rotate = rotates[i]
        })

        console.log(this)
        this.buildCloud(this.byPerson, 20)
    }

    filterMessage(message) {
        if (typeof message === 'string') {
            return format(message)
        } else if (Array.isArray(message)) {
            if (typeof message[0] === 'string') {
                return format(message[0])
            } else {
                return ''
            }
        } else {
            console.warn('Typeof message is not string or array')
            console.log(messages[i])
            return ''
        }
    }

    getWordsByPerson(messages) {
        let time = Date.now()
        let wordByPerson = {}

        for (let i = 0; i < messages.length; i++) {
            let message = messages[i].text
            let person = messages[i].from
            let filteredMessage = this.filterMessage(message)

            if (!filteredMessage) continue

            let words = filteredMessage.split(' ')

            for (let j = 0; j < words.length; j++) {
                let key = words[j]
                if (key === '') continue

                if (!wordByPerson[person]) {
                    wordByPerson[person] = {}
                    wordByPerson[person].unique = {}
                }

                if (wordByPerson[person].unique.hasOwnProperty(key)) {
                    wordByPerson[person].unique[key]++
                } else {
                    wordByPerson[person].unique[key] = 1
                }
            }
        }

        console.log('Time to create raw: ', Date.now() - time)
        return wordByPerson
    }

    getSortedUnique(unique) {
        let timeToSort = Date.now()
        let sortedUnique = sortWordsByCount(unique)
        console.log('Time to sort', Date.now() - timeToSort)

        return sortedUnique
    }

    buildCloud(byPerson, count) {
        document.querySelector('[data-cloud]').innerHTML = ''
        if (!byPerson) return

        let words = []

        for (let i = 0; i < count; i++) {
            Object.keys(byPerson).forEach(function (person) {
                let p = byPerson[person]
                words.push({
                    color: p.color,
                    // size: 60 - i * 30 / count,
                    size: 60 / Math.sqrt(i + 1),
                    text: p.filtered[i][0],
                    rotate: p.rotate
                })
            })
        }

        // shuffleArray(words)

        let layout = cloud()
            .size([960, 600])
            .words(words)
            .padding(5)
            .rotate(function (d) { return d.rotate })
            .font("Arial")
            .fontSize(function (d) { return d.size })
            .fontWeight(function () { return 900 })
            .on("end", draw)

        layout.start()

        function draw(words) {
            d3.select("[data-cloud]").append("svg")
                .attr("width", layout.size()[0])
                .attr("height", layout.size()[1])
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function (d) { return d.size + "px" })
                .style("font-family", "Arial")
                .style("fill", function (d) { return d.color })
                .attr("text-anchor", "middle")
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
                })
                .text(function (d) { return d.text })
        }
    }
}