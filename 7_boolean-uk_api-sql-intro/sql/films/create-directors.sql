DROP TABLE IF EXISTS directors;
      
CREATE TABLE IF NOT EXISTS directors (
 director_id             SERIAL          PRIMARY KEY,
 director_name           VARCHAR(50)     NOT NULL
)

-- Extension 3
-- Create a new directors table. Each director should have a name and a unique director id.