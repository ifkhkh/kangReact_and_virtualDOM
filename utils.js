const log = (data) => console.dir(data, {depth: null})

const isObject = o => Object.prototype.toString.call(o) === '[object Object]'

module.exports = {
    log,
    isObject,
}