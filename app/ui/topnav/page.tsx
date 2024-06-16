import Link from "next/link";

interface Props {
  companyName: string;
}

export default function TopNav({ companyName }: Props) {
  return (
    <nav className="text-white">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/">
            <button className="btn btn-ghost text-xl">{companyName}</button>
          </Link>
        </div>
        {/* Nav Menu Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Customers</a>
                <ul className="p-2">
                  <li>
                    <Link href={"/customers/new"}>New</Link>
                  </li>
                  <li>
                    <Link href={"/customers/search"}>Search</Link>
                  </li>
                  <li>
                    <Link href={"/customers/allcustomers"}>All Customers</Link>
                  </li>
                </ul>
              </li>
              <li>
                <a>Projects</a>
                <ul className="p-2">
                  <li>
                    <Link href={"/projects/new"}>New</Link>
                  </li>
                  <li>
                    <Link href={"/projects/search"}>Search</Link>
                  </li>
                  <li>
                    <Link href={"/projects/allprojects"}>All Projects</Link>
                  </li>
                </ul>
              </li>
              <li>
                <a>Admins</a>
                <ul className="p-2">
                  <li>
                    <Link href={"/admins/new"}>New</Link>
                  </li>
                  <li>
                    <Link href={"/admins/search"}>Search</Link>
                  </li>
                  <li>
                    <Link href={"/admins/alladmins"}>All Admins</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href={"/about"}>About</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Customers</summary>
                <ul className="p-2">
                  <li>
                    <Link href={"/customers/new"}>New</Link>
                  </li>
                  <li>
                    <Link href={"/customers/search"}>Search</Link>
                  </li>
                  <li>
                    <Link href={"/customers/allcustomers"}>All Customers</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Projects</summary>
                <ul className="p-2">
                  <li>
                    <Link href={"/projects/new"}>New</Link>
                  </li>
                  <li>
                    <Link href={"/projects/search"}>Search</Link>
                  </li>
                  <li>
                    <Link href={"/projects/allprojects"}>All Projects</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Admins</summary>
                <ul className="p-2">
                  <li>
                    <Link href={"/admins/new"}>New</Link>
                  </li>
                  <li>
                    <Link href={"/admins/search"}>Search</Link>
                  </li>
                  <li>
                    <Link href={"/admins/alladmins"}>All Admins</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
          </ul>
        </div>
        {/* Nav Menu End */}
        <div className="navbar-end">{/* <a className="btn">Button</a> */}</div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar bg-white"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="/images/profile.png"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
