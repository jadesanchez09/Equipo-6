-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.6.1-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para portal_aqualert
CREATE DATABASE IF NOT EXISTS `portal_aqualert` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `portal_aqualert`;

-- Volcando estructura para tabla portal_aqualert.posts_pendientes
CREATE TABLE IF NOT EXISTS `posts_pendientes` (
  `id_post` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `estado` enum('pendiente','rechazado','aprobado') DEFAULT 'pendiente',
  `admin_revisor_id` int(11) DEFAULT NULL,
  `comentario_revisor` text DEFAULT NULL,
  PRIMARY KEY (`id_post`),
  KEY `admin_revisor_id` (`admin_revisor_id`),
  KEY `idx_estado` (`estado`),
  KEY `idx_usuario_id` (`usuario_id`),
  CONSTRAINT `posts_pendientes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_pendientes_ibfk_2` FOREIGN KEY (`admin_revisor_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla portal_aqualert.posts_pendientes: ~0 rows (aproximadamente)

-- Volcando estructura para tabla portal_aqualert.posts_publicados
CREATE TABLE IF NOT EXISTS `posts_publicados` (
  `id_post_publicado` int(11) NOT NULL AUTO_INCREMENT,
  `id_post_original` int(11) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_publicacion` datetime DEFAULT current_timestamp(),
  `visible` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_post_publicado`),
  KEY `id_post_original` (`id_post_original`),
  KEY `idx_usuario_publicados` (`usuario_id`),
  KEY `idx_fecha_publicacion` (`fecha_publicacion`),
  CONSTRAINT `posts_publicados_ibfk_1` FOREIGN KEY (`id_post_original`) REFERENCES `posts_pendientes` (`id_post`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `posts_publicados_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla portal_aqualert.posts_publicados: ~0 rows (aproximadamente)

-- Volcando estructura para tabla portal_aqualert.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla portal_aqualert.roles: ~3 rows (aproximadamente)
INSERT INTO `roles` (`id_rol`, `nombre`, `descripcion`) VALUES
	(1, 'owner', 'Control total del sistema: usuarios, roles y publicaciones'),
	(2, 'admin', 'Puede aprobar o eliminar publicaciones y publicar sin aprobación'),
	(3, 'user', 'Puede crear publicaciones que requieren aprobación');

-- Volcando estructura para tabla portal_aqualert.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass_hash` varchar(255) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_rol_id` (`rol_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id_rol`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla portal_aqualert.usuarios: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
