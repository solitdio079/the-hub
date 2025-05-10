import { FaGithub, FaBars } from 'react-icons/fa6'
import Original from './Original.svg'
import { Form, NavLink } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '~/contexts'
export default function Navbar() {
    const user = useContext(UserContext)
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="drawer lg:hidden z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}

              <label htmlFor="my-drawer" className="btn btn-sm drawer-button">
                <FaBars className="w-5 h-5" />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                {user ? (
                  <>
                    <li>
                      <NavLink
                        className={({ isActive, isPending }) =>
                          isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
                        }
                        to="/admin"
                      >
                        Account
                      </NavLink>
                    </li>
                    <li>
                      <Form method="post" action="/logout">
                        <button>Logout</button>
                      </Form>
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
                      }
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                )}

                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
                    }
                    to="/projects"
                  >
                    Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
                    }
                    to="/posts"
                  >
                    All Posts
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <a className="btn btn-ghost text-xl hidden lg:flex">
            {' '}
            <img src={Original} width={120} alt="" />{' '}
          </a>
        </div>
        <div className="navbar-center lg:hidden">
          <a className="btn btn-ghost text-xl">
            {' '}
            <img src={Original} width={120} alt="" />{' '}
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
                    }
                    to="/admin"
                  >
                    Account
                  </NavLink>
                </li>
                <li>
                  <Form method="post" action="/logout">
                    <button>Logout</button>
                  </Form>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
                }
                to="/projects"
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? 'bg-primary' : isPending ? 'bg-secondary' : ''
                }
                to="/posts"
              >
                All Posts
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">
            <FaGithub className="w-6 h-6 lg:w-8 lg:h-8" />
          </a>
        </div>
      </div>
    </>
  )
}
