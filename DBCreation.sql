CREATE TABLE tblUsers (
    user_id UUID PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    troop VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE tblUserPointValues (
    point_id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    point_value INTEGER NOT NULL CHECK (point_value >= 0),

    CONSTRAINT fk_pointvalues_user
        FOREIGN KEY (user_id)
        REFERENCES tblUsers(user_id)
        ON DELETE CASCADE
);

CREATE TABLE tblUserPointTotals (
    record_id UUID PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    point_total INTEGER NOT NULL CHECK (point_total >= 0),

    CONSTRAINT fk_pointtotals_user
        FOREIGN KEY (user_id)
        REFERENCES tblUsers(user_id)
        ON DELETE CASCADE
);