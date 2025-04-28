
export const algorithmTemplates = [
  {
    name: "Linear Search",
    code: `def linear_search(arr, n, target):
    # O(n) time complexity
    for i in range(n):
        if arr[i] == target:
            return i
    return -1`
  },
  {
    name: "Binary Search",
    code: `def binary_search(arr, n, target):
    # O(log n) time complexity
    left, right = 0, n - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1`
  },
  {
    name: "Bubble Sort",
    code: `def bubble_sort(arr, n, _):
    # O(n²) time complexity
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`
  },
  {
    name: "Quick Sort",
    code: `def quick_sort(arr, n, _):
    # O(n log n) average case
    if n <= 1:
        return arr
        
    def _quick_sort(arr, low, high):
        if low < high:
            pivot_index = partition(arr, low, high)
            _quick_sort(arr, low, pivot_index - 1)
            _quick_sort(arr, pivot_index + 1, high)
        
    def partition(arr, low, high):
        pivot = arr[high]
        i = low - 1
        
        for j in range(low, high):
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1
        
    _quick_sort(arr, 0, n - 1)
    return arr`
  },
  {
    name: "Selection Sort",
    code: `def selection_sort(arr, n, _):
    # O(n²) time complexity
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`
  }
];

export const defaultAlgorithm = `def custom_algorithm(arr, n, i):
    # Your algorithm implementation
    # arr: input array
    # n: size of array
    # i: target index or value
    
    # Example: O(n log n) sorting algorithm (merge sort)
    if n <= 1:
        return arr
    
    def merge_sort(arr):
        if len(arr) <= 1:
            return arr
            
        mid = len(arr) // 2
        left = merge_sort(arr[:mid])
        right = merge_sort(arr[mid:])
        
        return merge(left, right)
        
    def merge(left, right):
        result = []
        i = j = 0
        
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
                
        result.extend(left[i:])
        result.extend(right[j:])
        return result
        
    return merge_sort(arr)`;
