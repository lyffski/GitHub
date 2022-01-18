class Node:
    def __init__(self, data):
        self.left = None
        self.right = None
        self.data = data

    def insert(self, data):
# Compare the new value with the parent node
        if self.data:
            if data < self.data:
                if self.left is None:
                    self.left = Node(data)
                else:
                    self.left.insert(data)

            elif data > self.data:
                if self.right is None:
                    self.right = Node(data)
                else:
                    self.right.insert(data)
        else:
            self.data = data

# Print the tree
    def PrintTree(self):
        if self.left:
            self.left.PrintTree()
        print( self.data),
        if self.right:
            self.right.PrintTree()
            
# Inorder traversal
# Left -> Root -> Right
    def inorderTraversal(self, root):
        res = []
        if root:
            res = self.inorderTraversal(root.left)
            res.append(root.data)
            res = res + self.inorderTraversal(root.right)
        return res
    
# check existance if in tree
    def exist_in_tree(self, root, val):
        if root is None:
            return 0
        else:
            in_left = self.exist_in_tree(root.left, val)
            in_right = self.exist_in_tree(root.right, val)
            return root.data == val or in_left or in_right 

# sum all values of nodes (left -> right -> root)
    def tree_sum(self, root):
        if root is None:
            return 0
        else:
            sumleft = self.tree_sum(root.left)
            sumright = self.tree_sum(root.right)
            return root.data + sumleft + sumright

# display tree levels while indexin from 1
    def tree_hight(self, root):
        if root is None:
            return 0
        else:
            left_hight = self.tree_hight(root.left)
            right_hight = self.tree_hight(root.right)
            return 1 + max(left_hight, right_hight) # +1 due to indexin from 0


root = Node(27)
root.insert(14)
root.insert(35)
root.insert(10)
root.insert(19)
root.insert(31)
root.insert(42)

print(root.inorderTraversal(root)) 
print(root.tree_sum(root))
print(root.tree_hight(root))
print(root.exist_in_tree(root, 10))






