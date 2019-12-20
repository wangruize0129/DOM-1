const div = dom.create('<div>hello</div>')
console.log(div)
dom.after(test, div)

const div2 = dom.create('<div>789</div>')
dom.before(test, div2)

const div3 = dom.create('<p>jirengu</p>')
dom.append(document.body, div3)

const div4 = dom.create('<div id="parent"></div>')
dom.wrap(test, div4)
// dom.remove(test)

// const e1 = dom.empty(empty)
// console.log(e1)

dom.attr(test, 'title', 'hello world')
const a = dom.attr(test, 'title')
console.log(`title:${a}`)

dom.attr(test, 'id', 'test1')

dom.text(test1, '你好，这是新的内容')
const t1 = dom.text(test1)
console.log(t1)

dom.style(test1, { border: '1px solid red', color: 'red' })
const s = dom.style(test1, 'color')
console.log(s)

dom.style(test1, { color: 'green' })
dom.class.add(test1, 'red')

dom.class.add(test1, 'grey')

dom.class.remove(test1, 'red')

console.log(dom.class.has(test1, 'grey'))

let fn = () => {
  console.log('点击')
}
dom.on(test1, 'click', fn)
console.log('hello world')
dom.off(test1, 'click', fn)

const testDiv = dom.find('#test1')[0]
console.log(testDiv)

const test2 = dom.find('#t2')[0]
console.log(dom.find('.red', test2)[0])

// console.log(dom.siblings(dom.find('.e2')[0]))
console.log(dom.next(dom.find('.e2')[0]))
console.log(dom.previous(dom.find('.e2')[0]))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, { color: 'red' }))

const b = dom.find('.t2')[0]
console.log(dom.index(b))