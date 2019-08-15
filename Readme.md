to run

- npm run dev


to check in postman:
- GET request: just put url as http://localhost:8080
- POST request:
    - under Body : raw
    - JSON(application/json) .  // this is after graphql
    - adding token, insert Bearer {token}, it is implemented in header
    - after adding photo content use x-form encoded to post objects


Api urls:
{
/api: "api docs",
/api/signup: "signup",
/api/signin: "signin",
/api/signout: "signout",
/api/users: "get all users",
/api/user/:userId: "get/update/delete user",
/api/posts: "get all posts",
/api/post/new/:userId: "create new post",
/api/posts/by/:userId: "get posts by user",
/api/post/:postId: "update/delete post"
}