import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { RQSuperHeroesPage2 } from "./components/RQSuperHeroes2";
import { SuperHeroesPage } from "./components/Superheroes.page";
import RegisterPage from "./components/Register.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes2">RQ Super Heroes 2</Link>
              </li>
              <li>
                <Link to="/register">Create SuperHeroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/rq-super-heroes2" element={<RQSuperHeroesPage2 />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/detailsuperheroes/:id"
              element={<SuperHeroesPage />}
            />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
        <ReactQueryDevtools />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
