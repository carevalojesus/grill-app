// src/components/MenuAside.jsx
import { Link } from 'react-router-dom';
import { Package2, Users, CreditCard, Activity, DollarSign } from 'lucide-react';

const MenuAside = () => {
  return (
    <aside className="hidden w-64 bg-background p-4 md:block">
      <nav className="flex flex-col gap-6 text-lg font-medium">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link to="/dashboard" className="text-foreground transition-colors hover:text-foreground">
          Dashboard
        </Link>
        <Link to="/orders" className="text-muted-foreground transition-colors hover:text-foreground">
          Orders
        </Link>
        <Link to="/products" className="text-muted-foreground transition-colors hover:text-foreground">
          Products
        </Link>
        <Link to="/customers" className="text-muted-foreground transition-colors hover:text-foreground">
          Customers
        </Link>
        <Link to="/analytics" className="text-muted-foreground transition-colors hover:text-foreground">
          Analytics
        </Link>
      </nav>
    </aside>
  );
};

export default MenuAside;
