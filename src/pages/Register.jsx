import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../lib/firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email
      });

      console.log('Usuario registrado:', user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setError('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Crear cuenta</CardTitle>
          <CardDescription>
            Ingresa tu información para crear una cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input 
                  id="nombre" 
                  placeholder="Tu nombre" 
                  {...register('nombre', { required: 'El nombre es obligatorio' })} 
                />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input 
                  id="apellido" 
                  placeholder="Tu apellido" 
                  {...register('apellido', { required: 'El apellido es obligatorio' })} 
                />
                {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido.message}</p>}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                {...register('email', { 
                  required: 'El correo electrónico es obligatorio', 
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'El formato del correo electrónico no es válido'
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                {...register('password', { required: 'La contraseña es obligatoria' })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Crear cuenta
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="underline">
              Iniciar sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
