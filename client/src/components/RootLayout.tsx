import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function RootLayout() {
  return (
    <div className="min-h-[100vh]">
      <Navbar />
      <Outlet />
    </div>
  )
}
