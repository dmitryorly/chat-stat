import { min, exclude } from '../utils'

class Filters {
    constructor(options) {
        this.data = options.data
        console.log(options);
        this.minInput = document.querySelector('[data-filter="min"]')
        this.excludeInput = document.querySelector('[data-filter="exclude"]')
        this.applyBtn = document.querySelector('[data-btn="filters"]')

        this.minValue = this.getMinValue()
        this.excludeValue = this.getExcludeValue()

        this.minInput.addEventListener('change', this.getMinValue.bind(this))
        this.excludeInput.addEventListener('change', this.getExcludeValue.bind(this))
        this.applyBtn.addEventListener('click', this.onClick.bind(this))
    }

    getMinValue() {
        this.minValue = this.minInput.value
    }

    getExcludeValue() {
        // TODO использовать format.js
        this.excludeValue = this.excludeInput.value.split(' ').filter(s => !!s)
    }

    onClick(e) {
        e.preventDefault()
        console.log(this);
        this.applyFilters()
    }

    applyFilters() {
        if (!this.data || !this.data.raw) {
            console.warn('No data to filter')
            return
        }

        if (!this.minValue && !this.excludeValue) return

        let filtered = {}
        let raw = Object.assign(this.data.raw)

        // for (let person in raw) {
        //     for (let word in person) {
                
        //     }
        // }

        console.log(filtered);
    }

    min(str) { return min(str, this.minValue) }
    exclude(str) { return exclude(str, this.excludeValue) }
}

export default Filters