import { useEffect, useState } from "react";
import { createTransaction, deleteTransaction, editTransaction, listTransactions } from "@/api/transactions";
import { formatCurrency, formatDate, responseErrors } from "@/utils/helpers";
import { editAccount, listAccounts, createAccount, deleteAccount } from "@/api/accounts";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import BaseModal from "@/components/BaseModal";
import CurrencyInput from "react-currency-input-field";
import Big from "big.js";


const FinancesScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editingTransactionModal, setEditingTransactionModal] = useState(false);
  const [editingAccountModal, setEditingAccountModal] = useState(false);
  const [confirmingTransactionDelete, setConfirmingTransactionDelete] = useState(false);
  const [confirmingAccountDelete, setConfirmingAccountDelete] = useState(false);
  const [accountName, setAccountName] = useState(""); console.log({accountName})


  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      getTransactions(selectedAccount.id);
    }
  }, [selectedAccount]);

  const getAccounts = async () => {
    try {
      const res = await listAccounts();
      const accountsData = res.data.accounts;
      setAccounts(accountsData);
      setSelectedAccount(accountsData[0]);
    } catch (error) {
      responseErrors(error);
    }
  };

  const getTransactions = async (accountId) => {
    try {
      const res = await listTransactions(accountId);
      setTransactions(res.data.transactions);
    } catch (error) {
      responseErrors(error);
    }
  };

  const handleAddTransaction = async (event) => {
    event.preventDefault();

    const transactionData = {
      account_id: selectedAccount?.id,
      amount: Big(parseFloat(amount.replace(".", "").replace(",", ".")) * 100),
      description,
    };

    try {
      await createTransaction(transactionData);

      // Refresh transactions and accounts
      getTransactions(selectedAccount.id);
      const updatedAccounts = await listAccounts();
      const updatedAccount = updatedAccounts.data.accounts.find(acc => acc.id === selectedAccount.id);
      setAccounts(updatedAccounts.data.accounts);
      setSelectedAccount(updatedAccount);

      // Reset form fields and close modal
      resetForm();
      document.getElementById("transaction_modal").close();
    } catch (error) {
      responseErrors(error);
    }
  };

  const handleEditTransaction = async (event) => {
    event.preventDefault();

    const transactionData = {
      amount: Big(parseFloat(amount.replace(".", "").replace(",", ".")) * 100),
      description,
    };

    try {
      await editTransaction(selectedTransaction.id, transactionData);

      // Refresh transactions and accounts
      getTransactions(selectedAccount.id);
      const updatedAccounts = await listAccounts();
      const updatedAccount = updatedAccounts.data.accounts.find(acc => acc.id === selectedAccount.id);
      setAccounts(updatedAccounts.data.accounts);
      setSelectedAccount(updatedAccount);

      // Reset form fields and close modal
      resetForm();
      document.getElementById("transaction_modal").close();
    } catch (error) {
      responseErrors(error);
    }
  };

  const handleDeleteTransaction = async (event) => {
    event.preventDefault();

    try {
      await deleteTransaction(selectedTransaction.id);

      // Refresh transactions and accounts
      getTransactions(selectedAccount.id);
      const updatedAccounts = await listAccounts();
      const updatedAccount = updatedAccounts.data.accounts.find(acc => acc.id === selectedAccount.id);
      setAccounts(updatedAccounts.data.accounts);
      setSelectedAccount(updatedAccount);

      // Reset form fields and close modal
      resetForm();
      document.getElementById("transaction_modal").close();
    } catch (error) {
      responseErrors(error);
    }
  };

  const handleEditAccount = async (event) => {
    event.preventDefault();

    try {
      await editAccount(selectedAccount.id, { name: accountName });

      const updatedAccounts = await listAccounts();
      const updatedAccount = updatedAccounts.data.accounts.find(acc => acc.id === selectedAccount.id);
      setAccounts(updatedAccounts.data.accounts);
      setSelectedAccount(updatedAccount);
      document.getElementById("account_modal").close();
      resetAccountForm()

    } catch (error) {
      responseErrors(error);
    }
  };

  const handleAddAccount = async (event) => {
    event.preventDefault()

    try {
      await createAccount({ name: accountName });
      const updatedAccounts = await listAccounts();
      const updatedAccount = updatedAccounts.data.accounts
        .find(acc => acc.id === selectedAccount?.id);

      setAccounts(updatedAccounts.data.accounts);
      if (updatedAccount) {
        setSelectedAccount(updatedAccount);
      }
      document.getElementById("account_modal").close();
      resetAccountForm()

    } catch (error) {
      responseErrors(error);
    }
  };

  const handleDeleteAccount = async (event) => {
    event.preventDefault()

    try {
      await deleteAccount(selectedAccount.id);

      getAccounts(); // Refresh account list
      setSelectedAccount(accounts.length > 1 ? accounts[0] : null); // Select first available account
      document.getElementById("account_modal").close(); // Close modal

    } catch (error) {
      responseErrors(error);
    }
  };

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setSelectedTransaction(null);
    setEditingTransactionModal(false);
    setConfirmingTransactionDelete(false);
  };

  const resetAccountForm = () => {
    setAccountName("");
    setEditingAccountModal(false);
    setConfirmingAccountDelete(false);
  };

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setEditingTransactionModal(true);
    setAmount(Big(transaction.amount / 100).toFixed(2).replace(".", ","));
    setDescription(transaction.description);
    document.getElementById("transaction_modal").showModal();
  };

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const day = formatDate(transaction.created_at);
    if (!acc[day]) acc[day] = [];
    acc[day].push(transaction);
    return acc;
  }, {});

  return (
    <div className="flex flex-col w-full h-full p-4 bg-base-100 text-base-content">

      {/* Account Selector */}
      <div className="flex justify-between">
        <select
          className="select select-md select-bordered w-full text-xl"
          value={selectedAccount?.id}
          onChange={(e) => {
            const account = accounts.find((acc) => acc.id === e.target.value);
            setSelectedAccount(account);
          }}
        >
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>

        <div className="flex space-x-2 px-2 ml-2">
          <button className="text-4xl">
            <BiSolidEditAlt
              onClick={() => {
                setEditingAccountModal(true);
                setAccountName(selectedAccount?.name || "");
                document.getElementById("account_modal").showModal();
              }}
            />
          </button>

          <button
            className="text-4xl"
          >
            <MdOutlineAddCircleOutline
              onClick={() => {
                setEditingAccountModal(false);
                document.getElementById("account_modal").showModal();
              }}
            />
          </button>

        </div>

      </div>

      {/* Transactions */}
      <div className="flex-grow overflow-y-auto h-[72vh] my-4">
        {Object.keys(groupedTransactions).length > 0 ? (
          Object.entries(groupedTransactions)
            .reverse()
            .map(([day, transactions]) => (
              <div key={day} className="space-y-2 mt-2">
                <h2 className="text-lg font-semibold text-primary">{day}</h2>
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-2 rounded-md shadow bg-base-200 text-secondary-content"
                    onClick={() => openEditModal(transaction)}
                  >
                    <div>
                      <p className="text-accent">{transaction.description}</p>
                    </div>
                    <p
                      className={`text-lg font-semibold ${transaction.amount >= 0 ? "text-success" : "text-error"
                        }`}
                    >
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                ))}
              </div>
            ))
        ) : (
          <p className="text-center text-secondary-content py-6">Add some transactions :)</p>
        )}
      </div>

      {/* Add transaction and balance */}
      <div className="flex justify-between w-full">
        <button
          className="text-5xl text-secondary"
          onClick={() => {
            setEditingTransactionModal(false);
            document.getElementById("transaction_modal").showModal();
          }}
        >
          <MdOutlineAddCircleOutline />
        </button>
        <div className="flex flex-col items-end">
          <label className="text-md font-medium text-neutral-500">Balance</label>
          <div className="font-semibold text-4xl">
            {selectedAccount ? formatCurrency(selectedAccount.balance) : "-"}
          </div>
        </div>
      </div>


      <BaseModal
        id={"transaction_modal"}
        title={editingTransactionModal ? "Edit Transaction" : "Add Transaction"}
        onClose={resetForm} // Reset fields when modal closes
      >
        <form
          onSubmit={editingTransactionModal ? handleEditTransaction : handleAddTransaction}
          className="space-y-2 w-96"
        >
          <CurrencyInput
            required
            name="amount"
            value={amount}
            onValueChange={(value) => setAmount(value)}
            placeholder="Amount"
            className="input input-bordered w-full"
            decimalsLimit={2}
            allowDecimals
            inputMode="text"
            prefix="$"
            decimalSeparator=","
            groupSeparator="."
            disableGroupSeparators={false}
          />

          <input
            required
            type="text"
            name="description"
            placeholder="Description"
            className="input input-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit" className="btn btn-primary w-full">
            Save
          </button>

          {editingTransactionModal && !confirmingTransactionDelete && (
            <button
              className="btn bg-red-400 border-none w-full"
              onClick={() => setConfirmingTransactionDelete(true)}
            >
              Delete Transaction
            </button>
          )}

          {confirmingTransactionDelete && (
            <div className="flex space-x-2 w-full">
              <button
                className="btn bg-green-400 border-none flex-1"
                onClick={handleDeleteTransaction}
              >
                Confirm
              </button>
              <button
                className="btn bg-red-400 border-none flex-1"
                onClick={() => setConfirmingTransactionDelete(false)}
              >
                Cancel
              </button>
            </div>
          )}

        </form>
      </BaseModal>

      <BaseModal
        id={"account_modal"}
        title={editingAccountModal ? "Edit Account" : "Add Account"}
        onClose={resetAccountForm}
      >
        <form
          onSubmit={editingAccountModal ? handleEditAccount : handleAddAccount}
          className="space-y-2 w-96"
        >
          <input
            required
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered w-full"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />

          <button type="submit" className="btn btn-primary w-full">
            Save
          </button>

          {editingAccountModal && !confirmingAccountDelete && (
            <button
              className="btn bg-red-400 border-none w-full"
              onClick={() => setConfirmingAccountDelete(true)}
            >
              Delete Account
            </button>
          )}

          {confirmingAccountDelete && (
            <div className="flex space-x-2">
              <button
                className="btn bg-green-400 border-none flex-1"
                onClick={handleDeleteAccount}
              >
                Confirm
              </button>
              <button
                className="btn bg-red-400 border-none flex-1"
                onClick={() => setConfirmingAccountDelete(false)}
              >
                Cancel
              </button>
            </div>
          )}

        </form>
      </BaseModal>

    </div>
  );
};

export default FinancesScreen;
