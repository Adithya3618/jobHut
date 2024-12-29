import AdminLogin from '../components/AdminLogin'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Admin() {
  return (
    <div>
      <Header />
      <h1>Admin Login</h1>
      <AdminLogin />
      <Footer/>
    </div>
  )
}