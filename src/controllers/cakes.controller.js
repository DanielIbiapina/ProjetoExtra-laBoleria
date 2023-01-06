import { connectionDB } from "../database/db.js"

export async function postCake (req, res){
    const {name, price, image, description} = req.body
    await connectionDB.query('INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4);', [name, price, image, description])
}