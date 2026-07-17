import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/axios';
import axios from 'axios';

// Definimos la estructura de un Post según lo que devuelve tu backend
interface Post {
  id: number;
  autor: string;
  titulo: string;
  contenido: string;
  fecha: string;
}

export const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 1. Cargar las publicaciones del backend al entrar a la página
  const obtenerFeed = async () => {
    try {
      const response = await api.get('/feed');
      // Tu backend devuelve un JSON con: { message, data: [...] }
      setPosts(response.data.data);
    } catch (err) {
      console.error("Error al obtener el feed:", err);
      // Si el token expiró o es inválido, mandamos al login
      if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 403)) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('No se pudo cargar el feed de publicaciones.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerFeed();
  }, [navigate]);

  // 2. Publicar un nuevo comentario en el backend
  const handleCrearPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    setError('');
    setSuccess('');

    try {
      // Tu backend espera un objeto con { contenido }
      const response = await api.post('/feed', { contenido: nuevoComentario });
      
      setSuccess(response.data.message || '¡Publicado con éxito!');
      
      // Agregamos el nuevo post devuelto por el backend al inicio de nuestra lista local
      const nuevoPostCreado: Post = response.data.data;
      setPosts([nuevoPostCreado, ...posts]);
      
      // Limpiamos el cuadro de texto
      setNuevoComentario('');
      
      // Limpiamos el mensaje de éxito después de 2 segundos
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      console.error("Error al crear post:", err);
      if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 403)) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('No se pudo publicar tu comentario. Inténtalo de nuevo.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <p className="text-gray-600 font-semibold text-lg">Cargando publicaciones...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      
      {/* Barra de Navegación Básica */}
      <nav className="flex items-center justify-between p-4 text-white bg-blue-600 shadow-md">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/feed')}>Mi App</h1>
          <Link to="/me" className="text-sm font-semibold hover:underline">Mi Perfil</Link>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold bg-blue-700 rounded hover:bg-blue-800 transition-colors"
        >
          Cerrar Sesión
        </button>
      </nav>

      {/* Contenedor Principal */}
      <main className="max-w-2xl mx-auto mt-8 space-y-4 px-4 pb-12">
        
        {/* Alertas de Estado */}
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg text-center font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg text-center font-medium">
            {success}
          </div>
        )}

        {/* Formulario para Crear Comentario/Publicación */}
        <form onSubmit={handleCrearPost} className="p-4 bg-white rounded-lg shadow space-y-3">
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            placeholder="¿Qué quieres comentar hoy?"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-700"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Publicar comentario
            </button>
          </div>
        </form>

        {/* Listado de Publicaciones Reales */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-8 bg-white rounded-lg shadow">No hay publicaciones todavía. ¡Sé el primero!</p>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="p-5 bg-white rounded-lg shadow space-y-2 transition-all hover:shadow-md">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg text-gray-800">{post.titulo}</h2>
                  <span className="text-xs text-gray-400 font-medium">{post.fecha}</span>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{post.contenido}</p>
                <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                  <span>Publicado por: <strong className="text-blue-600">@{post.autor}</strong></span>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
};