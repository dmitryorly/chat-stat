import format from './format'
import { sortWordsByCount } from '../utils' 

export default class Data {
    constructor() {
        // Имеет ли смысл создавать пустые объекты?
        this.raw = {}
        this.unique = {}
        // this.source = {}
        return this
    }

    getDataFromJSON(json) {
        let messages = json.messages

        this.raw = this.getRawData(messages)
        this.unique = this.getSortedUnique(this.raw)

        console.log(this);
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
            console.log(messages[i]);
            return ''
        }
    }

    getRawData(messages) {
        let time = Date.now()

        let rawData = {}
        for (let i = 0; i < messages.length; i++) {
            let message = messages[i].text
            let person = messages[i].from
            let filteredMessage = this.filterMessage(message)

            if (!filteredMessage) continue

            let words = filteredMessage.split(' ')

            for (let j = 0; j < words.length; j++) {
                let key = words[j]
                if (key === '') continue

                if (!rawData[person]) {
                    rawData[person] = {}
                }

                if (rawData[person].hasOwnProperty(key)) {
                    rawData[person][key]++
                } else {
                    rawData[person][key] = 1
                }
            }
        }

        console.log('Time to create raw: ', Date.now() - time);
        return rawData
    }

    getSortedUnique(rawData) {
        let timeToSort = Date.now()
        let sortedUnique = {}

        for (let person in rawData) {
            sortedUnique[person] = sortWordsByCount(rawData[person])
        }

        console.log('Time to sort', Date.now() - timeToSort)
        return sortedUnique
    }
}