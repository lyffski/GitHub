def tree(hight):
    while hight > 0:
        length = hight*2-1
        spaces = (hight - 1)
        i = 1
        j = 1

        for i in range(spaces):
            print("_", end="")
            i += 1

        for i in range(length):
            print("#", end="")

        for i in range(spaces):
            print("_", end="")
            i += 1

        print("")
        hight -= 1
            


tree(5)


from audioop import mul
import random
from xmlrpc.server import DocCGIXMLRPCRequestHandler
def guess_num():
    while True:
        random_num = random.randint(1, 11)
        try:
            a = int(input("Try your luck: "))
            if a == random_num:
                print("congrats you guesed it!")
                break
        except ValueError:
            print("not a nummber")
        except:
            print("unknown erorr")


#


a = "DOG"
lst = []
for i in range(len(a)):
    lst.append(ord(a[i]))
    i += 1

for i in range(len(lst)):
    print(chr(lst[i]), end="")
    i += 1#


import string
s2="klai ds"
print("")
print(s2.title())


s1 = "Random Accesss Memory "

def acronym(s1):
    lst = []
    s1 = s1.title()
    s1 = s1.split()
    for i in range(len(s1)):
        a = str(s1[i])
        lst.append(a[0:1])
        print(lst)
        i += 1
    print("Acronym of string: ", end="")
    for i in range(len(lst)):
        print(lst[i], end="")
    print("\n")


acronym(s1)



def ceaser_encrpyt(s1, shift):
    s1 = s1.lower()
    lst = []
    for i in range(len(s1)):
        lst.append(ord(s1[i]))
        i += 1

    for i in range(len(lst)):
        lst[i] = lst[i] + shift
        if lst[i] > 122:
            lst[i] = lst[i] % 122
            lst[i] += (97-shift) # dont now why, prob cuz shift, also shifts the unicode ref to var ?
        i+=1
        
    return lst

def ceaser_decrypt(lst, shift):
    decripted = []
    for i in range(len(lst)):
        lst[i] = lst[i] - shift
        if lst[i] < 97:                 
           lst[i] = lst[i] % 122
           lst[i] = lst[i] + (27-shift)
        decripted.append(chr(lst[i]))
    
    return decripted


s1 = "zyxzyyzs"
s = ceaser_encrpyt(s1, 1)
print(s)
v = ceaser_decrypt(s, 1)
print(v)



def solve_eq(eq):
    eq = eq.split()
    print(eq)

    print(str(eq[1]))
    if eq[1] == "+":
        x = int(eq[-1]) - int(eq[2])
        return x
    elif eq[1] == "-":
        x = int(eq[-1]) + int(eq[2])
        return x
    elif str(eq[1]) == "*":
        x = int(eq[-1]) / int(eq[2])
        return x
    elif eq[1] == "/":
        x = int(eq[-1]) * int(eq[2])
        return x


eq = "x / 4 = 9"
x = solve_eq(eq)
print(x)

import math
lst_of_lst = [6, 2, 3, 4, 5]
list_of_vals = [[math.pow(m, 2), math.pow(m, 3), math.pow(m, 4)] for m in lst_of_lst]
for k in list_of_vals:
    print(k)

# interation val, act as the ref of lst_of_lst[m] itself => m == lst_of_lst[m], 
def double2(x):
    return x*2

#lst = [[x*2, x*3, x*4] for add2(x) in range(10) if x % 2 == 0] ///!! Can not put result of func. as varirable in comprehesd list
#print(lst)

#lst = [[x*2, x*3, x*4] for x*2 in range(10) if x % 2 == 0] ///#cann not assign to operator ethier


lst = [[x*2, x*3, x*4] for x in range(10) if x % 2 == 0] ## IMPORTATN,. those list my by listed not only 2times, 
print("list within list", lst)

lst = [[double2(x) for x in range(10) if x % 2 == 0]]
print("double func:", lst)

even_squre = [x*x for x in range(10) if x % 2 == 0]
print(even_squre)

#lst = [[[x*2, x*3, x*4] for x in range(10) if x % 2 == 0]] # not SURE who to use it
#print("mulitple nested list:", lst)


mulit_d_list = [[0]*10 for x in range(10)]
print(mulit_d_list,end="")
print("\n")

for i in range(10):
    for j in range(10):
        mulit_d_list[i][j] = i * j
        j += 1
    i += 1

for i in range(10):
    print("")
    print(mulit_d_list[1:10][0:i], end="\n")
    

