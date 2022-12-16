# APPrender
Este repositorio corresponde al backend de la aplicacion APPrender. APPprender es una aplicacion orientada a alumnos y docentes quienes pueden registrarse y contratar/ofrecer clases de distintos tipos. La aplicacion permite registrarse tanto como alumnos o profesores, buscar y publicar clases, comentar y calificar clases tomadas, asi como tambien contratarlas.

# Contenido
Back-End controlador de usuraio y notocias. El proyecto esta realizado en:

- [Node.js](https://nodejs.org/es/)
- [express.js](https://expressjs.com/es/)
- [MongoDB](https://www.mongodb.com/es)

  ESTE ES UN SERVIDOR NO VISUAL
  
# Contenido
  Para poder utilizar el proyecto en localhost en necesario clonarlo y tener algunos programas instalados:
  
    - Git para poder clonar el repositorio y gestionar las versiones.
    - Nodejs v12.18.0 o Superior.
    - IDE de desarrollo de tu comodidad Ej. VS Code, IntelliJ, o cualquier otro editor de texto.
    - PostMan o alguna otra herramienta para puebas de APIS. (Opcional)
    

# Antes de Comenzar
 - Crear un archivo .env con las variables necesarias(Puerto y credenciales)
 - Es importante generar la conexion a mongodb Server y referenciar la URL correspondiente(se recomienda almacenar en el mismo archivo .env)
 
 # Instalacion

 Ya clonado el proyecto es necesario instalar todas las dependencias con el comando:

```bash
npm install
```

 # Ejecucuon

 Para ejecutar la aplicacion ejecutar el siguiente comando:

```bash
npm start
```

 # Estructura del proyecto
 El directorio raiz se encuentra compuesto de la siguiente manera:
  * images - Carpeta para imagenes
  * src:
    * api
      * routes
      * index.js
    * auth - Autenticacion
    * config - Configuracion general y uso de variables de ambiente
    * controller - Controladores de los distintos servicios
    * loaders - Division del proceso de inicio en modulos
    * models - Modelos de la base de datos
    * services - Carpeta de servicios que contiene toda la logica de negocio   
    * app.js - Punto de entrada a la aplicacion
    * config.js
  * .eslintrc.js - Configuracion eslint(Limpieza de codigo)
  * .gitignore - Archivo que contiene una lista de archivos para ser ignorados por git
  * README.md - Archivo descriptivo con la informacion del proyecto
  * nodemon.json 
  * package-lock.json - Archivo default node
  * package.json - Archivo default node con las dependencias
