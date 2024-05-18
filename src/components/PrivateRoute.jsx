// src/components/PrivateRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig'; // Asegúrate de que la ruta sea correcta

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Cargando...</p>; // Puedes mostrar un spinner de carga aquí
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
