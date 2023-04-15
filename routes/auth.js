const router = require('express').Router();
const authController = require('../controllers/authController');
// const auth = require('../middlewares/auth');

router.post('/sendOTP', authController.sendOtp);
router.post('/verifyOTP', authController.verifyOtp);
router.post('/editUserProfile',authController.authPass,authController.editUserProfile);
router.get('/getProfile',authController.authPass,authController.getProfile);

module.exports = router