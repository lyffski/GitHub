# In this video I'll focus on how you would delete nodes
# in a Binary Tree. This is the most complicated task
# you can perform with trees so refer to the tree diagrams
# while I cover the coding involved.

# Walkthrough Delete Root
# 1. Ask is the node we want to delete the Root?
# 2. If it is ask what is the right child of Root?
# 3. The right child will replace Root
# 4. Take the Roots left child and assign it as the left
# child to Roots right child

# Walkthrough Roots Left Child
# 1. Is the left child < Root? (We do this to determine if we
# are going to the left or right of Root)
# 2. The left child will be replaced by its right child
# 3. We do this by assigning 25s right child as the left child
# of Root
# 4. Then assign 25s left child as the left child of 30


class BinaryTree:
    def __init__(self):
        self.root = None

    def add_node(self, key, name):
        new_node = Node(key, name)
        if self.root is None:
            self.root = new_node
        else:
            focus_node = self.root
            while True:
                parent = focus_node
                if key < focus_node.key:
                    focus_node = focus_node.left_child
                    if focus_node is None:
                        parent.left_child = new_node
                        return True
                else:
                    focus_node = focus_node.right_child
                    if focus_node is None:
                        parent.right_child = new_node
                        return True

    def in_order_traverse(self, focus_node):
        if focus_node is not None:
            self.in_order_traverse(focus_node.left_child)
            print(focus_node)
            self.in_order_traverse(focus_node.right_child)

    # This function will remove nodes and adjust the tree
    def remove(self, key):
        # Start at the Root node
        focus_node = self.root

        # Also set parent as Root
        parent = self.root

        # Track are we moving to the left or right
        is_left_child = True

        # Search until we find it
        while focus_node.key != key: #focus_node.key change each time layer has changes, either left of right childe, depnding on key value if higher or lower
            # Set parent as focus_node

            # Decide what direction to search in
            if key < focus_node.key:
                # We know we are searching to the left
                is_left_child = True
                # So set the focus node to the left child
                focus_node = focus_node.left_child
            else:
                # When it isn't a left child
                is_left_child = False
                # Set the focus as the right child
                #here program change the layer, into the lower subtree, either left of right side of root.tree, here it right cuz, key is bigger
                focus_node = focus_node.right_child #it change the focus_mode onto other layer of tree
            # If here we didn't find a match
            if focus_node is None:
                return False

        # If focus node doesn't have children and it is Root
        # set Root to None and we are done
        if focus_node.left_child is None and focus_node.right_child is None:
            if focus_node == self.root:
                self.root = None
            elif is_left_child: # must involve left childe, thus key must be small the parennt key or focus_node.key
                # If left child delete it by setting to None
                parent.left_child = None
            else:
                # Otherwise delete right child
                parent.right_child = None
        elif focus_node.right_child is None:
            # Handle if there is no right child
            if focus_node == self.root:
                # Move the left child into the root position
                root = focus_node.left_child
            elif is_left_child:
                # If left child set the parents left child
                parent.left_child = focus_node.left_child
            else:
                # Otherwise set to right child
                parent.right_child = focus_node.right_child
        elif focus_node.left_child is None:
            # Handle if there is no left child
            if focus_node == self.root:
                # Move the left child into the root position
                root = focus_node.right_child
            elif is_left_child:
                # If left child set the parents right child
                parent.left_child = focus_node.right_child
            else:
                # Otherwise set to left child
                parent.right_child = focus_node.left_child
        else:
            # 2 children are involved here and so I have to
            # figure out what the replacement should be
            replacement = self.get_replacement_node(focus_node)

            # If focus node is Root then I have to replace it
            if focus_node == self.root:
                self.root = replacement
            # Otherwise set either left or right child
            elif is_left_child:
                parent.left_child = replacement
            else:
                parent.right_child = replacement

            replacement.left_child = focus_node.left_child

            # If here it worked
            return True

    # Gets passed the node that should be replaced
    def get_replacement_node(self, replaced_node):
        # Parent of replaced node
        replacement_parent = replaced_node
        # The node that will replace the node passed here
        replacement = replaced_node
        # We always replace with the right child because its
        # value is bigger than the left child
        focus_node = replaced_node.right_child

        # While there are no more left children cycle until
        # the left child is moved into place [SLIDE]
        while focus_node is not None:
            replacement_parent = replacement
            replacement = focus_node
            focus_node = focus_node.left_child

        # If the replacement isn't the right child
        # move the replacement into the parents
        # left child slot and move the replaced nodes
        # right child into the replacements right child
        if replacement != replaced_node.right_child:
            replacement_parent.left_child = replacement.right_child
            replacement.right_child = replaced_node.right_child

        return replacement


class Node:
    def __init__(self, key=0, name=""):
        self.key = key
        self.name = name
        self.left_child = None
        self.right_child = None

    def __str__(self):
        return f"{self.name} has the key {self.key}"


tree = BinaryTree()
tree.add_node(50, "Boss")
tree.add_node(25, "Vice President")
tree.add_node(15, "Office Manager")
tree.add_node(30, "Secretary")
tree.add_node(75, "Sales Manager")
tree.add_node(85, "Salesman")

# Test replacing the Vice President
tree.in_order_traverse(tree.root)
tree.remove(25)
print("\nVice President Replaced\n")
tree.in_order_traverse(tree.root)
