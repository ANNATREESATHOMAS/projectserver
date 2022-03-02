const mongoose = require('mongoose')


// connection string
mongoose.connect('mongodb://localhost:27017/ProjectServerDB', {
    useNewUrlParser: true
})

// model creation
const User = mongoose.model('User', {
    admin:String,
    password:Number,
    user:[],
    product: []
})

// export model
module.exports = {
    User
}