CREATE DATABASE :db_name:;
CREATE USER :db_user: WITH password ':db_password:';
GRANT ALL privileges ON DATABASE :db_name: TO :db_user:;
ALTER ROLE :db_user: WITH Superuser;

-- ALTER DEFAULT PRIVILEGES 
--     FOR USER :db_user:
--     IN SCHEMA public
--     GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO :db_user:;

-- ALTER DEFAULT PRIVILEGES
-- 	GRANT USAGE ON SEQUENCES TO test_user;