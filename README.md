# Ironsource

## Routing

| METHOD | PATH                  | PAGE             | DESCRIPTION                                                      |
| ------ | --------------------- | ---------------- | ---------------------------------------------------------------- |
| GET    | /                     | Home             | Displaying latest resources                                      |
| GET    | /resource/create      | Create Resource  | Display resource creation form                                   |
| POST   | /resource/create      | Create Resource  | Add resource to database                                         |
| GET    | /resource/:id         | Single Resource  | Display single resource (link to the update form, deletion form) |
| GET    | /resource/:id/update  | Update Resource  | Display resource updating form                                   |
| POST   | /resource/:id/update  | Update Resource  | Update resource                                                  |
| GET    | /resource/:id/delete  | Delete Resource  | Displays deletion confirmation                                   |
| POST   | /resource/:id/delete  | Delete Resource  | Delete resource                                                  |
| POST   | /resource/:id/upvote  | Upvote Resource  | Increments points of resource by 1                               |
| POST   | /resource/:id/comment | Comment Resource | Handles comment form submission                                  |
| GET    | /error                | Error            | Display error message                                            |

## To Do

- Add sorting algorythm.
- Change promise chains into async/await.
- Transfer data from local database to remote
- Use papertrail

## Optional to dos

- Send welcome email to user on account creation.
- Establish connections between users
