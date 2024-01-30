import express from "express";
import cors from "cors";
import cakesRoutes from "./routes/cakes.routes.js";
import clientsRoutes from "./routes/clients.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import participantsRoutes from "./routes/participants.routes.js";
import { checkAndUpdateStatus } from "./controllers/participants.controller.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cakesRoutes);
app.use(clientsRoutes);
app.use(ordersRoutes);
app.use(participantsRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));

const statusUpdateInterval = 3 * 1000; // 3 segundos em milissegundos
setInterval(() => {
  checkAndUpdateStatus();
}, statusUpdateInterval);
