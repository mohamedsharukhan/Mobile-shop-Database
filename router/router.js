const express = require('express');
const router= express.Router();
const uploadFileMiddleware= require('../multer/multer')
 
const mobileShop = require('../controler/controler');

router.get('/getCategory',mobileShop.getCategory);
                                                                                    
router.get('/getbrands',mobileShop.getBrands);

router.get('/getlist',mobileShop.getList);

router.get('/getdetails',mobileShop.getDetails);

router.post('/postdetails',uploadFileMiddleware,mobileShop.postDetails);

router.post('/postSinginDetails',mobileShop.postSinginDetails);

router.post('/postSingupDetails',mobileShop.postSingupDetails);

router.get('/getSingupDetails',mobileShop.getSingupDetails);

router.post('/postOrderDetails',mobileShop.postOrderDetails);

router.get('/getOrderDetails',mobileShop.getOrderDetails);




module.exports=router;