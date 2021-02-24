// Router component import statement 
const { Router } = require('express');

// Middleware import
const authorize = require("./middlewares/auth");

// Controllers import
const pangolinController = require('./controllers/pangolinController');

// Add Router methods to router constant
const router = Router();

router.post('/login', pangolinController.login);
router.post('/register', pangolinController.signup);
router.get('/', authorize, pangolinController.allPangolins);
router.get('/pangolins/:id', pangolinController.onePangolin);
router.get('/my-account', pangolinController.myAccount);
router.put('/my-account/update/:id', authorize, pangolinController.updatePangolin);
router.put('/update/friend', authorize, pangolinController.updateFriends);
router.put('/delete/friend', authorize, pangolinController.deleteFriends);
router.get('/logout', pangolinController.logout);


// router module export
module.exports = router;