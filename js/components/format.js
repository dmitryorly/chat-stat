export default function(str) {
    if (str === '') return str
    // TODO Подумать, нужно ли возвращать пустую строку в случае ошибки
    if (typeof str !== 'string') {
        console.warn('Non-string formatting returns empty string')
        return ''
    }

    return str.toLowerCase().replace(/[^-a-zа-яё ]/g, '').replace(/[ё]/g, 'е')
}