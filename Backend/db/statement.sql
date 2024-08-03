-- *** create this new table ***

-- CREATE TABLE new_subject_master (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     year TEXT,
--     pattern TEXT,
--     branch TEXT,
--     semester TEXT,
--     subject_name TEXT,
--     subject_code TEXT,
--     subject_id TEXT,
--     course_credits INTEGER,
--     h1_credit INTEGER,
--     h2_credit INTEGER,
--     ese_oom INTEGER,
--     ese_pm INTEGER,
--     ese_res INTEGER,
--     pr_oom INTEGER,
--     pr_pm INTEGER,
--     pr_res INTEGER,
--     or_oom INTEGER,
--     or_pm INTEGER,
--     or_res INTEGER,
--     ia_oom INTEGER,
--     ia_pm INTEGER,
--     ia_res INTEGER,
--     tw_com INTEGER,
--     tw_pm INTEGER,
--     tw_res INTEGER,
--     opc INTEGER,
-- subject_group text
-- );


-- ** DROP Old table **

-- DROP TABLE IF EXISTS subject_master;

-- ** RENAME the new table ** 
-- ALTER TABLE new_subject_master RENAME TO subject_master;

-- DELETE FROM subject_master WHERE subject_code='daas';


-- INSERT INTO user (username, password) VALUES ("admin", "12345")

-- UPDATE user SET password = "$2b$10$N2gD2H1MdUbP53AIOm8mYu1zm.fuUg0V5ca5q0OjhthbYHJY.4hb2" WHERE id = 1;

-- SELECT * FROM subject_master WHERE year = '01/June 2011-31/May/2012' AND pattern = 'CBGS' AND branch = 'COMPUTER ENGINEERING' AND semester = 'Semester 1';

-- UPDATE subject_master SET year = '01/June 2012-31/May/2013' WHERE id = "32"

UPDATE subject_master SET subject_name = 'Applied Chemistry-I' WHERE id = "26"
-- UPDATE subject_master SET subject_group = null WHERE id = "32"
