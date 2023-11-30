import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Navbar = () => {
  const axiosPublic = useAxiosPublic();
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const userEmail = user?.email;

  const { data: admins = [] } = useQuery({
    queryKey: ['admins', userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/admin?email=${userEmail}`);
      return res.data;
    },
  });

  console.log(admins);

  const admin = admins[0]?.role;

  console.log(admin);

  const isUserLoggedIn = !!user;

  return (
    <div className='w-[1280px] mx-auto'>
      <div className='navbar bg-base-100'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
          {isUserLoggedIn ? (
  admin === 'admin' ? (
    <>
              <li>
        <NavLink to='/hrHome'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/employees'>My Employee List</NavLink>
      </li>
      <li>
        <NavLink to='/addEmployee'>Add An Employee</NavLink>
      </li>
      <li>
        <NavLink to='/assetList'>Asset List</NavLink>
      </li>
      <li>
        <NavLink to='/addAsset'>Add An Asset</NavLink>
      </li>
      <li>
        <NavLink to='/requests'>All Request</NavLink>
      </li>
      <li>
        <NavLink to='/hrCustomRequest'>Custom Request</NavLink>
      </li>
      <li>
        <NavLink to='/hrProfile'>Profile</NavLink> {/* Fix the typo here */}
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to='/employeHome'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/team'>My Team</NavLink>
      </li>
      {/* <li>
        <NavLink to='/assets'>My Assets</NavLink>
      </li> */}
      <li>
        <NavLink to='/assetRequest'>Request For An Asset</NavLink>
      </li>
      <li>
        <NavLink to='/customRequest'>Make A Custom Request</NavLink>
      </li>
      <li>
        <NavLink to='/profile'>Profile</NavLink>
      </li>
    </>
  )
) : (
  <>
    <li>
      <NavLink to='/'>Home</NavLink>
    </li>
    <li>
      <NavLink to='/joinEmploye'>Join as Employee</NavLink>
    </li>
    <li>
      <NavLink to='/joinHr'>Join as Hr/Admin</NavLink>
    </li>
    <li>
      <NavLink to='/login'>Login</NavLink>
    </li>
  </>
)}
            </ul>
          </div>
          <a className='btn btn-ghost text-xl'>daisyUI</a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
          {isUserLoggedIn ? (
  admin === 'admin' ? (
    <>
              <li>
        <NavLink to='/hrHome'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/employees'>My Employee List</NavLink>
      </li>
      <li>
        <NavLink to='/addEmployee'>Add An Employee</NavLink>
      </li>
      <li>
        <NavLink to='/assetList'>Asset List</NavLink>
      </li>
      <li>
        <NavLink to='/addAsset'>Add An Asset</NavLink>
      </li>
      <li>
        <NavLink to='/requests'>All Request</NavLink>
      </li>
      <li>
        <NavLink to='/hrCustomRequest'>Custom Request</NavLink>
      </li>
      <li>
        <NavLink to='/hrProfile'>Profile</NavLink> {/* Fix the typo here */}
      </li>
    </>
  ) : (
    <>
          <li>
        <NavLink to='/employeHome'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/team'>My Team</NavLink>
      </li>
      {/* <li>
        <NavLink to='/assets'>My Assets</NavLink>
      </li> */}
      <li>
        <NavLink to='/assetRequest'>Request For An Asset</NavLink>
      </li>
      <li>
        <NavLink to='/customRequest'>Make A Custom Request</NavLink>
      </li>
      <li>
        <NavLink to='/profile'>Profile</NavLink>
      </li>
    </>
  )
) : (
  <>
    <li>
      <NavLink to='/'>Home</NavLink>
    </li>
    <li>
      <NavLink to='/joinEmploye'>Join as Employee</NavLink>
    </li>
    <li>
      <NavLink to='/joinHr'>Join as Hr/Admin</NavLink>
    </li>
    <li>
      <NavLink to='/login'>Login</NavLink>
    </li>
  </>
)}

          </ul>
        </div>
        <div className='navbar-end'>
          {isUserLoggedIn ? (
            <button onClick={handleLogout} className='btn'>
              Log Out
            </button>
          ) : (
            <Link to='/login' className='btn'>
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
