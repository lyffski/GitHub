import mysql.connector
from mysql.connector import Error

try:
    conn = mysql.connector.connect(host='localhost', database='test1', user='studentadmin', password='TurtleDove')
    cursor = conn.cursor()

    # 1. Get test data
    # query = 'SELECT test_id, MIN(score), MAX(score), MAX(score) - MIN(score), SUM(score), AVG(score) FROM scores GROUP BY test_id'
    # cursor.execute(query)
    # results = cursor.fetchall()

    # 2. Find out how many tests student 6 took
    # query = 'SELECT student_id, test_id FROM scores WHERE student_id=6'
    # cursor.execute(query)
    # results = cursor.fetchall()

    # 3. Insert a test make up, delete student from absence
    # query = 'INSERT INTO scores VALUES (6, 3, 24)'
    # cursor.execute(query)
    # query = 'DELETE FROM absences WHERE student_id = 6'
    # cursor.execute(query)
    # query = 'SELECT student_id, test_id FROM scores WHERE student_id=6'
    # cursor.execute(query)
    # results = cursor.fetchall()

    # 4. You can alter tables
    # Add a test taken column
    # query = 'ALTER TABLE absences ADD COLUMN test_taken CHAR(1) NOT NULL DEFAULT "F" AFTER student_id'
    # cursor.execute(query)
    # Change the data type for test_taken
    # query = 'ALTER TABLE absences MODIFY COLUMN test_taken ENUM("T","F") NOT NULL DEFAULT "F"'
    # cursor.execute(query)

    # 5. You can delete columns
    # query = 'ALTER TABLE absences DROP COLUMN test_taken'
    # cursor.execute(query)

    # 6. Use update to change a value in a row
    # query = 'UPDATE scores SET score=25 WHERE student_id=4 AND test_id=3'
    # cursor.execute(query)

    # 7. Use BETWEEN to find matches in a range
    # query = 'SELECT first_name, last_name, birth_date FROM students WHERE birth_date BETWEEN "1960-1-1" AND "1970-1-1"'
    # cursor.execute(query)
    # results = cursor.fetchall()

    # 8. Use IN to narrow results based on a list
    # query = 'SELECT first_name, last_name, student_id FROM students WHERE first_name IN ("Bobby", "Lucy", "Andy")'
    # cursor.execute(query)
    # results = cursor.fetchall()

    # 9. Use JOIN to combine data from multiple tables
    # You have to define the 2 tables to join after FROM
    # You have to define the common data between the tables after WHERE
    # It is good to qualify the specific data needed by proceeding
    # it with the tables name and a period
    # query = 'SELECT scores.student_id, tests.date, scores.score, tests.maxscore FROM tests, scores WHERE date = "2014-08-25" AND tests.test_id = scores.test_id'
    # cursor.execute(query)
    # results = cursor.fetchall()

    # 10. You can JOIN more then 2 tables as long as you define the like
    # data between those tables
    # query = 'SELECT CONCAT(students.first_name, " ", students.last_name) AS Name, tests.date, scores.score, tests.maxscore FROM tests, scores, students WHERE date = "2014-08-25" AND tests.test_id = scores.test_id AND scores.student_id = students.student_id'
    # cursor.execute(query)
    # results = cursor.fetchall()

    # 11. If we wanted a list of the number of absences per student we
    # have to group by student_id or we would get just one result
    # query = 'SELECT students.student_id, students.first_name, students.last_name, COUNT(absences.date) FROM students, absences WHERE students.student_id = absences.student_id GROUP BY students.student_id'
    # cursor.execute(query)
    # results = cursor.fetchall()

    # 12. An INNER JOIN gets all rows of data from both tables if there is a
    # match between columns in both tables
    query = 'SELECT students.first_name, students.last_name, scores.test_id, scores.score FROM students INNER JOIN scores ON students.student_id=scores.student_id WHERE scores.score <= 15 ORDER BY scores.test_id'
    cursor.execute(query)
    results = cursor.fetchall()

    # 1. Get test score data
    # for x in results:
    #     print(x[0], " Min :", x[1], " Max :", x[2], " Rng :", x[3], " Sum :", x[4], " Avg :", x[5])

    # 2 - 3. Get 2 results
    # for x in results:
    #     print(x[0], " ", x[1])

    # 7 - 8. 3 Outputs
    # for x in results:
    #     print(x[0], " ", x[1], " ", x[2])

    # 9 - 12 : 4 Outputs
    for x in results:
        print(x[0], " ", x[1], " ", x[2], " ", x[3])

except mysql.connector.Error as error:
    print("Error :", error)
finally:
    if(conn.is_connected()):
        conn.close()
