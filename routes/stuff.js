const express = require('express');
const Thing = require("../models/Thing");

const stuffCtrl = require("../controllers/stuff");

const router = express.Router();

router.post('/', stuffCtrl.creatThing);
router.get('/' + '', stuffCtrl.getAllThings);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);


module.exports = router;
