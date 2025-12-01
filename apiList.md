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

- POST /request/send/:status/:userId -> Status: Ignored or Interested
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/connections
- GET /user/request/
- GET /user/feed

Status - Ignored, Interested, Accepted, Rejected
