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

3. **Funcionalidades extra implementadas.**
    + Validadciones con ZOE
    + Filtros
    + Implmentacion de middleare (cors)

4. **Decisiones técnicas clave.**
    + Se uso Zod para validaciones y mejora la robustez del código,asegura que trabajes con datos limpios y bien tipados y facilita el desarrollo de aplicaciones seguras, escalables y mantenibles.
    + Modelado de datos.
    + Patrón MVC (Models, Controllers, Routes).
    
5. **ENDPOINT DE LA API**

    **Contactos (/api/contacts)**

    GET    /api/contacts           // Obtener todos los contactos

    GET    /api/contacts/:id       // Obtener un contacto por ID

    POST   /api/contacts           // Crear un nuevo contacto

    PUT    /api/contacts/:id       // Actualizar un contacto por ID

    DELETE /api/contacts/:id       // Eliminar un contacto por ID

    **Empresas (/api/companies)**

    GET    /api/companies           // Obtener todas las empresas

    GET    /api/companies/:id       // Obtener una empresa por ID

    POST   /api/companies           // Crear una nueva empresa

    PUT    /api/companies/:id       // Actualizar una empresa por ID

    DELETE /api/companies/:id       // Eliminar una empresa por ID

    **Plantillas (/api/templates)**

    GET    /api/templates           // Obtener todas las plantillas

    GET    /api/templates/:id       // Obtener una plantilla por ID

    POST   /api/templates           // Crear una nueva plantilla

    PUT    /api/templates/:id       // Actualizar una plantilla por ID

    DELETE /api/templates/:id       // Eliminar una plantilla por ID

    **Historial de Contacto (/api/contact-logs)**

    GET    /api/contact-logs            // Obtener todos los logs de contacto

    POST   /api/contact-logs            // Crear un log de contacto manualmente

    POST   /api/contact-logs/send-template // Enviar una plantilla a un contacto

6. **Enlaces al deploy correspondiente.**

    enlace del despliegue: https://fastcrm-express-api.onrender.com