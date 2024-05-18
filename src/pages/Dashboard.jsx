import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { Button } from "@/components/ui/button";

export default function Dashboard() {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Button onClick={handleLogout} className="mt-4">
        Cerrar sesión
      </Button>
    </div>
  );
}
