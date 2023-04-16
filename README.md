# AgroMart
![sprout](https://user-images.githubusercontent.com/77457296/232320083-ce751a66-01a6-4166-8248-ba73d44fa62f.png)

Project Description: E-Commerce Application for Agricultural Products and Equipments 

**Overview** \
The agriculture industry has traditionally relied on traditional methods for buying and selling agricultural products and equipment, such as direct sales, auctions, and intermediaries. However, with the rise of e-commerce, there is an opportunity to bring the benefits of digital commerce to the agriculture industry for both Buyers and sellers . We propose an E-commerce application for buying and selling agricultural products and equipment.

**Solution** \
Our E-commerce Application is designed to provide a user-friendly, efficient, and secure marketplace for buyers (mainly farmers) and sellers of agricultural products and equipment. The Application consists of two components: a website and a payment gateway.

**Application Features** \
The application works as the primary Application wherein it provides a wide range of features to both the buyers and sellers.
The application supports both sign Up and Sign In, where they can choose to be a buyer or a seller. It also provides intuitive navigation supported by a dashboard screen.
The sellers can list their items for sale with all the product description, can track their sales, and manage inventory.
The buyers can browse the products with ease with the help of filtering capabilities where they can choose the category of product they want to buy, this also provides them with the power of comparing all the listings and choosing the best for them; further, they can make purchases supported with secure transactions and track their orders. The buyers also have their farm which shows all their orders and purchases.
Other additional features include the BLOG FEED, which provides the users with the latest news and feeds related to the agricultural sector for them to stay updated. also being equipped with the chatbot the application enables doubt clarification, the dashboard also shows temperature and wind speed.


**Technology**\
The E-commerce Application uses modern technologies to provide a scalable, reliable, and user-friendly experience for buyers and sellers. The Android application is made using kotlin.The frontend made using JetPack compose which is a modern UI toolkit. In the backend we have used node JS and Express JS along with MongoDB (NO SQL) as our database. The Application also uses cloud-based hosting, providing fast and reliable access to the application.

**Conclusion** \
Our E-commerce Application provides a modern and convenient way for buyers and sellers to buy and sell agricultural products and equipment. The Application enables buyers to access a wider range of products and sellers to reach a larger customer base, creating opportunities for increased efficiency and profitability. The Application also provides a secure and convenient way for buyers to make purchases, and sellers to receive payments, enabling transactions to be completed quickly and efficiently. The Application can be customized to meet the specific needs of different regions and markets, making it a versatile and scalable solution for the agriculture industry.


---
## Requirements For Running On Local System

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v18.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git https://github.com/AgraMart/Backend.git
    $ cd PROJECT_TITLE
    $ yarn install

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build

## Production link

    http://34.131.68.37/
