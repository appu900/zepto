class BinaryTreeNode<T>  {
  value: T;
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
// class BinaryTree
class BinaryTree<T> {
  root: BinaryTreeNode<T> | null;
  constructor() {
    this.root = null;
  }

  insert(value: T): void {
    const newNode = new BinaryTreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    const queue: BinaryTreeNode<T>[] = [this.root];
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (!current.left) {
        current.left = newNode;
        return;
      } else if (!current.right) {
        current.right = newNode;
        return;
      } else {
        queue.push(current.left);
        queue.push(current.right);
      }
    }
  }
}

const tree = new BinaryTree<number>();
tree.insert(1);
tree.insert(2);
tree.insert(3)


