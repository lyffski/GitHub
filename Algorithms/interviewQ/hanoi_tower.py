# n = no. of levels, start = rod of whichi all level start, end = rod where all levels suppose to relocate
# start, end, other are rodes, on which levels can be placed
def hanoi(n, start, end):
    if n == 1:
        pm(start, end)
    else:
        other = 6 - (start + end)
        hanoi(n-1, start, other) #other = end in recureisoen
        pm(start, end)
        hanoi(n-1, other, end)

def pm(start, end):
    print(str(start) + " moves to " + str(end))



fin = 0

def sum(n):
    fin = 0
    if n == 1:
        return 1
    else:
        return sum(n-1) + n 



x = sum(5)
print(x)


def grid_pattern(n,m):
    if n == 1 or m == 1:
        return 1
    else:
        pass



x = grid_pattern(1,1):
print(x)
