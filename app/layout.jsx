import Footer from "@components/Footer"
import Navbar from "@components/Navbar"
import Provider from "@components/Provider"
import "@styles/globals.css"

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
        <Navbar/>
        {children}
        <Footer/>
        </Provider>
        </body>
    </html>
  )
}
