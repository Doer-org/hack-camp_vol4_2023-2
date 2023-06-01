CREATE TABLE `Users` (
  `user_id`        varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_name`      varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `image_url`      varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO Users (user_id, user_name, image_url) VALUES ('abc', 'user1', 'https://www.google.com');
INSERT INTO Users (user_id, user_name, image_url) VALUES ('cdf', 'user2', 'https://www.google.com');

CREATE TABLE `Account` (
  `sub`     varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`sub`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO Account (sub, user_id) VALUES ('abc', 'abc');
INSERT INTO Account (sub, user_id) VALUES ('cdf', 'cdf');

CREATE TABLE `Log` (
  `user_id`               varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `timeline_last_access`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO Log (user_id) VALUES ('abc');
INSERT INTO Log (user_id) VALUES ('cdf');

CREATE TABLE `Follow` (
  `user_id_from`  varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_id_to`    varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`user_id_from`, `user_id_to`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO Follow (user_id_from, user_id_to) VALUES ('abc', 'cdf');
INSERT INTO Follow (user_id_from, user_id_to) VALUES ('cdf', 'abc');

CREATE TABLE `ProfileChangeLog` (
  `user_id`   varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `summary`   varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO ProfileChangeLog (user_id, summary) VALUES ('abc', 'summary1');
INSERT INTO ProfileChangeLog (user_id, summary) VALUES ('cdf', 'summary2');

CREATE TABLE `Reaction` (
  `reaction_id`   varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_id_from`  varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_id_to`    varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `kind`          varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `timestamp`     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO Reaction (reaction_id, user_id_from, user_id_to, kind) VALUES ('abc', 'abc', 'cdf', 'like');
INSERT INTO Reaction (reaction_id, user_id_from, user_id_to, kind) VALUES ('cdf', 'cdf', 'abc', 'like');

CREATE TABLE `FavoriteRamenya` (
  `user_id`    varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `rank_n`     varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `ramenya`    varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `timestamp`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `rank_n`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO FavoriteRamenya (user_id, rank_n, ramenya) VALUES ('abc', 1, 'ramenya1');
INSERT INTO FavoriteRamenya (user_id, rank_n, ramenya) VALUES ('abc', 2, 'ramenya2');
INSERT INTO FavoriteRamenya (user_id, rank_n, ramenya) VALUES ('abc', 3, 'ramenya3');
INSERT INTO FavoriteRamenya (user_id, rank_n, ramenya) VALUES ('cdf', 1, 'ramenya2');

CREATE TABLE `FavoriteMusic` (
  `user_id`   varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `rank_n`      int NOT NULL,
  `music`     varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `rank_n`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin; 

INSERT INTO FavoriteMusic (user_id, rank_n, music) VALUES ('abc', 1, 'music1');
INSERT INTO FavoriteMusic (user_id, rank_n, music) VALUES ('cdf', 1, 'music2');

CREATE TABLE `FavoriteArtist` (
  `user_id`   varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `rank_n`      int NOT NULL,
  `artist`    varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `rank_n`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO FavoriteArtist (user_id, rank_n, artist) VALUES ('abc', 1, 'artist1');
INSERT INTO FavoriteArtist (user_id, rank_n, artist) VALUES ('cdf', 2, 'artist2');
