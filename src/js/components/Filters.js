import format from './format'

class Filters {
    constructor(options) {
        this.data = options.data
        this.minInput = document.querySelector('[data-filter="min"]')
        this.excludeInput = document.querySelector('[data-filter="exclude"]')
        this.applyBtn = document.querySelector('[data-btn="filters"]')

        this.getMinValue()
        this.getExcludeValue()

        this.minInput.addEventListener('change', this.getMinValue.bind(this))
        this.excludeInput.addEventListener('input', this.getExcludeValue.bind(this))
        this.applyBtn.addEventListener('click', this.onClick.bind(this))
    }

    get enabled() {
        return !!(this.minValue || this.excludeValue.length)
    }

    getMinValue() {
        this.minValue = this.minInput.value
    }

    getExcludeValue() {
        this.excludeValue = format(this.excludeInput.value).split(' ').filter(s => !!s)
    }

    onClick(e) {
        e.preventDefault()
        this.applyFilters()
    }

    applyFilters() {
        let byPerson = this.data.byPerson
        if (!byPerson) {
            console.warn('No data to filter')
            return
        }

        if (this.enabled) {
            for (let person in byPerson) {
                let sorted = byPerson[person].sortedUnique
                let filtered = []
    
                for (let word of sorted) {
                    let str = word[0]
                    if (this.min(str) && this.exclude(str)) {
                        filtered.push(word)
                    }
                }
    
                byPerson[person].filtered = filtered
            }
        }

        window.dispatchEvent(new Event('filter'))
    }

    min(str) {
        if (this.minValue) return str.length > this.minValue
        return true
    }

    exclude(str) {
        if (this.excludeValue && this.excludeValue.length) return !this.excludeValue.includes(str)
        return true
    }
}

export default Filters