import { Node } from './Node.js';

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    return this.buildTreeRecursive(sortedArray, 0, sortedArray.length - 1);
  }

  buildTreeRecursive(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTreeRecursive(array, start, mid - 1);
    node.right = this.buildTreeRecursive(array, mid + 1, end);

    return node;
  }

  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return node;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      node.data = this.findMin(node.right).data;
      node.right = this.deleteItem(node.data, node.right);
    }

    return node;
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value, node = this.root) {
    if (node === null || node.data === value) return node;

    if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  levelOrder(callback) {
    const queue = [];
    const result = [];
    if (this.root !== null) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const node = queue.shift();
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return result.length > 0 ? result : null;
  }

  inOrder(callback, node = this.root, result = []) {
    if (node !== null) {
      this.inOrder(callback, node.left, result);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      this.inOrder(callback, node.right, result);
    }
    return result.length > 0 ? result : null;
  }

  preOrder(callback, node = this.root, result = []) {
    if (node !== null) {
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }

      this.preOrder(callback, node.left, result);
      this.preOrder(callback, node.right, result);
    }
    return result.length > 0 ? result : null;
  }

  postOrder(callback, node = this.root, result = []) {
    if (node !== null) {
      this.postOrder(callback, node.left, result);
      this.postOrder(callback, node.right, result);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
    }
    return result.length > 0 ? result : null;
  }

  height(node) {
    if (node === null) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, current = this.root, d = 0) {
    if (current === null) return -1;
    if (current.data === node.data) return d;

    if (node.data < current.data) {
      return this.depth(node, current.left, d + 1);
    } else {
      return this.depth(node, current.right, d + 1);
    }
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalanced() {
    const values = this.inOrder();
    this.root = this.buildTree(values);
  }
}
