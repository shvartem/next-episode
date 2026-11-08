import { NavLink, Outlet } from 'react-router'
import styles from './RootLayout.module.css'

function RootLayout() {
  return (
    <div className={styles.layout}>
      <nav>
        <NavLink to="/">Home</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default RootLayout
