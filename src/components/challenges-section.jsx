import { MdOutlineAddCircleOutline } from "react-icons/md"
import { TbCurrencyDollar } from "react-icons/tb"
import { AiOutlineForm } from "react-icons/ai"
import { IoIosColorPalette } from "react-icons/io"

const challenges = [
  {
    title: "Real-time Balance Updates",
    challenge:
      "Ensuring that account balances update immediately after transactions are added, edited, or deleted.",
    solution:
      "Implemented React Context and API response handling to update balances in real-time. The backend returns the new balance after each transaction operation, which is then used to update the UI.",
    icon: <MdOutlineAddCircleOutline className="h-6 w-6 text-primary" />,
  },
  {
    title: "Currency Handling",
    challenge: "Accurately handling currency values without floating-point precision issues.",
    solution:
      "Used Big.js to handle currency calculations with precision. Stored amounts in cents in the database and converted to display format in the UI.",
    icon: <TbCurrencyDollar className="h-6 w-6 text-primary" />,
  },
  {
    title: "Form Validation",
    challenge: "Creating a robust validation system for user registration with complex password requirements.",
    solution:
      "Leveraged React Hook Form with custom regex patterns and validation functions. Implemented client-side validation for immediate feedback and server-side validation for security.",
    icon: <AiOutlineForm className="h-6 w-6 text-primary" />,
  },
  {
    title: "Theme Customization",
    challenge: "Implementing a theme system that persists user preferences and applies them consistently.",
    solution:
      "Used localStorage for persistence and React's useEffect to apply the theme on mount. Leveraged DaisyUI’s data-theme attributes for seamless theme switching.",
    icon: <IoIosColorPalette className="h-6 w-6 text-primary" />,
  },
]

export default function ChallengesSection() {
  return (
    <section id="challenges" className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Implementation Challenges & Solutions
          </h2>
          <p className="max-w-[900px] mx-auto text-base-content/70 md:text-xl">
            Key challenges faced during development and how they were overcome.
          </p>
        </div>

        <div className="grid max-w-5xl mx-auto gap-6 py-8 grid-cols-1 md:grid-cols-2">
          {challenges.map((item, index) => (
            <div key={index} className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-base-300/50 p-3 rounded-lg">
                    <p className="font-medium">Challenge:</p>
                    <p className="text-base-content/70 mt-1">{item.challenge}</p>
                  </div>

                  <div className="border-l-4 border-primary pl-4 bg-primary/5 p-3 rounded-r-lg">
                    <p className="font-medium">Solution:</p>
                    <p className="text-base-content/70 mt-1">{item.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
