def are_anagrams(s1, s2):
    #check length
    if len(s1) != len(s2):
        return False
    # make hash table
    freq1 = {'a' : 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0}
    freq2 = {'a' : 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0}

    #increment occured char of string
    for ch in s1:
        if ch in freq1:
            freq1[ch]+=1
        else:
            freq1[ch] = 0
    for ch in s2:
        if ch in freq2:
            freq2[ch] += 1
        else:
            freq2[ch] = 0

   # compare total of occured char of freq1 and freq2 of given strings
    for key in freq1:
        if freq1[key] != freq2[key]:
            return False
    return True


print(are_anagrams("kali", "alik"))