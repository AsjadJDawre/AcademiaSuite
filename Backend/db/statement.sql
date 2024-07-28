
-- -- Create table for subject_master
-- CREATE TABLE new_subject_master (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     year TEXT ,
--     pattern TEXT ,
--     semester TEXT ,
--     subject TEXT ,
--     subject_code TEXT,
--     branch TEXT ,
--     H1 ,
--     H2 , 
--     course_credit INTEGER ,
--     ese_marks INTEGER,
--     ese_passing_marks INTEGER,
--     ese_resolution TEXT,
--     ese_overall_criteria TEXT,
--     ese_credits INTEGER,
--     ia_marks INTEGER,
--     ia_passing_marks INTEGER,
--     ia_resolution TEXT,
--     ia_overall_criteria TEXT,
--     ia_credits INTEGER,
--     tw_marks INTEGER,
--     tw_passing_marks INTEGER,
--     tw_resolution TEXT,
--     tw_overall_criteria TEXT,
--     tw_credits INTEGER
-- );


-- INSERT INTO subject_master (
--     year, pattern, semester, subject, branch, course_credit, ese_marks, ese_passing_marks,
--     ese_resolution, ese_overall_criteria, ese_credits, ia_marks, ia_passing_marks,
--     ia_resolution, ia_overall_criteria, ia_credits, tw_marks, tw_passing_marks,
--     tw_resolution, tw_overall_criteria, tw_credits
-- ) VALUES
-- ('7/22/224', 'Semester', '1', 'Introduction to Programming', 'Computer Science', 4, 80, 40,
--  'At least 40% of the total marks', 'Minimum 50% of the total credits must be obtained', 4, 20, 10,
--  'At least 50% of the total marks', 'Minimum 50% of the total credits must be obtained', 2, 30, 15,
--  'At least 50% of the total marks', 'Minimum 50% of the total credits must be obtained', 3),
-- ('7/22/224', 'Semester', '2', 'Data Structures', 'Computer Science', 4, 70, 35,
--  'At least 50% of the total marks', 'Minimum 50% of the total credits must be obtained', 4, 25, 12,
--  'At least 50% of the total marks', 'Minimum 50% of the total credits must be obtained', 2, 35, 17,
--  'At least 50% of the total marks', 'Minimum 50% of the total credits must be obtained', 3),
-- ('7/22/224', 'Semester', '1', 'Database Systems', 'Information Technology', 4, 85, 42,
--  'At least 50% of the total marks', 'Minimum 50% of the total credits must be obtained', 4, 22, 11,
--  'At least 50% of the total marks', 'Minimum 50% of the total credits must be obtained', 2, 40, 20,
--  'At least 50% of the total marks', 'Minimum 50% of the total credits must be obtained', 3),
-- ('7/22/224', 'Semester', '2', 'Operating Systems', 'Information Technology', 4, 75, 37,
--  'At least 50% of the total marks', 'Minimum 50% of the total credits must be obtained', 4, 18, 9,
--  'At least 50% of the total marks', 'Minimum 50% of the total credits must be obtained', 2, 32, 16,
--  'At least 50% of the total marks', 'Minimum 50% of the total credits must be obtained', 3);


-- SELECT * FROM subject_master

-- CREATE TABLE user (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     username TEXT NOT NULL,
--     password TEXT NOT NULL
-- -- )


-- Update your Table Schema

-- CREATE TABLE newsubject_master (
--   id INTEGER PRIMARY KEY,
--   year TEXT,
--   pattern TEXT,
--   branch TEXT,
--   semester TEXT,
--   H1 BOOLEAN,
--   H2 BOOLEAN,
--   subject_name TEXT,
--   subject_code TEXT,
--   no_of_credit INTEGER,
--   h1_credit INTEGER,
--   h2_credit INTEGER,
--   ese_oom INTEGER,
--   ese_pm INTEGER,
--   ese_res INTEGER,
--   pr_oom INTEGER,
--   pr_pm INTEGER,
--   pr_res INTEGER,
--   or_oom INTEGER,
--   or_pm INTEGER,
--   or_res INTEGER,
--   ia_oom INTEGER,
--   ia_pm INTEGER,
--   ia_res INTEGER,
--   tw_oom INTEGER,
--   tw_pm INTEGER,
--   tw_res INTEGER,
--   overall_passing_mark INTEGER
--   overall_passing_mark2 INTEGER
-- );


-- Some Dummy Data 
-- INSERT INTO newsubject_master (
--   id, year, pattern, branch, semester, H1, H2, 
--   subject_name, subject_code, no_of_credit, h1_credit, h2_credit, 
--   ese_oom, ese_pm, ese_res, pr_oom, pr_pm, pr_res, 
--   or_oom, or_pm, or_res, ia_oom, ia_pm, ia_res, 
--   tw_oom, tw_pm, tw_res, overall_passing_mark
-- ) VALUES 
-- (
--   1, '2023', 'Pattern A', 'Engineering', 'Semester 1', 1, 0,
--   'Mathematics', 'MATH101', 3, 1, 1,
--   100, 40, 60, 50, 20, 30,
--   30, 15, 15, 20, 10, 10,
--   25, 15, 10, 50
-- ),
-- (
--   2, '2023', 'Pattern B', 'Science', 'Semester 2', 0, 1,
--   'Physics', 'PHYS202', 4, 2, 1,
--   90, 36, 54, 40, 16, 24,
--   25, 12, 13, 18, 9, 9,
--   20, 10, 10, 45
-- ),
-- (
--   3, '2024', 'Pattern C', 'Arts', 'Semester 1', 1, 1,
--   'History', 'HIST303', 2, 1, 1,
--   80, 32, 48, 35, 14, 21,
--   20, 10, 10, 15, 7, 8,
--   30, 15, 15, 40
-- );

-- DROP Old table
-- DROP TABLE IF EXISTS subject_master;

-- RENAME the new table 
-- ALTER TABLE newsubject_master RENAME TO subject_master;




INSERT INTO subject_master (year, pattern, semester, subject_name, branch, no_of_credit) VALUES
('7/22/224', 'Pattern CBGS', 'Semester-3', 'PL ','Computer Engineering ', 6);






-- ALTER TABLE subject_master ADD COLUMN overall_passing_mark2 INTEGER;


-- PRAGMA table_info(subject_master);



-- ALTER TABLE subject_master ADD COLUMN subject_code TEXT;

-- INSERT INTO user (username, password) VALUES ("admin", "12345")

-- UPDATE user SET password = "$2b$10$N2gD2H1MdUbP53AIOm8mYu1zm.fuUg0V5ca5q0OjhthbYHJY.4hb2" WHERE id = 1;