import { useHttp } from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHeroes } from './heroesSlice'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const [visibleHeroes, setVisibleHeroes] = useState([]);
    const state = useSelector(state => state);
    const allHeroes = useSelector(state => state.heroes.heroes);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const selectedFilter = useSelector(state => state.filters.selectedFilter);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        const newVisibleHeroes = selectedFilter && selectedFilter !== 'all'
            ? allHeroes.filter(hero => hero.element === selectedFilter)
            : allHeroes;
        setVisibleHeroes(newVisibleHeroes);
    }, [allHeroes, selectedFilter]);

    useEffect(() => {
        dispatch(fetchHeroes())

        // eslint-disable-next-line
    }, []);


    const onDelete = async (id) => {
        await request(`http://localhost:3001/heroes/${id}`, "DELETE");
        // request("http://localhost:3001/heroes")
        //     .then(data => dispatch(heroesFetched(data)))
        //     .catch(() => dispatch(heroesFetchingError()))
        dispatch(fetchHeroes())
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (!arr) {
            return;
        }

        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)}/>
        })
    }

    const elements = renderHeroesList(visibleHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
