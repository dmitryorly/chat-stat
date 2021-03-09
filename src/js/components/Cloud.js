
import * as d3 from 'd3'
import cloud from 'd3-cloud'

export default class Cloud {
    constructor() {
        this.el = document.querySelector('[data-cloud]')
        this.wordsCount = 20

        window.addEventListener('filter', () => {
            this.getWords(app.data.byPerson)
            this.updateLayout()
            this.build()
        })
    }

    getWords(byPerson) {
        if (!byPerson) return
        this.words = []

        for (let i = 0; i < this.wordsCount; i++) {
            Object.keys(byPerson).forEach(person => {
                let p = byPerson[person]
                this.words.push({
                    color: p.color,
                    // size: 60 - i * 30 / this.wordsCount,
                    size: 60 / Math.sqrt(i + 1),
                    text: p.filtered[i][0],
                    rotate: p.rotate
                })
            })
        }
    }

    updateLayout() {
        let width = Math.floor(window.innerWidth * .7)
        let height = Math.floor(width * .625)
        this.layout = cloud()
            .size([width, height])
            .words(this.words)
            .padding(5)
            .rotate(function (d) { return d.rotate })
            .font("Arial")
            .fontSize(function (d) { return d.size })
            .fontWeight(function () { return 900 })
            .on("end", this.draw.bind(this))
    }

    draw() {
        let l = this.layout
        console.log(this)

        d3.select("[data-cloud]").append("svg")
            .attr("width", l.size()[0])
            .attr("height", l.size()[1])
            .append("g")
            .attr("transform", "translate(" + l.size()[0] / 2 + "," + l.size()[1] / 2 + ")")
            .selectAll("text")
            .data(this.words)
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

    build() {
        this.el.innerHTML = ''

        this.layout.start()
    }
}