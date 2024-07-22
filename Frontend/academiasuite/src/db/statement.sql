
-- Create table for subject_master
CREATE TABLE subject_master (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year TEXT NOT NULL,
    pattern TEXT NOT NULL,
    semester TEXT NOT NULL,
    subject TEXT NOT NULL,
    branch TEXT NOT NULL,
    course_credit INTEGER NOT NULL,
    ese_marks INTEGER,
    ese_passing_marks INTEGER,
    ese_resolution TEXT,
    ese_overall_criteria TEXT,
    ese_credits INTEGER,
    ia_marks INTEGER,
    ia_passing_marks INTEGER,
    ia_resolution TEXT,
    ia_overall_criteria TEXT,
    ia_credits INTEGER,
    tw_marks INTEGER,
    tw_passing_marks INTEGER,
    tw_resolution TEXT,
    tw_overall_criteria TEXT,
    tw_credits INTEGER
);
