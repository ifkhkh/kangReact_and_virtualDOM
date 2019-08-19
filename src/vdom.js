/*
<div></div>
{
    type: 'div',
}
DOM 替换成一个数据结构  树状

<div id="test"></div>
{
    type: 'div',
    props: {
        id: 'test',
    }
}

<div id="test">
    <span>gua</span>
</div>
{
    type: 'div',
    props: {
        id: 'test',
    },
    children: [
        {
            type: 'span',
            props: {},
            children: [
                {
                    type: 'text',
                    data: 'gua',
                    nodeValue: 'gua',
                },
            ],
        }
    ],
}


*/