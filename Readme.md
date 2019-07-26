to run

- npm run dev


to check in postman:
- GET request: just put url as http://localhost:8080
- POST request:
    - under Body : raw
    - JSON(application/json) .  // this is after graphql
    - adding token, insert Bearer {token}, it is implemented in header
    - after adding photo content use x-form encoded to post objects