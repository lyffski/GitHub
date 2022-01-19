

# x_n = x_n-1 + x_n-2

def fib(n):
    lst = [0]*(n+1) 
    lst[0] = 0
    lst[1] = 1
    for i in range(2, n+1):
        lst[i] = lst[i-1] + lst[i-2]
    return lst
    

def fib_recursion(n, lookup):
    if n in lookup:
        return lookup[n] 
    elif n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        lookup[n] = fib_recursion(n-1, lookup) + fib_recursion(n-2, lookup)
        return lookup[n]
        

def fibr(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibr(n-1) + fibr(n-2)



lookup = [0]*(6+1)
print(fib_recursion(6, lookup))

print(fibr(6)) 