#!/bin/bash

# Database configuration
DB_NAME="lucia"

# Create the "Lucia" database
echo "Creating the $DB_NAME database..."
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "CREATE DATABASE $DB_NAME;"

# Connect to the "Lucia" database
echo "Connecting to the $DB_NAME database..."
psql -U $POSTGRES_USER -d $DB_NAME -c "
-- Create the 'auth_user' table
CREATE TABLE auth_user (
    id TEXT PRIMARY KEY,
    username VARCHAR(255) UNIQUE
);

-- Create the 'user_key' table
CREATE TABLE user_key (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES auth_user(id),
    hashed_password TEXT
);

-- Create the 'user_session' table
CREATE TABLE user_session (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES auth_user(id),
    active_expires BIGINT NOT NULL,
    idle_expires BIGINT NOT NULL
);
"

echo "Database setup complete."
