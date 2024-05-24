import './CardsGrid.css';

function CardsGrid(props) {
  return (
    <div className="cards_grid">
        <div className="cards_grid__inner">
            {props.children}
        </div>
    </div>
  )
}

export default CardsGrid;