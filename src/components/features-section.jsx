import { RiWalletLine } from "react-icons/ri"
import { BiSolidEditAlt } from "react-icons/bi"
import { FaCheckCircle } from "react-icons/fa"
import { IoIosColorPalette } from "react-icons/io"
import { MdOutlineAddCircleOutline, MdDashboard } from "react-icons/md"

const features = [
  {
    title: "Multiple Account Management",
    description: "Create and manage multiple financial accounts with different balances and purposes.",
    icon: <RiWalletLine className="h-5 w-5" />,
  },
  {
    title: "Transaction Tracking",
    description: "Add, edit, and delete transactions with automatic balance updates and chronological organization.",
    icon: <BiSolidEditAlt className="h-5 w-5" />,
  },
  {
    title: "User Authentication",
    description: "Secure login and registration system with validation to protect your financial data.",
    icon: <FaCheckCircle className="h-5 w-5" />,
  },
  {
    title: "Customizable Themes",
    description: "Choose from multiple themes to personalize your experience with the app.",
    icon: <IoIosColorPalette className="h-5 w-5" />,
  },
  {
    title: "Responsive Design",
    description: "Fully responsive interface that works seamlessly on desktop, tablet, and mobile devices.",
    icon: <MdDashboard className="h-5 w-5" />,
  },
  {
    title: "Real-time Balance Updates",
    description: "Instantly see how transactions affect your account balances with real-time calculations.",
    icon: <MdOutlineAddCircleOutline className="h-5 w-5" />,
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="w-full max-w-5xl mx-auto bg-base-100 rounded-lg shadow-md">
          <div className="text-center space-y-4 mb-6 p-6">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              Key Features
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Everything you need to manage your finances
            </h2>
            <p className="text-base-content/70 md:text-lg">
              Mentis provides a comprehensive set of tools to help you track your finances with ease and flexibility.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8 p-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-base-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-base-content/70 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

