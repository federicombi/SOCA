# SOCA

SOCA es el Sistema Optimizado para el Control de Asistencia diseñado especialmente para instituciones educativas y profesores de escuelas superiores, terciaras y universidades de Argentina. Este sistema brinda a los profesores la posibilidad de asociarse a una materia en una institución durante un período lectivo. El SOCA permite llevar el control de las asistencias y de las calificaciones de los alumnos fácilmente, proporcionando un panel de control para cada curso donde el profesor podrá visualizar el estado de cada alumno de acuerdo al avance del año.
El SOCA se ajusta a los horarios del profesor para cargar automáticamente el curso en el que se encuentra dando clases en el momento en que se conecta, de esta manera, el proceso para pasar asistencia se reduce a:
1. Entrar al aula.
2. Ingresar a SOCA.
3. Tomar asistencia.

## Versiones:
- PHP 8.1.10
- Laragon 6.0.0.2
- MySql 8.0.30

## Instalación
1. Descargar el respositorio y copiarlo en la carpeta "www" de laragon
2. Abrir laragon e iniciarlo con MySQL en el puerto 3306
3. Abrir HeidiSQL y ejecutar el archivo sql "bbdd_test.sql" con codificación UTF-8
4. Abrir el navegador y acceder a "soca.test".

##Puede iniciar sesión con los datos:
- Email: jparra@profesor.com
- Contraseña: 1234

## Uso
El usuario de pruebas tiene asignado el curso de Programación II en la carrera de Sistemas, en la Institución Sedes Sapientiae (Gualeguaychú - ER) hasta el 29/11/2024.
Los horarios son los jueves de 19:30 a 21:35 y los viernes de 18:40 a 20:50, si ingresa al sistema en esos horarios (dentro del período lectivo) se carga automáticamente el curso para pasar asistencia.
Puede cambiar los horarios en configuración (botón con ícono de engranaje en el encabezado superior), también crear los cursos para otras materias y registrar/eliminar/modificar/matricular alumnos.
Puede acceder al registro de calificaciones (panel de control) de los cursos en el ícono de "A+" en el encabezado superior. Ahí puede ingresar notas y modificarlas si lo requiere.
