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
  `numero_nota` int(11) NOT NULL AUTO_INCREMENT,
  `data_compra` varchar(24) NOT NULL,
  `id_vendedor_responsavel` int(11) NOT NULL,
  `fk_id_pdv_occorrente` int(11) NOT NULL,
  `valor_compra` int(11) DEFAULT NULL,
  `forma_pagamento` varchar(45) DEFAULT NULL,
  `nome_comprador` varchar(45) DEFAULT NULL,
  `valor_pago` int(11) DEFAULT NULL,
  PRIMARY KEY (`numero_nota`),
  KEY `fk_id_pdv_occorrente_idx` (`fk_id_pdv_occorrente`),
  KEY `fk_id_vendedor_feito_idx` (`id_vendedor_responsavel`),
  CONSTRAINT `fk_id_pdv_occorrente` FOREIGN KEY (`fk_id_pdv_occorrente`) REFERENCES `pdv` (`idPDV`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_vendedor_feito` FOREIGN KEY (`id_vendedor_responsavel`) REFERENCES `vendedor` (`idVendedor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (49,'27/11/2019 09:26:16',3,3,7,'Cartao Debito','João Silva',7),(50,'27/11/2019 09:32:34',3,3,10,'Cartao Debito','Fabrizio Honda',10),(51,'27/11/2019 09:53:33',3,3,12,'Dinheiro','Cleiton',120),(52,'28/11/2019 07:55:05',3,3,24,'Cartao Credito','Sistema Teste 1',24),(53,'28/11/2019 09:30:11',3,3,7,'Cartao Debito','Jean Do Santos',7),(54,'28/11/2019 09:31:48',3,3,3,'Cartao Debito','Clarice',3),(55,'29/11/2019 14:29:41',7,3,3,'Dinheiro','',10),(56,'29/11/2019 14:30:14',7,3,10,'Cartao Debito','Joao queroga',10),(57,'29/11/2019 14:41:39',8,3,2,'Cartao Credito','Zé pequeno',2),(58,'30/11/2019 14:34:45',8,3,1,'Cartao Debito','Carlos Alberto',1),(59,'30/11/2019 14:45:30',8,3,1,'Cartao Credito','Carlitoz',1);
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
  CONSTRAINT `fk2_idPDV` FOREIGN KEY (`fk2_idPDV`) REFERENCES `pdv` (`idPDV`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque`
--

LOCK TABLES `estoque` WRITE;
/*!40000 ALTER TABLE `estoque` DISABLE KEYS */;
INSERT INTO `estoque` VALUES (3,3,34,'Quey',1,1),(3,20,35,'Melão',5,1),(3,20,36,'Teste',2,1),(3,20,37,'Teste2',3,1),(3,20,38,'Teste4',2,1);
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
INSERT INTO `gerente_pdv` VALUES (1,'Douglas Silva de Melo','21/04/1999','gerente','douglas_gerente@gmail.com','124');
/*!40000 ALTER TABLE `gerente_pdv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historico_compra`
--

DROP TABLE IF EXISTS `historico_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historico_compra` (
  `id_pdv` int(11) NOT NULL,
  `id_produto` varchar(45) NOT NULL,
  `id_compra` int(11) NOT NULL,
  `nome_produto` varchar(45) NOT NULL,
  `quantidade_comprada` varchar(45) NOT NULL,
  `valor` varchar(45) NOT NULL,
  PRIMARY KEY (`id_pdv`,`id_produto`,`id_compra`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico_compra`
--

LOCK TABLES `historico_compra` WRITE;
/*!40000 ALTER TABLE `historico_compra` DISABLE KEYS */;
INSERT INTO `historico_compra` VALUES (3,'271420',50,'Cama Minion','1','10'),(3,'34',49,'Nescau','3','1'),(3,'34',52,'Arroz','2','2'),(3,'34',53,'Pera','7','1'),(3,'34',54,'Pera','3','1'),(3,'34',55,'Quey','3','1'),(3,'34',56,'Quey','10','1'),(3,'34',57,'Quey','2','1'),(3,'34',58,'Quey','1','1'),(3,'34',59,'Quey','1','1'),(3,'35',49,'Nescau 2','4','1'),(3,'35',51,'Nescau 2','6','2'),(3,'35',52,'Feijão','5','4');
/*!40000 ALTER TABLE `historico_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informacoes_empresariais_vendedor`
--

DROP TABLE IF EXISTS `informacoes_empresariais_vendedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `informacoes_empresariais_vendedor` (
  `id_vendedor` int(11) NOT NULL,
  `salario_mensal` varchar(45) DEFAULT NULL,
  `agencia_pagamento` varchar(45) DEFAULT NULL,
  `conta_pagamento` varchar(45) DEFAULT NULL,
  `Cargo` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `dia_pagamento` varchar(45) DEFAULT NULL,
  `data_inicio_empresa` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_vendedor`),
  CONSTRAINT `fk_id_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `vendedor` (`idVendedor`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informacoes_empresariais_vendedor`
--

LOCK TABLES `informacoes_empresariais_vendedor` WRITE;
/*!40000 ALTER TABLE `informacoes_empresariais_vendedor` DISABLE KEYS */;
INSERT INTO `informacoes_empresariais_vendedor` VALUES (2,'10000','','','',0,'',''),(3,'1000000000','5555','33333','Empacotadora',1,'21','26/11/2019'),(6,'30','3715','28944-2','Caixa',1,'25','28/11/2019');
/*!40000 ALTER TABLE `informacoes_empresariais_vendedor` ENABLE KEYS */;
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
  `data_fundacao` varchar(30) DEFAULT NULL,
  `preco_medio` varchar(45) DEFAULT NULL,
  `CESP` varchar(45) DEFAULT NULL,
  `telefone_fixo` varchar(45) DEFAULT NULL,
  `fk_id_PDV` int(11) NOT NULL,
  `nome_dono_PDV` varchar(45) DEFAULT NULL,
  `nomepdv` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`fk_id_PDV`),
  KEY `fk_id_PDV_idx` (`fk_id_PDV`),
  CONSTRAINT `fk_id_PDV` FOREIGN KEY (`fk_id_PDV`) REFERENCES `pdv` (`idPDV`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informacoes_pdv`
--

LOCK TABLES `informacoes_pdv` WRITE;
/*!40000 ALTER TABLE `informacoes_pdv` DISABLE KEYS */;
INSERT INTO `informacoes_pdv` VALUES ('69093086','22','21/04/2001','40','1231248','4562-7847',3,'Douglas Silva de Melo','Galitus');
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
  `data_nascimento` varchar(20) DEFAULT NULL,
  `fk_id_vendedor` int(11) NOT NULL,
  PRIMARY KEY (`fk_id_vendedor`),
  KEY `fk_vendedor_idx` (`fk_id_vendedor`),
  CONSTRAINT `fk_vendedor` FOREIGN KEY (`fk_id_vendedor`) REFERENCES `vendedor` (`idVendedor`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informacoes_vendedor`
--

LOCK TABLES `informacoes_vendedor` WRITE;
/*!40000 ALTER TABLE `informacoes_vendedor` DISABLE KEYS */;
INSERT INTO `informacoes_vendedor` VALUES ('Rafaela Melo','Masculino','21/04/1999',3),('Douglas Silva de Melo','Masculino','21/04/1999',4),('Fabrizio Honda','Gay','27/03/1999',5),('Jean dos Santos','Outro','17/04/1997',8);
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
  `fk_gerentePDV` int(11) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `senha` int(11) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPDV`,`fk_gerentePDV`),
  KEY `fk_gerentePDV_idx` (`fk_gerentePDV`),
  CONSTRAINT `fk_gerentePDV` FOREIGN KEY (`fk_gerentePDV`) REFERENCES `gerente_pdv` (`idGerente_PDV`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pdv`
--

LOCK TABLES `pdv` WRITE;
/*!40000 ALTER TABLE `pdv` DISABLE KEYS */;
INSERT INTO `pdv` VALUES (1,1,'pd1@gmail.com',1234,'dono'),(3,1,'pd3@gmail.com',1234,'dono');
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
  KEY `fk_id_produto_idx` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_comprado`
--

LOCK TABLES `produto_comprado` WRITE;
/*!40000 ALTER TABLE `produto_comprado` DISABLE KEYS */;
INSERT INTO `produto_comprado` VALUES (47,34,'1'),(47,35,'3'),(48,34,'2'),(49,34,'3'),(49,35,'4'),(50,271420,'1'),(51,35,'6'),(52,34,'2'),(52,35,'5'),(53,34,'7'),(54,34,'3'),(55,34,'3'),(56,34,'10'),(57,34,'2'),(58,34,'1'),(59,34,'1');
/*!40000 ALTER TABLE `produto_comprado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendedor`
--

DROP TABLE IF EXISTS `vendedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendedor` (
  `idVendedor` int(11) NOT NULL AUTO_INCREMENT,
  `fk_id_PDV_pertencente` int(11) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `senha` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idVendedor`),
  KEY `fk_id_PDV_pertencente_idx` (`fk_id_PDV_pertencente`),
  CONSTRAINT `fk_id_PDV_pertencente` FOREIGN KEY (`fk_id_PDV_pertencente`) REFERENCES `pdv` (`idPDV`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendedor`
--

LOCK TABLES `vendedor` WRITE;
/*!40000 ALTER TABLE `vendedor` DISABLE KEYS */;
INSERT INTO `vendedor` VALUES (2,3,'funcionario','juninho@gmail.com','1234'),(3,3,'funcionario','rafaela@gmail.com','123'),(4,1,'funcionario','vendedor6@gmail.com','1234'),(5,3,'funcionario','fabrizio@email.com','321'),(6,3,'funcionario','davyson@gmail.com','1234'),(7,3,'funcionario','queroga@gmail.com','123'),(8,3,'funcionario','jean@gmail.com','123');
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

-- Dump completed on 2019-11-30 17:35:05
