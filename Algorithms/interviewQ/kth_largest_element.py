import heapq

def kth_largest(arr, k):
    arr = [-elem for elem in arr]
    heapq.heapify(arr)
    print(len(arr))
    for i in range(k-1): # -1 for indexes order, since k must act as a index (not as length of array), thus repectuflly to indexing by 0
        heapq.heappop(arr)
        return -heapq.heappop(arr)

'''def kth_1largest(arr, k):
    n = len(arr)
    arr.sort()
    return arr[n-k]'''



arr = [1, 2, 5, 13, 15, 345]

x = kth_largest(arr, 3)
print(x)

'''x = kth_1largest(arr, 3)
print(x)'''


res = []
res = res + [10f]
print(res)