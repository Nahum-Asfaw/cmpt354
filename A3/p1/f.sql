-- Write an INSERT statement on Account that fails because the
-- account's brokerpid doesn't refer to an existing broker.
INSERT INTO account
VALUES(123, 1010101)