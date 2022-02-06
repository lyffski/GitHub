try:
    f = open("text2.txt")

except FileNotFoundError as ex:
    print("files was not found")
    print(ex.args) # ex.args print, addional infomaiton about the error

else: #else block runs when, try block was executed properly, w/o/ raising any defined/build-in exepction
    print(f.read())

finally: # finally blocck execute unconditional, thus either with raised ex or not, it will run.
    print("procedure is finshed")
