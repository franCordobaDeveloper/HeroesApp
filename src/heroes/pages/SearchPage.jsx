import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { HeroCard } from '../components';
import { getHeroesByName } from '../helpers';
import { useForm } from '../../hook/useForm';


export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  const showSearch = (q.length === 0);
  const showError = (q.length > 0) && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`?q=${searchText.toLowerCase().trim()}`);
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-xxl-10">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-gradient">Busca Tu Heroe Preferido</h1>
            
          </div>

          <div className="row g-4">
            <div className="col-lg-4 col-xxl-3">
              <div className="card shadow-sm border-0 sticky-top" style={{top: '20px'}}>
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">
                    <i className="bi bi-search me-2"></i>Buscar Heroe
                  </h4>
                  
                  <form onSubmit={onSearchSubmit}>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        placeholder="e.g. Batman, Spider-Man..."
                        className="form-control form-control-lg"
                        name="searchText"
                        autoComplete="off"
                        value={searchText}
                        onChange={onInputChange}
                      />
                      <button 
                        className="btn btn-primary btn-lg" 
                        type="submit"
                        disabled={searchText.trim().length < 2}
                      >
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                    <small className="text-muted">Ingresar al menos 2 caracteres</small>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-xxl-9">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">
                      <i className="bi bi-list-stars me-2"></i>Resultados de la Busqueda
                    </h4>
                    {heroes.length > 0 && (
                      <span className="badge bg-primary">
                        {heroes.length} {heroes.length === 1 ? 'resultado' : 'resultados'}
                      </span>
                    )}
                  </div>

                  <div 
                    className={`alert alert-info fade ${showSearch ? 'show' : 'hide'}`}
                    role="alert"
                  >
                    <i className="bi bi-info-circle-fill me-2"></i>
                    Comenza a buscar tu heroe
                  </div>

                  <div 
                    className={`alert alert-danger fade ${showError ? 'show' : 'hide'}`}
                    role="alert"
                  >
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    No se encontro resultado para el heroe: <b>{q}</b>
                  </div>

                  {/* Grid de resultados actualizado */}
                  <div className="results-grid">
                    {heroes.map(hero => (
                      <div key={hero.id} className="hero-card hover-effect">
                        <HeroCard {...hero} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}