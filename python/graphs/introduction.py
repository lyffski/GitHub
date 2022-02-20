# Graphs are data structures similar to trees. They differ
# in that graphs have a shape representative of what they model.

# With graphs nodes are called vertices and the lines connecting
# them are edges. Graphs are considered connected if there is one
# path from each vertex to each other vertex.

# Graphs don't have fixed organization like trees. Trees have
# a maximum of 2 children, but with graphs each vertex can
# connect to any number of other vertices.


# 4. This is the custom stack used with the Depth First Search
class MyStack:
    def __init__(self, size):
        self.size = size
        self.my_stack = [0] * self.size
        self.top = -1

    # Increment the index and insert value
    def push(self, val):
        self.top += 1
        self.my_stack[self.top] = val

    # Decrement the value of top to move down the stack
    # and return the value previously in the top index
    def pop(self):
        self.top -= 1
        return self.my_stack[self.top + 1]

    # Return the top value, but don't delete it
    def peek(self):
        return self.my_stack[self.top]

    # Checks if the stack is empty
    def is_empty(self):
        return self.top == -1 #cuz self.top is not equql to -1, then it return False, thus do not break the while loop,


# Each vertex will have a name
class Vertex:
    def __init__(self, name):
        self.name = name
        # Used for searching
        self.visited = False


# Here I'll model a graph using a vertex array
class Graph:
    def __init__(self):
        self.known_edges = []
        self.marked = []
        self.max_vertices = 10
        self.vertex_list = [0]*10
        # Multidimensional list of zeroes
        # Use a generator to create a list of
        # elements defined by max and assigned 0
        self.adjacency_matrix = [[0] * self.max_vertices for i in range(self.max_vertices)] #create 10x10 matrix
        self.vertex_count = 0

        # Used for Depth First Searching (set size of stack to 20)
        self.the_stack = MyStack(20)
    
    def size(self):
        only_vertex_list = []
        for i in range(len(self.vertex_list)):
            if isinstance(self.vertex_list[i], int):
                print(f"at index {i} is not an obj")
            else:
                only_vertex_list.append(self.vertex_list[i])
        return only_vertex_list

    def visit(self, v):
        self.vertex_list[v].visited = True
        self.marked.append(self.vertex_list[v])
        return self.marked

    def neighbors(self, v): #dfs
        self.visit(v)
        for i in range(self.vertex_count):
            if self.adjacency_matrix[v][i] == 1 and self.vertex_list[i] not in self.marked:
                self.known_edges.append(i) #[1,3,2,4]
                print(f"there is conn from vertex {self.vertex_list[v].name} to vertex {self.vertex_list[i].name}")
                self.neighbors(self.known_edges[-1])
                self.known_edges.pop(-1)
            
        return self.vertex_list[v].name

    def neighbors1(self): #bfs
        known_edges = []
        for v in range(self.vertex_count):
            if self.vertex_list[v].visited == False:
                self.visit(v)
            for i in range(self.vertex_count):
                if self.adjacency_matrix[i][v] == 1 and self.vertex_list[i] not in self.marked:
                    known_edges.append(i)
                    print(f"there is conn from vertex {self.vertex_list[v].name} to vertex {self.vertex_list[i].name}")
            
    


    def add_vertex(self, name):
        self.vertex_list[self.vertex_count] = Vertex(name)
        self.vertex_count += 1

    # We will use an adjacency matrix that defines whether
    # an edge lies between 2 vertices
    # Each row &column represents a single vertex and
    # a 1 lies in a cell if vertices connect
    # Example when A connects to B & C but B & C don't
    #    A  B  C
    # A  0  1  1
    # B  1  0  0
    # C  1  0  0
    def add_edge(self, first, last):
        self.adjacency_matrix[first][last] = 1
        self.adjacency_matrix[last][first] = 1

    def print_vertices(self):
        for i in self.vertex_list:
            # If an instance of int print 0
            if isinstance(i, int): #check if i is instance of interager, but the created vertecies are object, cuz of class call, thus are ojbext of vertex  
                print(0) #once the objs enede, but the list size stores more then amt of object, the missing object are represnted by 1 an interager, therefore see other func
            else:
                print(i.name) #i represents a obj of saved in vertex_list, the items of this list are obj of class Vertex, thus are obj, can have attribute like here i.name = "A"/"B etc
    def print_edges(self):
        for row in self.adjacency_matrix:
            for elem in row:
                print(elem, end=' ') # it print each value seprattly, and not just as a self.adjecency_matrix[row] thus a further list, see debugger
            print()

    # 2. We will use Depth First Searching to locate all vertices.
    # This works by monitoring vertices that were visited as well as
    # adjacent vertices. We visit the 1st vertex in the vertex_list,
    # check visited, then work down the column checking those vertices
    # that are connected (marked with a 1). When we get to the end of
    # the column we move to the next and continue searching.
    # 3. This function returns the next unvisited vertex or -1
    def get_next_unvisited_vertex(self, curr_vertex):
        for i in range(0, self.vertex_count): # loop thorgh all possibale vertex, cuz it is a matrix vertex_amt x vetex_amt in 2dim
            if self.adjacency_matrix[curr_vertex][i] == 1 and self.vertex_list[i].visited is False:# it keeps looking till it gets to the the self.vetex_list[i] which weren yet visited 
                return i                #row     i=column 
        return -1

    # 5. This is the Depth First Search Function
    def df_search(self):
        # Start searching at vertex in index 0, init start
        self.vertex_list[0].visited = True

        # Print it
        print(self.vertex_list[0].name) # also print specifliy the first root/ vertex, cuz that is requiretemnt, can notbe automeinted

        # Push 0 in the stack, to start the procedure ig
        self.the_stack.push(0)

        while not self.the_stack.is_empty(): #HONOTE
            vertex = self.get_next_unvisited_vertex(self.the_stack.peek()) # return the yet unvisistied vertex, the search for this particualar unvisited vertex is done be the called func: in line 99

            if vertex == -1: #thus not an obj of class Vertex, but assing to default value,
                self.the_stack.pop()
            else:
                self.vertex_list[vertex].visited = True #it start on the vertex 1, since th0 root vertext has been alreaday vised on line 108, wehn calling a func df_search()
                # Print it
                print(self.vertex_list[vertex].name)
                self.the_stack.push(vertex)

        # Stack is empty so set all vertices back to unvisited
        for i in range(0, self.max_vertices):
            if isinstance(i, int):
                pass
            else:
                self.vertex_list[i].visited = False



graph = Graph()
graph.add_vertex("A")
graph.add_vertex("B")
graph.add_vertex("C")
graph.add_vertex("D")
graph.add_vertex("E")
graph.add_vertex("H")
graph.add_vertex("Z")
# A connects to B
graph.add_edge(0, 1)
# B connects to C
graph.add_edge(1, 2)
# A connects to D
graph.add_edge(0, 3)
# D connects to E
graph.add_edge(3, 4)
graph.add_edge(1,3)
graph.add_edge(1,6)
graph.add_edge(5,6)
graph.add_edge(0,5)
graph.print_vertices()
graph.print_edges()
graph.size()
for v in range(graph.vertex_count):
    print(graph.neighbors(v))
for i in range(graph.vertex_count):
    print("KALILKI",graph.marked[i].name)


# 6. Run Depth First Search
graph.df_search()


class Graph1:
    def __init__(self):
        pass
    def visit(self, v):
        pass
    def size(self):
        pass
    def neighbors(self, v):
        pass


def dfs(G,v):
    G.visit(v)
    #marked[v] = True
    for w in G.nighbors(v):
        if not marked[w]:
            dfs(G,w)

def dfs_iter(G,v):
    pass
