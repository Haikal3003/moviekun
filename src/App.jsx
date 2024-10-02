import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <main className="relative font-poppins p-8">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </main>
  );
}

export default App;
