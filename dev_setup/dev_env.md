# Cómo instalar para desarrollar

## Requerimientos

Previo a poder comenzar a desarrollar se requiere tener instalado:

- node.js versión 20.12 o superior
- Una instancia de [product_api_service](https://github.com/sporter-management/product_api_service) desplegada (local o remota)

## Pasos de setup

### 1- Clonar repositorio

Clonar el repositorio desde github para comenzar a configurar el entorno de desarrollo, elije en que directorio comenzaras a desarrollar y luego:

``` bash
$ git clone  git@github.com:sporter-management/web_frontend.git
     git clone output...
```

Para continuar debemos ingresar al directorio del proyecto:

``` bash
$ cd web_frontend
```

### 2- Instalar dependencias

Una vez clonado el repositorio, debemos instalar sus dependencias para comenzar a desarrollar, para esto debemos correr:

``` bash
$ npm install
```

### 3- Establecer variables de entorno

Lo único que resta es apuntar al frontend para que consuma nuestra api de productos, para ello debemos crear un archivo `.env` en el nivel más alto del directorio del proyecto:

``` bash

web_frontend
├── app.js
├── package.json
├── package-lock.json
├── README.md
├── bin
├── dev_setup
├── node_modules
├── public
├── routes
├── .env <--------------- acá debería quedar
└── views

```

Y en su interior definiremos la siguiente variable de entorno:

``` bash
REQUEST_URL=http://dominio.nivel:puerto/api/producto/
```

El dominio, nivel y puerto dependerá de tu configuración, si utilizas `localhost` luciría así:

``` bash
REQUEST_URL=http://localhost:5000/api/producto/
```

Es esencial que no solo indiques la dirección del servidor, sino también el endpoint.

### 4- Correr el proyecto

¡Listo! Ahora puedes correr el proyecto de la siguiente manera:

``` bash
$ npm start
```
