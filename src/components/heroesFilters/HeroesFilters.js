import { useDispatch, useSelector } from "react-redux";
import { filterSelected } from './filtersSlice';

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const { selectedFilter,  filters}  = useSelector(state => state.filters);

    const filteredHeroes = (name) => {
        const action = filterSelected(name);
        dispatch(action);
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters?.map((filter, index) => {
                        return (
                            <button
                                className={`btn ${filter.className} ${selectedFilter === filter.name ? 'active' : ''}`}
                                key={index}
                                onClick={() => filteredHeroes(filter.name)}
                            >
                                {filter.label}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
