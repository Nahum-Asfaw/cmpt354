-- Write an INSERT statement on Trade that fails for violating (e).
-- want to sell more than this account holds
-- Correct
INSERT INTO trade VALUES(138, 5, 'sell', '2026-01-01 12:30:00', 'XOM', 10000, 108.92);
--(138, 4, 'sell', '2023-08-08 12:04:00', 'XOM', 20.00, 106.85);