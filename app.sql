-- MySQL dump 10.16  Distrib 10.2.9-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: app
-- ------------------------------------------------------
-- Server version	10.2.9-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) DEFAULT NULL,
  `articles` varchar(255) NOT NULL DEFAULT '0',
  `contents` text DEFAULT '0',
  `content` text NOT NULL DEFAULT '0',
  `addtime` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (2,4,'html','标签','标签',1508810361),(4,3,'js','jquery','##标题',1508834668),(5,3,'js','轮播图','数据类型',1508845198),(6,8,'查询','放大镜','select * from users where id=2；',1508894638),(7,2,'js发展','第二阶段（2010年-2014年）：Joyent公司资助，Dlyan Dahl负责技术工作(0.10)\r\n第三阶段（2014年-2015年）：Node技术人才自立门户，创立IO.js(0-3)\r\n第四阶段（2015年）：IO.JS和NodeJS合并，步入快车道(NodeJS基金会)','第二阶段（2010年-2014年）：Joyent公司资助，Dlyan Dahl负责技术工作(0.10)\r\n第三阶段（2014年-2015年）：Node技术人才自立门户，创立IO.js(0-3)\r\n第四阶段（2015年）：IO.JS和NodeJS合并，步入快车道(NodeJS基金会),                                                第一阶段（2009年）：Ryan Dahl个人开发\r\n第二阶段（2010年-2014年）：Joyent公司资助，Dlyan Dahl负责技术工作(0.10)\r\n第三阶段（2014年-2015年）：Node技术人才自立门户，创立IO.js(0-3)\r\n第四阶段（2015年）：IO.JS和NodeJS合并，步入快车道(NodeJS基金会),# Node是什么\r\n**一个平台：集成了Google的V8引擎，让JS运行在服务器端的平台**\r\n\r\n### Node发展\r\n- 第一阶段（2009年）：Ryan Dahl个人开发\r\n- 第二阶段（2010年-2014年）：Joyent公司资助，Dlyan Dahl负责技术工作(0.10)\r\n- 第三阶段（2014年-2015年）：Node技术人才自立门户，创立IO.js(0-3)\r\n- 第四阶段（2015年）：IO.JS和NodeJS合并，步入快车道(NodeJS基金会)\r\n- 目前，[NodeJS版本](https://github.com/nodejs/node/blob/master/CHANGELOG.md)\r\n> **使用稳定版本：v6.11.2**\r\n\r\n	LTS：long technology support长期技术支持（3年）\r\n	不加LTS：激进版本，增加很多的新功能，这些功能还么有完全的权威测试\r\n\r\n## 功能\r\n- (**)复杂逻辑的网站|社交网站的大规模WEB应用\r\n- (*)WebSocket（端游，页游）\r\n- (***)基于Node的前端自动化工具\r\n- 网络爬虫\r\n\r\n                                            ',1508935987),(8,4,'图片','图片','![](/upload/articles/08e0b29d8436063e907fa89713ee8bde.jpg)',1509019555);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT '0',
  `addtime` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (2,'nodejs',1508767951),(3,'js',1508768295),(4,'HTML5',1508806287),(8,'数据库',1508844682),(9,'css3',1508855933);
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '0',
  `password` char(32) NOT NULL DEFAULT '0',
  `phone` char(11) DEFAULT '0',
  `age` tinyint(1) DEFAULT 0,
  `sex` tinyint(1) DEFAULT 0,
  `addtime` int(11) NOT NULL DEFAULT 0,
  `photo` varchar(255) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (45,'wang','1','1',12,2,0,'1a6f3ac62280ac1e28da3039b389a138.jpg'),(46,'刘','','1',20,1,0,'fc0631a0dca56a20895aa11802ae936f.jpg'),(49,'11111','1','111',1,1,0,''),(51,'to','c4ca4238a0b923820dcc509a6f75849b','111',1,2,1508323863,''),(52,'1234','6512bd43d9caa6e02c990b0a82652dca','111',1,1,1508325252,''),(53,'1234','d41d8cd98f00b204e9800998ecf8427e','111',1,1,1508325424,'18b4d2be6518521cd04abd1c283dbb02.jpg'),(54,'liu1','d41d8cd98f00b204e9800998ecf8427e','111',18,2,1508325681,''),(55,'wang2','698d51a19d8a121ce581499d7b701668','111',11,2,1508331160,''),(58,'zhangsan','e10adc3949ba59abbe56e057f20f883e','',20,1,1508421043,NULL),(59,'wang','202cb962ac59075b964b07152d234b70','13390029973',0,0,1508422370,NULL),(60,'wang','d41d8cd98f00b204e9800998ecf8427e','',0,0,1508748262,NULL),(61,'王丹','e10adc3949ba59abbe56e057f20f883e','111',23,2,1508853171,NULL),(62,'undefined','undefined','0',0,0,0,NULL),(63,'feng','1234','0',0,0,0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-30 10:13:49
