# Desafío - FBI System

Desafío «FBI System» del módulo 8 del bootcamp Full Stack JavaScript de Talento Digital.

## Descripción

Para realizar este desafío debes haber estudiado previamente todo el material disponibilizado correspondiente a la unidad. Necesitarás apoyarte del archivo «Apoyo Desafío - FBI System», donde encontrarás un
documento JavaScript que exporta un arreglo de objetos correspondiente a las credenciales de los agentes secretos, además de una interfaz hecha con HTML y Bootstrap.

## Requerimientos

1. Crear una ruta que autentique a un agente basado en sus credenciales y genere un token con sus datos. (3 Puntos)
2. Al autenticar un agente, devolver un HTML que:
   a. Muestre el email del agente autorizado.
   b. Guarde un token en SessionStorage con un tiempo de expiración de 2 minutos.
   c. Disponibiliza un hiperenlace para redirigir al agente a una ruta restringida. (4 Puntos)
3. Crear una ruta restringida que devuelva un mensaje de Bienvenida con el correo del agente autorizado, en caso contrario devolver un estado HTTP que indique que el usuario no está autorizado y un mensaje que menciona la descripción del error. (3 Puntos)
