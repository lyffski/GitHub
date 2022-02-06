# Function multiplies a parameter by 2
def mult_by_2(num):
    return num * 2

# A function can be:
# 1. Assigned to another name
times_two = mult_by_2  #cuz mult_by_2 isnt an dynamic func. it do not need any parameters, else it would (see below)
print("4 * 2 =", times_two(4))

# 2. Passed into other functions
def do_math(func, num):
    return func(num)

print("8 * 2 =", do_math(mult_by_2, 8))

### see first note in tree
########


# 3. Returned from a function

def get_func_mult_by_num(num): ## those func. works like partialy, s
    # Create a dynamic function that will receive a value
    # and then return that value times the value passed
    # into get_func_mult_by_num()
    def mult_by(value):     #here the partiality, is that, the mult_py func. is a variable func. (which memory palce been recored and rememberd)
        return num * value  #but to the lack of yet empty value value, it jump of the get_func_mult_by_num func to return to row 31

    return mult_by

generated_func = get_func_mult_by_num(5) #here in row 31, it is rememberd, that genareted func. have alreadly benn init, thus saved, that get_func_mult_by_num(num) where num is alredy setted, have still unexecuted a func variable of mult_by(value) but still missing the value value of the nested func. THUS PROGRAM PROCEDURE (THERE FORE DYNMAMIC FUNC:)
print("5 * 10 =", generated_func(10)) #herer the genreted_func (with aboved partaliy executed func get_func_mult_by_num(5)) now receive the missing value value of mult_by(value), now as you see the value == 10, and since all parts init, the nested and partialy executed func. can execute fully. 



# 4. Embedded in a data structure
list_of_funcs = [times_two, generated_func]
print("5 * 9 =", list_of_funcs[1](9)) #calling func due to the index in before nested list with func.

# Python Problem for you to Solve
'''
Now that we have explored new ways we can use functions lets try another problem.
I want you to create a function that receives a list and a function. 
The function passed will return True or False if a list value is odd. 
And then the surrounding function will return a list of odd numbers.
'''

lst = [x for x in range(10)]

def func1(func, lst):
    return func(lst)

def odd_or_not(lst):
    new_lst = []
    for i in range(len(lst)):
        if lst[i] % 2 == 1:
            
            new_lst.append(lst[i])
            print(new_lst)

        else:
            continue 
    return new_lst

check_odd = odd_or_not
odd_filterd_list = func1(check_odd, lst)
print(odd_filterd_list)




def is_it_odd(num):
    if num % 2 == 0:
        return False
    else:
        return True

def change_list(list, func):
    odd_list = []

    for i in list:
        if func(i):
            odd_list.append(i)

    return odd_list

a_list = range(1, 21)

print(change_list(a_list, is_it_odd))

# Function Annotations
def random_func(name: str, age: int, weight: float) -> str:
    print("Name :", name)
    print("Age :", age)
    print("Weight :", weight)

    return "{} is {} years old and weighs {}".format(name, age, weight)

print(random_func("Derek", 41, 165.5))

# You don't get an error if you pass bad data
print(random_func(89, "Derek", "Turtle"))

# You can print the annotations
print(random_func.__annotations__)

