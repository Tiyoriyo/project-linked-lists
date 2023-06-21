/* eslint-disable import/extensions */
/* eslint-disable no-console */
import node from './node.js';

const linkedList = () => ({
  list: {},
  append(value) {
    if (Object.keys(this.list).length === 0) {
      this.list = { head: node(value) };
    } else {
      let temp = this.list.head;
      while (temp.nextNode !== null) { temp = temp.nextNode; }
      temp.nextNode = node(value);
    }
  },
  prepend(value) {
    const newHead = node(value, this.list.head);
    this.list.head = newHead;
  },
  size() {
    let temp = this.list.head;
    let count = 0;
    while (temp) {
      if (temp === null) break;
      temp = temp.nextNode;
      count += 1;
    }
    return count;
  },
  head() {
    return this.list.head;
  },
  tail() {
    let temp = this.list.head;
    while (temp.nextNode) { temp = temp.nextNode; }
    return temp;
  },
  logList() {
    let temp = this.list.head;
    const array = [];
    while (temp) {
      if (temp === null) break;
      array.push(temp.data);
      temp = temp.nextNode;
    }
    return array;
  },
  at(index) {
    if (index < 0 || typeof index !== 'number') {
      return 'AT: INVALID INDEX (MUST BE NUMBER OR GREATER/EQUAL TO 0';
    }

    let temp = this.list.head;
    let count = 0;

    while (count < index) {
      if (temp === null) throw Error('Bombo');

      temp = temp.nextNode;
      count += 1;
    }
    return temp;
  },
  pop() {
    if (this.size() <= 1) {
      this.list = {};
      return;
    }

    let prev = null;
    let cur = this.list.head;

    while (cur.nextNode) {
      prev = cur;
      cur = cur.nextNode;
    }

    prev.nextNode = null;
  },
  contains(value) {
    let temp = this.list.head;
    let valueCheck = false;

    while (temp.nextNode) {
      if (temp.data === value) {
        valueCheck = true;
      }

      temp = temp.nextNode;
    }
    return valueCheck;
  },
  find(value) {
    let index = 0;
    let temp = this.list.head;

    while (temp.nextNode) {
      if (temp.data === value) {
        return index;
      }

      temp = temp.nextNode;
      index += 1;
    }
    return null;
  },
  toString() {
    let listArray = this.logList();
    listArray = listArray.join(' -> ');
    listArray += ' -> null';
    return listArray;
  },
  insertAt(value, index) {
    if (typeof index !== 'number') return console.log('Index must be a number');
    if (index === 0) {
      this.prepend(value);
      return 'inserted';
    }
    if (index === this.size()) {
      this.append(value);
      return 'inserted';
    }
    if (index < 0 || index > this.size()) {
      return `Index must not be less than 0 and more than ${this.size()}`;
    }

    let count = 0;
    let prev = null;
    let cur = this.list.head;
    while (count < index) {
      count += 1;
      prev = cur;
      cur = cur.nextNode;
    }
    const newNode = node(value, cur);
    prev.nextNode = newNode;
    return 'inserted';
  },
  removeAt(index) {
    if (typeof index !== 'number') return console.log('The index must be a number');
    if (index < 0 || index > this.size() - 1) {
      return `Index must not be less than 0 and more than ${this.size() - 1}`;
    }
    if (index === 0) {
      const newHead = this.list.head.nextNode;
      this.list.head = newHead;
      return 'removed';
    }

    let prev = null;
    let cur = this.list.head;
    let count = 0;

    while (count <= index) {
      if (count === index) {
        prev.nextNode = cur.nextNode;
        return 'removed';
      }
      count += 1;
      prev = cur;
      cur = cur.nextNode;
    }
    return 'removed';
  },
});

const list = linkedList();
list.append('Yessir!');
list.prepend('Bomboclat');

console.log(list.logList());
console.log(list.toString());
