const { log, isObject } = require('../utils')

const createTextElement = (text) => {
    // 一般来说 元素的 tagName 是全大写的形式
    let type = 'TEXT'
    let props = {
        nodeValue: text
    }
    let c = createElement(type, props)
    // 其实是递归
    return c
}

const createElement = (type, props, ...children) => {
    // 可能会有多个子元素
    // 复制原始 props
    let newProps = Object.assign({}, props)
    // 为了方便运算，把 children 放在了 props 里面
    if (children.length === 0) {
        // 没有子节点的情况
        newProps.children = []
    } else {
        let l = children.map(c => {
            if (isObject(c)) {
                // 说明是一个元素节点
                return c
            } else {
                // 文本节点
                // 就要包装起来，包装成对象的形式
                let r = createTextElement(c)
                return r
            }
        })
        newProps.children = l
    }

    return {
        type: type,
        props: newProps,
    }
}

// 包装后暴露出去
let React = {
    createElement,
}

module.exports = React