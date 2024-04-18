/** BinaryTreeNode: node for a general tree. */

const { Tree } = require("./tree");

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    const queue = [this.root];
    let depth = 0;
    while (queue.length) {
      const current = queue.shift();
      depth++
      if (!current.left && !current.right) {
        return depth;
      }
      current.left ? queue.push(current.left) : ""
      current.right ? queue.push(current.right) : ""
    }
    return depth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    const queue = [this.root];
    let depth = 0;
    while (queue.length) {
      const levelSize = queue.length
      depth++
      for (let i = 0; i < levelSize; i++) {
        let current = queue.shift();
        current.left ? queue.push(current.left) : ""
        current.right ? queue.push(current.right) : ""
      }
    }
    return depth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;
    let globalMax = { sum: Number.MIN_SAFE_INTEGER };

    function maxPathSum(node) {
      if (!node) return 0;

      let leftMax = Math.max(0, maxPathSum(node.left));  // Only add positive contributions
      let rightMax = Math.max(0, maxPathSum(node.right));  // Only add positive contributions

      // Calculate current max path including both children
      globalMax.sum = Math.max(globalMax.sum, node.val + leftMax + rightMax);

      // Return max gain if we continue the path from the current node
      return node.val + Math.max(leftMax, rightMax);
    }

    maxPathSum(this.root);
    return globalMax.sum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
    let value = 9999999999;
    const stack = [this.root];
    while (stack.length) {
      const current = stack.pop()
      if (current.val > lowerBound && current.val < value) {
        value = current.val
      }
      if (current.left) {
        stack.push(current.left)
      }
      if (current.right) {
        stack.push(current.right)
      }
    }

    if (value > lowerBound && value != 9999999999) {
      return value;
    } else {
      return null;
    }
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    const queue = [this.root];
    let depth = 0;
    while (queue.length) {
      const levelSize = queue.length
      depth++
      for (let i = 0; i < levelSize; i++) {
        let current = queue.shift();
        if (current === node1) {
          node1.depth = depth;
        }
        if (current === node2) {
          node2.depth = depth;
        }
        if (current.left) {
          current.left.parent = current;
          queue.push(current.left)
        }
        if (current.right) {
          current.right.parent = current;
          queue.push(current.right)
        }
      }
    }
    if (node1.depth === node2.depth && node1.parent !== node2.parent) {
      return true;
    }
    return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {
    if (!this.root) return ""
    let string;
    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift();
      string = string + current.val
    }
    if (current.left) queue.push(current.left)
    if (current.right) queue.push(current.right)

    return string;
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {


  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

  }
}

module.exports = { BinaryTree, BinaryTreeNode };
