const router = require('express').Router();

const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://root:root@localhost5432/nodedb");

router.post('/', (req, res, next) => {
    console.log(req.payload);
});

db.connect().then();

module.exports = router;
