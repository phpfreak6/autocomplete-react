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
    const [selectedData, setSelectedData] = useState('');

    const search_url = props.searchUrl;
    const response_key = props.searchData.response_key;
    const data_key = props.searchData.key;
    const data_value = props.searchData.value;

    // eslint-disable-next-line
    const debouncedChangeHandler = useCallback(debounce(setSearchItemHandler, 1000), []);

    async function setSearchItemHandler() {
        if (search_item.current.value === '') {
            setData([]);
            setSelectedData('');
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
        setSelectedData(data[cursor]);
    }


    return (
        <div>
            <div style={{ width: '40%', float: 'left', padding: '50px 50px 50px 50px' }}>
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
                                                onMouseLeave={() => {
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
            </div>
            <div style={{ width: '40%', float: 'right', padding: '50px 50px 50px 50px' }}>
                {selectedData && (
                    <div className='selecetdItem'>
                        <table id='selected_item_table'>
                            <thead>
                                <tr>
                                    <th colSpan='2'>SELECTED ITEM</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SKU ID</td>
                                    <td>{selectedData.sku_id}</td>
                                </tr>
                                <tr>
                                    <td>SKU NAME</td>
                                    <td>{selectedData.sku_name}</td>
                                </tr>
                                <tr>
                                    <td>PRODUCT CODE</td>
                                    <td>{selectedData.product_code}</td>
                                </tr>
                                <tr>
                                    <td>BAR CODE</td>
                                    <td>{selectedData.barcode}</td>
                                </tr>
                                <tr>
                                    <td>STOCK IN</td>
                                    <td>{selectedData.stock_in}</td>
                                </tr>
                                <tr>
                                    <td>STOCK OUT</td>
                                    <td>{selectedData.stock_out}</td>
                                </tr>
                                <tr>
                                    <td>STOCK ON HAND</td>
                                    <td>{selectedData.stock_on_hand}</td>
                                </tr>
                                <tr>
                                    <td>STOCK RESERVED</td>
                                    <td>{selectedData.stock_reserved}</td>
                                </tr>
                                <tr>
                                    <td>STOCK AVAILABLE</td>
                                    <td>{selectedData.stock_available}</td>
                                </tr>
                                <tr>
                                    <td>MODIFIED DATE</td>
                                    <td>{selectedData.modified_date}</td>
                                </tr>
                                <tr>
                                    <td>CREATED DATE</td>
                                    <td>{selectedData.created_date}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );

}