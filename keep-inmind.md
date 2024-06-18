# Architecture
1. User Registration
2. Job Posting
3. Job Applying
4. Client mailing
5. Seeker Listing

## Note
- Recruitment Portal ( Application ) -> Dividing into services ( microservices - Architectural Style )
- Microservice -> Built with clean architecture ( Architectural Style )

## Architectural Style
- It is a concept in software engineering refers to the high-level organization of code, specifying layers, modules, and how they interact with each other. Examples of architectural styles include `microservices`, `clean architecture`, `client-server`, `service-oriented`, `pipes & filters`.

## Design Patterns
- It is a concept in software engineering and are more localized and have less impact on the code base. They are used to solve specific problems within a codebase, such as how to instantiate an object at runtime or how to make an object behave differently based on its state. Examples of design patterns include the factory pattern and the state pattern. 

# Reset Password
1. Request /forget-password
2. Request /validate-otp
3. Request /reset-password

# Roles & Permissions
1. Roles DB - stores all roles exists on the application
2. Project Routes DB - stores all routes on the application irrespective of role
3. Route Roles DB - stores combination of allowed routes and roles ( In simple terms, stores which role has access to which routes ).
4. User roles DB - stores which user has which role ( as we don't store reference for roles in users db )

# How checking role permission works?
1. Getting logged-in user
2. Getting assigned role of logged-in user from user roles db
3. Searching the requested url in project routes db
   - If route is exist, then read 4th point
   - If route is not exists, read 5th point
4. Confirming requested route is allowed to access by user by searching in route role Db
   - If allowed then controller will execute
   - If not allowed, read 5th point
5. Return unauthorized request

# AddedBy & UpdatedBy
AddedBy & UpdatedBy in other services were `userId`.


# ==== TERM & OBJECT ====
1. term - create, update, delete - user, post
2. object - create, update, delete - term

# TERM DELETE
1. Delete Attached Object OR NOT

## DO THIS:
1. Attach objects to parent term
2. If there is no parent term then records were 'orphan'

# OBJECT CREATE
1. Attach term

## DO THIS:
1. Create Record in term relationship

# OBJECT UPDATE
1. Attach term

## DO THIS:
1. Create Record in term relationship, if new term is attach
2. Delete Record from term relationship, if old term is detach

# OBJECT DELETE
1. Delete all records from term relationship

# OBJECT SOFT DELETE
1. Keep all records in term relationship, but not display in searches

## USER - All Terms
## POST - All Terms

# On User
1. You are only allowed to attach terms that are define in model 

# On Post
1. You are only allowed to attach terms that are define in model 

Note: Attaching term to object ( user or post ) involves maintaining record in `termRelationshipDb` and `count` in term that attached

Note: If you need to update the post or user and you are trying to update a term taxonomy, then your payload should contain entire object not just portion to update.  

Note: In bulk insert/update object from platform, term attachment is not allowed. Means you can insert/update fields that are not terms. ( check in termConstants )

# How managing entity works with taxonomies?

1. Add
{
    "skills": "Node.js",
    "location": [
        {
            "address": "Austin, 108001",
            "city": "Austin",
            "pincode": 108001
        }
    ],
    "education": [
        {
            "institute": "Stanford University",
            "specialisation": "Software Engineering",
            "startYear": 2019,
            "endYear": 2020
        }
    ],
    "employment": [
        {
            "isYourCurrentCompany": true,
            "company": "Microsoft",
            "designation": "Sr. Software Developer",
            "startYear": 2021,
            "skills": "Node.js"
        }
    ]
}

2. Update        - To update you need entityId in the request body for each entity otherwise it considered to add the new relationship.
{
    "skills": "Node.js",
    "location": [
        {
            "locationId": 688203,
            "address": "Austin, 108001",
            "city": "Austin",
            "pincode": 108001
        }
    ],
    "education": [
        {
            "educationId": 738285,
            "institute": "Stanford University",
            "specialisation": "Software Engineering",
            "startYear": 2019,
            "endYear": 2020
        }
    ],
    "employment": [
        {
            "employmentId": 833444,
            "isYourCurrentCompany": true,
            "company": "Microsoft",
            "designation": "Sr. Software Developer",
            "startYear": 2021,
            "skills": "Node.js"
        }
    ]
}

3. Delete
- self/profiles/:entity/:entityId


    // 17 Apr, 2024: Adding new parameter bypass it helps for routes that needs to check if user is logged or not, it only not return 401 with bypass if user is not found ( i.e user is not logged in ), for other scenrios like token expired and all 