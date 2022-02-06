# Video 24 : Iterables

# An iterable is a stored sequence of values (list) or, as we will see when we cover generators, an object that produces one value at a time

# Iterables differ from iterators in that an iterable is an object with an __iter__ method which returns an iterator
# An iterator is an object with a __next__ method which retrieves the next value from sequence of values

# Define a string and convert it into an iterator
samp_str = iter("Sample")

print("Char :", next(samp_str))
print("Char :", next(samp_str))

# Custom Iterable
# Now I’ll show how you can add iterator behavior to your custom classes
# see tree for further informatoins
class Alphabet:
    def __init__(self):
        self.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        self.index = -1

    def __iter__(self):
        return self

    def __next__(self):
        if self.index >= len(self.letters) - 1: 
            raise StopIteration
        self.index += 1 #and due to that, self.index start of as =-1, adding +1 makes is =0, thus self.index (before returning anything) = 0 (which is the starting index of everyx list), and from there the interations begins as you know (it is bit complcalted)
        return self.letters[self.index] # self.letters="ABC..." and thus pointed self.index of self.letters[self.index] display first "A" then "B" etc

alpha = Alphabet()

for letter in alpha: #it knows that for iterateing the obj alpha, it must go to method __iter__(self), which returns the obj itself, thus the alpahbet stirng
    print(letter) # then it goes to __next__(self), where as derived from above return of __intr__(self) return self, so it return itself, thus self.letters = "ABC.." -> letters = "ABC...", so in calls "ABC..." is referd as self.letters and ouside as just letters,
# 


# Iterate through a dictionary because it is an iterable #dict are iterabel
derek = {"fName": "Derek", "lName": "Banas"}

for key in derek:
    print(key, derek[key])

# Python Problem for you to Solve

# It’s time for another problem
# Create a class that returns values from the Fibonacci sequence each time next is called

# Sample Output
# Fib : 1
# Fib : 2
# Fib : 3
# Fib : 5

class FibGenerator:
    def __init__(self):
        self.first = 0
        self.second = 1

    def __iter__(self):
        return self

    def __next__(self):
        fib_num = self.first + self.second
        self.first = self.second
        self.second = fib_num
        return fib_num

fib_seq = FibGenerator()

for i in range(10):
    print("Fib :", next(fib_seq))



from audioop import mul
import random
from re import M
# lsit of 15 no. between 1 . 1000, and those 15 must me mulitpl of nine

x = [x for x in [random.randint(1, 1001) for i in range(15)] if x % 9 == 0]
print(x)



multi_list = [[1,2,3],
              [4,5,6],
              [7,8,9]]
print("k")
print(len(multi_list[0]))

a = [multi_list[i][0] for i in range(len(multi_list))]
print(a)

a = [multi_list[i][i] for i in range(len(multi_list))]
print(a)

a = [multi_list[1][i] for i in range(len(multi_list))]
print(a)

a = [multi_list[i][0+(len(multi_list[i])-1)-i] for i in range(len(multi_list))]
print(a)


def is_prime(num):
    for i in range(2, num):
        if num % i == 0:
            return False
        return True

def gen_primes(max_val):
    for i in range(max_val):
        if is_prime(i):
            yield i

prime = gen_primes(15)
print("Prime: {}".format(next(prime)))
print("Prime: {}".format(next(prime)))
print("Prime: {}".format(next(prime)))


