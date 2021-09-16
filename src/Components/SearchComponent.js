import { useState, useRef, useCallback } from "react";
import debounce from 'lodash.debounce';

import { getSearchResult } from "../Services/GetSearchResultService";
import Loader from "react-loader-spinner";
import './SearchComponent.css';


export default function SearchComponent(props) {

    const search_item = useRef(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState(0);
    const [selectedData, setSelectedData] = useState({});

    const search_url = props.searchUrl;
    const response_key = props.searchData.response_key;
    const data_key = props.searchData.key;
    const data_value = props.searchData.value;

    // eslint-disable-next-line
    const debouncedChangeHandler = useCallback(debounce(setSearchItemHandler, 1000), []);

    async function setSearchItemHandler() {
        if (search_item.current.value === '') {
            setData([]);
        } else {
            setLoading(true);
            const result = await getSearchResult(search_url, search_item.current.value);
            setData(result[response_key]);
            setLoading(false);
        }
    }

    function keyDownHandler(event) {
        if (event.keyCode === 38 && cursor > 0) {
            setCursor((previousCursor) => previousCursor - 1);
        } else if (event.keyCode === 40 && cursor < data.length - 1) {
            setCursor((previousCursor) => previousCursor + 1);
        }
    }

    function submitHandler() {
        console.log(data[cursor]);
    }


    return (
        <center className='search_box'>
            <h4>Search Module</h4>
            <input
                ref={search_item}
                onKeyDown={keyDownHandler}
                onChange={debouncedChangeHandler}
                onKeyPress={submitHandler}
                type='text' />
            <ul className='items-list'>
                {
                    loading === true
                        ? <Loader type="Rings" color="#fff" height={100} width={100} />
                        : data.length
                            ? data.map((item, index) => {
                                return (
                                    <li
                                        onClick={submitHandler}
                                        className={cursor === index ? 'selected' : null}
                                        key={item[data_key]}
                                        onMouseEnter={() => {
                                            setCursor(index);
                                        }}
                                        onMouseLeave={(index) => {
                                            setCursor(0);
                                        }}
                                    >
                                        {item[data_value]}
                                    </li>
                                );
                            })
                            : <li>No Matches</li>
                }
            </ul>
        </center>
    );

}