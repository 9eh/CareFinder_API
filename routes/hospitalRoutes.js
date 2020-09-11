const express = require('express');
const hospitalController = require('./../controllers/hospitalController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
    .route('/')
    .get(authController.protect, hospitalController.getAllHospitals)
    .post(authController.protect, hospitalController.createHospital)

// DONE
router
    .route('/id/:id')
    .get(authController.protect, hospitalController.getHospitalById)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        hospitalController.updateHospital)
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        hospitalController.deleteHospital);

router
    .route('/city/:city')
    .get(authController.protect, hospitalController.getHospitalByCity);


router
    .route('/state/:state')
    .get(authController.protect, hospitalController.getHospitalByState);

router
    .route('/county/:county')
    .get(authController.protect, hospitalController.getHospitalByCounty);

router
    .route('/citystate/:city/:state')
    .get(authController.protect, hospitalController.getHospitalByCityState);

router
    .route('/name/:name')
    .get(authController.protect, hospitalController.getHospitalByName);

router.route('/latlon/:latitude/:longitude/:distance')
    .get(authController.protect, hospitalController.getLatlon);

module.exports = router;