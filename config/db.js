// Do not expose your credentials in your code.//HlroQ0HGGTDrOQN9
//cluster name:comp229-003m2022midterm
//mongodb+srv://appUser:HlroQ0HGGTDrOQN9@comp229-003m2022midterm.13l1yjz.mongodb.net/test
//let atlasDB = "mongodb+srv://<username>:<passoword>@<cluster>/carstore?retryWrites=true&w=majority";

 let   atlasDB = "mongodb+srv://appuser:1HQDHJGvwsFNTWPe@cluster003-m2022.vwekihi.mongodb.net/cars?retryWrites=true&w=majority";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}