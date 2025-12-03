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
- POST /request/review/:status/:requestId -> Status: Accepted or Rejected

## userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed

Status - Ignored, Interested, Accepted, Rejected
