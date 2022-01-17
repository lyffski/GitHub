# Linear search for first index
'''def first_kth_element(arr, k):
    arr.sort()
    for i in range(len(arr)):
        if arr[i] == k:
            return i 
        i += 1
    else: print("element not in arrray")'''
        
        
# Linear search for last index           
'''def first_and_last_indext(arr, k):
    i = first_kth_element(arr, k)
    start = i
    while arr[i] == k:
        i += 1
        if arr[i] != k and arr[i-1] == k:
            end = i - 1
            return start, end'''



# binary search for first index
def first_kth_element(arr, k):
    if k == arr[0]: 
        return 0
    left, right = 0, len(arr)-1
    while left <= right:
        mid = (left+right)//2   
        if arr[mid] == k and arr[mid-1] < k:
            return mid
        elif arr[mid] < k:
            left = mid+1
        else:
            right = mid-1
    return -1

# binary search for last index
def last_kth_element(arr, k):
    start = first_kth_element(arr, k)
    print(start)
    end = start
    if end == -1: return -1
    while end < len(arr) and arr[end] == k:
        end += 1
    return start, end-1
        

# interface, sort and call responsive func.
def first_and_last(arr, k):
    arr.sort()  
    if len(arr) == 0 or arr[0] > k or arr[-1] < k:
        return False
    return last_kth_element(arr, k)


arr = [1, 2, 5, 13 ,234,15,345]
k = 13 


end = first_and_last(arr, k)
print("If sorted, than first and last index: {}".format(end))