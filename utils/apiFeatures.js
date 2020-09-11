class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // Ex, used case: http://localhost:3000/api/v1/tours?duration[lte]=5
    filter() {
        // BUILD QUERY
        // 1A) Filtering
        const queryObj = {...this.queryString};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // QUERY before return doc
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    // Ex, used case: http://localhost:3000/api/v1/tours?duration[lte]=5&sort=ratingsAverage
    // or with (-) for descending order
    // http://localhost:3000/api/v1/tours?duration[lte]=5&sort=-ratingsAverage,-ratingsQuantity
    sort(){
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    // Ex, used case: http://localhost:3000/api/v1/tours?fields=name,price
    // or with (-) to exclude the fields
    // http://localhost:3000/api/v1/tours?fields=-name,-price
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    // Ex, used case: http://localhost:3000/api/v1/tours?page=1&limit=5
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;