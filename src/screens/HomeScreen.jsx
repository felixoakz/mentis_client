import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import Layout from "@/components/Layout"
import { BiSolidEditAlt } from "react-icons/bi"
import { MdOutlineAddCircleOutline, MdDashboard } from "react-icons/md"
import { RiLogoutBoxLine, RiWalletLine } from "react-icons/ri"
import { FiSettings } from "react-icons/fi"
import { listAccounts, createAccount, editAccount, deleteAccount } from "@/api/accounts"
import { responseErrors, formatCurrency } from "@/utils/helpers"
import BaseModal from "@/components/BaseModal"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const HomeScreen = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "synthwave")
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [accountName, setAccountName] = useState("")
  const [editingAccountModal, setEditingAccountModal] = useState(false)
  const [confirmingAccountDelete, setConfirmingAccountDelete] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

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

  const openFinancesWithAccount = (account) => {
    if (account) {
      navigate(`/finances/${account.id}`, {
        state: { accountName: account.name, balance: account.balance },
      })
    } else {
      toast.warn("Please select an account first!")
    }
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-base-100">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-base-200 shadow-md">

          <div className="flex items-center gap-4">

            <button onClick={handleLogout} className="text-3xl text-secondary">
              <RiLogoutBoxLine />
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-3xl text-secondary"
            >
              <FiSettings />
            </button>

          </div>

          <span className="text-3xl text-primary font-bold">
            Hi {user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : "Guest"}!
          </span>

        </header>

        <main className="flex-1 p-4 md:p-6 max-w-5xl mx-auto w-full">
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            {/* Main Content */}
            <div className="space-y-6">
              <div className="flex space-x-2 items-center">
                <h2 className="text-2xl font-bold text-accent">Accounts</h2>
                <button
                  className="text-primary text-2xl"
                  onClick={() => {
                    setEditingAccountModal(false)
                    document.getElementById("account_modal").showModal()
                  }}
                >
                  <MdOutlineAddCircleOutline />
                </button>
              </div>

              {accounts.length === 0 ? (
                <div className="card bg-base-200 shadow-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-4">No Accounts Yet</h3>
                  <p className="text-base-content mb-6">Create your first account to start tracking your finances</p>
                  <button
                    className="btn btn-accent mx-auto"
                    onClick={() => {
                      setEditingAccountModal(false)
                      document.getElementById("account_modal").showModal()
                    }}
                  >
                    <MdOutlineAddCircleOutline className="text-lg mr-2" />
                    Create Account
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className={`card bg-base-200 shadow-xl hover:shadow-2xl transition-all cursor-pointer ${selectedAccount?.id === account.id ? "ring-2 ring-secondary" : ""
                        }`}
                      onClick={() => handleAccountSelect(account.id)}
                    >
                      <div className="card-body">
                        <div className="flex justify-between items-center">
                          <h3 className="card-title text-accent flex items-center gap-2">
                            <RiWalletLine />
                            {account.name}
                          </h3>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingAccountModal(true)
                              setSelectedAccount(account)
                              setAccountName(account.name)
                              document.getElementById("account_modal").showModal()
                            }}
                          >
                            <BiSolidEditAlt className="text-lg" />
                          </button>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-base-content/70">Balance</p>
                          <p className="text-2xl font-bold text-primary">{formatCurrency(account.balance)}</p>
                        </div>
                        <div className="card-actions justify-end mt-4">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              openFinancesWithAccount(account)
                            }}
                          >
                            View Transactions
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="card bg-base-200 shadow-xl p-4">
                <h3 className="text-xl font-bold text-accent mb-4">Settings</h3>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Theme</span>
                  </label>
                  <select className="select select-bordered w-full" value={theme} onChange={handleThemeChange}>
                    {themes.map((themeOption) => (
                      <option key={themeOption} value={themeOption}>
                        {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Preview</h4>
                  <div className="flex gap-2 flex-wrap">
                    <div className="badge badge-primary">Primary</div>
                    <div className="badge badge-secondary">Secondary</div>
                    <div className="badge badge-accent">Accent</div>
                    <div className="badge badge-neutral">Neutral</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Account Modal */}
        <BaseModal
          id={"account_modal"}
          title={editingAccountModal ? "Edit Account" : "Add Account"}
          onClose={resetAccountForm}
        >
          <form
            onSubmit={editingAccountModal ? handleEditAccount : handleAddAccount}
            className="space-y-4 w-96"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Account Name</span>
              </label>
              <input
                required
                type="text"
                name="name"
                placeholder="Enter account name"
                className="input input-bordered w-full"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              {editingAccountModal ? "Update Account" : "Create Account"}
            </button>

            {editingAccountModal && !confirmingAccountDelete && (
              <button className="btn btn-error w-full" onClick={() => setConfirmingAccountDelete(true)} type="button">
                Delete Account
              </button>
            )}

            {confirmingAccountDelete && (
              <div className="p-4 border border-error rounded-lg bg-error/10">
                <p className="text-error font-medium mb-4">Are you sure you want to delete this account?</p>
                <div className="flex space-x-2">
                  <button className="btn btn-error flex-1" onClick={handleDeleteAccount} type="button">
                    Yes, Delete
                  </button>
                  <button
                    className="btn btn-outline flex-1"
                    onClick={() => setConfirmingAccountDelete(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </form>
        </BaseModal>
      </div>
    </Layout>
  )
}

export default HomeScreen

