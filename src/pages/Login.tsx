import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        
        {/* Título */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">¡Bienvenido de vuelta!</h2>
          <p className="mt-2 text-sm text-gray-500">Ingresa a tu cuenta para continuar</p>
        </div>

        {/* Formulario */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="button"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlace al Registro */}
        <p className="text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
        
      </div>
    </div>
  );
};