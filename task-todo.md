## 30 Jan, 2023
1. Login with google 
   - {"status":"SERVER_ERROR", "message":"seeker validation failed: mobile: Path `mobile is required., userType: Path `userType` is required.","data":null}
2. Upload profile picture or other assets
3. Set Cookie on register & login

## 01 Feb, 2024
1. Upload profile picture or other assets
- Create 2 different upload/retrieve pair for profile and resume.
- Upload
   - /client/cloud-aggregator-sk/v1/{user_profile_id}/upload_type
- To retrieve uploaded file, get url must contain headers
   - auth token
   - unique identifier
- Can allowed server to return response file binary format, so we can use it to create blob url on client side.  

## 03 Feb, 2024
1. Refresh Token

## 07 Feb, 2024
1. Add verification for access token expiration in passport strategy.
2. Add regeneration of access token with refresh token.
3. Set Cookie on register & login.
Reference: https://www.3braintechnologies.com/refresh-token-flow-implementation-in-mern-stack-application-a-step-by-step-guide.html

## 08 Feb, 2024
1. Cross test seeker routes ( including mail verification ). - Done
2. Refactor other users code and test their routes as well.
3. Set cookies on register - Done
4. Concatenate profile assets in user `/me` - Done

## 10 Feb, 2024
1. Work on userRoles, roles, projectRoutes, routeRoles.
2. Refactor other users code and test their routes as well.

Note: Replace Access Token Expire time old: 60 * 17
- Expire Time
  - Access Token: 1 hr
  - Refresh Token: 1 month 

## 11 Feb, 2024
1. Fix this error to add to the user. Only need to change `ref` model.
Error: seeker validation failed: addedBy: Schema hasn't been registered for model \"user\".\nUse mongoose.model(name, schema)
2. Complete testing all routes.
3. Complete implementing seeding.
4. Create endpoint like `/status` to check this user mnj this operation or not.
5. Try integrating frontend html as it is. with backend ( can be done in future after job posting and searching is implemented to certain level )

## 12 Feb, 2024
1. Need to fix error on get request of admin
Error: Cast to ObjectId failed for value \"list\" (type string) at path \"_id\" for model \"systemUser\" 

I was stuck as at authentication in multiple microservices as when a user logged-in the access token is set in client cookie and refresh token is stored in db. And access token is regenerate every time it expired with help of refresh token. Now, user registry, generating access/refresh tokens, authorization is maintained by one separate microservice. Then how I authenticate & authorize public endpoints of other microservices in the application.

As in need of authenticate requests in other microservices, I need `userTokens` collection which is part `user registry` microservice. What should I do in this position?

1. One way to setup communication system between microservices is creating a webhook, each service will have publish and subscribe events. One service publish a event and another subscribe for the event.

This method had drawback, if one service is down for time then it will not have any clue about for any events occurs during downtime.

2. Second way is message queue, 

## 25 Feb, 2024
1. Add `profileId` attribute

## 27 Feb, 2024
1. Working on objectId referencing in added & updated By

## 03 Mar, 2024

### SEEKER
- Location
- Skill
- Industry
- Language
- Experience
- Designation
- Gender
- Religion

1. On Seeker Create
- Add records in term relationship - Done
- Update `count` in term taxonomy - Done

2. On Seeker Update
- Add new term records in term relationship - Done
- Delete old term records from term relationship - Done
- Update `count` in term taxonomy - Done

3. On Seeker Delete
- Delete all records from term relationship - Done
- Update `count` in term taxonomy - Done

4. On Seeker Soft Delete
- Keep records in term relationship, but set isDeleted to true & escape from main query

== Register, Update Profile, Delete, Soft Delete

### Recruiter
- Industry
- Designation ( Optional )

1. On Recruiter Create
- Add records in term relationship - Done
- Update `count` in term taxonomy - Done

2. On Recruiter Update
- Add new term records in term relationship - Done
- Delete old term records from term relationship - Done
- Update `count` in term taxonomy - Done

3. On Recruiter Delete
- Delete all records from term relationship - Done
- Update `count` in term taxonomy - Done

4. On Recruiter Soft Delete
- Keep records in term relationship, but set isDeleted to true & escape from main query

== Register, Update Profile, Delete, Soft Delete, Add User ( Seeker )

### Post
- Location
- Skill
- Industry
- Language
- Experience
- Designation
- Gender
- Religion

1. On Post Create
- Add records in term relationship - Done
- Update `count` in term taxonomy - Done

2. On Post Update
- Add new term records in term relationship - Done
- Delete old term records from term relationship - Done
- Update `count` in term taxonomy

3. On Post Delete
- Delete all records from term relationship
- Update `count` in term taxonomy

4. On Post Soft Delete
- Keep records in term relationship, but set isDeleted to true & escape from main query
- Update `count` in term taxonomy

== Add Post, Update Post, Delete Post, Soft Delete Post

### TERM

1. On Delete Term
- Remove term, term taxonomy & term relationship
- Assign attached objects to parent term ( if exists, else left orphan )

2. On Soft Delete Term
- term, term taxonomy & term relationship - isDeleted
- Escape objects from listing

## 09 Mar, 2024

1. Add Object
- While adding/registering the object keep precaution on which taxonomy accept array of term of which only accept one term.

2. Update Object
- While updating the object allow to update allow those taxonomy which are trying to update. For e.g, if a object has two taxonomy `skill` and `education` when it `registered` and now on want to update skill, then `don't delete records` of `education` if its `not present in payload`.

3. Create get url for users with `level` parameter.

4. Couple object and terms for get request of object 

## 10 Mar, 2024

1. Job Invites 
- Invites were send to seeker by recruiter
- Receives in inbox section of seeker
- Seeker have option to apply on it
- Recruiter approve or reject it 

# 13 Mar, 2024
1. Seeker: Add Portfolio - Image Upload and Link ( Array )
2. Handling Location Term
3. Seeker: Add Experience & Education ( Array )

# 19 Mar, 2024
1. Make response error message more attractive.

# 21 Mar, 2024
1. Need to fix same ogId attaching ( maybe this issue occurred in other Ids as well like profileId, userId, postId, termId, termTaxonomyId, etc. )
2. Handle address, experience, education

# 22 Mar, 2024
1. How to handle field with term array?
e.g - Skills 

- Add/Edit: 
Request: Add/Remove term in array
Description: Create/Remove a record in relationship table

- Delete: 
Request: Remove term in array
Description: Remove a record in relationship table

2. How to handle field with multiple taxonomy?
e.g - Address

- Add: 
Request: Add term in sub-field
Description: Create a record in relationship table

- Edit: 
Request: Replace term in sub-field
Description: Create a new record in relationship table and remove old record

- Delete: 
Request: Remove term in array
Description: Remove a record in relationship table ( If its not required field )

3. How to handle field with array of multiple taxonomy?
e.g - Education, Employment

- Add: 
Request: Same work as (2.), but push in array
Description: Create a record in relationship table ( use unique id for each item ) 

- Edit: 
Request: Same work as (2.), but push in array
Description: Create a new record in relationship table and remove old record

- Delete: 
Request: Same work as (2.), but pop from array
Description: Remove a record in relationship table

# 26 Mar, 2024
1. Need to fix same entityId attaching to all items if multiple items are adding in single request.
2. Work on uploadResume
3. Work on Add profile and resume upload

# 19 Apr, 2024
1. Create about company in job post - textare - can edit 
2. Job timing - remove job post status

# 05 Apr, 2024
1. Test signin with google
2. Apply on signup page as well
3. Get data from __data and store in indexedDb
4. Views on candidate and job post
6. call posts on homepage 

# 13 May, 2024
1. Need to change cookie names for recruiter
2. Need to reduce session expiration to 1 hr

# 13 May, 2024 (evening office)
- Fixes
1. Saved seeker not working ( done )
2. Email verification not working ( mail is sending ) ( done )
3. user role record is not creating on sign-in with google which cause authorization error on checkRolePermission routes ( done )
4. Actions on application takes time ( show loading ) 
5. cross check logout on seeker and recruiter

- Add
1. Add view count on post page

# 13 June, 2024
- Do's
1. On Client side logout user on refresh token expire
2. Apply redirection with web server (nginx, apache)
- On 401 redirect dashboard to login with query `redirect` parameter like domain.com/login?redirect=target-link
Note: I think this will help to fix in (1) as well

- Change Log
1. Change refresh token expiry to 356 days
2. Add check if candidate is already saved or not ( on save seeker )

# 14 June, 2024
- Change Log
1. Add user_query_type in register use case based on user type

# 18 June, 2024
- Change Log
1. Change refresh token secrets for seeker & recruiter to access token secrets 
2. Change recruiter cookies prefix to 'rpc_' ( rpc_at, rpc_rt )
3. Change `isLoggedIn` in get post to isSeekerLoggedIn  
4. "Go to dashboard" in header not to visible on recruiter login

# 19 June, 2024
1. Create clean string utility in server and use with post permalink
2. Remove default from `jdUrl` from post schema and put in pre save hook 