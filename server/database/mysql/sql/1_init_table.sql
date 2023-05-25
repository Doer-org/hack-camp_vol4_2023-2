CREATE TABLE `Users` (
  `user_id`        varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_name`      varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

insert into Users (user_id, user_name) values ('abc', 'user1');
insert into Users (user_id, user_name) values ('cdf', 'user2');