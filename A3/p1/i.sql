-- Write a DELETE statement that fails for violating (c).
DELETE FROM trade
(select * from trade where sym <> "example")