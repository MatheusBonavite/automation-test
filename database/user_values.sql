CREATE TABLE user_info (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(10),
    user_password CHAR(6)
);

ALTER TABLE user_info OWNER TO postgres;

INSERT INTO
user_info(user_id, user_name, user_password)
VALUES (DEFAULT, 'matheus', 'dbdocs');

INSERT INTO
user_info(user_id, user_name, user_password)
VALUES (DEFAULT, 'casimiro', 'dbdocx');

INSERT  INTO
user_info(user_id, user_name, user_password)
VALUES (DEFAULT, 'miguel', 'dbdocz');

INSERT INTO
user_info(user_id, user_name, user_password)
VALUES (DEFAULT, 'lucas', 'dbdocs');

INSERT INTO
user_info(user_id, user_name, user_password)
VALUES (DEFAULT, 'carlos', 'dbdocx');

INSERT INTO
user_info(user_id, user_name, user_password)
VALUES (DEFAULT, 'mujica', 'dbdocz');

ALTER TABLE user_info 
ADD CONSTRAINT check_min_length
CHECK (length(user_name) >= 5);