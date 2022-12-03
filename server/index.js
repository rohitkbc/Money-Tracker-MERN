const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 8000;
require("./database"); // connecting to database
const tranModel = require("./tran-model");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // To log request and response data

var transactions = [
  
{id: '100', type: 'Income', date: '2022-12-17', amount: '15000', cat: 'Salary'},

{id: '101', type: 'Expense', date: '2022-12-12', amount: '5000', cat: 'Rent'},

{id: '102', type: 'Income', date: '2022-12-10', amount: '5000', cat: 'Gift'},

{id: '103', type: 'Expense', date: '2022-12-07', amount: '1500', cat: 'Food'},

{id: '105', type: 'Expense', date: '2022-12-15', amount: '3000', cat: 'Cloths'},

{id: '106', type: 'Income', date: '2022-12-01', amount: '1750', cat: 'Business'},

{id: '107', type: 'Expense', date: '2022-12-05', amount: '3000', cat: 'Grocery'},

];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getAll", (req, res) => {
  // res.send(transactions);
  tranModel.find((err, trans) => (err ? res.status(404).json(err) : res.json(trans)));
});

app.post("/add", (req, res) => {
  // transactions.push(req.body);
  // res.send({ message: "Added Successfully" });

  tranModel
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(404).json({success: false, error: err}));

});

app.delete("/delete", (req, res) => {
  // transactions = transactions.filter(
  //   (transaction) => transaction.id !== req.body.id
  // );
  // res.send({ message: "Deleted Successfully" });

  tranModel.findOneAndRemove({id: req.body.id}, (err, item) => {
    if (err) {
      return res.json({ success: false, msg: "Cannot Remove Item" });
    }
    if (!item) {
      return res.status(404).json({ success: false, msg: "Quote Not Found" });
    }
    res.json({ success: true, msg: "Transaction Removed." });
  })
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
