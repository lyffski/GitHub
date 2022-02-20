# What is a Heap?
# A heap is like a tree, but it is normally implemented
# as a list.
# With a heap every row must be complete. This means there
# must be a value in each node except for in the last row
# Parent nodes are larger than children, but unlike with a
# Binary Tree the left child isn't always bigger than the right
# Heaps can contain duplicates, and are fast at insertion,
# deletion and sorting.
# Heaps are slow when it comes to traversal & searching

# How Removal Works
# We pop off the top value and replace it with the lowest
# Then we percolate that value down as long as its value
# is greater than other values

# How Insertion Works
# Add the new value at the bottom and percolate up as long
# as its value is greater than others


class Node:
    def __init__(self, key):
        self.key = key

class Heap:
    def __init__(self, max_size):
        # Populate list with 31 Nones
        self.the_list = [None] * max_size
        self.max_size = max_size
        self.current_size = 0

    # Tests if list is empty
    def is_empty(self):
        return self.current_size == 0

    # Will insert a new Node using the provided key
    def insert(self, key):
        # Make sure list isn't full
        if self.current_size == self.max_size:
            return False

        # Create new node for the list
        new_node = Node(key)

        # Assign node after last assigned value
        self.the_list[self.current_size] = new_node

        # Keep track of the number of items in list
        self.current_size += 1

        # Pass the index for the new value which will be positioned
        self.percolate_up(self.current_size-1)
        return True

    def percolate_up(self, index):
        # Get the new nodes parent
        parent = int((index - 1) / 2) #if it ise the 5th inseriton, the heap-layer is still the second but on the seconde indext of paretns, so like second-layer 2/2, and not second-layer 1/2, when the 03 and 04 indexes were assinged yk the deal, it is logically think about it

        # The new node added #indext change the layers, an index is the acutlly one to the insert-value will refere to store it selve wtihin the heap, the indext may only change if the current index-value, thus inserted-value is beigger than the partent-value, that is how the heaps work
        bottom = self.the_list[index] #saved seperatily, so the insertion value is callable, but the index may change, that why it is heap, just work with indexes
        #heaps just keep the value as they are, but only alter thies indext, depeneded, on which large the value ist, thus heaps, only meddel with indexes of list, but those values say put, only postion in list change due to index change yk the deal layt
        # If not at top of list and new node is greater
        while index > 0 and self.the_list[parent].key < bottom.key: # fist after the 3rd entry, the parent-index-layer will change from 0 to 1, on on this layer 1-layer it will place furhter 2 insertion-value and so on, atleast as long as the insertion-value.key is smaller than the parent.key value yk the deal, IT IS A HEAP AFTERALL
            # Move new node up and prepare to test the next parent
            self.the_list[index] = self.the_list[parent] #at first self.the_list[index] == bottom, but it must change, since now the self.the_list[index] is larger then its parents.key yk 
            index = parent  #due to that the new instert-value is bigger, (that way at all the while loop is running) the indext must also be change, first just simple by repalce current insertion-indext with parent index, due to that it is learger the the beforehanded paretnt.key yk the deal
            parent = int((parent - 1) / 2)  #here once, new, the bigger value of insertion, is assinged into the index, it must also generates the parent a new key for the above-standing parents, cuz it may be that, the currentl work layer is a subtree itselft, thus have a parent on its own, thats why it must creat at link to the larger parents, to keep everything consistent, THUS IF IT IS THE seconde layer of heap, then the bigger insertion-value creates a link to the root of whole tree, but only if that is in fact the second-layer of heap, direkt link to the actual root of the heap yk the deal 
        # Assign current index with the new node 
        self.the_list[index] = bottom

    # Remove max value
    def pop(self):
        # Get the root
        root = self.the_list[0]
        # Decrement to new list size
        self.current_size -= 1
        # Move bottom node to top
        self.the_list[0] = self.the_list[self.current_size]
        # Move all nodes into position starting at the top
        self.percolate_down(0)
        return root

    # This function moves values into position starting at the top
    def percolate_down(self, index):
        # Will hold the larger of the children nodes
        larger_child = 0

        # Gets the top node in the list, the value that will be popped out of heap
        top = self.the_list[index]

        # We don't have to check the bottom row
        while index < self.current_size / 2: #indext reolation to each other
            # Gets the index for the left & right child
            left_child = 2 * index + 1 #"recursion" will occure, thus it start on the 2-layer of heap 1/2, after 1 iteration the search go deepter into the subtrees of the heap
            right_child = left_child + 1 #2-layer of heap 2/2 yk the deal

            # Avoid None valued Nodes and if left child is < right
            if right_child < self.current_size and self.the_list[left_child].key < self.the_list[right_child].key: #compare the 2-layer of heap 1/2 value/ with the 2-layer of heap 2/2 value, and desecie wether the left or right childe of pareten of 1-layer of heap is bigger, thus if-statements after words 

                # Then save the right child index as the largest, if right_child, thus (2-layer of heap 2/2) is bigger
                larger_child = right_child
            else:
                # Otherwise the left child is the largest, if left_child, thus (2-layer of heap 2/2) is bigger
                larger_child = left_child

            # If the top value is ever greater than the largest
            # child jump out of the while // top.key, the wished delated node value yk
            if top.key >= self.the_list[larger_child].key: #not the case in first iteration
                break

            # Assign the largest node, thus 90 if index 1. to the root, root is now the wished deletion of node, thus the index[-1]
            self.the_list[index] = self.the_list[larger_child]

            # Set the index to that largest node
            index = larger_child #swap, then go to while again

        # After we finish cycling assign the top value
        self.the_list[index] = top


heap = Heap(31)
heap.insert(72) #1-layer of heap
heap.insert(44) #2 layer of heap 1/2
heap.insert(53) #2 layer of heap 2/2
heap.insert(21) #indexes of 3, 4 have a parent in 2-layer of heap 1/2, but itselves the 3,4 indext are stored in the 3-layer of heap (1/2) and so forth
heap.insert(66) # index 4, thus see above 
heap.insert(100) #here indexes of 5,6 have a parein also in 2-layer of heap but now in 2/2 second half, if u will 
heap.insert(84) #6th indext thus see abov3e
heap.insert(35) #index of 7,8 have paretin in the 3-layer of heap 1/2, thus the index 3, but only 3 cuz it binary, thus indexes form 7,8 refers to parent on 3-layer of heap 1/2 thus to thte index of 2 and 3, cuz both 2,3 are on the aforementioend parents layer-of-heaps
heap.insert(19)
heap.insert(90) #9th index now refers to the paretn layer of heap which is 4 the the next 3 9,10 would also do, but the 11, 12 woulde be on the same layer of heap but the index now is 2/2 yk the deal
#and so forht the indext work in, just remember the relation in which the indexes of each insetoin and layer of heap are linked up together thus parent = (index-1)/2 and so on
# Pop off the 100
heap.pop()

for i in heap.the_list:
    if i is None:
        print("N", end=", ")
    else:
        print(i.key, end=", ")
print()





