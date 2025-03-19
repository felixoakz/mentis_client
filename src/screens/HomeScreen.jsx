import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import Layout from "@/components/Layout"
import { BiSolidEditAlt } from "react-icons/bi"
import { MdOutlineAddCircleOutline } from "react-icons/md"
import { listAccounts, createAccount, editAccount, deleteAccount } from "@/api/accounts"
import { responseErrors } from "@/utils/helpers"
import BaseModal from "@/components/BaseModal"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { RiLogoutBoxLine } from "react-icons/ri";


const HomeScreen = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "synthwave")
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [accountName, setAccountName] = useState("")
  const [editingAccountModal, setEditingAccountModal] = useState(false)
  const [confirmingAccountDelete, setConfirmingAccountDelete] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    getAccounts()
  }, [])

  const themes = [
    "lofi",
    "bumblebee",
    "retro",
    "valentine",
    "pastel",
    "autumn",
    "acid",
    "nord",
    "black",
    "synthwave",
    "forest",
    "aqua",
    "luxury",
    "business",
    "night",
    "dim",
  ]

  const handleThemeChange = (event) => setTheme(event.target.value)

  const handleLogout = async () => await logout()

  const getAccounts = async () => {
    try {
      const res = await listAccounts()
      const accountsData = res.data.accounts
      setAccounts(accountsData)
      setSelectedAccount(accountsData[0] ?? null)
    } catch (error) {
      responseErrors(error)
    }
  }

  const handleEditAccount = async (event) => {
    event.preventDefault()

    try {
      await editAccount(selectedAccount.id, { name: accountName })

      const updatedAccounts = await listAccounts()
      const updatedAccount = updatedAccounts.data.accounts.find((acc) => acc.id === selectedAccount.id)
      setAccounts(updatedAccounts.data.accounts)
      setSelectedAccount(updatedAccount)
      document.getElementById("account_modal").close()
      resetAccountForm()
    } catch (error) {
      responseErrors(error)
    }
  }

  const handleAddAccount = async (event) => {
    event.preventDefault()

    try {
      await createAccount({ name: accountName })

      const res = await listAccounts()
      const updatedAccounts = res.data.accounts

      setAccounts(updatedAccounts)
      setSelectedAccount(updatedAccounts.find((acc) => acc.name === accountName))

      document.getElementById("account_modal").close()
      resetAccountForm()
    } catch (error) {
      responseErrors(error)
    }
  }

  const handleDeleteAccount = async (event) => {
    event.preventDefault()

    try {
      await deleteAccount(selectedAccount.id)

      const updatedAccounts = await listAccounts()
      setAccounts(updatedAccounts.data.accounts)

      if (updatedAccounts.data.accounts.length > 0) {
        setSelectedAccount(updatedAccounts.data.accounts[0])
      } else {
        setSelectedAccount(null)
      }

      document.getElementById("account_modal").close()
    } catch (error) {
      responseErrors(error)
    }
  }

  const resetAccountForm = () => {
    setAccountName("")
    setEditingAccountModal(false)
    setConfirmingAccountDelete(false)
  }

  const handleAccountSelect = (accountId) => {
    const account = accounts.find((acc) => acc.id === accountId)
    setSelectedAccount(account)
  }

  const openFinancesWithAccount = () => {
    if (selectedAccount) {
      navigate(`/finances/${selectedAccount.id}`, {
        state: { accountName: selectedAccount.name, balance: selectedAccount.balance },
      })
    } else {
      toast.warn("Please select an account first!")
    }
  }

  return (
    <Layout>
      <div className="flex flex-col space-y-12 p-4 max-w-3xl w-full mx-auto">

        <button
          className="text-5xl text-secondary"
          onClick={handleLogout}
        >
          <RiLogoutBoxLine />
        </button>

        <div
          className="text-accent text-end text-4xl font-bold"
        >
          Hi, {
            user?.username ?
              user.username.charAt(0).toUpperCase()
              + user.username.slice(1)
              : "Guest"
          }!
        </div>

        {/* Account Management Section */}
        <div className="card bg-base-200 shadow-xl p-4 space-y-4">
          <h2 className="text-accent text-xl font-bold">Accounts</h2>

          <div className="flex justify-between gap-2">
            <select
              className="select select-bordered w-full"
              value={selectedAccount?.id || ""}
              onChange={(e) => handleAccountSelect(e.target.value)}
            >
              <option disabled value="">
                Select an account
              </option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>

            <div className="flex space-x-2 justify-end sm:justify-start">
              <button className="text-3xl">
                <BiSolidEditAlt
                  onClick={() => {
                    if (accounts.length === 0) {
                      toast.warn("Add an account first!")
                    } else {
                      setEditingAccountModal(true)
                      setAccountName(selectedAccount?.name || "")
                      document.getElementById("account_modal").showModal()
                    }
                  }}
                />
              </button>

              <button className="text-3xl">
                <MdOutlineAddCircleOutline
                  onClick={() => {
                    setEditingAccountModal(false)
                    document.getElementById("account_modal").showModal()
                  }}
                />
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary w-full"
            onClick={openFinancesWithAccount}
            disabled={!selectedAccount}
          >
            View Transactions
          </button>

        </div>

        {/* Theme Selection */}
        <div className="card bg-base-200 shadow-xl p-4">

          <span
            className="text-accent text-xl font-bold label-text mb-4"
          >
            Configs
          </span>

          <label className="form-control">
            <div className="label">
              <span
                className="text-secondary font-bold label-text"
              >
                Select a Theme
              </span>
            </div>

            <select
              className="select select-primary"
              value={theme}
              onChange={handleThemeChange}
            >
              <option disabled>Select a theme</option>
              {themes.map((themeOption) => (
                <option key={themeOption} value={themeOption}>
                  {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                </option>
              ))}
            </select>
          </label>

        </div>

        {/* Account Modal */}
        <BaseModal
          id={"account_modal"}
          title={editingAccountModal ? "Edit Account" : "Add Account"}
          onClose={resetAccountForm}
        >
          <form onSubmit={editingAccountModal ? handleEditAccount : handleAddAccount} className="space-y-2 w-96">
            <input
              required
              type="text"
              name="name"
              placeholder="Account name"
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
                type="button"
              >
                Delete Account
              </button>
            )}

            {confirmingAccountDelete && (
              <div className="flex space-x-2">
                <button className="btn bg-green-400 border-none flex-1" onClick={handleDeleteAccount} type="button">
                  Confirm
                </button>
                <button
                  className="btn bg-red-400 border-none flex-1"
                  onClick={() => setConfirmingAccountDelete(false)}
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

export default HomeScreen

