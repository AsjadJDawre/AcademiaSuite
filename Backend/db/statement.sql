
-- -- Create table for subject_master
-- CREATE TABLE subject_master (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     year TEXT NOT NULL,
--     pattern TEXT NOT NULL,
--     semester TEXT NOT NULL,
--     subject TEXT NOT NULL,
--     branch TEXT NOT NULL,
--     course_credit INTEGER NOT NULL,
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


SELECT * FROM subject_master