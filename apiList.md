# DevTinder API List

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/like/:userId
- POST /request/send/pass/:userId
- POST /request/review/accepted/:userId
- POST /request/review/rejected/:userId

## userRouter

- GET /user/connections
- GET /user/request/
- GET /user/feed

Status - Pass, Like, Accepted, Rejected
