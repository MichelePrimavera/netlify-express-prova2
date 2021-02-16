const Item = require('../models/item')
const mongoConnect = require('../util/database').mongoConnect;

exports.getHomepage = async (req, res) => {
  mongoConnect(() => {
    Item.getAllItems()
      .then((result) => {
        res.send({items: result})
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send({error: err});
      });
  });

}

exports.updateItem = async (req, res) => {
  mongoConnect(() => {
    const {
      idItem,
      newValue,
    } = req.body;

    if(idItem && newValue) {

    } else {
      res.statusCode = 400;
      res.send({error: "Bad request. You must send an idItem and a newValue"});
    }
  });
}

exports.updateItems = async (req, res) => {
  mongoConnect(() => {
    const items = req.body;
    let errors = [];

    if(JSON.stringify(items) !== JSON.stringify({})) {

      try {
        Object.keys(items).map(async (key) => {
          await Item.updateItem(key, items[key])
        })
      } catch (e) {
        errors.push(e)
      }

      if(errors.length === 0) {
        res.statusCode = 200;
        res.send({message: 'Modifica effettuata con successo'})
      } else {
        res.statusCode = 500;
        res.send({error: 'Problema col database. Riprova.'});
      }
    } else {
      res.statusCode = 500;
      console.log('errore items')
      res.send({error: "Non hai modificato nulla. Modifica qualcosa e poi reinvia"})
    }
  });
}
