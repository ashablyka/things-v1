const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const pathToThings = path.join(__dirname, '../data/things.json');

function getThings() {
  return readFile(pathToThings)
    .then(JSON.parse);
}

function getThing(id) {
  return getThings()
    .then((things) => things.find((thing) => thing.id === id));
}

function saveThings(things) {
  return writeFile(pathToThings, JSON.stringify(things, null, 2));
}

function saveThing(thing) {
  return getThings()
    .then((things) => {
      const id = things[things.length - 1].id + 1;
      const thingWithId = { ...thing, id };

      return saveThings(things.concat(thingWithId));
    });
}

function deleteThing(id) {
  return getThings()
    .then((things) => {
      const thingsAfterDelete = things.filter((thing) => thing.id !== id);

      return saveThings(thingsAfterDelete);
    });
}

function updateThing(id, updates) {
  return getThings()
    .then((things) => {
      const thingToUpdate = things.find((thing) => thing.id === id);

      Object.assign(thingToUpdate, updates);

      return saveThings(things);
    });
}

module.exports = {
  getThings,
  getThing,
  saveThings,
  saveThing,
  deleteThing,
  updateThing,
};
