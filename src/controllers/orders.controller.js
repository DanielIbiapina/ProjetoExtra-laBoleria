import { connectionDB } from "../database/db.js"

export async function postOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body

    const clientIdExiste = await connectionDB.query(
        'SELECT id FROM clients WHERE id=$1;',
        [clientId]
      );
      console.log(clientIdExiste.rowCount)
      if(clientIdExiste.rowCount === 0){
        res.status(404).send("Esse cliente não existe!")
        return
      }

      const cakeIdExiste = await connectionDB.query(
        'SELECT id FROM cakes WHERE id=$1;',
        [cakeId]
      );
      console.log(cakeIdExiste.rowCount)
      if(cakeIdExiste.rowCount === 0){
        res.status(404).send("Esse bolo não existe!")
        return
      }

    await connectionDB.query('INSERT INTO orders ("clientId", "cakeId", "quantity", "totalPrice") VALUES ($1, $2, $3, $4);', [clientId, cakeId, quantity, totalPrice])
    res.sendStatus(201)
}

export async function getOrders(req, res) {
    const {date} = req.query
    
    try {
        const ordersArray = []
        let objeto;
        let orders;
        if(date){
        
         orders = await connectionDB.query(`SELECT clients.*, cakes.*, clients.id AS "clientId", clients.name AS "clientName", cakes.*, orders.id AS "orderId", orders."createdAt", orders.quantity, orders."totalPrice" FROM orders JOIN clients ON orders."clientId" = clients.id JOIN cakes ON orders."cakeId" = cakes.id WHERE orders."createdAt"::date = $1;`, [date])
        } else{
         orders = await connectionDB.query('SELECT clients.*, cakes.*, clients.id AS "clientId", clients.name AS "clientName", cakes.*, orders.id AS "orderId", orders."createdAt", orders.quantity, orders."totalPrice" FROM orders JOIN clients ON orders."clientId" = clients.id JOIN cakes ON orders."cakeId" = cakes.id;')
        }
        for (let count = 0; count <orders.rowCount; count++){
             objeto = {
                client: {
                    id: orders.rows[count].clientId,
                    name: orders.rows[count].clientName,
                    address: orders.rows[count].address,
                    phone: orders.rows[count].phone
                },
                cake: {
                    id: orders.rows[count].id,
                    name: orders.rows[count].name,
                    price: orders.rows[count].price,
                    description: orders.rows[count].description,
                    image: orders.rows[count].image
                },
                orderId: orders.rows[count].orderId,
                createdAt: orders.rows[count].createdAt,
                quantity: orders.rows[count].quantity,
                totalPrice: orders.rows[count].totalPrice
            }
            ordersArray.push(objeto)
        }
        if(ordersArray.length == 0){
            res.send(ordersArray).status(404)
            return
        }
        res.send(ordersArray)


        
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getOrdersById(req, res) {
    const {id} = req.params

    const orderIdExiste = await connectionDB.query(
        'SELECT id FROM orders WHERE id=$1;',
        [id]
      );
      console.log(orderIdExiste.rowCount)
      if(orderIdExiste.rowCount === 0){
        res.status(404).send("Esse pedido não existe!")
        return
      }

    try {
        const ordersArray = []
        let objeto;
        const orders = await connectionDB.query('SELECT clients.*, cakes.*, clients.id AS "clientId", clients.name AS "clientName", cakes.*, orders.id AS "orderId", orders."createdAt", orders.quantity, orders."totalPrice" FROM orders JOIN clients ON orders."clientId" = clients.id JOIN cakes ON orders."cakeId" = cakes.id WHERE orders.id = $1;', [id])
        for (let count = 0; count <orders.rowCount; count++){
             objeto = {
                client: {
                    id: orders.rows[count].clientId,
                    name: orders.rows[count].clientName,
                    address: orders.rows[count].address,
                    phone: orders.rows[count].phone
                },
                cake: {
                    id: orders.rows[count].id,
                    name: orders.rows[count].name,
                    price: orders.rows[count].price,
                    description: orders.rows[count].description,
                    image: orders.rows[count].image
                },
                orderId: orders.rows[count].orderId,
                createdAt: orders.rows[count].createdAt,
                quantity: orders.rows[count].quantity,
                totalPrice: orders.rows[count].totalPrice
            }
            ordersArray.push(objeto)
        }
        res.send(ordersArray[0])


        
    } catch (err) {
        res.status(500).send(err.message);
    }
}