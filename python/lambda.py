a = range(1,10)


def dbl(lst):
    lst1 = []
    for i in range(len(lst)):
        lst1.append(lst[i])
    return lst1

x = dbl(a)
print(x)


def dbk1(num):
    return num*2

from functools import reduce
import random
# func map() == Function used to execute code on each item in a list
print(list(map(dbk1, [x for x in range(250)]))) #second argemtn must be sequence whihc allow to be interted
print(list(map(dbk1, a)))
print(list(map(dbk1, range(1,11))))
 
print(list(map((lambda x: x+x), [x for x in range(100)]))) #lambda is one line function,
print(list(map((lambda x: x*x), range(1, 11))))
                #(func lambda arg1,arg2), #1.seqence, #2.seqence
lst = list(map((lambda x,y: x+y), [x for x in range(10)], range(10)))

b = [[1, 3, 3],[3,3,3]]
print(list(b))
print(b)

#list/map like expresion, store the whole list of value and thus use more space than genrators
print(list(map((lambda x: x*x), range(1, 11))))
#genertors prints only one value, and do not store the val
double = (x*2 for x in range(10))
print("Double: ", next(double)) #this val will be forget, once it is printed and next row willst at, only thing what will be remember is the index in generator, (see debugger and tree file)
print("Double: ", next(double))
print("Double: ", next(double))

lst = range(1, 1001)

a = list(filter((lambda x: x % 9 == 0), lst)) #filter() == Function that selects items from a list based on an exception
print(a)

from functools import reduce # func reduce() == Function used to receive a list and return a single result?
print(reduce((lambda x,y: x+y), range(1, 11)))      # lambda must take 2 args
# Apply a function of two arguments cumulatively to the items of a sequence
# from left to right, so as to reduce the sequence to a single value.
# For example, reduce(lambda x, y: x+y, [1, 2, 3, 4, 5]) calculates ((((1+2)+3)+4)+5)
# If initial is present, it is placed before the items of the sequence in the calculation,
# and serves as a default when the sequence is empty.