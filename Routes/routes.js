const route = require("express").Router();
const Rooms = require("../Models/Rooms");
const Bookings = require("../Models/Bookings");


route.post("/rooms", async (req, res) => {
  const { name, seats, amenities, pricePerHour } = req.body;
  const room = new Rooms({
    name,
    seats,
    amenities,
    pricePerHour,
    bookings: [],
  });
  await room.save();
  res.status(201).json(room);
});

route.post("/bookings", async (req, res) => {
  const { customerName, date, startTime, endTime, roomId, status } = req.body;

  const room = await Rooms.findById(roomId);
  if (!room) {
    return res.status(400).json({ error: "Room Not Found" });
  }
  const booking = new Bookings({
    customerName,
    date,
    startTime,
    endTime,
    room: room._id,
    status: "confirmed",
  });

  await booking.save();
  room.bookings.push(booking);
  await room.save();
  res.status(201).json(booking);
});

route.get("/rooms", async (req, res) => {
  const rooms = await Rooms.find().populate("bookings");
  res.json(rooms);
});

route.get("/customers", async (req, res) => {
  const bookings = await Bookings.find().populate("room");
  const customers = {};
  bookings.forEach((booking) => {
    if (!customers[booking.customerName]) {
      customers[booking.customerName] = [];
    }
    customers[booking.customerName].push(booking);
  });
  res.json(customers);
});

route.get("/bookings/:customerName", async (req, res) => {
  const customerName = req.params.customerName;

  const bookings = await Bookings.find({ customerName })
    .populate("room", "name")
    .sort({ date: -1 })
    .exec();

  const groupedBookings = bookings.reduce((acc, booking) => {
    const key = booking._id.toString();
    if (!acc[key]) {
      acc[key] = {
        customerName: booking.customerName,
        roomName: booking.room.name,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking._id,
        bookingDate: booking.createdAt,
        bookingStatus: booking.status,
        count: 1,
      };
    } else {
      acc[key].count++;
    }
    return acc;
  }, {});

  const result = Object.values(groupedBookings).sort(
    (a, b) => b.bookingDate - a.bookingDate
  );

  res.json(result);
});


module.exports = route;