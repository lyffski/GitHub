import os

with open("text.txt", mode="w") as f:
    f.write("layt lyffski\nthe overclouded one\nsee you")

with open("text.txt") as f:
    line_num = 1
    average_length_of_words = 0
    while True:
        line = f.readline() 
        if not line:
            break
        print("line {}: {}".format(line_num, line))
        string_list = line.split()
        for i in range(len(string_list)):
            average_length_of_words += len(string_list[i])
        average_length_of_words = average_length_of_words / len(string_list)
        print("amount of words on line {}: {}".format(line_num, len(string_list)))
        print("Average length of Words: ",average_length_of_words)
        print("")
        line_num += 1

