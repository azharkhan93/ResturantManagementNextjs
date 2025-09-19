import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationLink } from "../../constants";

interface SidebarLinkProps {
  item: NavigationLink;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ item }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-700"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className="mr-3 text-lg">{item.icon}</span>
      {item.name}
    </Link>
  );
};
