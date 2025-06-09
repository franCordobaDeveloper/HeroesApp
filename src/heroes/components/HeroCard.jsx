import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters
}) => {
  const publisherColor = {
    'DC Comics': 'dc-comics',
    'Marvel Comics': 'marvel-comics'
  }[publisher] || 'other-publisher';

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className={`card h-100 shadow-sm border-0 overflow-hidden hover-effect ${publisherColor}`}>
        <div className="card-img-container">
          <img 
            src={`./assets/heroes/${id}.jpg`} 
            className="card-img-top hero-image" 
            alt={superhero}
          />
          <div className="publisher-badge">
            <span className={`badge ${publisherColor === 'dc-comics' ? 'bg-primary' : publisherColor === 'marvel-comics' ? 'bg-danger' : 'bg-secondary'}`}>
              {publisher}
            </span>
          </div>
        </div>
        
        <div className="card-body d-flex flex-column">
          <div className="mb-2">
            <h5 className="card-title fw-bold">{superhero}</h5>
            <h6 className="card-subtitle text-muted">{alter_ego}</h6>
          </div>
          
          <div className="card-text mb-3">
            <p className="mb-1">
              <small className="text-muted">Primera aparición:</small><br/>
              <strong>{first_appearance}</strong>
            </p>
            
            {alter_ego !== characters && (
              <div className="mt-2">
                <small className="text-muted">Personajes:</small>
                <div className="d-flex flex-wrap mt-1">
                  {characters.split(',').map((character, i) => (
                    <span key={i} className="badge bg-light text-dark me-1 mb-1">
                      {character.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-auto text-center">
            <Link to={`/hero/${id}`} className="stretched-link">
              <button className="btn btn-sm btn-outline-primary w-100">
                Ver detalles <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroCard.propTypes = {
  id: PropTypes.string.isRequired,
  superhero: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  alter_ego: PropTypes.string.isRequired,
  first_appearance: PropTypes.string.isRequired,
  characters: PropTypes.string.isRequired,
};