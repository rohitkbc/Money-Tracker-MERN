import Expense from "./Components/Expense";
import Income from "./Components/Income";
import NavBar from "./Components/NavBar";
import TotalBalance from "./Components/TotalBalance";
import TransactionTable from "./Components/TransactionTable";
import IncomeGraph from "./Components/IncomeGraph";
import ExpenseGraph from "./Components/ExpenseGraph";
import TransactionCard from "./Components/AddTransactionCard";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  var [transaction, setTransaction] = useState([]);

  useEffect(() => {
    init()
  },[])

  var init = () => {
    axios.get("http://localhost:8000/getAll")
    .then(res => {
      console.log(res.data);
      setTransaction(res.data);
    })
    .catch(err => console.log(err))
  }

  var add = (obj) => {
    axios.post("http://localhost:8000/add",obj)
    .then(res => {
      console.log(res.data);
      init()
    })
    .catch(err => console.log(err))
  }

  var remove = (index) => {
    axios.delete("http://localhost:8000/delete",{
      data: {id: index}
    })
    .then(res => {
      console.log(res.data);
      init()
    })
    .catch(err => console.log(err))
  }

  var saveTransaction = function (item) {
    add(item)
  };

  var removeTrans = function (index) {
    remove(index)
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 mt-4">
            <Income data={transaction} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 mt-4">
            <Expense data={transaction} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 mt-4">
            <TotalBalance data={transaction} />
          </div>
        </div>

        <div className="row flex">
          <div className="col-lg-4 mt-4">
            <TransactionTable data={transaction} remove={removeTrans} />
            <TransactionCard save={saveTransaction} />
          </div>
          <div className="col-lg-4 col-md-6 mt-4">
            <IncomeGraph data={transaction} />
          </div>
          <div className="col-lg-4 col-md-6 mt-4">
            <ExpenseGraph data={transaction} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
