-- Write a DELETE statement on Broker that fails because the broker
-- being deleted is managing somebody else.
-- Correct
DELETE from broker 
where pid IN (select brokerpid from account);