const Hospital = require('./../models/hospitalModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllHospitals = catchAsync(
    async (req, res, next) => {
        // EXECUTE QUERY
        const features = new APIFeatures(Hospital.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const hospital = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: hospital.length,
            data: {
                hospital
            }
        });
    }
);

exports.getHospitalById = catchAsync(async (req, res, next) => {
        const hospital = await Hospital.findById(req.params.id);

        if (!hospital) {
            return next(new AppError('No hospital found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                hospital
            }
        });
    }
);

exports.getHospitalByCity = catchAsync(async (req, res, next) => {

        const hospitals = await Hospital.find({city: req.params.city});

        if (!hospitals) {
            return next(new AppError('No hospital found with that city name', 404));
        }

        res.status(200).json({
            status: 'success',
            results: hospitals.length,
            data: {
                hospitals
            }
        });
    }
);

exports.getHospitalByState = catchAsync(async (req, res, next) => {

        const hospitals = await Hospital.find({state: req.params.state});

        if (!hospitals) {
            return next(new AppError('No hospital found with that state name', 404));
        }

        res.status(200).json({
            status: 'success',
            results: hospitals.length,
            data: {
                hospitals
            }
        });
    }
);

exports.getHospitalByCounty = catchAsync(async (req, res, next) => {

        const hospitals = await Hospital.find({county_name: req.params.county});

        if (!hospitals) {
            return next(new AppError('No hospital found with that county name', 404));
        }

        res.status(200).json({
            status: 'success',
            results: hospitals.length,
            data: {
                hospitals
            }
        });
    }
);

exports.getHospitalByCityState = catchAsync(async (req, res, next) => {

        const hospitals = await Hospital.find({city: req.params.city, state: req.params.state});

        if (!hospitals) {
            return next(new AppError('No hospital found with that city and state', 404));
        }

        res.status(200).json({
            status: 'success',
            results: hospitals.length,
            data: {
                hospitals
            }
        });
    }
);

exports.getHospitalByName = catchAsync(async (req, res, next) => {

        const hospitals = await Hospital.find({hospital_name: req.params.name});

        if (!hospitals) {
            return next(new AppError('No hospital found with that hospital name', 404));
        }

        res.status(200).json({
            status: 'success',
            results: hospitals.length,
            data: {
                hospitals
            }
        });
    }
);

exports.getLatlon = catchAsync(
    async (req, res, next) => {
        const hospitals = await Hospital.find({
            location_points:
                { $near:
                    {
                        $geometry: { type: "Point",  coordinates: [ req.params.longitude, req.params.latitude] },
                        $maxDistance: req.params.distance * 1609.34
                    }
                }
        });

        if (!hospitals) {
            return next(new AppError('No hospital found within this radius', 404));
        }

        res.status(200).json({
            status: 'success',
            results: hospitals.length,
            data: {
                hospitals
            }
        });
    }
);

exports.createHospital = catchAsync(async (req, res, next) => {
    const newHospital = await Hospital.create(req.body);
    res.status(201).json({
       status: 'success',
       data: {
           hospital: newHospital
       }
    });
});

exports.deleteHospital = catchAsync(async (req, res, next) => {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);

    if (!hospital) {
        return next(new AppError('No hospital found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: {
            hospital: null
        }
    });
});

exports.updateHospital = catchAsync(async (req, res, next) => {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!hospital) {
        return next(new AppError('No hospital found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            hospital
        }
    });
})