-- Write a DELETE statement that fails for violating (c).
-- Correct
DELETE FROM trade
where sym IN (select sym from trade where sym <> 'nothing');