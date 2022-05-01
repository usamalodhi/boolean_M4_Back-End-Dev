DROP TABLE IF EXISTS films;
      
CREATE TABLE IF NOT EXISTS films (
  id                SERIAL                                  PRIMARY KEY,
  title             VARCHAR(50)                             NOT NULL,
  genre             VARCHAR(50)                             NOT NULL,
  release_year      INT                                     NOT NULL,
  score             INT CHECK (score >=1 AND score <=10)    NOT NULL,
  director_id       INT                                     NOT NULL,
  unique(title)
);


