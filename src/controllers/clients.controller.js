import { connectionDB } from "../database/db.js"

export async function postClient (req, res){
    const {name, address, phone} = req.body
    await connectionDB.query('INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);', [name, address, phone])
    res.sendStatus(201)
}
export async function getClientOrders (req, res){
    const {id} = req.params

    const clientIdExiste = await connectionDB.query(
        'SELECT id FROM clients WHERE id=$1;',
        [id]
      );
      console.log(clientIdExiste.rowCount)
      if(clientIdExiste.rowCount === 0){
        res.status(404).send("Esse cliente não existe!")
        return
      }

      const clientOrders = await connectionDB.query('SELECT orders.id AS "orderId", orders.quantity, orders."createdAt", orders."totalPrice", cakes.name AS "cakeName" FROM orders JOIN clients ON orders."clientId" = clients.id JOIN cakes ON orders."cakeId" = cakes.id WHERE orders."clientId"  = $1;', [id])
    //const clientOrders = await connectionDB.query('SELECT * FROM orders WHERE orders."clientId"  = $1;', [id])
    res.send(clientOrders.rows)
}