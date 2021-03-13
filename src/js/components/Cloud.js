
import * as d3 from 'd3'
import cloud from 'd3-cloud'

export default class Cloud {
    constructor() {
        this.vis = d3.select("[data-cloud]").append("svg")
        this.wordsCount = 20

        window.addEventListener('filter', this.init.bind(this))
    }

    getWords() {
        let byPerson = this.byPerson
        if (!byPerson) return
        this.words = []

        for (let i = 0; i < this.wordsCount; i++) {
            Object.keys(byPerson).forEach(person => {
                let p = byPerson[person]
                this.words.push({
                    color: p.color,
                    size: 60 - i * 45 / this.wordsCount,
                    // size: 60 / Math.sqrt(i + 1),
                    text: p.filtered[i][0],
                    rotate: p.rotate,
                    person: person
                })
            })
        }
    }

    updateLayout() {
        this.layout
            // .rotate(function (d) { return d.rotate * (Math.random() + .5) })
            .rotate(function () { return 0 })
            .font("Arial")
            .fontSize(function (d) { return d.size })
            .fontWeight(function () { return 900 })
            .on("end", this.draw.bind(this))
    }

    draw() {
        let l = this.layout

        this.vis
            .html('')
            .attr("width", l.size()[0])
            .attr("height", l.size()[1])
            .append("g")
            .attr("transform", "translate(" + l.size()[0] / 2 + "," + l.size()[1] / 2 + ")")
            .selectAll("text")
            .data(this.words)
            .enter()
            .append("text")
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
        this.layout.start()
    }

    init() {
        this.byPerson = app.data.byPerson
        this.getWords()

        let width = Math.floor(window.innerWidth * .7)
        let height = Math.floor(width * .625)
        this.layout = cloud()
            .size([width, height])
            .words(this.words)
            .padding(5)

        this.updateLayout()
        this.build()
        // this.createControls()
    }

    update(words) {
        this.layout
            .stop()
            .words(words)
            .rotate(function (d) { return d.rotate })
    }

    createControls() {
        let data = Object.entries(this.byPerson).reduce((acc, [key, val]) => {
            // return {[key].color: val.color}
            // if (acc[key]) {
            //     acc[key].color = val.color
            //     acc[key].rotate = val.rotate
            // } else {
            //     acc[key] = {}
            // }
        }, {})

        console.log(data)

        // let controls = d3.select('[data-cloud-controls]')
    }
}