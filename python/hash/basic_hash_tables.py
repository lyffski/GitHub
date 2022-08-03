# The positive of a Hash Table data structure is that
# they are fast at inserting and searching. The negative
# is that they are limited in size, are hard to resize,
# and don't work well unless each item is unique.

# A Hash Function is used to generate a unique key for
# every item in the list. Since every item is entered
# using a calculation, we can reverse the calculation
# to find the correct index.

# We have to take care that the unique key (Index) fits
# in the list and that it doesn't overwrite other data.


class HashFunction:

    def __init__(self, size):
        self.list_size = size
        self.the_list = []
        for i in range(size):
            self.the_list.append("-1") #default index, if index not setted

    # For our next Hash Function we have to have values
    # from 0 to 999, but we will have a max of 15 values
    # It doesn't make sense to make a 1000 item list
    # We can however use the mod function versus the
    # list size to make sure the items fit in our list.
    # Also our goal is to make the list big enough to       
    # avoid collisions but not so big that it wastes
    # memory. A collision occurs when we try to put a
    # value in an index that already has data stored.
    def hash_func_2(self, str_list_2):
        for k in str_list_2:
            index = int(k) % 31 #most basic hash func. but universal, also k is str with wished value to be saved
            print(f"Mod Index : {index} Value : {int(k)}")

            # Look for a collision
            while self.the_list[index] != "-1": #it loops so long through hash-table, till if finds default index
                index += 1 #looping
                print(f"Collision Try {index} Instead") #try the next staind index, if not found incremnt the index yk
                # If we get to the end of the list (hash-table length) go to index 0, done be mod list_size
                index %= self.list_size

            # We know we found an index where we can store, thus an defualt indext unstted -1
            self.the_list[index] = k
        return self.the_list

    # This function will find a value in a Hash table and return
    # the index for it
    def find_key(self, key):
        # Use the same formula used to store the value
        list_index_hash = int(key) % 30

        # Cycle through our list looking for the value and
        # then return the index. If the value was moved
        # because there wasn't enough room continue searching
        # using the same formula as before
        while self.the_list[list_index_hash] != "-1":
            if self.the_list[list_index_hash] == key:
                print(f"{key} in Index {list_index_hash}")
                return list_index_hash
                return self.the_list[list_index_hash] #return value assigned to with the index 

            # If not found look in next index
            list_index_hash += 1

            # If we get to the end of the list go to index 0
            list_index_hash %= self.list_size

        # If we are here that means we couldn't find it
        return False


# This hash function stores items by creating a constrained
# index, but also based on the value of the string
# This was constructed to cause collisions, but normally
# you want your list to be twice the size the max number of
# values you plan to add
hash_table_2 = HashFunction(31) #31 is size, and size msut be ALWAYS a prime number
str_list_2 = ["100", "510", "170", "214", "268", "398",
              "235", "802", "900", "723", "699", "1", "16",
              "999", "890", "725", "998", "990", "989", "984",
              "320", "321", "400", "415", "450", "50", "660", "624"]
x = hash_table_2.hash_func_2(str_list_2)
# Print the new list with indexes
for i in range(hash_table_2.list_size):
    print(i, end=" ")
    print(hash_table_2.the_list[i])

# We will search for what index our data is stored in
key = hash_table_2.find_key(str_list_2[-1])
#or
key2 = hash_table_2.find_key("100")
print(x[key])
print(x[18])
print(x[key2])
print(x[13])

