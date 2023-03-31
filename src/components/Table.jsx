import React, {useEffect, useState} from 'react'
import axios from 'axios';
import s from './table.module.css'

const selectorsList = ['Status', 'Url', 'Species']
const API_URL = 'https://rickandmortyapi.com/api/character';

export function Table() {
    const [select, setSelect] = useState(selectorsList[0])
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(API_URL).catch(err => {
                console.log(err);
            });
            return data;
        }

        fetchData().then(data => {
            console.log('gggg')
            setCharacters(data?.results)
        });
    }, [])

    return <>
        <h1>Table</h1>
        <table className={s.table}>
            <tbody>
            <tr>
                <th>Name</th>
                <th>Gender</th>
                <th className={s.select}>
                    <select value={select}
                            onChange={e => setSelect(e?.currentTarget?.value)}>
                        {
                            selectorsList.map((i) => (<option>{i}</option>))
                        }
                    </select>
                </th>
            </tr>
            {characters?.map(item => {
                return <tr className={s.tr}>
                    <td key={item.index}>{item?.name}</td>
                    <td key={item.index}>{item?.gender}</td>
                    {
                        selectorsList.map((id) => {
                            if (select === id) return (<td key={item.index}>{item?.[id.toLowerCase()]}</td>)
                        })
                    }
                </tr>
            })}
            </tbody>
        </table>
    </>
}