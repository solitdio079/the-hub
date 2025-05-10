import { Outlet, NavLink } from 'react-router'
export default function Layout() {
  return (
    <div className="flex flex-col">
      <ul className="menu menu-horizontal bg-base-200 rounded-box w-full m-5">
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isActive ? 'bg-primary mx-3' : isPending ? 'bg-secondary mx-3' : 'mx-3'
            }
            to="create"
          >
            Create
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isActive ? 'bg-primary mx-3' : isPending ? 'bg-secondary mx-3' : 'mx-3'
            }
            to="/admin/posts/"
          >
            All Posts
          </NavLink>
        </li>
        
      </ul>
      <Outlet />
    </div>
  )
}
