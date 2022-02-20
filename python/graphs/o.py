
def dfp(graph, source): #source is the key of graph dic
    print(source)
    for neightbor in graph[source]:
        dfp(graph, neightbor)

def dfp1(graph, source):    #source is the key of dic (graph)
    stack = [source]            # creat a stack
    while (len(stack) > 0):     # check if stack not empty
        current = stack.pop()   # popped up the lasted value, here init: source in begginning
        print(current)

        for neigbor in graph[current]:  # for i in dic graph [key] // key = current, dic the matrix of 1010, yk
            stack.append(neigbor)

dict_graphs = { #ig due to the usege of dicitonar , the vistingn func and remembering the traversled node, is not needed, tho not sure
    "a": ["b", "c"], # a conn to b and c // if b anc c dead end already, seach end , not excalthe order but u get idea
    "b": ["d"],        # 2: b conn to d, go to d //if d visted b also dead end, retrire back to a 
    "c": ["e"],         # c conn to e // after e visted c also dead end, retire to a
    "d": ["f"],         # 2: d conn to f, go to f // after f visted d also dead end, retire to c
    "e": [],            # e dead end, retire back to c
    "f": []             # f dead end, retire back to e
}

dfp(dict_graphs, "a")

print("--")

dfp1(dict_graphs, "a")