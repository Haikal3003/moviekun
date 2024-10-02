import { MdAnimation } from 'react-icons/md';
import { navigation } from '../contants/navigation';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed h-[90%] bg-secondary rounded-lg p-4">
      <div className="logo flex items-center gap-2 font-bold mb-8">
        <span className="icon text-[1.4rem] p-3">
          <MdAnimation />
        </span>
      </div>

      <ul className="menu-links">
        {navigation.map((link, i) => (
          <li key={i} className="link mb-7">
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                isActive || location.pathname.startsWith(link.href)
                  ? 'flex items-center text-[1.3rem] gap-2 font-light p-3 bg-yellow-300 text-black rounded-lg'
                  : 'flex items-center text-[1.3rem] gap-2 font-light p-3 hover:bg-yellow-300 hover:text-black rounded-lg'
              }
            >
              <span>{link.icon}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
