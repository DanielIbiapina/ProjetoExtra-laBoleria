import { connectionDB } from "../database/db.js"

export async function postCake (req, res){
    const {name, price, image, description} = req.body

    const nameExiste = await connectionDB.query(
        "SELECT name FROM cakes WHERE name=$1;",
        [name]
      );
      console.log(nameExiste.rowCount)
      if(nameExiste.rowCount > 0){
        res.status(409).send("Esse bolo já existe!")
        return
      }
      
    await connectionDB.query('INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4);', [name, price, image, description])
    res.sendStatus(201)
}