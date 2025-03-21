import { useNavigate } from "react-router-dom"

export default function CallToAction() {
  const navigate = useNavigate()

  return (
    <section className="w-full py-12 md:py-16 bg-base-200">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to take control of your finances?</h2>
          <p className="text-base-content/70 mb-8 text-lg">
            Start tracking your accounts and transactions today with Mentis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary" onClick={() => navigate("/register")}>
              Create Account
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
