window.dom = {
  //增的部分

  //用于创建节点
  create(string) {
    const container = document.createElement('template')   //template标签用来容纳任意元素
    container.innerHTML = string.trim()                    //trim用来将字符串两边的空白字符去掉
    return container.content.firstChild
  },
  //在一个节点后边插入一个节点(用于新增弟弟)
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  //在一个节点前边插入一个节点(用于新增哥哥)
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },
  //将一个节点添加到另外一个节点中(新增一个儿子)
  append(parent, node) {
    return parent.appendChild(node)
  },
  //用一个节点包裹另一个节点(新增一个爸爸)
  wrap(node, parent) {
    dom.before(node, parent)        //首先在该节点前新增一个爸爸
    dom.append(parent, node)        //之后将该节点放到爸爸中
  },

  //删的部分

  //删除一个节点
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },
  //清除一个节点的后代
  empty(node) {
    const array = []
    let x = node.firstChild
    while (x) {
      array.push(dom.remove(x))   //写为 array.push(dom.remove(node.firstChild))更好理解
      x = node.firstChild
    }
    return array
  },

  //改的部分

  //读写元素的属性
  attr(node, name, value) {      //   重载
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  //读写元素的文本内容
  text(node, string) {    //适配
    if (arguments.length === 2) {
      if ('innerText' in node) {
        node.innerText = string
      } else {
        node.textContent = string
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  //读写HTML内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  //修改元素的style
  style(node, name, value) {
    if (arguments.length === 3) {
      //类似于输入dom.style(node,'color','red')
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof (name) === 'string') {
        //类似于输入dom.style(node,'color')
        return node.style[name]
      } else if (name instanceof Object) {  //instanceof用来判断name是否为对象。
        //类似于输入dom.style(test1, { border: '1px solid red', color: 'red' })
        let object = name
        for (let key in object) {
          node.style[key] = object[key]
        }
      }
    }
  },
  //修改和查询元素class
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      return node.classList.contains(className)
    }
  },
  //添加事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  //删除事件
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },

  //查的部分

  //获取标签
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  },
  //获取元素的父元素
  parent(node) {
    return node.parentNode
  },
  //获取元素的子元素
  children(node) {
    return node.children
  },
  //获取元素的兄弟姐妹
  siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n !== node)
  },
  //获取下一个节点
  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },
  //获取上一个节点
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    return x
  },
  //遍历
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  },
  //获取元素的排名
  index(node) {
    const list = dom.children(node.parentNode)
    let i = 0
    for (i; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  }
}