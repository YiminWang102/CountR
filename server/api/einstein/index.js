const router = require('express').Router();


router.get('/', (req, res, next) => {
  console.log('hitting api/einstein/');
});

module.exports = router;
