import { useNavigate, Link } from 'react-router-dom';

export const Feed = () => {
  const navigate = useNavigate();

  const posts = [
    { id: 1, autor: "María Gómez", texto: "¡Hola a todos! Este es mi primer post en el blog." },
    { id: 2, autor: "Carlos Ruiz", texto: "Hoy aprendí a usar Tailwind CSS y es muy rápido." },
    { id: 3, autor: "Ana López", texto: "Compartiendo un poco de mi día. ¡Saludos!" }
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Barra de Navegación Básica */}
      <nav className="flex items-center justify-between p-4 text-white bg-blue-600 shadow-md">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/feed')}>Mi App</h1>
          <Link to="/me" className="text-sm font-semibold hover:underline">Mi Perfil</Link>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-sm font-semibold bg-blue-700 rounded hover:bg-blue-800 transition-colors"
        >
          Cerrar Sesión
        </button>
      </nav>

      {/* Contenedor de las Publicaciones */}
      <main className="max-w-2xl mx-auto mt-8 space-y-4 px-4">
        {posts.map((post) => (
          <article key={post.id} className="p-4 bg-white rounded-lg shadow">
            <h2 className="font-bold text-gray-800">{post.autor}</h2>
            <p className="mt-2 text-gray-600">{post.texto}</p>
          </article>
        ))}
      </main>
    </div>
  );
};