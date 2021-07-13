export const initialSQL = [
    `CREATE TABLE IF NOT EXISTS user (
        id VARCHAR(255) ,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB;`
    ,
    `CREATE TABLE IF NOT EXISTS town (
        id INTEGER NOT NULL auto_increment ,
        townName VARCHAR(255),
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB;`
    ,
    `CREATE TABLE IF NOT EXISTS product (
        id INTEGER NOT NULL auto_increment ,
        title VARCHAR(255),
        price INTEGER,
        isSoldOut TINYINT,
        content TEXT,
        category INTEGER,
        userId VARCHAR(255),
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (userId)
        REFERENCES user (id) ON DELETE NO ACTION ON UPDATE CASCADE
    ) ENGINE=InnoDB;`
    ,
    `CREATE TABLE IF NOT EXISTS chat_room (
        id INTEGER NOT NULL auto_increment ,
        productId INTEGER,
        userId VARCHAR(255),
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (productId) REFERENCES product (id) ON DELETE NO ACTION ON UPDATE CASCADE,
        FOREIGN KEY (userId) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE CASCADE
    ) ENGINE=InnoDB;`
    ,
    `CREATE TABLE IF NOT EXISTS liked_product (
        id INTEGER NOT NULL auto_increment ,
        townId INTEGER,
        productId INTEGER,
        userId VARCHAR(255),
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (productId) REFERENCES product (id) ON DELETE NO ACTION ON UPDATE CASCADE,
        FOREIGN KEY (userId) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE CASCADE,
        FOREIGN KEY (townId) REFERENCES town (id) ON DELETE NO ACTION ON UPDATE CASCADE
    ) ENGINE=InnoDB;`
    ,
    `CREATE TABLE IF NOT EXISTS user_town (
        id INTEGER NOT NULL auto_increment ,
        townId INTEGER,
        userId VARCHAR(255),
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE CASCADE,
        FOREIGN KEY (townId) REFERENCES town (id) ON DELETE NO ACTION ON UPDATE CASCADE
    ) ENGINE=InnoDB;`
]