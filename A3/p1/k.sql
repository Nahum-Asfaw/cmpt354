-- Write an UPDATE statement on Broker that fails for violating (d).
UPDATE broker -- broker cannot own an account...
              -- set the pid to something in Owns??
SET pid = MAX(select pid from owns)