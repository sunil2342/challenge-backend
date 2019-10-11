# cities-suggestion-api
This an API endpoint that provides auto-complete suggestions for large cities in USA and Canada.

* The endpoint is exposed at /suggestions
* The partial (or complete) search term is passed as a querystring parameter q
* The caller's location should also be supplied via querystring parameters latitude and longitude to help improve relative scores

## Sample Request
`GET /suggestions?q=Londo&latitude=43.70011&longitude=-79.4163`
## Sample Response

```[
{
  "name": "London, Canada",
  "latitude": "42.98339",
  "longitude": "-81.23304",
  "score": 0.9
},
{
  "name": "Londontowne, MD, USA",
  "latitude": "38.93345",
  "longitude": "-76.54941",
  "score": 0.6
},
{
  "name": "London, OH, USA",
  "latitude": "39.88645",
  "longitude": "-83.44825",
  "score": 0.6
},
{
  "name": "Londonderry, NH, USA",
  "latitude": "42.86509",
  "longitude": "-71.37395",
  "score": 0.6
},
{
  "name": "New London, CT, USA",
  "latitude": "41.35565",
  "longitude": "-72.09952",
  "score": 0.5
},
{
  "name": "New London, WI, USA",
  "latitude": "44.39276",
  "longitude": "-88.73983",
  "score": 0.5
},
{
"name": "London, KY, USA",
"latitude": "37.12898",
"longitude": "-84.08326",
"score": 0.4
}]
```
## Code Review

The app.js file in src folder is used to configure and setup the server.

The 'cities.tsv' in src/data folder is a tab seperated file of cities in USA and Canada.

The 'suggestionRoute.js' in src/route contains the algorithm to find best match for the query recieved.
