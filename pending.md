# Development goals for week#01 sprint

## Login

- Check that token at `localStorage` is reset when click in logout.
- Remind me for xx days working properly.
- Check the feedback of login when the email or password are wrong.
- Link to 'awake' render.com server from login component.

## Microservices

- For the db collection `users` to use the data in this collection in other related db collections as `products` (secondary key `userCreatorEmail`)
- For the dashboard metrics. Compare the behavior between obtaining them in "one shot" from the analytics query and individually as microservices.

## Data analysis

- DB: New db collection of universal dates `appsystemdates` to support data analysis when data is not available for any date (clustering by date). There will be only one db collection of days and the rest of periods (weeks, months, quarters and years) should be provided by views of this collection.

## Filter

- Add a new parameter to the filter based on search by regular expression. If a regex is indicated, the closed options will be ignored. Control the possibility of searching in string and number fields.

## Architecture

- Usage of thunks and extra reducers.
- Normalizing the server respond to {results: []}
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

- Back-Front communications: Transmission of error messages from back to front. Update the type/interface of HTTPError in back t allow new field for internal code of the errors and create a wiki db collection with them to help back team to identify the source of the errors received by the users.
- Persistance: Register of the front `store` object at the db to boost the persistance of the app. Transmit the last store saved when the `loginWithToken` tool of the `useUser` hook is used.

# Development goals achieved

## Architecture

### Parametric Architecture in Services and UIs for any Collection (PASUIC)

Only one parametric data model, repo, controller and router developed in the backend to manage all collections of database. Only one repo, hook, query component and query gallery to read and group by collections. This avoid duplications of code when the app grows in the number of collections to manage. The query component substitute the former approach of filter components (using POST methods) adding new features (selection of collection, filter by any defined field of the collection as filterable (see below) and with online update of sets of values to filter by, search by any defined field of the collection as searchable (see below) with regex patters to customize the results, order by by any defined field of the collection as searchable (see below) with asc/desc options and pagination). The counter of documents for queried and non queried count works simultaneously with the query to supply a consistent info about the results of the query at the UI components of the frontend.

The parametrization works thanks to a new database collection called `appcollectionfields` with the following fields to categorize their behavior at the UI components of the frontend:

- `collectionName`: name of the collection, as it is defined on the db.
- `fieldName`: name of the field at the collection, as it is defined on it. For mongodb field `_id` use `id` as `fieldName`.
- `fieldShortDescription`: prepared to customize parametric UI components with a non technical naming instead of '`fieldName`'.
- `filterable`: boolean to include (`true`) or not (`false`) the field in the query component filter options. For `fieldName===id`, set this property to `false`, because even if the `readRecords` repo method (see definitions below) has defensive code to work with the `id` `ObjectId` field, the `groupBy` and `groupBySet` repo methods (based on pipelines) does not work with `ObjectId` fields. As UI gallery component need the 3 repo methods to work with simultaneously (for reading documents, offer grouped distinct values to filter and count documents), this property must be set as `false` for any `ObjectId` fields at the collection.
- `searchable`: boolean to include (`true`) or not (`false`) the field in the query component search options. This property must be set as `false` for any `ObjectId` fields at the collection
- `orderable`: boolean to include (`true`) or not (`false`) the field in the query component order by options. This property must be set as `false` for any `ObjectId` fields at the collection

Once a new collection has been added to the backend (data model and Schema), all the services of the backend are extended to the new collection following only 3 steps:

1.- At mongo atlas: Add documents to collection `appcollectionfields` for each field of the collection and categorize their behavior giving values to their properties. Please, remember that any field containing `ObjectId` or `Boolean` values or an `object` must be set as `false` for fields `filterable`, `searchable` and `orderable` to prevent data inconsistences or malfunction at UI components in the frontend. At least, there must be one `filterable` field, one `searchable` field and one `orderable` field.

2.- At backend, file `collections.mongo.repo.ts`: Add a new `case` for the new collection name (recommended by alphabetic order) to the `switch` statement in function `queryInputDefault`.

3.- At frontend, file `query.collection.tsx`: Add a new `case` for the new collection name (recommended by alphabetic order) to the `switch` statement of each class method to include this collection to the their functionalities. Please note that if in the properties of the mongo `Schema` at the backend one/any of the field/s is/are disabled in the `transform(document, returnedObject)` settings, this/these field/s will not be shown in the UI components, as there are not supplied by mongo db (e.g. `passwd` field at `userSchema`)

### Standard methods for services

In order to simplify code in the backend, the repo and controller methods have the same naming and serve as many services as usually are demanded in database management, thanks to the intensive usage of a range of parameters. The naming is inspired in the CRUD nomenclator and the services are inspired in the SQL query common statements (select, where, group, join, order). The available methods for all the collection added to the parametric architecture (PASUIC):

- `readRecords`. supply the reading customized service of records using the `mongoose` methods `find`, `skip`, `limit` and `sort` with these request parameters:

  - `collection`
  - `filterField`
  - `filterValue`: With the '(select all)' option that permits to include all the options in the query. The options are obtained by fetching to the collection in every query to maintain updated info.
  - `searchField`
  - `searchValue`
  - `searchType`: With regex patters that allows to offer a variety of searching types ('Begins with', 'Ends with', 'Contains' and 'Exact Math').
  - `querySet`
  - `queryRecordsPerSet`
  - `orderField`
  - `orderType`

- `readRecordFieldValue`: supply the reading customized service of the value for a field of a record using the `mongoose` method `aggregate` with `$match`, `$addFields` and `$project` pipeline stages. This microservice allows to obtain info from any record at a collection with related data in the collection, as an SQL left join query works giving the possibility of showing this data in a UI component. The input parameters of the request are:

  - `collection`
  - `searchField`: With possibility of searching by id, managing the special behavior of this ObjectId field to match an string
  - `searchValue`
  - `outputFieldName`
    The method responds always with data, even if it's not supplied by the mongoose method without error, to simulate the left join query, informing of the outputStatus (ok, if the value exists, and ko, if it does not exist).

- `groupBy`: supply the grouping customized service up to 2 fields with searching option, adding the service of counting records or adding any numeric field by groups, using the `mongoose` method `aggregate` with `$match`, `$addFields` (with `$concat`, `$arrayElemAt` and `$split`), `$project`, `$group` (with `$sum`), `$group` and `$sort` pipeline stages. This microservice allows to obtain info used in the query UI component to count documents. The input parameters of the request are:

  - `collection`
  - `firstGroupByField`
  - `secondGroupByField`
  - `searchField`
  - `searchValue`
  - `searchType`
  - `aggregateSumField`: by default a `addedFieldForCountingDocuments` field (with a value of 1 for each document) is added to count documents, but it's possible to include another field to work out the aggregate sum of values.
    The method responds always with data, even if it's not supplied by the mongoose method without error. The defensive result has always the same structure (`{results: [{ _id: stringSeparator, documents: 0, aggregateSumValue: 0 }]}`), which is a partial of the result structure when there are results, to properly manage the response at the frontend.

- `groupBySet`: supply the grouping customized service to respond with the resultant set of values using the `mongoose` method `aggregate` with `$group` (with `$min`), `$project` and `$sort` pipeline stages. This microservice allows to obtain info used in the query UI component to show the available data set of values when a field is selected to filter. The input parameters of the request are:
  - `collection`
  - `groupByField`
    The method responds always with data, even if it's not supplied by the mongoose method without error. The defensive result has always the same structure (`{results: [{ set: '' }]}`), which is a partial of the result structure when there are results, to properly manage the response at the frontend.

This strategy allows to work with a nearly 'global' endpoint ('/collections') to manage almost all the needed services (other specific services as users management and obtaining analytics should maintain their endpoints).
The `router` for endpoint '/collections' distribute traffic for each method using as `path` the same naming used for the repo methods:

- `collectionsRouter.get('/readrecords/:id', logged, controller.readRecords.bind(controller))`
- `collectionsRouter.get('/readrecordfieldvalue/:id', logged, controller.readRecordFieldValue.bind(controller))`
- `collectionsRouter.get('/groupby/:id', logged, controller.groupBy.bind(controller))`
- `collectionsRouter.get('/groupbyset/:id', logged, controller.groupBySet.bind(controller))`

### Migration to GET methods

All requests to the backend in the new parametric architecture has been refactored from the former POST http methods approach (like those used by older filter UI components) to a new GET methods, standardizing the query send and using the decodeURI and decodeURI options or urls to avoid conflicts. A sample of uri requests for each service are:

- `readRecords`: /collections/readrecords/&collection=productmovements&filterfield=type&filtervalue=Compra&searchfield=productSku&searchvalue=2640&searchtype=Begins%20with&queryset=1&queryrecordsperset=4&orderfield=id&ordertype=asc&controlnfo=
- `readRecordFieldValue`: /collections/readrecordfieldvalue/&collection=products&searchfield=\_id&searchvalue=641900273cdabdb1c8fd1861&outputfieldname=sku&controlinfo=
- `groupBy`: /collections/groupby/&collection=products&firstgroupbyfield=brand&secondgroupbyfield=brand&searchfield=brand&searchvalue=&searchtype=Contains&aggregatesumfield=addedFieldForCountingDocuments&controlnfo=
- `groupBySet`: /collections/groupbyset/&collection=appcollectionfields&groupbyfield=collectionName

Please note that all the requests from the frontend use at the end of the query a parameter `controlInfo` that can be used to identify e.g. the line of code where the method has been called for better debugging.

PENDING:

- This migration to GET methods will facilitate the persistance of pages after forced updates by user, implementing a TBD process to login with token and redirect the url to the page with data.
- To a better debugging, explore the possibility of identify automatically the file and code line of execution to add it as argument, instead of the actual strategy of hardcoding.

## Log

Thanks to a customized usage of `tokens` and `stream` options of `morgan` library, the stream of requests received by the backend is saved in a `dist/access.log` (which is deleted in each initialization of the server) with info about:

- Date of the request
- Authorization token used in the request headers
- Host
- http Method
- url
- Status code of the respond
- Length of responds
- Time between request and respond (in ms)

Each request is saved in the log file separating the `morgan tokens` with the defined const `stringSeparator` '_-_' to facilitate its future export to a database. E.g.: '2023-05-12T20:24:12.081Z*-\_Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTYzMDk3M2QzM2QyNzk1N2VkZDdiMSIsImVtYWlsIjoic2ZkZXpsb3BAZ21haWwuY29tIiwiaWF0IjoxNjgzOTIyOTU0LCJleHAiOjE2ODQwMDkzNTR9.rG9thAI8DVJgITDvLIRjr9-ahXR3uEMwLE2Pn6BGm3U*-_localhost:4500_-_GET_-_/collections/readrecords/&collection=users&filterfield=role&filtervalue=user&searchfield=firstName&searchvalue=&searchtype=Contains&queryset=1&queryrecordsperset=4&orderfield=lastLogging&ordertype=desc&controlinfo=componentFile_query.collection.tsx_line_306_-_200_-_144_-\_25.417'

To assure a coordinated work between backend and frontend, const `stringSeparator` must have the strict equal initialization in both apps (e.g. '_-_'). const `stringSeparator` are defined at /src/config.ts files of the backend and frontend. Please note that if your are going to use data in your data base with high probability of containing this string, change it to another one more complex to avoid malfunction on it.

PENDING:

- Transform the authorization token used in the request `headers` in the email of the user (through the decoding of token to obtain the payload) before its is registered in the log file.
- Explore `morgan` tokens to try to save also data about response errors, as `debug` library supplies.
- Export the log file to the database in order to save info even if the server reinitialized in order to obtain statistic data of usage of the server by user (e.g. for billing purposes).

## Login

- Expiration of 1 day token implemented at back.

## Filter

- Order type (asc/des) feature in filter tsx components `filter.products.tsx` and `filter.productmovements.tsx`.
- Info about number of records at the filtered collection (with and without filter).
- Features of filter field, filter value, records to show in each page, pagination and number of available pages.
- Feature of the option (select all) for the filter.
- Values of filtering values options obtained by fetching a group aggregate method that shows in real time the value situation of db.

## Microservices

- Stock of a product (record at db collection `products`) using the tsx component `product.stock.tsx` with tne injection of the sku key value of the record as props. The calculation of the stock is made in the `productmovements` db collection and the microservice simulate the behavior of a left join sql query in mongodb giving the value 0 to the stock of records at the db collection `products` without records at the `productmovements` db collection using useState at the tsx.component to prevent fetch errors on the query for any records.

- Value of a key of a record at `products` db collection using the tsx component `product.keyvalue.tsx` with tne injection of the sku key value of the record as props. The query is made in the `products` db collection and the microservice simulate the behavior of a left join sql query in mongodb giving the value `Info not found` to the shown value when there is no record at the `products` db collection using useState at the tsx.component to prevent fetch errors on the query for any records

## Navigation

- Navigation url params is saved at the state to help new developments in the way to assure the persistance of the app when pages are directly uploaded or refreshed

# Pending bugs to fix

## Critical bugs

## Non critical bugs

### DashboardPage

- Strange behavior when deleting the dependency array of useEffect, even if it is empty. The app loops requesting continuously data to the backend.
  See https://retool.com/blog/hooks-and-state-102-the-dependency-array-in-useeffect/:

useEffect(() => {
// This runs after every render creating infinite loops
});

useEffect(() => {
// This runs only on mount (when the component appears)
}, []);

If you do have a dependency array, make sure that inside the useEffect, you’re not setting state variables that are also dependencies. If you are, the effect will run every time those state variables are changed, creating an infinite loop.

### ProductsPage

- Strange behavior when deleting fake products. Some times, the gallery updates correctly after deletions and other not.

### ProductMovementsPage

- Strange behavior when deleting productmovements. Some times, the gallery updates correctly after deletions and other not.
