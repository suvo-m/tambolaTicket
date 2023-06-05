const model = require("../models/ticketModel");
const catchAsyncError = require("../middleware/asyncError");
const ApiFeature = require("../utils/apiFeature");

const Ticket = model.ticketModel;


const generateTicket = (numTickets) => {
  const tickets = [];

  for (let i = 0; i < numTickets; i++) {
    const ticket = [];
    const columns = [[], [], [], [], [], [], [], [], []];
     for (let col = 0; col < 9; col++) {
      const column = columns[col];
       for (let j = 0; j < 5; j++) {
        let number;
        do {
          number = getRandomNumber(col);
        } while (column.includes(number));

        column.push(number);
      }

      
      column.sort((a, b) => a - b);
    }

    
    for (let row = 0; row < 3; row++) {
      const ticketRow = [];

      for (let col = 0; col < 9; col++) {
        const column = columns[col];
        const number = column.shift() || "x"; // Fill empty cell with "x"
        ticketRow.push(number);
      }
      ticket.push(ticketRow);
    }
    tickets.push(ticket);
  }
  return tickets;
};



function getRandomNumber(col) {
  const start = col * 10 + 1;
  const end = start + 9;
  const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);//defining range
  const index = Math.floor(Math.random() * range.length);// getting random item from range
  return range.splice(index, 1)[0];
}



const createTicket = catchAsyncError(async (req, res, next) => {
  const { tickets } = req.body;
  const id = req.user._id;
  const ticketsArr = generateTicket(tickets);
  const ticket = await Ticket.create({
    tickets: ticketsArr,
    user: id,
  });
  res.status(200).json({
    success: true,
    ticket: ticketsArr,
    ticket: ticket,
    message: "tickets created",
  });
});



const getTickets = async (req, res) => {
  const { id } = req.user;
  const pageSize = 1;
  const apiFeature = new ApiFeature(Ticket.find({ user: id }), req.query);
  const ticket = await apiFeature.pagination(pageSize).query.clone();
  res.status(200).json({success: true,tickets: ticket});
};



exports.ticketController = {
  createTicket,
  getTickets,
};


