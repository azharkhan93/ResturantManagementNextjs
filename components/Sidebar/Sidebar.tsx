
import { NAVIGATION_LINKS } from '../../constants';
import { SidebarLink } from '../SidebarLink';

export const Sidebar: React.FC = () => {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      <div className="flex h-full flex-col">
      
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 font-display">Restaurant Management</h1>
        </div>
        
      
        <nav className="flex-1 space-y-1 px-4 py-4">
          {NAVIGATION_LINKS.map((item) => (
            <SidebarLink key={item.name} item={item} />
          ))}
        </nav>
        
        
      </div>
    </div>
  );
};


