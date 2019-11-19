CREATE DATABASE  IF NOT EXISTS `teste` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `teste`;
-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: teste
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

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
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compra` (
  `numero_nota` int(11) NOT NULL,
  `data_compra` varchar(24) NOT NULL,
  `id_vendedor_responsavel` int(11) NOT NULL,
  `fk_id_pdv_occorrente` int(11) NOT NULL,
  `valor_compra` int(11) DEFAULT NULL,
  `forma_pagamento` varchar(45) DEFAULT NULL,
  `nome_comprador` varchar(45) DEFAULT NULL,
  `valor_pago` int(11) DEFAULT NULL,
  PRIMARY KEY (`numero_nota`),
  KEY `fk_id_vendedor_responsavel_idx` (`id_vendedor_responsavel`),
  KEY `fk_id_pdv_occorrente_idx` (`fk_id_pdv_occorrente`),
  CONSTRAINT `fk_id_pdv_occorrente` FOREIGN KEY (`fk_id_pdv_occorrente`) REFERENCES `pdv` (`idPDV`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_vendedor_responsavel` FOREIGN KEY (`id_vendedor_responsavel`) REFERENCES `vendedor` (`idVendedor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,'13213',1,1,129,'Dinheiro','10',12312313),(123,'27/10/2019',1,1,NULL,NULL,NULL,NULL),(9898,'21/04/0001',1,1,10,'Dinheiro','João',10);
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoque`
--

DROP TABLE IF EXISTS `estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estoque` (
  `fk2_idPDV` int(11) NOT NULL,
  `quantidade_estoque` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `nome_produto` varchar(45) NOT NULL,
  `valor` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`fk2_idPDV`,`id_produto`),
  KEY `fk_id_produto_idx` (`id_produto`),
  CONSTRAINT `fk2_idPDV` FOREIGN KEY (`fk2_idPDV`) REFERENCES `pdv` (`idPDV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque`
--

LOCK TABLES `estoque` WRITE;
/*!40000 ALTER TABLE `estoque` DISABLE KEYS */;
INSERT INTO `estoque` VALUES (1,1,32,'Carvao',10,1),(1,5,34,'Cafe',2,1),(1,1123,37,'121',1231,1),(1,2000,190,'Pipoca',10,1),(1,34,343,'43',43,1),(1,10,500,'Ovo',10,-1),(1,199,12340,'Joao Queroga',1,1),(2,10,400,'Molho BBQ',14,1),(2,10,1234,'Pao',5,1);
/*!40000 ALTER TABLE `estoque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gerente_pdv`
--

DROP TABLE IF EXISTS `gerente_pdv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gerente_pdv` (
  `idGerente_PDV` int(11) NOT NULL,
  `nome_gerente` varchar(40) NOT NULL,
  `data_nascimento` varchar(20) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `senha` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idGerente_PDV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gerente_pdv`
--

LOCK TABLES `gerente_pdv` WRITE;
/*!40000 ALTER TABLE `gerente_pdv` DISABLE KEYS */;
INSERT INTO `gerente_pdv` VALUES (1,'Douglas Silva de Melo','21/04/1999','gerente',NULL,NULL);
/*!40000 ALTER TABLE `gerente_pdv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informacoes_pdv`
--

DROP TABLE IF EXISTS `informacoes_pdv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `informacoes_pdv` (
  `localizacao` varchar(45) DEFAULT NULL,
  `nota` varchar(45) DEFAULT NULL,
  `informacoes_PDVcol` varchar(45) DEFAULT NULL,
  `data_fundacao` varchar(30) DEFAULT NULL,
  `preco_medio` varchar(45) DEFAULT NULL,
  `CESP` varchar(45) DEFAULT NULL,
  `telefone_fixo` varchar(45) DEFAULT NULL,
  `fk_id_PDV` int(11) NOT NULL,
  `nome_dono_PDV` varchar(45) DEFAULT NULL,
  `nomepdv` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`fk_id_PDV`),
  KEY `fk_id_PDV_idx` (`fk_id_PDV`),
  CONSTRAINT `fk_id_PDV` FOREIGN KEY (`fk_id_PDV`) REFERENCES `pdv` (`idPDV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informacoes_pdv`
--

LOCK TABLES `informacoes_pdv` WRITE;
/*!40000 ALTER TABLE `informacoes_pdv` DISABLE KEYS */;
INSERT INTO `informacoes_pdv` VALUES ('69093086','5','Rua Campa Queiroz ','21/04/1999','10','Internal','34509033',1,'Douglas Silva','Internal');
/*!40000 ALTER TABLE `informacoes_pdv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informacoes_vendedor`
--

DROP TABLE IF EXISTS `informacoes_vendedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `informacoes_vendedor` (
  `nome` varchar(45) NOT NULL,
  `sexo` varchar(45) DEFAULT NULL,
  `data_nascimento` datetime DEFAULT NULL,
  `fk_id_vendedor` int(11) NOT NULL,
  PRIMARY KEY (`fk_id_vendedor`),
  CONSTRAINT `fk_id_vendedor` FOREIGN KEY (`fk_id_vendedor`) REFERENCES `vendedor` (`idVendedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informacoes_vendedor`
--

LOCK TABLES `informacoes_vendedor` WRITE;
/*!40000 ALTER TABLE `informacoes_vendedor` DISABLE KEYS */;
INSERT INTO `informacoes_vendedor` VALUES ('Jelnison','M',NULL,1);
/*!40000 ALTER TABLE `informacoes_vendedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pdv`
--

DROP TABLE IF EXISTS `pdv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pdv` (
  `idPDV` int(11) NOT NULL,
  `SAT` varchar(45) DEFAULT NULL,
  `fk_gerentePDV` int(11) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `senha` int(11) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPDV`),
  KEY `fk_gerentePDV_idx` (`fk_gerentePDV`),
  CONSTRAINT `fk_gerentePDV` FOREIGN KEY (`fk_gerentePDV`) REFERENCES `gerente_pdv` (`idGerente_PDV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pdv`
--

LOCK TABLES `pdv` WRITE;
/*!40000 ALTER TABLE `pdv` DISABLE KEYS */;
INSERT INTO `pdv` VALUES (1,'12345',1,'pd1@gmail.com',1234,'adm'),(2,'12345',1,'pd2@gmail.com',1234,'adm');
/*!40000 ALTER TABLE `pdv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_comprado`
--

DROP TABLE IF EXISTS `produto_comprado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produto_comprado` (
  `id_compra` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `quantidade` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_compra`,`id_produto`),
  KEY `id_produto_idx` (`id_produto`),
  CONSTRAINT `id_compra` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`numero_nota`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_produto` FOREIGN KEY (`id_produto`) REFERENCES `estoque` (`id_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_comprado`
--

LOCK TABLES `produto_comprado` WRITE;
/*!40000 ALTER TABLE `produto_comprado` DISABLE KEYS */;
INSERT INTO `produto_comprado` VALUES (123,34,NULL),(123,1234,NULL),(9898,34,NULL);
/*!40000 ALTER TABLE `produto_comprado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendedor`
--

DROP TABLE IF EXISTS `vendedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendedor` (
  `idVendedor` int(11) NOT NULL,
  `fk_id_PDV_pertencente` int(11) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `senha` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idVendedor`),
  KEY `fk_id_PDV_pertencente_idx` (`fk_id_PDV_pertencente`),
  CONSTRAINT `fk_id_PDV_pertencente` FOREIGN KEY (`fk_id_PDV_pertencente`) REFERENCES `pdv` (`idPDV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendedor`
--

LOCK TABLES `vendedor` WRITE;
/*!40000 ALTER TABLE `vendedor` DISABLE KEYS */;
INSERT INTO `vendedor` VALUES (1,1,'funcionario','vendedor1@gmail.com','1234');
/*!40000 ALTER TABLE `vendedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'teste'
--

--
-- Dumping routines for database 'teste'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-19 13:56:45
