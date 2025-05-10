import { Outlet,NavLink } from "react-router"
export default function Layout() {
    return (
      <div className="flex flex-col lg:flex-row ">
        <ul className="menu menu-horizontal lg:menu-vertical bg-base-200 rounded-box w-full lg:w-1/4 h-full m-5">
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
              }
              to="/admin/profile"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
              }
              to="/admin/posts/create"
            >
              Posts
            </NavLink>
          </li>
          <li>
            <a>Comments</a>
          </li>
          <li>
            <a>Users</a>
          </li>
        </ul>
        <Outlet />
      </div>
    )
}