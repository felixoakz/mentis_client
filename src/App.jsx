import Navigation from "@/components/Navigation"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {

  return (
    <>
      <Navigation />
      <ToastContainer
        position="top-center"
        limit={2}
      />
    </>
  )
}
