# Delilah Resto
La presente documentación incluye una breve descripción de la solución desarrollada asi como también el paso a paso para su respectivo uso.
Se desarrolló una Api REST para generar y gestionar ordenes en un local del rubro gastronomico, generada en Node Framework y utilizando MySQL como base de datos.

Las instrucciones para su uso son las siguientes:

## 1) Configuracion de base de datos 
Para crear la base de datos, previamente debe ser descargado e instalado "XAMPP" (https://www.apachefriends.org/download.html).
Xampp es un software que combina Apache, PHP, María DB y PHPMyAdmin.

Posteriormente el modulo "Apache" y "MySQL" deberan ser encendidos procediendo a continuacion ingresar a http://localhost/phpmyadmin/ para la creacion de la base de datos.

Se debera abrir php my admin y crear una nueva base de datos. En la nueva base de datos se debera importar las queries especificadas en el documento "delilah_resto.sql" de la carpeta "Documentos" de este repositorio.

Dichas queries crearan las tablas necesarias: usuarios(users), productos (products), pedidos (orders) y la relacion ordenes-productos (orders_products).


## 2) Configuracion del entorno 
Es momento de iniciar la carpeta del proyecto, de manera que puedas obtener una copia del mismo de manera local y realizar las pruebas correspondientes. 

Crea una nueva carpeta en tu computadora y clona el siguiente repositorio de git: https://github.com/juanfrancoburjel/Delilah_Resto.git

Abra el archivo package.json e instala las dependencias especificadas en el mismo.


## 3) Ejectuar archivo index.js

Desde una terminal, ejecuta el comando "node index.js" comprobando previamente que se encuentre en la ruta correspondiente al proyecto. 


## 4) Test a través de endpoints 
Estas instrucciones te permitirán probar la funcionalidad de la aplicaciones de pedidos, para lo cual deberas instalar previamente el programa "Postman" (https://www.postman.com/downloads/).

En el  archivo de 'API model delilah_resto.yaml' de la carpeta "Documentos", tendras acceso a la documentacion correspondiente de los endpoints desarrollados.

En la misma carpeta, encontrarás el archivo 'DelilahPostman.json', el cual siendo importado en el programa "Postman",te permitirá disponer de la información suficiente para testear los endpoints referidos a la aplicación. 
Las rutas creadas permitiran la interaccion con usuarios, productos y ordenes.