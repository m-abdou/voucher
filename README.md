voucher Pool
============

This Repo is Node js Application for vouchers

    
## Installation   

Note : make sure you have npm and docker on your machine

clone this application from git@github.com:m-abdou/voucher.git

cd to voucher directory 

we have two phases of installation

 - setup environment by using docker
    * run : npm run docker  
 - import data by command
    * run : npm run voucher generate

 now we need start our server  
  - run : npm run server
  
 you can access this server by using this url 
  - http://localhost:9090/

  
 ## Documentation
 
  * after we import our data we have 2 user emails 
 ['test@gmail.com', 'test1@gmail.com']
 
  * you can check data in .data.json
 
 
  * we provide two end point
 
     get all available voucher belong to user by email 
     - Post /api/voucher/fetch
        * input : { "email"; "test@gmail.com" }
        * output : [{"voucher": "233eweer" , "offer":"offer Name"}]
    
     redeem voucher     
     - Post /api/voucher/redeem
        * input : { "email"; "test@gmail.com", "voucher": "233eweer" }
        * output: { discount: 10 }
    
     we use voucher once and have expiration date 
 
  * test cases   
    run : npm run test
 

## Brif 

 This application based on
 *  node js 
 *  mongo db 
 *  express  