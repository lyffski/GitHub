def is_prime(num):
    for i in range(2, num):
        if num % i == 0:
            return False
        return True

def gen_primes(max_val):
    for num1 in range(2, max_val):
        if is_prime(num1):
            yield num1

prime = gen_primes(15)
print("Prime: {}".format(next(prime)))
print("Prime: {}".format(next(prime)))
print("Prime: {}".format(next(prime)))
print("Prime: {}".format(next(prime)))
print("Prime: {}".format(next(prime)))