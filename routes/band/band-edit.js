const express = require('express');
const router = express.Router();
const Band = require("../../models/Band");


router.get('/edit-band/:id', (req, res, next) => {
    Band.findById(req.params.id)
    .then((band)=>{
    res.render('band/edit-band',{bandHbs: band})
    })
});

router.post('/edit-band/:id', (req, res, next) =>{
    function getGenres(){
        let arr = [];
        for (const key in req.body) {
            if(req.body[key]=== "on") arr.push(key)
        }
            return arr;
        }
        let genresArr = getGenres();
    Band.findByIdAndUpdate(req.params.id, {
        genres: genresArr,
        info: req.body.info,
    })
    .then((band)=>{
        res.redirect(`/band-profile/${band._id}`)
    })
})



module.exports = router;