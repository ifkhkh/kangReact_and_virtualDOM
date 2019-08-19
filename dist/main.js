/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const React = __webpack_require__(1)
const ReactDOM = __webpack_require__(3)

let vdom = React.createElement(
    'button',
    {
        id: 'id-button-login',
        type: 'button',
        onClick: () => console.log('flag'),
    },
    'Like'
)

let root = document.getElementById('root')
ReactDOM.render(vdom, root)


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const { log, isObject } = __webpack_require__(2)

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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

const log = (data) => console.dir(data, {depth: null})

const isObject = o => Object.prototype.toString.call(o) === '[object Object]'

module.exports = {
    log,
    isObject,
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);