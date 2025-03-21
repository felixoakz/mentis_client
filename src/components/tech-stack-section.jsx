import { FaReact, FaRoute, FaServer } from "react-icons/fa"
import { IoIosColorPalette } from "react-icons/io"
import { AiOutlineForm } from "react-icons/ai"
import { MdDashboard } from "react-icons/md"

const techItems = [
  {
    title: "React",
    description: "Frontend library for building the user interface with reusable components",
    icon: <FaReact className="h-8 w-8 text-primary" />,
  },
  {
    title: "React Router",
    description: "Client-side routing for navigation between different views",
    icon: <FaRoute className="h-8 w-8 text-primary" />,
  },
  {
    title: "DaisyUI",
    description: "Component library for Tailwind CSS with theme support",
    icon: <IoIosColorPalette className="h-8 w-8 text-primary" />,
  },
  {
    title: "React Hook Form",
    description: "Form validation and handling with minimal re-renders",
    icon: <AiOutlineForm className="h-8 w-8 text-primary" />,
  },
  {
    title: "Context API",
    description: "State management for authentication and user data",
    icon: <MdDashboard className="h-8 w-8 text-primary" />,
  },
  {
    title: "RESTful API",
    description: "Backend communication for data persistence and retrieval",
    icon: <FaServer className="h-8 w-8 text-primary" />,
  },
]

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="w-full py-12 md:py-16 bg-base-200">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center space-y-4 mb-10">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
            Technology
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Built with Modern Technologies</h2>
          <p className="max-w-[900px] mx-auto text-base-content/70 md:text-xl">
            A carefully selected stack to ensure performance, scalability, and maintainability.
          </p>
        </div>

        <div className="divider max-w-5xl mx-auto"></div>

        <div className="grid max-w-5xl mx-auto gap-6 py-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {techItems.map((tech, index) => (
            <div key={index} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body flex flex-col items-center justify-center p-6">
                <div className="mb-4 rounded-full bg-base-200 p-4">{tech.icon}</div>
                <h3 className="text-xl font-bold">{tech.title}</h3>
                <p className="text-center text-base-content/70 mt-2">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

