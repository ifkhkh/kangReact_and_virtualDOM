// 排除事件和子元素属性
const isAttributes = (key) => !key.startsWith('on') && key !== 'children'

const ReactDOM = {
    render: (vdom, container) => {
        let { type, props } = vdom
        let element = null
        if (type === 'TEXT') {
            element = document.createTextNode('')
        } else {
            element = document.createElement(type)
        }

        // 有些元素绑定了事件需要手动绑定上去
        // 筛选出 on 事件
        Object.keys(props)
            .filter(e => e.startsWith('on'))
            .forEach(k => {
                // 切出事件名称
                let eventType = k.slice(2).toLowerCase()
                // 在遍历中绑定事件
                element.addEventListener(eventType, props[k])
            })

        //再处理其他 props
        Object.keys(props)
            .filter(e => isAttributes(e))
            .forEach(k => {
                element[k] = props[k]
            })

        let children = props.children || []
        // 递归处理 children
        children.forEach(c => ReactDOM.render(c, element))

        // 把元素插入到页面
        container.appendChild(element)

    },

}

module.exports = ReactDOM