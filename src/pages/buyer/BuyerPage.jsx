import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import buyerImg from '../../assets/images/buyer.png'; // Adjust the path as necessary
import sellerImg from '../../assets/images/seller.png';
import './BuyerPage.css';

const BuyerPage = () => {
    const navigate = useNavigate();
    const [isEnabled, setIsEnabled] = useState(() => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18; // Auto ON between 6 AM and 6 PM
    });
    const userToggled = useRef(false);

    const toggleSwitch = () => {
        setIsEnabled(prev => !prev);
        userToggled.current = true;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const hour = new Date().getHours();

            // Only auto-toggle if the user hasn't changed it manually
            if (!userToggled.current) {
                if (hour >= 6 && hour < 18) {
                    setIsEnabled(true);
                } else {
                    setIsEnabled(false);
                }
            }

            // Reset user override daily at 6 AM
            if (hour === 6) {
                userToggled.current = false;
            }

        }, 300000); // Check every 5 minutes

        return () => clearInterval(interval);
    }, []);

    const customers = [
        { id: '1', name: 'Myung Philippe', distance: '1 m' },
        { id: '2', name: 'Myung Philippe', distance: '5 m' },
        { id: '3', name: 'Myung Philippe', distance: '8 m' },
        { id: '4', name: 'Myung Philippe', distance: '15 m' },
        { id: '5', name: 'Myung Philippe', distance: '30 m' },
        { id: '6', name: 'Myung Philippe', distance: '100 m' },
        { id: '7', name: 'Myung Philippe', distance: '180 m' },
        { id: '8', name: 'Myung Philippe', distance: '250 m' },
        { id: '9', name: 'Myung Philippe', distance: '500 m' },
        { id: '10', name: 'Myung Philippe', distance: '1000 m' }
    ];

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/", { replace: true });
    };

    return (
        <div className="buyerPageContainer">
            {/* Header */}
            <div className="buyerHeader">
                <button className="menuButton">
                    <MenuIcon fontSize="large" />
                </button>

                <div className="switchContainer customSwitch">
                    <span className="switchLabel">OFF</span>
                    <Switch
                        checked={isEnabled}
                        onChange={toggleSwitch}
                    />
                    <span className="switchLabel">ON</span>
                </div>


                <div className="incomeCard">
                    <div className="amount">452</div>
                    <div className="label">Today's Income</div>
                </div>
            </div>

            <button onClick={logout}>Logout</button>

            {/* Top Buyer Card */}
            <div className="topBuyerCard">
                <div>
                    <div className="info">Top Buyer of the Month</div>
                    <div className="wonAmount">Won: Rs.4502</div>
                    <div style={{ fontSize: '14px' }}>Name: Prakash</div>
                </div>
                <img src={buyerImg} alt="Top Buyer" style={{ width: '76px', height: '72px' }} />
            </div>

            {isEnabled ? (
                <>
                    <h2 className="customerListHeading">Customer List</h2>
                    <div className="customerListWrapper">
                        {customers.map((item) => (
                            <div key={item.id} className="customerCard">
                                <img src={sellerImg} alt="Customer" className="customerImage" />
                                <div className="customerDetails">
                                    <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                                    <div style={{ color: 'gray' }}>Distance: {item.distance}</div>
                                </div>
                                <button
                                    onClick={() => navigate('/users/buyer/location')}
                                    className="acceptButton"
                                >
                                    Accept
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="inactiveMessage">
                    <p style={{ fontSize: '23px' }}>Activate your working mode</p>
                    <p style={{ fontSize: '17px' }}>Click the red button above to turn on</p>
                </div>
            )}
        </div>
    );

}

export default BuyerPage;
