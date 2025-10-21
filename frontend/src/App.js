import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import NomeCenario from './pages/EditorCenario/NomeCenario';
import ImagemCenario from './pages/EditorCenario/ImagemCenario';
import CadastroCenario from './pages/EditorCenario/CadastroCenario';
import { CenarioProvider } from './pages/EditorCenario/CenarioContext';
import MenuJogos from './pages/MenuPage/MenuJogos';
import SelecionarCategoria from './pages/CategoriaCenario/SelecionarCategoria';
import VisualizarCenariosPorCategoria from './pages/CategoriaCenario/VisualizarCenariosPorCategoria';
import SelecionarCategoriaParaJogar from './pages/CategoriaCenario/SelecionarCategoriaParaJogar';
import ContextoCenario from './pages/Jogo/ContextoCenario';
import PerguntarCenario from './pages/Jogo/PerguntaCenario';
import RespostaCenario from './pages/Jogo/RespostaCenario';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import LoginPage from './pages/Login/LoginPage';
import GerenciarCenariosPorCategoria from './pages/Gerenciar/GerenciarCenariosPorCategoria'; 
import EditarCenarios from './pages/Gerenciar/EditarCenarios';
import AuthBadge from './components/AuthBadge';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CenarioProvider>
          <Header />
          <Routes>
            {/* público */}
            <Route path='/' element={<HomePage />} />
            <Route path='/sobre' element={<AboutPage />} />
            <Route path='/jogos' element={<MenuJogos />} />

            {/* explorar (público) */}
            <Route path='/categorias/jogar' element={<SelecionarCategoriaParaJogar />} />
            <Route path='/jogar/:categoria' element={<VisualizarCenariosPorCategoria />} />
            <Route path='/jogar/:id/contexto' element={<ContextoCenario />} />
            <Route path='/jogar/:id/pergunta' element={<PerguntarCenario />} />
            <Route path='/jogar/:id/resposta' element={<RespostaCenario />} />

            {/* login */}
            <Route path='/login' element={<LoginPage />} />

            {/* montagem protegida */}
            <Route
              path='/categorias'
              element={
                <ProtectedRoute>
                  <SelecionarCategoria />
                </ProtectedRoute>
              }
            />
            <Route
              path='/gerenciar/categorias/:categoria'
              element={
                <ProtectedRoute>
                  <GerenciarCenariosPorCategoria />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editar-cenario/:id"
              element={
                <ProtectedRoute>
                  <EditarCenarios />
                </ProtectedRoute>
              }
            />

            <Route
              path='/editor/nome'
              element={
                <ProtectedRoute>
                  <NomeCenario />
                </ProtectedRoute>
              }
            />
            <Route
              path='/editor/imagem'
              element={
                <ProtectedRoute>
                  <ImagemCenario />
                </ProtectedRoute>
              }
            />
            <Route
              path='/editor/pergunta'
              element={
                <ProtectedRoute>
                  <CadastroCenario />
                </ProtectedRoute>
              }
            />
          </Routes>
          <AuthBadge/>
        </CenarioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
