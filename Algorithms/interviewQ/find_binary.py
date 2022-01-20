

def fib(n, lookup):
    if n in lookup: 
        return lookup[n]
    if n == 0:
        return 0
    if n == 1:
        return 1
    else:
        lookup[n] = fib(n-1, lookup) + fib(n-2, lookup)
        return lookup[n]

lookup = {}
x = fib(10, lookup)
print(x)


print("%.1f" % (10.0/3))
