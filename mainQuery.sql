str1_1 = "SELECT * FROM ("

str1_2 = "SELECT * FROM university"

str2 = "NATURAL JOIN (SELECT unitid, chronname, flagship, website FROM university WHERE flagship = " + typeSelected + ")"

str3 = "NATURAL JOIN (SELECT * FROM location WHERE state = " + stateSelected + ")"

str4 = "NATURAL JOIN (SELECT unitid, chronname, tuition FROM award_tuition WHERE tuition < " + costSelected + ")"

str5 = "NATURAL JOIN (SELECT * FROM rank WHERE Rank < " + rankingSelected + ")"

str6 = ") WHERE ROWNUM < 5;"



#Best match
	#Rank NOT NULL
SELECT * FROM
(SELECT * FROM 
(SELECT * FROM test.university u natural join test.rank r
WHERE u.flagship = 0 AND
r.Rank <= 41 AND r.Rank>=31
AND u.chronname !="New York University"
)tmp1 natural join test.location l WHERE l.statename = 'NY')tmp2
Natural Join test.award_tuition a
WHERE a.tuition BETWEEN 37362*0.8 AND 37362*1.2;

#Best match
	#Rank NULL
SELECT * FROM
(SELECT * FROM 
(SELECT u.unitid, u.chronname, u.yearlevel,u.control,u.flagship,
u.website, r.rank FROM test.university u left join test.rank r ON
u.unitid = r.unitid
WHERE u.flagship = 0 
AND u.chronname !="New York University"
AND r.Rank IS NULL)tmp1 
natural join test.location l WHERE l.statename = 'NY')tmp2
Natural Join test.award_tuition a
WHERE a.tuition BETWEEN 37362*0.8 AND 37362*1.2;

#Closed Tuition
SELECT * FROM
(SELECT * FROM test.university u NATURAL JOIN
test.award_tuition a 
WHERE a.tuition between 0.98*37362 AND 1.02*37362 
AND u.chronname != 'New York University')tmp;

#Closed Location
SELECT * FROM
(SELECT * FROM test.university u NATURAL JOIN
test.location l 
WHERE l.city = "New York" AND l.statename = "NY"
AND u.chronname != 'New York University')tmp;

#Closed Ranking
SELECT * FROM
(SELECT * FROM test.university u NATURAL JOIN
test.rank r
WHERE r.Rank BETWEEN 32 AND 40
AND u.chronname != 'New York University')tmp;