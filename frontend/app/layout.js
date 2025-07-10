
export const metadata = {

  title: 'Habit Tracker',

  description: 'Track your daily habits',

}



export default function RootLayout({ children }) {

  return (

    <html lang="en">

      <body>{children}</body>

    </html>

  )

}

