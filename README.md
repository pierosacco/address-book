# address-book

[![N|Solid](http://www.youtransfer.io/assets/nodejs.png)]([node.js])


Address book RESTful API made in **Node.js** with **Express**. The Address book app enables its users to manage a simple contact list by adding new contacts. The Node.js backend app uses two different storage services to maintain the data. Users accounts are stored in **MongoDB**, whereas contacts are stored in **Firebase**. Each user can manage his own contacts but not the contacts of other users, the mongo id of the user is used as the index to store the contacs in Firebase.

### Installation

address-book requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies.

```sh
$ npm install -d
```

For production environments...

```sh
$ npm install --production
```
To start the server

```sh
$ npm start
```

# Features

  - User creation/registration
    ```sh
    POST /signin
        headers: { 
         'content-type': 'application/json'
        },
        body: {
          "email": "some@email.com",
          "pass": "password"
        }
    ```
  - User login
    ```sh
    POST /login
        headers: { 
         'content-type': 'application/json'
        },
        body: {
          "email": "some@email.com",
          "pass": "password"
        }
    ```
  - Contact creation
    ```sh
    POST /contact
        headers: { 
         'content-type': 'application/json',
         'x-api-token': 'json-we-token'
        },
        body: {
          "name": "piero",
          "lastname": "sacco",
          "email": "email@gmail.com",
          "phone": "777-777-777"
        }
    ```
### Testing

There are just a couple of test implemented as an example of the functionality and tools used. **chai**, **mocha** and **supertest**. 

```sh
$ npm run mocha
```

### TODOs

 - Write MORE Tests
 - Implement more endpoints and functionalities
 - Develop a more custom validator to meet the standart response object
 

----

   [git-repo-url]: <https://github.com/pierosacco/address-book.git>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>

