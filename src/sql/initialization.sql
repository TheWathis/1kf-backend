-- Create ENUM types

DROP TYPE IF EXISTS public.language_type;
CREATE TYPE language_type AS ENUM('Natural', 'Programming');

DROP TYPE IF EXISTS public.skill_type;
CREATE TYPE skill_type AS ENUM('Soft', 'Hard');

-- Create tables

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  title VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  address VARCHAR(255)
);

-- Controller and root ok ; TODO: check fields
CREATE TABLE IF NOT EXISTS educations (
  id SERIAL PRIMARY KEY,
  institution_name VARCHAR(255) NOT NULL,
  degree VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT
);

-- Controller and root ok ; TODO: check fields
CREATE TABLE IF NOT EXISTS languages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  level INTEGER NOT NULL DEFAULT 5 CHECK (level >= 1 AND level <= 10),
  type language_type NOT NULL DEFAULT 'Natural'
);

-- Controller and root ok ; TODO: check fields
CREATE TABLE IF NOT EXISTS job_references (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  address VARCHAR(255)
);

-- Controller and root ok ; TODO: check fields
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  level INTEGER NOT NULL DEFAULT 5 CHECK (level >= 1 AND level <= 10),
  type skill_type NOT NULL DEFAULT 'Hard'
);

-- Controller and root ok ; TODO: check fields
CREATE TABLE IF NOT EXISTS work_experiences (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT
);

-- Controller and root ok ; TODO: check fields
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT
);

-- Controller and root ok ; TODO: check fields
CREATE TABLE IF NOT EXISTS hobbies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);