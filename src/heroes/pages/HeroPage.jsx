import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";
import { useMemo } from "react";

export const HeroPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const hero = useMemo( () => getHeroById(id), [id]);

  const onNavigateBack = () => {
    navigate(-1);
  }

  if (!hero) {
    return <Navigate to="/marvel" />
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <img 
              src={`/assets/heroes/${id}.jpg`} 
              alt={hero.superhero} 
              className="card-img-top img-fluid rounded-start"
              style={{ objectFit: 'cover', height: '100%' }}
            />
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="card-title fw-bold text-primary">{hero.superhero}</h2>
              
              <div className="mb-4">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Alter Ego:</span>
                    <span className="text-muted">{hero.alter_ego}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Publisher:</span>
                    <span className="text-muted">{hero.publisher}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Primera Aparición:</span>
                    <span className="text-muted">{hero.first_appearance}</span>
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold border-bottom pb-2">Personajes</h5>
                <p className="card-text">
                  {hero.characters.split(',').map((character, index) => (
                    <span key={index} className="badge bg-secondary me-1 mb-1">
                      {character.trim()}
                    </span>
                  ))}
                </p>
              </div>

              <button 
                className="btn btn-primary mt-3"
                onClick={onNavigateBack}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Regresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}