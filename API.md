# API Documentation
V0.0.1 1/18/2026

## User Routes

### POST / user
Creates user

No Auth

Accepts

```json
{
    username:string,
    password:string,
    troop:string,
    email:string,
    firstName:string,
    userPointValue:int
}
```

### GET /user
Gets user details tied to the JWT token

JWT Auth

Accepts - Nothing

### GET /user/public
Gets the publicly available details of a user from db

Auth JWT

Accepts
```json
{
    username:string
}
```

## Authentication

### POST /authenticate
Issues JWT

Auth None

Accepts
```json
{
    username:string,
    password:string
}
```

## Points Routes

### POST /points

Adds points to the total

Auth JWT

Accepts
```json
{
    scannedUSerUserID:string
}
```

### GET /points 

Gets total points for a user associated with the JWT

Auth JWT

Accepts - None

## Leaderboard Routes

### GET /leaderboard 
Gets the leaderboard

Auth JWT

Accepts None


