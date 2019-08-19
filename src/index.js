const React = require('./react')
const ReactDOM = require('./react-dom')

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
