
## Installation

```bash
$ npm install
```

## Running the app
- para construir la imagen de docker
$ docker build -t api/audit-nest .

- para correr la imagen en un contenedor de docker
$ docker run --name api-auditorias -p 4000:4000 -d api/audit-nest
