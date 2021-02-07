const express = require('express');
const thingsControllers = require('../controllers/things');

const router = express.Router();

router.get('/things', (req, res) => {
  thingsControllers.getThings()
    .then((things) => res.json(things))
    .catch(() => {
      res.status(500);
      res.end('Something went wrong');
    });
});

router.get('/things/:id', (req, res) => {
  thingsControllers.getThing(Number(req.params.id))
    .then((thing) => {
      if (thing) {
        res.json(thing);
      } else {
        res.status(404);
        res.end('Not Found');
      }
    })
    .catch(() => {
      res.status(500);
      res.end('Something went wrong');
    });
});

router.post('/things', (req, res) => {
  thingsControllers.saveThing(req.body)
    .then(() => res.end('Saved!'))
    .catch(() => {
      res.status(500);
      res.end('Something went wrong');
    });
});

router.delete('/things/:id', (req, res) => {
  thingsControllers.deleteThing(Number(req.params.id))
    .then((thing) => {
      if (thing) {
        res.end('Deleted!');
      } else {
        res.status(404);
        res.end('Not Found');
      }
    })
    .catch(() => {
      res.status(500);
      res.end('Something went wrong');
    });
});

router.put('/things/:id', (req, res) => {
  thingsControllers.updateThing(Number(req.params.id), req.body)
    .then(() => res.end('Updated!'))
    .catch(() => {
      res.status(500);
      res.end('Something went wrong');
    });
});

module.exports = router;
