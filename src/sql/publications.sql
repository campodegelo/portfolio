DROP TABLE IF EXISTS publications CASCADE;

CREATE TABLE publications(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != ''),
    description TEXT,
    location VARCHAR,
    area VARCHAR,
    year_publication VARCHAR,
    image VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
