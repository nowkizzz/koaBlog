/*
SQLyog  v12.2.6 (64 bit)
MySQL - 5.7.17-log : Database - blog
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`blog` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `blog`;

/*Table structure for table `bloglist` */

DROP TABLE IF EXISTS `bloglist`;

CREATE TABLE `bloglist` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '博客id',
  `title` varchar(30) NOT NULL COMMENT '博客题目',
  `author` varchar(20) NOT NULL COMMENT '博客作者',
  `content` longtext NOT NULL COMMENT '博客内容',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '修改时间',
  `userId` int(20) DEFAULT NULL COMMENT '博客归属的用户id',
  `remark` varchar(200) DEFAULT NULL COMMENT '博客摘要',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `bloglist` */

insert  into `bloglist`(`id`,`title`,`author`,`content`,`createTime`,`updateTime`,`userId`,`remark`) values 
(1,'测试题目数据','nowki','第一个还是可以的，风起云涌','2019-09-23 21:37:40',NULL,NULL,NULL),
(2,'题目2','nowki','第二个继续','2019-09-23 22:54:07',NULL,NULL,NULL),
(3,'题目3','nowki','第三个继续',NULL,NULL,NULL,NULL);

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `content` varchar(300) NOT NULL COMMENT '评论内容',
  `createTime` datetime DEFAULT NULL COMMENT '评论时间',
  `name` varchar(20) DEFAULT NULL COMMENT '评论人',
  PRIMARY KEY (`id`,`content`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `comment` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `name` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '用户密码',
  `imgUri` varchar(100) DEFAULT NULL COMMENT '用户图片路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`password`,`imgUri`) values 
(1,'nowki','123456',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
