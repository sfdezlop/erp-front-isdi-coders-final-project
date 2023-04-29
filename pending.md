# Bugs

- Strange behaviour when deleting fake products. Some times, the gallery updates correctly after deletions and other not.

- Strange behaviour when deleting productmovements. Some times, the gallery updates correctly after deletions and other not.

# Pending developments

## Login

- Controlar que en el logout se borre el token en localstorage

## Filter

- Opción de ordenación de los filtros con el parámetro ASC/DESC

## Props

- Parametrización del componente filter en función de la página en la que se utiliza para poderlo utilizar tanto en products como en movements

## Microservices

- Obtener los datos del creador de un artículo a través de un componente independiente con fetch en tiempo real
- Tratar de diseñarlo con parametrización total. Parámetros de diseño de colección, campo y valor de origen y destino de los elementos a comparar para obtener la join y control mediante useState y useEffect de la posibilidad de que no haya join forzando una left join en la renderización del dato.

## Menu Options y Permissions

- Obtenerlos dinámicamente de la db
- Interceptor por colección y tipo de permiso

## SEM

- Construir rutas con atributos SEM
- Cambiar la estrategia de detail a página con query y que en useEffect haya un fetch a la BD con esa query para evitar la incongruencia de datos en navegación cuando el usuario visita varios productos.

## Persistance

- Analizar como asegurar la persistencia de los datos y de las url dinámicas cuando hay actualización de página
- Grabación del store en la db
- Probar en el arranque de app tsx la posibilidad de que si no hay token en el estado, pero sí en el localStorage, haga loginwithtoken y redirija a la última web visitada.

## Bugs

- Actualizar el contador de artículos cuando se muestra el dashboard
