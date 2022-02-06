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