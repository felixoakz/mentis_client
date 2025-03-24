import { useEffect, useState, useRef } from "react"
import CurrencyInput from "react-currency-input-field"
import Big from "big.js"
import { toast } from "react-toastify"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { MdOutlineAddCircleOutline } from "react-icons/md"
import { IoMdArrowBack } from "react-icons/io";
import { GrPrevious, GrNext } from "react-icons/gr";
import { PiExclamationMarkBold } from "react-icons/pi";

import { createTransaction, deleteTransaction, editTransaction, listTransactions } from "@/api/transactions"
import { formatCurrency, formatDate, responseErrors } from "@/utils/helpers"
import BaseModal from "@/components/BaseModal"
import Layout from "@/components/Layout"


const FinancesScreen = () => {
  const { accountId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const accountName = location.state?.accountName || "Account"
  const accountBalance = location.state?.balance || 0

  const [transactions, setTransactions] = useState([])
  const [amount, setAmount] = useState("")
  const [isExpense, setIsExpense] = useState(true);
  const [description, setDescription] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [editingTransactionModal, setEditingTransactionModal] = useState(false)
  const [confirmingTransactionDelete, setConfirmingTransactionDelete] = useState(false)
  const [balance, setBalance] = useState(accountBalance)
  const currentDateRef = useRef({ monthInt: 0, monthName: '', year: 0 })


  useEffect(() => {
    if (accountId) {
      createMonthObject()
      getTransactions(accountId, currentDateRef.current)

    } else {
      toast.warn("No account selected. Redirecting to home.")
      navigate("/", { replace: true })
    }
  }, [accountId, navigate])


  const createMonthObject = () => {
    const currentDate = new Date();

    const monthObject = {
      monthInt: currentDate.getMonth() + 1,
      monthName: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate),
      year: currentDate.getFullYear()
    };

    currentDateRef.current = monthObject
  }

  const handleMonthChange = (direction) => {
    let newMonthInt = currentDateRef.current.monthInt + (direction === "next" ? 1 : -1);
    let newYear = currentDateRef.current.year;

    if (newMonthInt > 12) {
      newMonthInt = 1;
      newYear += 1;
    } else if (newMonthInt < 1) {
      newMonthInt = 12;
      newYear -= 1;
    }

    const newMonth = {
      monthInt: newMonthInt,
      monthName: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(newYear, newMonthInt - 1)),
      year: newYear,
    };

    currentDateRef.current = newMonth;

    getTransactions(accountId, currentDateRef.current);
  };

  const getTransactions = async (accountId, currentDate) => {
    try {
      const res = await listTransactions(accountId, currentDate);
      setTransactions(res.data.transactions);
    } catch (error) {
      responseErrors(error);
      toast.error("Could not load account transactions.");
      navigate("/", { replace: true });
    }
  };

  const handleAddTransaction = async (event) => {
    event.preventDefault()

    const transactionData = {
      account_id: accountId,
      amount: Number(new Big(amount.replace(",", ".")).times(100).toFixed(0)) * (isExpense ? -1 : 1),
      description,
    };

    try {
      const res = await createTransaction(transactionData)
      setBalance(res.data.newBalance.balance)
      getTransactions(accountId, currentDateRef.current)

      resetForm()
      document.getElementById("transaction_modal").close()

    } catch (error) {
      responseErrors(error)
    }
  }

  const handleEditTransaction = async (event) => {
    event.preventDefault()


    const transactionData = {
      amount: Number(new Big(amount.replace(",", ".")).times(100).toFixed(0)) * (isExpense ? -1 : 1),
      description,
    };

    try {
      const res = await editTransaction(selectedTransaction.id, transactionData)
      setBalance(res.data.newBalance.balance)
      getTransactions(accountId, currentDateRef.current)
      resetForm()
      document.getElementById("transaction_modal").close()

    } catch (error) {
      responseErrors(error)
    }
  }

  const handleDeleteTransaction = async (event) => {
    event.preventDefault()

    try {
      const res = await deleteTransaction(selectedTransaction.id)
      setBalance(res.data.newBalance.balance)
      getTransactions(accountId, currentDateRef.current)
      resetForm()
      document.getElementById("transaction_modal").close()

    } catch (error) {
      responseErrors(error)
    }
  }

  const resetForm = () => {
    setAmount("")
    setDescription("")
    setSelectedTransaction(null)
    setEditingTransactionModal(false)
    setConfirmingTransactionDelete(false)
  }

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction)
    setEditingTransactionModal(true)
    setAmount(
      Big(transaction.amount / 100)
        .toFixed(2)
        .replace(".", ","),
    )
    setDescription(transaction.description)
    document.getElementById("transaction_modal").showModal()
  }

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const day = formatDate(transaction.created_at)
    if (!acc[day]) acc[day] = []
    acc[day].push(transaction)
    return acc
  }, {})

  return (
    <Layout>
      <div className="flex flex-col w-full h-full p-4 bg-base-100 text-base-content max-w-3xl mx-auto">

        {/* Account Header */}
        <div className="flex justify-between items-center mb-4">

          <button
            className="text-5xl text-secondary"
            onClick={() => navigate("/")}
          >
            <IoMdArrowBack />
          </button>

          <div className="flex flex-col items-end">
            <label className="text-md font-medium text-neutral-500">Balance</label>
            <div className="font-semibold text-primary text-4xl">{formatCurrency(balance)}</div>
          </div>

        </div>

        <h1 className="text-4xl text-center text-accent font-bold">
          {accountName}
        </h1>

        <div className="flex justify-center m-4">
          <button
            className="text-3xl text-primary"
            onClick={() => handleMonthChange("previous")}
          >
            <GrPrevious />
          </button>

          <span className="mx-4 text-2xl text-accent w-32 text-center">
            {currentDateRef.current.monthName}
          </span>

          <button
            className={`text-3xl text-primary ${currentDateRef.current.monthInt === new Date().getMonth() + 1 && currentDateRef.current.year === new Date().getFullYear() ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleMonthChange("next")}
            disabled={currentDateRef.current.monthInt === new Date().getMonth() + 1 && currentDateRef.current.year === new Date().getFullYear()}
          >
            <GrNext />
          </button>
        </div>

        {/* Transactions */}
        <div className="flex-grow overflow-y-auto">

          {Object.keys(groupedTransactions).length > 0 ?
            (
              Object.entries(groupedTransactions)
                .reverse()
                .map(([day, transactions]) => (

                  <div key={day} className="space-y-2">
                    <h2 className="text-lg font-semibold text-secondary">{day}</h2>
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex justify-between items-center p-2 rounded-md shadow bg-base-200 text-secondary-content"
                        onClick={() => openEditModal(transaction)}
                      >
                        <div>
                          <p className="text-accent">{transaction.description}</p>
                        </div>
                        <p className={`text-lg font-semibold ${transaction.amount >= 0 ? "text-success" : "text-error"}`}>
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>
                    ))}
                  </div>

                ))

            ) : (
              <div className="card bg-base-200 shadow-xl p-8 text-center">
                {currentDateRef.current.monthInt !== new Date().getMonth() + 1 || currentDateRef.current.year !== new Date().getFullYear() ? (
                  <>
                    <PiExclamationMarkBold className="self-center text-5xl text-accent mb-4" />
                    <h3 className="font-semibold text-primary mb-4">No Transactions for {currentDateRef.current.monthName} {currentDateRef.current.year}</h3>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-primary mb-4">No Transactions Yet!</h3>
                    <p className="text-base-content mb-6">Create your first transaction from this account</p>
                    <button
                      className="btn btn-accent mx-auto"
                      onClick={() => {
                        setEditingTransactionModal(false);
                        document.getElementById("transaction_modal").showModal();
                      }}
                    >
                      <MdOutlineAddCircleOutline className="text-lg mr-2" />
                      Create Transaction
                    </button>
                  </>
                )}
              </div>
            )}

        </div>

        {/* Add transaction */}
        {!(currentDateRef.current.monthInt !== new Date().getMonth() + 1 || currentDateRef.current.year !== new Date().getFullYear()) &&
          <div className="flex justify-end absolute bottom-4 right-4 bg-neutral rounded-full">
            <button
              className="text-7xl text-accent"
              onClick={() => {
                setEditingTransactionModal(false)
                document.getElementById("transaction_modal").showModal()
              }}
            >
              <MdOutlineAddCircleOutline />
            </button>
          </div>
        }

        <BaseModal
          id={"transaction_modal"}
          title={editingTransactionModal ? "Edit Transaction" : "Add Transaction"}
          onClose={resetForm}
        >

          <form
            onSubmit={editingTransactionModal ? handleEditTransaction : handleAddTransaction}
            className="space-y-2"
          >
            <div className="flex space-x-2">

              <CurrencyInput
                required
                name="amount"
                value={amount}
                onValueChange={(value) => setAmount(value)}
                placeholder="Amount"
                className="input input-bordered w-full"
                decimalsLimit={2}
                allowDecimals
                inputMode="decimal"
                pattern="[0-9.]*"
                prefix="$"
                decimalSeparator="."
                groupSeparator=","
                disableGroupSeparators={false}
              />

              <fieldset className="fieldset bg-base-100 rounded-box flex items-center">
                <label htmlFor="isExpense" className="flex flex-col text-sm">
                  <input
                    id="isExpense"
                    type="checkbox"
                    className="toggle"
                    checked={isExpense}
                    onChange={() => setIsExpense(!isExpense)}
                  />
                  <span>{isExpense ? "Expense" : "Income"}</span>
                </label>
              </fieldset>

            </div>


            <input
              required
              type="text"
              name="description"
              placeholder="Description"
              className="input input-bordered w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={40}
            />

            <button type="submit" className="btn btn-primary w-full">
              Save
            </button>

            {editingTransactionModal && !confirmingTransactionDelete && (
              <button
                className="btn bg-red-400 border-none w-full"
                onClick={() => setConfirmingTransactionDelete(true)}
                type="button"
              >
                Delete Transaction
              </button>
            )}

            {confirmingTransactionDelete && (
              <div className="flex space-x-2 w-full">
                <button className="btn bg-green-400 border-none flex-1" onClick={handleDeleteTransaction} type="button">
                  Confirm
                </button>
                <button
                  className="btn bg-red-400 border-none flex-1"
                  onClick={() => setConfirmingTransactionDelete(false)}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </BaseModal>
      </div>
    </Layout>
  )
}

export default FinancesScreen

