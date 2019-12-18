
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS users;

/** 
  * user table
  * role: 1 administrator, 2 famer
  */
CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   rut VARCHAR(12) UNIQUE NOT NULL,
   password VARCHAR (300) NOT NULL,
   name VARCHAR (120),
   last_name VARCHAR(120)
);

CREATE TABLE tokens (
   id SERIAL PRIMARY KEY,
   token VARCHAR(300) UNIQUE,
   user_id INTEGER REFERENCES users ON DELETE CASCADE,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
   id SERIAL PRIMARY KEY,
   user_id INTEGER REFERENCES users ON DELETE CASCADE,
   status VARCHAR (1) DEFAULT 'A',
   text VARCHAR (255),
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

/**
  * data user 
  */
INSERT INTO users(rut, password, name, last_name) values

('1234567890', '$2a$10$7S4XcxLA42qPfstqlzd8Kux2/D2aJWwKrK5/sIfQMXtnkdQSZzCay','test', 'test');