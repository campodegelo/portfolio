DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != ''),
    description TEXT,
    location VARCHAR,
    area VARCHAR,
    year_start VARCHAR,
    year_conclusion VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
