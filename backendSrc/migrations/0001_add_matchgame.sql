-- Migration number: 0001 	 2025-10-16T20:29:45.256Z
CREATE TABLE matchgames_table (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  left text NOT NULL,
  right text NOT NULL
);
INSERT INTO matchgames_table (id, left, right) VALUES (0, 'Собака', 'Dog'), (1, 'Человек', 'Human');