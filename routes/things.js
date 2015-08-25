var express = require("express");
var router = express.Router();
var Thing = require("../models/things");
var jwt = require("jwt-simple");

router.get("/", function(req, res){
   Thing.find({}).then(function(things){
       res.send(things);
   }); 
});

router.get("/:id", function(req, res){
   Thing.findById(req.params.id).then(function(thing){
       res.send(thing);
   }); 
});

router.post("/", function(req, res){
   var thing = new Thing(req.body);
   thing.save(function(err, _thing){
      if(err){
         res.status(422); 
         res.send(err);
      }
      else
         res.send(thing);
   });
});

function checkAuthentication(req, res, next){
   try{
      jwt.decode(req.query.token, process.env.SECRET || 'foo');
      next();
   }
   catch(ex){
      res.status(401).send("not authorized");
   }
}
router.post("/:id/delete", checkAuthentication, function(req, res){

   Thing.remove({_id: req.params.id}, function(err){
      if(err){
         res.status(422);
         res.send(err);
      }
      else
         res.send({});
   });
});

module.exports = router;