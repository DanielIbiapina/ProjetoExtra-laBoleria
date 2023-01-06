import { connectionDB } from "../database/db.js"

export async function postOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body
    await connectionDB.query('INSERT INTO orders ("clientId", "cakeId", "quantity", "totalPrice") VALUES ($1, $2, $3, $4);', [clientId, cakeId, quantity, totalPrice])
}

export async function getOrders(req, res) {
    try {
        const ordersArray = []
        let objeto;
        const orders = await connectionDB.query('SELECT clients.*, cakes.*, clients.id AS "clientId", clients.name AS "clientName", cakes.*, orders.id AS "orderId", orders."createdAt", orders.quantity, orders."totalPrice" FROM orders JOIN clients ON orders."clientId" = clients.id JOIN cakes ON orders."cakeId" = cakes.id;')
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
        res.send(ordersArray)


        
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getOrdersById(req, res) {
    const {id} = req.params
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