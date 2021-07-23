CREATE TABLE IF NOT EXISTS`user` (`id` VARCHAR(255) , `profileImage` VARCHAR(510), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `town` (`id` INTEGER NOT NULL auto_increment ,  `townName` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `product` (`id` INTEGER NOT NULL auto_increment , `townId` INTEGER, `title` VARCHAR(255), `price` INTEGER, `isSoldOut` TINYINT, `content` TEXT, `category` INTEGER, `userId` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,  FOREIGN KEY (`townId`) REFERENCES `town` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `chat_room` (`id` INTEGER NOT NULL auto_increment , `productId` INTEGER, `userId` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `liked_product` (`id` INTEGER NOT NULL auto_increment ,  `productId` INTEGER, `userId` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `user_town` (`id` INTEGER NOT NULL auto_increment ,`townId` INTEGER, `userId` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`townId`) REFERENCES `town` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `product_image` (`id` INTEGER NOT NULL auto_increment ,`productId` INTEGER, `filePath` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `chat_message` (`id` INTEGER NOT NULL auto_increment , `content` TEXT, `chatRoomId` INTEGER, `userId` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`chatRoomId`) REFERENCES `chat_room` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB; 
CREATE TABLE IF NOT EXISTS `read_chat_message` (`id` INTEGER NOT NULL auto_increment , `chatMessageId` INTEGER, `chatRoomId` INTEGER, `userId` VARCHAR(255), PRIMARY KEY (`id`),  FOREIGN KEY (`chatMessageId`) REFERENCES `chat_message` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,  FOREIGN KEY (`chatRoomId`) REFERENCES `chat_room` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB; 