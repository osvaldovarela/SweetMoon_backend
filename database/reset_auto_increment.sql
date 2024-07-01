DELIMITER / /

CREATE TRIGGER before_insert_producto 
    BEFORE INSERT ON producto 
    FOR EACH ROW 
    BEGIN
        DECLARE count_rows INT;
        SELECT COUNT(*) INTO count_rows FROM producto;
            IF count_rows = 0 THEN
            SET NEW.id = 1;
            END IF;
    END //

DELIMITER;

---------------
DELIMITER / /

CREATE TRIGGER before_insert_usuario 
BEFORE INSERT ON usuario 
FOR EACH ROW 
BEGIN
    DECLARE count_rows INT;
    SELECT COUNT(*) INTO count_rows FROM usuario;
    IF count_rows = 0 THEN
        SET NEW.id = 1;
    END IF;
END //

DELIMITER;