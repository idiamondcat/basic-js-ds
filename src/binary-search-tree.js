const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinaryNode {
  constructor(val) {
    this.data = val;
    this.leftChild = null;
    this.rightChild = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.myroot = null;
  }

  root() {
    return this.myroot;
  }

  add(val) {
    this.myroot = addNode(this.myroot, val);

    function addNode(node, value) {
      if (!node) return new BinaryNode(value);

      if (node.data === value) return node;

      if (value < node.data)
        node.leftChild = addNode(node.leftChild, value);
      else
        node.rightChild = addNode(node.rightChild, value);

      return node;
    }
  }

  has(data) {
    return searchNode(this.myroot, data);
    function searchNode(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      return node.data < data ? searchNode(node.leftChild, data): searchNode(node.rightChild, data);
    }
  }

  find(val) {
    function findNode(node, value) {
      if (!node)
        return null;
      else if (node.data < value)
        return findNode(node.leftChild, value);
      else if (node.data > value)
        return findNode(node.rightChild, value);
      else
        return node;
    }
    return findNode(this.myroot, val);
  }

  remove(data) {
    function removeNode(node, data) {
      if (!node) return null;
      if (data < node.data) {
        node.leftChild = removeNode(node.leftChild, data);
        return node;
      } else if (data > node.data) {
        node.rightChild = removeNode(node.rightChild, data);
        return node;
      } else if (data === node.data) {
        if (!node.leftChild && !node.rightChild) return null;
        if (!node.rightChild) {
          node = node.leftChild;
          return node;
        }
        if (!node.leftChild) {
          node = node.rightChild;
          return node;
        }

        let rightMin = node.rightChild;
        while (rightMin.leftChild)
          rightMin = rightMin.leftChild;

        node.data = rightMin.data;
        node.rightChild = removeNode(node.rightChild, rightMin.data);
        return node;
      }
    }
    this.myroot = removeNode(this.myroot, data);
  }

  min() {
    if (!this.myroot) return;
    let node = this.myroot;

    while(node.leftChild) {
      node = node.leftChild;
    }
    return node.data;
  }

  max() {
    if (!this.myroot) return;
    let node = this.myroot;

    while(node.rightChild) {
      node = node.rightChild;
    }
    return node.data;
  }
}
module.exports = {
  BinarySearchTree
};