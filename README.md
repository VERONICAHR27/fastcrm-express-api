# fastcrm-express-api

1. **Tecnologías utilizadas.**
    + Entorno de ejecución: Node.js
    + Framework de API: Express.js
    + Bases de Datos:
        + PostgreSQL (mediante ORM Prisma) - Para datos estructurados (contactos, empresas)
        + MongoDB - Para datos semi-estructurados (plantillas de mensajes, historial de mensajes)
    + Desarrollo: Nodemon para recarga en caliente
    + Entorno: dotenv para gestión de variables de entorno

2. **Instrucciones de instalación local.**

    A. Clonar el repositorio:

    `git clone https://github.com/VERONICAHR27/fastcrm-express-api.git`

    B. Abrir la carpeta

    `cd fastcrm-express-api.git`

    c. Instalar dependencias:
   
     `npm install`

    d. Configurar variables de entorno (env)

        ```MONGO_URI="cadena-de-conexion-a-mongodb"

            DATABASE_URL="cadena-de-conexion-a-PostgreSQL"```

    e. Ejecutar migraciones de base de datos:

        `npm run migrate`

    f. Iniciar el servidor:
        `npm start`

    g. Para desarrollo con recarga en caliente:
        `npm run dev`
        
3. Funcionalidades extra implementadas.
a. Validadciones con ZOE
b. Filtros
c Implmentacion de middleare (cors)
4. Decisiones técnicas clave.

5. Enlaces al deploy correspondiente.