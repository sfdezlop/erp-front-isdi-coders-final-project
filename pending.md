# Development goals for week#01 sprint

## Login

- Check that token at `localStorage` is reset when click in logout.
- Remind me for xx days working properly.
- Check the feedback of login when the email or password are wrong.

## Microservices

- For the db collection `users` to use the data in this collection in other related db collections as `products` (secondary key `userCreatorEmail`)
- For the dashboard metrics. Compare the behavior between obtaining them in "one shot" from the analytics query and individually as microservices.

## Data analysis

- DB: New db collection of universal dates `appsystemdates` to support data analysis when data is not available for any date (clustering by date). There will be only one db collection of days and the rest of periods (weeks, months, quarters and years) should be provided by views of this collection.

## Architecture

- Universal filter with 'get' fetch that can be used to filter any collection at any tsx components.

## Navigation

- Menu options established in the db according to the user role of the logged user, and read by the app after login.
- New interceptors at back with the CRUD premises for each db collection and for each user. The back should check that the user is authorize to access to any service at routers depending of its CRUD permissions. F.i., an user without Delete permissions at db collection `products` should be intercepted at delete routes in the `products.router.ts`.

## Development Stack

- Eliminate the global dependency of `redux-persist": "^6.0.0` to try to warrant the persistance without this kind of dependencies.

# Development goals for next sprints

## Features

- Filter: Change the filter fetch from post to get in order to help to the persistance of the front when the pages are uploaded
- Detail product: Change the detail product fetch from post to get in order to help to the persistance of the front when the page is uploaded
- Login: Selection of expiration of token at the login form to transmit it to the back.

## Testing

- Boost test coverage to 90% at back and front. Also to boost the SEM performance of the visited routes.
- Include a supertest at back.
- Include an e2e test at front with https://www.cypress.io/.

## css

- css at the menuoptions navigator to underline the actual page.

## Architecture

- Supermodel, router, controller and repos at back and front to avoid duplications of methods when the app grows in the number of db collections to manage.
- Back-Front communications: Transmission of error messages from back to front. Update the type/interface of HTTPError in back t allow new field for internal code of the errors and create a wiki db collection with them to help back team to identify the source of the errors received by the users.
- Persistance: Register of the front `store` object at the db to boost the persistance of the app. Transmit the last store saved when the `loginWithToken` tool of the `useUser` hook is used.

# Development goals achieved

## Login

- Expiration of 1 day token implemented at back.

## Filter

- Release of order type (asc/des) feature in filter tsx components `filter.products.tsx` and `filter.productmovements.tsx`.
- Release of info about number of records at the filtered collection (with and without filter).
- Release of features of filter field, filter value, records to show in each page, pagination and number of available pages.

## Microservices

- Stock of a product (record at db collection `products`) using the tsx component `product.stock.tsx` with tne injection of the sku key value of the record as props. The calculation of the stock is made in the `productmovements` db collection and the microservice simulate the behavior of a left join sql query in mongodb giving the value 0 to the stock of records at the db collection `products` without records at the `productmovements` db collection using useState at the tsx.component to prevent fetch errors on the query for any records.

- Value of a key of a record at `products` db collection using the tsx component `product.keyvalue.tsx` with tne injection of the sku key value of the record as props. The query is made in the `products` db collection and the microservice simulate the behavior of a left join sql query in mongodb giving the value `Info not found` to the shown value when there is no record at the `products` db collection using useState at the tsx.component to prevent fetch errors on the query for any records

## Navigation

- Navigation url params is saved at the state to help new developments in the way to assure the persistance of the app when pages are directly uploaded or refreshed

# Pending bugs to fix

## Critical bugs

## Non critical bugs

- Strange behavior when deleting fake products. Some times, the gallery updates correctly after deletions and other not.
- Strange behavior when deleting productmovements. Some times, the gallery updates correctly after deletions and other not.
