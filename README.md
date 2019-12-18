 
# variacode-backend

Stack: postgres, node (rest), react.

Se evaluará los aspectos en su amplitud, no su profundidad, es decir, cosas como el README, facilidad de instalación, estructura, pruebas automáticas, etc. Más que funcionalidades.

Se debe:

- Hacer un registro/login de usuario
- Editar un to-do list simple

Se sugiere un par de días, pero puede tomar lo que necesites.

## Installation

1. clonar este repositrio
2. Instalar dependencias:
  - cd variacode-backend
  - npm i
3. Importar base de datos #Linux
    psql -h 127.0.0.1 -d [BD] -U [usuario] -f ./variacode.sql

4. Cambiar variables de conexión en la linea 21 de ./server/data-base.js

5. - npm start # recomiendo utilizar http://pm2.keymetrics.io/

## Test

1. npm run test

## Usage

1. rutas

    - login
        ```
        method: post
        url: '/login'
        body { rut: '', password }
        ```

    - logout
        ```
        method: delete
        url: '/logout'
        headers: { Authorization: 'Bearer token' }
        ```

    - register
        ```
        method: post
        url: '/register'
        body: { rut: string(255), status: char(1)}
        headers: { Authorization: 'Bearer token' }
        ```

    - listado de tareas del usuario
        ```
        method: get
        url: '/tasks'
        headers: { Authorization: 'Bearer token' }
        ```

    - crear tarea
        ```
        method: post
        url: '/tasks'
        body: { text: string(255), status: char(1)}
        headers: { Authorization: 'Bearer token' }
        ```
        Posibles variables de status: 
        ```
        D : completado,
        U : sin hacer,
         ```

    - eliminar tarea
        ```
        method: delete
        url: '/tasks/:id' # id de la tarea 
        headers: { Authorization: 'Bearer token' }
        ```

2. Data
    - usuario test
        ```
        RUT: 1234567890
        CONTRASEÑA: test 
        ```
 

## License

[MIT](https://choosealicense.com/licenses/mit/)
