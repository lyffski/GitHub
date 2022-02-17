import mysql.connector
from mysql.connector import Error

try:
    # Create a connection with the database
    conn = mysql.connector.connect(host='localhost',
    database='students', user='studentadmin',
    password='TurtleDove')

    # Get a list of all students
    query = "SELECT * FROM students"

    # 2. Get 1st and last from the state of WA
    query = "SELECT first_name, last_name FROM students WHERE state='WA'"

    # 3. Get students born after 1965
    # You can compare values with =, >, <, >=, <=, !=
    # To get the month, day or year of a date use MONTH(),
    # DAY(), or YEAR()
    query = "SELECT first_name, last_name FROM students WHERE YEAR(birth_date) >= 1965"

    # 4. Use or to use multiple conditions
    # AND, && : Returns a true value if both conditions are true
    # OR, || : Returns a true value if either condition is true
    # NOT, ! : Returns a true value if the operand is false
    query = 'SELECT first_name, last_name, birth_date FROM students WHERE MONTH(birth_date) = 2 OR state="CA"'

    # 5. Double up logical operators
    query = 'SELECT last_name, state, birth_date FROM students WHERE DAY(birth_date) >= 12 && (state="CA" || state="NV")'

    # 6. Check for NULL with IS NULL or IS NOT NULL
    query = 'SELECT first_name, last_name FROM students WHERE last_name IS NULL'

    # 7. Use ORDER BY to alphabetize data
    # To change the order use ORDER BY col_name DESC;
    # Limit defines how many results you want
    # LIMIT 5, 10 returns the 5th through 10th results
    query = 'SELECT first_name, last_name FROM students ORDER BY last_name LIMIT 5'

    # 8 Use CONCAT to join columns and AS to create
    # aliases
    query = 'SELECT CONCAT(first_name, " ", last_name) AS "Name", CONCAT(city, ", ", state) AS "Hometown" FROM students'

    # 9. Use LIKE to find data that meets limited definitions
    # Matches first name that starts with D or last name
    # that ends with n
    # % matches any series of characters
    query = 'SELECT last_name, first_name FROM students WHERE first_name LIKE "D%" OR last_name LIKE "%n"'

    # 10. _ is used with LIKE to match any character
    # Find 4 letters followed by a y for a 1st name
    query = 'SELECT last_name, first_name FROM students WHERE first_name LIKE "____y"'

    # 11. Get the number of boys and girls with COUNT
    # GROUP BY defines how the results will be grouped
    query = 'SELECT sex, COUNT(*) FROM students GROUP BY sex'

    # 12. Find the number of birthdays in each month
    query = 'SELECT MONTH(birth_date) AS "Month", COUNT(*) FROM students GROUP BY Month ORDER BY Month'

    # 13. Only receive results if a state has more then
    # 1 student with HAVING
    query = 'SELECT state, COUNT(state) AS "Amount" FROM students GROUP BY state HAVING Amount > 1'

    # 14. Use DISTINCT to only receive a result once
    # Get states in which students were born
    query = 'SELECT DISTINCT state FROM students ORDER BY state'

    # 15. Get the number of states from which stuents were born
    query = 'SELECT COUNT(DISTINCT state) FROM students'

    cursor = conn.cursor()
    cursor.execute(query)
    students = cursor.fetchall()
    print("Total Results :", len(students))

    # Get the first and last name using indexes
    # for s in students:
    #     print(s[1], " ", s[2])

    # 2 - 13. Get 2 results
    # for s in students:
    #     print(s[0], " ", s[1])

    # 14 - 15. Get 1 Result
    for s in students:
        print(s[0])

# Catch any errors
except mysql.connector.Error as error:
    print("Error :", error)

# Always executes and makes sure the DB connection is
# released
finally:
    if(conn.is_connected()):
        conn.close()
        print("Database Connection Closed")
