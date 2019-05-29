
## Disclaimer

Thanks for visiting my blog, github, workshops at regular interval. However, one point to note here is; the opinions expressed here are MY OWN and are not necessarily those of my employer or partners. ALL content presented AS-IS, for learning purposes only. Thanks, Rahul Sahay. Happy Coding


## The RxJs In Practice Course

This repository contains startup code of [RxJs Workshop](https://myview.rahulnivi.net/).

This course repository is updated to Angular v7, and there is a  package-lock.json file available, for avoiding semantic versioning installation issues.

![RxJs Workshop Course](https://user-images.githubusercontent.com/3886381/58416722-26778300-80a0-11e9-8e6f-b32f12730c3e.png)


# Installation pre-requisites

IMPORTANT: Please use the latest Node and especially NPM, to make sure the package-lock.json is used.

For running this project we need and npm installed on our machine. 

# Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli 


# How To install this repository

We can install the master branch using the following commands:

    git clone https://github.com/rahulsahay19/rxjs-learn.git
    
This repository is made of several separate npm modules, that are installable separately. For example, to run the au-input module, we can do the following:
    
    cd rxjs-learn
    npm install

Its also possible to install the modules as usual using npm:

    npm install 

NPM 5 or above has the big advantage that if you use it you will be installing the exact same dependencies than I installed in my machine, so you wont run into issues caused by semantic versioning updates.

This should take a couple of minutes. If there are issues, please post the complete error message in the Questions section of the course.

# To Run the Development Backend Server

In order to be able to provide realistic examples, we will need in our playground a small REST API backend server. We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm run start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)




## Copyright Rahul Sahay

