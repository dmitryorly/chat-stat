// import Filters from './Filters'

// let filters = new Filters

// Т.к. проход по всему файлу не занимает много времени, стоит делать фильтрацию отдельным прогоном, чтобы сохранить 
// сырые данные и возможность их использования.
export default function(str) {
    if (str === '') return str
    // TODO Подумать, нужно ли возвращать пустую строку в случае ошибки
    if (typeof str !== 'string') {
        console.warn('Non-string formatting returns empty string')
        return ''
    }

    let out = str.toLowerCase().replace(/[^-a-zа-яё ]/g, '').replace('ё', 'е')

    // out = filters.min(out)
    // out = filters.exclude(out)
    return out
}