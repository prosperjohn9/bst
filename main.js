import { Tree } from './Tree.js';
import { prettyPrint } from './prettyPrint.js';

function getRandomArray(size, max) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

const randomArray = getRandomArray(15, 100);
const tree = new Tree(randomArray);

// Print initial tree
console.log('Initial tree:');
prettyPrint(tree.root);

// Check if tree is balanced
console.log('Is tree balanced?', tree.isBalanced());

//Print traversals
console.log('Level order:', tree.levelOrder());
prettyPrint(tree.root);
console.log('Pre order:', tree.preOrder());
prettyPrint(tree.root);
console.log('Post order:', tree.postOrder());
prettyPrint(tree.root);
console.log('In order:', tree.inOrder());
prettyPrint(tree.root);

// Test insert method
tree.insert(101);
tree.insert(102);
console.log('Tree after inserting 101 and 102:');
prettyPrint(tree.root);

// Test find method
const foundNode = tree.find(101);
console.log('Find 101:', foundNode ? foundNode.data : 'Not found');

// Test findMin method
const minNode = tree.findMin(tree.root);
console.log('Minimum value in the tree:', minNode.data);

//test deleteItem method
tree.deleteItem(101);
console.log('Tree after deleting 101:');
prettyPrint(tree.root);

// Test height method
const height = tree.height(tree.root);
console.log('Height of the tree:', height);

// Unbalance the tree by adding several numbers > 100
for (let i = 0; i < 10; i++) {
  tree.insert(Math.floor(Math.random() * 100) + 100);
}

console.log('Tree after unbalancing by adding numbers > 100:');
prettyPrint(tree.root);

// Check if tree is balanced after insertions
console.log('Is tree balanced after insertions?', tree.isBalanced());
prettyPrint(tree.root);

// Rebalanced the tree
tree.rebalanced();
console.log('Tree after rebalanced:');
prettyPrint(tree.root);
console.log('Is tree balanced after rebalanced?', tree.isBalanced());

// Test depth method from root to found node (e.g., for node 102)
const node102 = tree.find(102);
const depth = tree.depth(node102);
console.log('Depth of node 102 from root:', depth);

//Print traversals after rebalanced
console.log('Level order:', tree.levelOrder());
prettyPrint(tree.root);
console.log('Pre order:', tree.preOrder());
prettyPrint(tree.root);
console.log('Post order:', tree.postOrder());
prettyPrint(tree.root);
console.log('In order:', tree.inOrder());

prettyPrint(tree.root);
