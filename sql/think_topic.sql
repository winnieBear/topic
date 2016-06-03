--
-- 表的结构 `think_topic`
--

CREATE TABLE IF NOT EXISTS `think_topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(2) NOT NULL,
  `userid` varchar(64) DEFAULT '',
  `content` text NOT NULL,
  `ctime` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=45 ;

--
-- 表的结构 `think_comment`
--

CREATE TABLE IF NOT EXISTS `think_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(1) NOT NULL,
  `userid` varchar(64) DEFAULT '',
  `content` varchar(2048) DEFAULT '',
  `tid` int(11) NOT NULL,
  `ctime` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tid` (`tid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=102 ;


