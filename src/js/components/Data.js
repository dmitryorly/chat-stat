import format from './format'
import { sortWordsByCount } from '../utils'


export default class Data {
    constructor() {
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
}