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
    if (Object.keys(this.list).length === 0) {
      this.list = { head: node(value) };
    } else {
      const newHead = node(value, this.list.head);
      this.list.head = newHead;
    }
  },
  size() {
    let count = 0; let temp = this.list.head;
    while (temp) {
      temp = temp.nextNode;
      count += 1;
    }
    return count;
  },
  head() {
    return this.list.head || 'Error: Cannot find the head item due to an empty list';
  },
  tail() {
    if (!this.list.head) return 'Error: Cannot find the tail item due to an empty list';
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
    if (!this.list.head) return 'Error: Empty List';
    if (typeof index !== 'number') return 'Error: Specified Index is not a number';
    if (index < 0) return 'Error: Specified Index can\'t be less than 0';
    if (index > this.size() - 1) return `Error: The list does not reach this index, it's max index is ${this.size() - 1}`;

    let count = 0;
    let temp = this.list.head;
    while (count < index) {
      temp = temp.nextNode;
      count += 1;
    }
    return temp;
  },
  pop() {
    if (this.size() === 1) {
      this.list = {};
      return 'Success! Last item has been removed';
    } if (this.size() === 0) return 'Notification: Pop had no effect because the list is empty.';

    let prev = null;
    let cur = this.list.head;

    while (cur.nextNode) {
      prev = cur;
      cur = cur.nextNode;
    }

    prev.nextNode = null; // Break off previous item's connection to the last item
    return 'Success! Last item has been removed';
  },
  contains(value) {
    let temp = this.list.head;
    let valueCheck = false;

    while (temp) {
      if (temp.data === value) valueCheck = true;
      temp = temp.nextNode;
    } return valueCheck;
  },
  find(value) {
    let index = 0;
    let temp = this.list.head;

    while (temp) {
      if (temp.data === value) return index;
      index += 1;
      temp = temp.nextNode;
    } return null;
  },
  toString() {
    if (!this.logList().length) return 'Error: Empty List';
    let listArray = this.logList();
    listArray = listArray.join(' -> ');
    listArray += ' -> null';
    return listArray;
  },
  insertAt(value, index) {
    if (typeof index !== 'number') return 'Error: Index must be a number';
    if (index < 0 || index > this.size()) return `Error: Index must not be less than 0 nor more than ${this.size()}`;

    if (index === 0) {
      this.prepend(value);
      return 'Notification: New Node has been inserted to the beginning of the list';
    } if (index === this.size()) {
      this.append(value);
      return 'Notification: New Node has been inserted to the end of the list';
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
    return 'Notification: New Node has been inserted at the specified index';
  },
  removeAt(index) {
    if (typeof index !== 'number') return 'Error: The index must be a number';
    if (!this.size()) return 'Error: The list is empty, thus there is nothing to remove';
    if (index < 0 || index > this.size() - 1) return `Error: Index must not be less than 0 and more than ${this.size() - 1}`;

    if (index === 0) {
      const newHead = this.list.head.nextNode;
      this.list.head = newHead;
      return 'removed';
    }

    let count = 0;
    let prev = null;
    let cur = this.list.head;

    while (count <= index) {
      if (count === index) {
        prev.nextNode = cur.nextNode;
        return 'Notification: The Node at the specified index has been removed';
      }
      count += 1;
      prev = cur;
      cur = cur.nextNode;
    } return 'Notification: The Node at the specified index has been removed';
  },
});

const list = linkedList();
console.log(list.toString());
