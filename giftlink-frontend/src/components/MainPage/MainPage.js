import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]); // Gifts array
    const [error, setError] = useState(false); // Error state
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all gifts from the backend
        const fetchGifts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`; // Your backend API URL
                const response = await fetch(url);
                
                // Check if response is not ok
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (!data || data.length === 0) {
                    // Set error if no gifts found
                    setError(true);
                } else {
                    setGifts(data);  // Store the gifts
                    setError(false);  // Reset error
                }
            } catch (error) {
                console.error('Error fetching gifts:', error);
                setError(true);  // Set error to true in case of failure
            }
        };
        fetchGifts();
    }, []);

    // Navigate to the gift details page
    const goToDetailsPage = (giftId) => {
        navigate(`/app/product/${giftId}`);
    };

    // Format timestamp to a readable date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert Unix timestamp (seconds) to milliseconds
        return date.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    // Get CSS class for condition display
    const getConditionClass = (condition) => {
        if (condition === 'New') {
            return 'text-success';
        } else if (condition === 'Like New') {
            return 'text-warning';
        } else if (condition === 'Older') {
            return 'text-danger';
        } else {
            return 'text-secondary';
        }
    };

    return (
        <div className="container mt-5">
            {/* Display an error if gifts failed to load */}
            {error ? (
                <div className="alert alert-danger" role="alert">
                    Failed to load gifts. Please try again later.
                </div>
            ) : (
                <div className="row">
                    {/* Loop through and display the gifts */}
                    {gifts.map((gift) => (
                        <div key={gift._id} className="col-md-4 mb-4">
                            <div className="card">
                                {/* Display gift image or placeholder */}
                                {gift.image ? (
                                    <img src={gift.image} alt={gift.name} className="card-img-top" />
                                ) : (
                                    <div className="card-img-top no-image-placeholder">No Image Available</div>
                                )}

                                <div className="card-body">
                                    {/* Display gift name */}
                                    <h5 className="card-title">{gift.name}</h5>

                                    {/* Display gift condition */}
                                    <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                        {gift.condition}
                                    </p>

                                    {/* Display formatted date */}
                                    <p className="card-text">{formatDate(gift.date_added)}</p>

                                    {/* Button to view details */}
                                    <button
                                        onClick={() => goToDetailsPage(gift.id)}
                                        className="btn btn-primary"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MainPage;
