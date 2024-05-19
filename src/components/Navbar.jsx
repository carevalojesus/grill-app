// src/components/Navbar.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth'; // Importa onAuthStateChanged
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../lib/firebaseConfig';
import { Button } from "@/components/ui/button";
import { CircleUser, Menu, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const initials = `${userData.nombre[0]}${userData.apellido[0]}`.toUpperCase();
          setUserInitials(initials);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
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
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link to="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link to="/orders" className="text-muted-foreground hover:text-foreground">
              Orders
            </Link>
            <Link to="/products" className="text-muted-foreground hover:text-foreground">
              Products
            </Link>
            <Link to="/customers" className="text-muted-foreground hover:text-foreground">
              Customers
            </Link>
            <Link to="/analytics" className="text-muted-foreground hover:text-foreground">
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar className="h-6 w-6">
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
