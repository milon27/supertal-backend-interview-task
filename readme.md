# Parking Lot management

## How to run

-   make sure you have [docker](https://www.docker.com/products/docker-desktop/) and [pnpm](https://pnpm.io/) install on your system as node package manager
-   run mysql database and redis on docker(you should have docker install on your machine)

    -   run `docker compose up` this will run the database and redis on docker[use git-bash terminal in windows or for mac/linux default terminal is fine]

-   install all dependencies and run the app

    ```bash

    pnpm i
    # rename .env.dev (if available) to .env then update db connection string (DATABASE_URL) and other env variable if needed
    pnpm: db:migrate

    # reload / reopen vscode to restart TS server
    # run the test
    pnpm test
    # run the app
    pnpm dev # Api will run on port 4000
    ```

## Feature & Api Explanation

1. [x] **Create 1 Parking Manager, 2 Lots and 3 Slots using seed file**
    - seed command
        - `pnpm db:seed`
    - manger login details
        - email: manager@gmail.com
        - password: 1234567
2. [x] **Customer/ User/ Manager Authentication and Add Vehicle Details**
    - Auth
        - [Register A User - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-f6f0f8ec-36a2-42b0-9430-4362f2c8d8d1)
        - [Login As User/Manager - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-3bf07f29-1e06-4f78-97a8-b56b2c6a1f73)
        - [Logout User - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-5a7f013c-f0a0-4ca8-ad11-bff8edb5a4ed)
        - [Get Logged in User - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-5d2663b6-b140-4a1d-815a-7fcdadddd01b)
    - Vehicle (add, get for logged in user)
        - [Add New Vehicle - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-7d51758d-5654-457a-9ec9-4aa23e0429da)
        - [Get List of Vehicle - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-983b6cd5-d1c9-4dab-8e07-277e6de02cd4)
3. [x] **Manager can create parking lots with desired parking spaces/slots in each parking lot.**
    - Parking Lot
        - [All parking lot - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-3e6d4947-3aed-499e-8ea5-4c9c7171d464)
        - [Create parking lot - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-38de8d5f-8de4-453f-b71c-502894785299)
        - _Parking manager can view his current parking lot status (eg which cars are parked in which slots)_
            - [Get Single Parking Lot (Status) - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-b4bb4bc6-3c60-42da-a5b3-700f3f7bdb90)
    - Parking Slot
        - [Create parking slot - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-5c8bee50-935c-46cf-aab8-896b3e0fc1bb)
        - _Parking manager can put any parking space/slot into maintenance mode and back to working state at any time_
            - [Update Parking Slot - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-ab330aab-372c-4c68-bd08-99416f68f163)
4. [x] **User (Vehicle owner) can choose any parking lot & can park his vehicle in the nearest parking slot available in that lot (eg if parking slots are numbered 1,2,3....n, then we still start from 1 and pick the one that is available)**
    - [Park a vehicle with lot id & vehicle id - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-646a49d6-74a4-4d27-9325-875c4ab9a612)
5. [x] **User can unpark his vehicle,response should be success along with the parking fee that will be calculated as Rs. 10 _ Number of hours the vehicle has been parked. eg If parked for 1 hour 5 minutes , it will be 10 _ 2 = 20**
    - [Get logged in user parked vehicle list - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-60a75acb-e3b7-4bfb-ae04-745bc3eea4b3)
    - [Un-Park a vehicle & Get Total Fee - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-307a41ab-0735-4fca-ade2-07c4af0b49bf)
6. [x] **Parking Manager should be able to get total number of vehicles parked on any day, total parking time and the total fee collected on that day.**
    - [Summary Api - Postman](https://www.postman.com/m27lab/workspace/classroom/request/12238877-1756f2c8-4334-41f3-8a87-f564ab11e364)

## Update npm dependencies

```bash
# Updates all dependencies in package.json
pnpm all:update

# run test to check the app is working fine or not
pnpm test
```

## Run/Write test

-   create .env.test file from .env.dev and update values
-   all test file will be in `src/__test__` directory
    -   on each test file we will have `beforeAll()` and `afterAll()` it will clear `db+redis`.
-   run `npm run test` for integration test
-   for testing we are using `vitest, supertest`

## API endpoints and doc

-   BASE url: http://localhost:4000/v1
-   Swagger Doc url: [Not Implemented]
-   in `.doc` folder a postman json file `postman-collection.json` is available import it on your postman
    -   you need add an environment in postman with variable `url=http://localhost:4000`

## Code Snippet on vscode

-   generate a router boilerplate
    -   create a file on a module called user.router.ts
    -   `npr`+`User(this is the module name in PascalCase)`+`tab`
-   generate a controller boilerplate
    -   create a file on a module called user.controller.ts
    -   `npc`+`User(this is the module name in PascalCase)`+`tab`

## How to push code

-   setup husky Git hooks `npx husky install` it will generate a husky.sh file in `.husky/_` folder
-   create new branch `git checkout -b feature-branch`
-   add files `git add .`
-   commit files `git commit -m 'message'` [here husky wil check the linting, it will throw error and stop commit if there is any linting error, it will ignore warning]
-   push code `git push origin feature-branch`
-   always create Pull Request on `dev` branch

## Developer guide (code style)

-   **Set up vscode**
    -   Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension on vscode, then select default formatter to prettier instead of none
    -   Install [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension
    -   Install [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) extension
-   **Folder Structure**

    -   All folder name must be singular, e.g. `/login` not `/logins`
    -   Each feature will have a module folder inside `feature` folder

        -   we might have 2 types of module - 1. singular 2. multi-module
        -   e.g. singular (**user module** check `src/feature/user`)
            -   `user module` folder structure
            -   `src/feature/user`
                -   `-> dto/create-user.dto.ts`
                -   `-> interface/user.interface.ts`
                -   `-> user.controller.ts`
                -   `-> user.router.ts`
                -   `-> user.service.ts`
        -   e.g. multi-module (**auth module** check `src/feature/auth`)
            -   `auth module` folder structure
            -   `src/feature/auth`
                -   `-> auth.router.ts(this is the main router where all the sub singular module will connect)`
                -   `-> login-register[act as single module]`
                -   `-> logout[act as single module]`
                -   `-> verify-email[act as single module]`

-   **File Name Convention (all lower case,separated by -)**
    -   All file name must be singular, e.g. `user.router.ts` not `users.router.ts`
    -   Some other file names
        -   app.router.ts | my-app.router.ts
        -   app.controller.ts | my-app.controller.ts
        -   app.service.ts | my-app.service.ts
        -   create-user.dto.ts
        -   logged-in-user.interface.ts
        -   anything.something.ts
-   **Class, interface and Function name convention**
    -   Class: `class MyClass{}` (mostly we will use functional programming, so try to ignore class)
    -   Interface: `interface IMyInterface{}` should start with capital `I`
    -   Function: `function myFunction(){}` should be in camelCase
    -   Variable name: `const aName=""` should be in camelCase
    -   Object name: `const UserService={}` should be in PascalCase
    -   Router Name: `const UserRouter = Router()`
    -   Controller Name: `const UserController = {}`
    -   DTO Name: `const CreateUserDto = z.object({})`
-   **Import/Export Module**

    -   on app.ts and for all \*.router.ts file use default export
    -   for all other case always use named export avoid using default export
        -   e.g. for controller, service, dto, interface always go with named export

    @author
    [milon27.com](https://milon27.com)
