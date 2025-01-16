import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';

function SearchPage() {
    // Task 1: Define state variables for the search query, age range, and search results.
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState([0, 18]); // Default range from 0 to 18
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    // Fetch all products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);

    // Task 2: Fetch search results from the API based on user inputs
    const handleSearch = async () => {
        try {
            let url = `${urlConfig.backendUrl}/api/gifts?name=${searchQuery}&category=${selectedCategory}&condition=${selectedCondition}&ageRange=${ageRange}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.log('Search error: ' + error.message);
        }
    };

    const navigate = useNavigate();

    // Task 6: Enable navigation to the details page of a selected gift
    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            {/* Task 3: Dynamically generate category dropdown */}
                            <select className="form-select mb-2 dropdown-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            {/* Task 3: Dynamically generate condition dropdown */}
                            <select className="form-select mb-2 dropdown-filter" value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)}>
                                <option value="">Select Condition</option>
                                {conditions.map((condition) => (
                                    <option key={condition} value={condition}>
                                        {condition}
                                    </option>
                                ))}
                            </select>

                            {/* Task 4: Implement an age range slider */}
                            <label>Age Range: {ageRange[0]} - {ageRange[1]}</label>
                            <input
                                type="range"
                                className="form-range age-range-slider"
                                min="0"
                                max="18"
                                value={ageRange[1]}
                                onChange={(e) => setAgeRange([0, Number(e.target.value)])}
                            />
                        </div>
                    </div>

                    {/* Task 7: Add text input field for search criteria */}
                    <input
                        type="text"
                        className="form-control mb-3 search-input"
                        placeholder="Search for gifts"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Task 8: Implement search button */}
                    <button className="btn btn-primary search-button" onClick={handleSearch}>
                        Search
                    </button>

                    {/* Task 5: Display search results and handle empty results */}
                    <div className="mt-4">
                        {searchResults.length > 0 ? (
                            searchResults.map((gift) => (
                                <div key={gift._id} className="card search-results-card mb-3" onClick={() => goToDetailsPage(gift._id)}>
                                    <div className="card-body">
                                        <h5 className="card-title">{gift.name}</h5>
                                        <p className="card-text">Category: {gift.category}</p>
                                        <p className="card-text">Condition: {gift.condition}</p>
                                        <p className="card-text">Age Range: {gift.ageGroup}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
