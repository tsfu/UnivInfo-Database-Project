SELECT * FROM 
(SELECT * FROM test.university WHERE unitid = "100663") A1 NATURAL JOIN test.location NATURAL JOIN test.housing NATURAL JOIN test.award_tuition ;