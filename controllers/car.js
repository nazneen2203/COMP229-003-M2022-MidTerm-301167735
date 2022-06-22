// create a reference to the model
let Cars = require('../models/car');
// GET users listing. 
module.exports.list = function (req, res, next) {
    Cars.find((err, carsList) => {
        
        if (err) {
            return console.error(err);
        }
        else {
            res.render('cars/list', { title: 'Cars List', CarsList: carsList, userName: req.user ? req.user.username : '' })
        }
    })
}

// Gets a book by id and renders the details page
module.exports.details = (req, res, next) => {

    let id = req.params.id;

    Cars.findById(id, (err, carsToShow) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('cars/details', {
                title: 'Cars Details',
                cars: carsToShow
            })
        }
    });
}


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Cars.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            // console.log(itemToEdit);
            res.render('cars/add_edit', {
                title: 'Edit Item', 
                item: itemToEdit,
                userName: req.user ? req.user.username : ''
            })
        }
    });

}


module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    // console.log(req.body);

    let updatedItem = Cars({
        _id: req.body.id,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        kilometers: req.body.kilometers,
        doors: req.body.doors,
        seats: req.body.seats,
        color: req.body.color,
        price: req.body.price

    });

    // console.log(updatedItem);

    Cars.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            
            res.redirect('/cars/list');
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    let newItem = Cars();

    res.render('cars/add_edit', {
        title: 'Add a new Item',
        item: newItem,
        userName: req.user ? req.user.username : ''
        
    })          
}

module.exports.processAddPage = (req, res, next) => {
    
    let newItem = Cars({
        _id: req.body.id,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        kilometers: req.body.kilometers,
        doors: req.body.doors,
        seats: req.body.seats,
        color: req.body.color,
        price: req.body.price
    });

    Cars.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(item);
            res.redirect('/cars/list');
        }
    });

}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Cars.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/cars/list');
        }
    });
}


           