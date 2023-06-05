const express = require("express");

const { ticketController } = require("../controllers/ticketController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router
.post("/create", isAuthenticated, ticketController.createTicket)
.get("/all", isAuthenticated, ticketController.getTickets);

exports.ticketRoutes = router;
