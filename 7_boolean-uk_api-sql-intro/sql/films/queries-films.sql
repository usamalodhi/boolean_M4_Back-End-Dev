-- Write SQL SELECT statements to return films matching the below criteria:
-- All films
SELECT * FROM films

-- All films ordered by rating descending
SELECT * FROM films
ORDER BY score DESC  

-- All films ordered by release year ascending
SELECT * FROM films
ORDER BY release_year ASC  

-- All films with a rating of 8 or higher
SELECT * FROM films
WHERE score >=8

-- All films with a rating of 7 or lower
SELECT * FROM films
WHERE score <=7

-- films released in 1990
SELECT * FROM films
WHERE release_year = 1990

-- films released before 2000
SELECT * FROM films
WHERE release_year < 2000

-- films released after 1990
SELECT * FROM films
WHERE release_year > 1990

-- films released between 1990 and 1999
SELECT * FROM films
WHERE release_year BETWEEN 1990 and 1999

-- films with the genre of "SciFi"
SELECT * FROM films
WHERE genre = 'SciFi'

-- films with the genre of "Western" or "SciFi"
SELECT * FROM films
WHERE genre = 'Western' or genre = 'SciFi' 

-- films with any genre apart from "SciFi"
SELECT * FROM films
WHERE genre != 'SciFi' 

-- films with the genre of "Western" released before 2000
SELECT * FROM films
WHERE genre = 'Western' AND release_year < 2000 

-- films that have the world "Matrix" in their title
SELECT * FROM films
WHERE title LIKE '%Matrix%' 

-- Extension 2
-- Write a SQL SELECT statements to:

-- Return the average film rating
SELECT AVG(score)::float 
FROM films

-- Return the total number of films
SELECT COUNT(id)
FROM films

-- Return the average film rating by genre
SELECT genre, AVG(score)::float "average"
FROM films
GROUP BY genre;


-- Extension 3
-- Re-insert your film data, updating each film with have a directorId. Using a SQL JOIN, write a SELECT statement that returns a list of films with their director.
SELECT *
FROM films
LEFT JOIN directors
ON films.director_id = directors.director_id;

SELECT
    f.id,
    f.title,
    d.director_name,
    d.director_id
FROM films f
LEFT JOIN directors d
ON f.director_id = d.director_id;     



-- Extension 4
-- Write a SQL SELECT statement that returns a lists of directors along with the number of films they have directed.
SELECT
    d.director_name,
    COUNT(d.director_id) "number of films directed"
FROM
    films f
LEFT JOIN
    directors d
    ON f.director_id = d.director_id
GROUP BY
    d.director_id 
ORDER BY
    d.director_id ASC
