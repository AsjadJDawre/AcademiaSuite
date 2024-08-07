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


-- ** RENAME the new table ** 
-- ALTER TABLE new_subject_master RENAME TO subject_master;

-- DELETE FROM subject_master WHERE subject_code='daas';


-- INSERT INTO user (username, password) VALUES ("admin", "12345")

-- UPDATE user SET password = "$2b$10$N2gD2H1MdUbP53AIOm8mYu1zm.fuUg0V5ca5q0OjhthbYHJY.4hb2" WHERE id = 1;

-- SELECT * FROM subject_master WHERE year = '01/June 2011-31/May/2012' AND pattern = 'CBGS' AND branch = 'COMPUTER ENGINEERING' AND semester = 'Semester 1';

-- UPDATE subject_master SET year = '01/June 2012-31/May/2013' WHERE id = "32"

-- UPDATE subject_master SET subject_name = 'Applied Chemistry-I' WHERE id = "26"
-- UPDATE subject_master SET subject_group = null WHERE id = "32"

 
--  CREATE TABLE exam_code (
--     exam_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     year TEXT,
--     branch TEXT,
--     heldin_year TEXT,
--     heldin_month TEXT,
--     type TEXT,
--     is_current BOOLEAN,
--     is_lock BOOLEAN
-- );

DROP TABLE  exam_code 

-- INSERT INTO exam_code (year, branch, heldin_year, heldin_month, type, is_current, is_lock)
-- VALUES ('01/June 2013-31/May/2014', 'COMPUTER ENGINEERING','2021', 'August', 'Regular Exam', 0, 0);

-- SELECT ec.heldin_year, ec.heldin_month, ec.type, 
--        sm.h1_credit, sm.h2_credit, sm.ese_res, sm.ia_res
-- FROM exam_code AS ec
-- JOIN subject_master AS sm ON ec.subject_id = sm.id;

--  UPDATE exam_res SET exam_id = 34 WHERE exam_res_id = 1

--  CREATE TABLE exam_res (
--     exam_res_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     pattern TEXT,
--     semester TEXT,
--     exam TEXT,
--     subject TEXT,
--     h1_res INTEGER,
--     h2_res INTEGER,
--     exam_id INTEGER,
--     FOREIGN KEY (exam_id) REFERENCES exam_code(exam_id)
-- );

-- INSERT INTO exam_res (pattern, semester, exam, subject, h1_res, h2_res)
-- VALUES ('CBGS','Semester 1', 'December 2021 (A.T.K.T)', 'Engineering Mathematics-I', 0, 0)
 
-- CREATE TABLE exam_code (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     heldIn_year INTEGER,
--     month TEXT,
--     exam TEXT,
--     subject_id INTEGER,
--     FOREIGN KEY (subject_id) REFERENCES subject_master(id)
-- );

-- INSERT INTO exam_code (heldIn_year, month, exam, subject_id)
-- VALUES (2024, 'August', 'Final Exam', 1);



-- UPDATE subject_master SET id='1'  WHERE  id ='2'
-- SELECT ec.heldIn_year, ec.month, ec.exam, 
--        sm.h1_credit, sm.h2_credit, sm.ese_res, sm.ia_res, sm.ese_oom
-- FROM exam_code  AS ec
-- JOIN subject_master AS  sm ON ec.subject_id = sm.id;

 
