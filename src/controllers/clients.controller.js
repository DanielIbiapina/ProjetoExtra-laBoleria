import { connectionDB } from "../database/db.js"

export async function postClient (req, res){
    const {name, address, phone} = req.body
    await connectionDB.query('INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);', [name, address, phone])
}
export async function getClientOrders (req, res){
    const {id} = req.params
    const clientOrders = await connectionDB.query('SELECT * FROM orders WHERE orders."clientId"  = $1;', [id])
    res.send(clientOrders.rows)
}