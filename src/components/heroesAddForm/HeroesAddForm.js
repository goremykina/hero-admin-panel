import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { fetchFilters } from "../heroesFilters/filtersSlice";
import { fetchHeroes, heroesFetched, heroesFetchingError } from '../heroesList/heroesSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from "../../hooks/http.hook";
import Spinner from "../spinner/Spinner";

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescription, setHeroDescription] = useState('');
    const [heroElement, setHeroElement] = useState('');
    const { filters,  filtersLoadingStatus } = useSelector(state => state.filters);

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes())
        dispatch(fetchFilters())
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newHero =     {
            id: uuidv4(),
            name: heroName,
            description: heroDescription,
            element: heroElement
        }
        console.log(newHero)

        await request('http://localhost:3001/heroes/', "POST", JSON.stringify(newHero))
        // request("http://localhost:3001/heroes")
        //     .then(newHero => dispatch(heroesFetched(newHero)))
        //     .catch(() => dispatch(heroesFetchingError()))
        dispatch(fetchHeroes())

        setHeroName('')
        setHeroDescription('')
        setHeroElement('')
    }

    if (filtersLoadingStatus === "loading") {
        return <option>Загрузка...</option>;
    } else if (filtersLoadingStatus === "error") {
        return <option>Ошибка загрузки</option>
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                >
                    <option >Я владею элементом...</option>
                    {filters?.map((item, index) => {
                        if (item.name === 'all') return

                        return <option key={index} value={item.name}>{item.label}</option>
                    })}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
