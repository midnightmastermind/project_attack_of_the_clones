/**
 * This is a SearchBar component.
 * It takes in props and uses the useState and useEffect hooks.
 * It has a searchText state that is updated when the input is changed.
 * It also has searchData and searchFields states that are set when the component is first rendered.
 * When the searchText state is updated,
 */
import React, { useState, useEffect } from 'react';
import '../css/SearchBar.css';

const SearchBar = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [searchFields, setSearchFields] = useState([]);

    useEffect(() => {

        if (props && props.data && props.fields && props.callBackFunction) {
            setSearchData(props.data);
            setSearchFields(props.fields);
        }
    }, [props]);

    useEffect(() => {
        const timeOutId = setTimeout(() => searchAllData(searchText), 100);
        return () => clearTimeout(timeOutId);
      }, [searchText]);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
        searchAllData(e.target.value);
    };

    const searchAllData = async (searchTerm) => {
        if (searchTerm && searchData && searchFields) {
            let results = [];
            results = searchData.filter((data_item) => {
                let searchCheck = false;
                searchFields.forEach((field_name) => {
                    if (data_item[field_name]) {
                        let field_data = data_item[field_name].toLowerCase();
                        if (!searchCheck && field_data.includes(searchTerm.toLowerCase())) {
                            searchCheck = true;
                        }
                    }
                });
                if (searchCheck) {
                    return data_item;
                }
                
            });

            if (props.callBackFunction) {
                if (results) {
                    props.callBackFunction(results);
                } else if (searchData) {
                    props.callBackFunction(searchData);
                }
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="search-bar">
            <form className="search-bar-form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md pr-0 pl-0 align-items-center justify-content-center d-flex">
                        <input
                            type="text"
                            placeholder=""
                            value={searchText}
                            className="search-input mr-0 p- 0"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-auto ml-auto pl-0 pr-0 d-flex justify-content-center align-items-center  ">
                        <button className="search-button " type="submit">Search</button>
                    </div>
                </div>
            </form>
        </div >
    );
}

export default SearchBar;
