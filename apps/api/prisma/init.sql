-- AI Democratizer Database Initialization
-- This file runs when the PostgreSQL container starts for the first time

-- Create extensions that might be useful
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Create indexes for better performance (these will be created by Prisma migrations)
-- Just keeping this file for any custom initialization needs

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'AI Democratizer database initialized successfully';
END $$;
