const express = require("express");
const Record = require('../models/data-object');

const router = express.Router();

router.post('',(req,res,next) => {
  const record = new Record({
    name: req.body.name,
    gender: req.body.gender,
    phone: req.body.phone
  });
  record.save().then(createdRecord => {
    res.status(201).json({ //everything is ok and new resources where created.
      message: 'Record added successfully',
      postId: createdRecord._id
      });
  });
});

router.get('',(req,res,next) => {
  Record.find()
    .then(documents => {
      res.status(200).json({ //everything is ok.
        message: 'Details fetched successfully!',
        details: documents
      });
    });
  });

module.exports = router;
