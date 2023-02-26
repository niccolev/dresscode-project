# dresscode-project

# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

                                    LIVE WEBSITE ON:
                                    https://dresscode-project.herokuapp.com/

                           --------------------------------------------

                                    GITHUB:
                                    https://github.com/niccolev/dresscode-project

<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@ DJANGO ADMIN CREDS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

                            http://127.0.0.1:8000/admin/

                                ADMIN CREDENTIALS:
                                user(email): nicci@mail.com
                                pwd: 123456

<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

BEFORE RUNNING PROJECT PLEASE INSTALL REQUIRMENTS:
$ pip install -r requirements.txt


In the terminal open 2 terminals, one for backend, one for frontend.

% In the first terminal run this step by step:
1. $ .\myenv\Scripts\activate
2. $ cd ./backend or $ cd back(then press TAB for automatic fill)
3. $ py manage.py runserver

<!-- In the second terminal run this step by step: -->
1. $ cd ./frontend or $ cd front(then press TAB for automatic fill)
2. $ npm start


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

<!-- IN APP FUNCTIONS -->
1. To search a specific product use the Search Box on top.

2. To view and modify the cart click on the Cart button on Top of the navbar.

3. A LOGIN button will be next to the cart button on the navbar. there you can LOGIN if you
    already have an account, and if  you dont - you will have the option to REGISTER.

4. When logged in - To view your user profile click on your user name next to the cart button and 
    a dropdown menu will appear. there you can either go to your profile where you can see your *ORDERS* 
    and *UPDATE YOUR PROFILE* or choose to *LOGOUT*.

5. Incase your are an Admin user - you will also have an ADMIN dropdown menu on the top right, 
    next to the profile dropdown menu.
    In the Admin dropdown menu you will be able to choose between viewing all:
        A. PRODUCTS
        B. USERS
        C. ORDERS   
    In each one of those you will be able to view details, edit or delete them.

<!--@@@@@@@@@@@@@@@@@@@@@@@@@@@@ SWITCH BEWTEEN CATEGORIES @@@@@@@@@@@@@@@@@@@@@@@@@@@@-->

To switch between categories you will have to use the categories selection dropdown.
There are 2 categories (and 3 options total):
1. ALL - will show all products.
2. DRESSES
3. CASUAL

<!-- Please notice - due to pagination - when choosing a category - it will only show the 
    products from the chosen category in the same page you are on. if you will go to the next page
    you can choose that category again and see more product from the next page. -->


<!--@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ADD ITEM TO CART AND GET EXTRA INFO @@@@@@@@@@@@@@@@@@@@@@@@@@@@-->

To add a product to your cart please click on the desired product and once in the product screen
you will have the option to add the product to your cart, and choose the quantity.
 <!-- Please notice - if the product is Out Of Stock the "Add to Cart" button will be
    be disabled and you wont be able to press it. Also you will not be able to add a higher
    quantity than whats in stock - to your cart. -->
In the product screen you will be able to see the ratings and reviews, and also add a review - but only 
if you have successfully purchased that item.

<!--@@@@@@@@@@@@@@@@@@@@@@@@@@@@ CART CHECKOUT - PAYPAL @@@@@@@@@@@@@@@@@@@@@@@@@@@@-->

To check out - go to your cart and press the Check Out button on the right.

        paypal checking out credentials:
        when checking out - PayPal will ask for an email and a password for payment.
        feel free to use the following:
            email: nicci@mail.com
            pwd: nikol107


<!--@@@@@@@@@@@@@@@@@@@@@@@@@@@@ IMAGE UPLOADING FROM ADMIN SCREEN @@@@@@@@@@@@@@@@@@@@@@@@@@@@-->

Image uploading is available from Admin -> Products -> Add Product 
There you can add a new product to the products list and add a picture.
