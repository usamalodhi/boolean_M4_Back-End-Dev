DROP TABLE IF EXISTS user;
      
CREATE TABLE IF NOT EXISTS user (
  id                SERIAL        PRIMARY KEY,
  email             VARCHAR(255)  NOT NULL,
);