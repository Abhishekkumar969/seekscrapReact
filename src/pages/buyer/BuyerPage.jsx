import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import buyerImg from '../../assets/images/buyer.png'; // Adjust the path as necessary
import sellerImg from '../../assets/images/seller.png';


const BuyerPage = () => {
    const navigate = useNavigate();
    const [isEnabled, setIsEnabled] = useState(true);

    const toggleSwitch = () => setIsEnabled(prev => !prev);

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
        navigate("/login");
    };

    return (
        <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                backgroundColor: '#08776E', padding: '15px'
            }}>
                <button style={{ background: 'none', border: 'none', color: 'white' }}>
                    <MenuIcon fontSize="large" />
                </button>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'white', marginRight: '5px' }}>OFF</span>


                    <Switch
                        checked={isEnabled}
                        onChange={toggleSwitch}
                        sx={{
                            width: 50,
                            height: 25,
                            padding: 0,
                            display: 'flex',
                            '& .MuiSwitch-switchBase': {
                                padding: 2,
                                transitionDuration: '300ms',
                                '&.Mui-checked': {
                                    transform: 'translateX(10px)',
                                    color: '#4caf50',
                                    marginTop: '-15px',
                                    '& + .MuiSwitch-track': {
                                        backgroundColor: '#fff',
                                        opacity: 1,
                                    },
                                },
                            },
                            '& .MuiSwitch-thumb': {
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                transition: 'all 0.3s ease',
                            },
                            '& .MuiSwitch-track': {
                                borderRadius: 28 / 2,
                                backgroundColor: 'red',
                                opacity: 1,
                                transition: 'all 0.3s ease',
                            },
                        }}
                    />





                    <span style={{ color: 'white', marginLeft: '5px' }}>ON</span>
                </div>

                <div style={{
                    backgroundColor: 'white', padding: '5px 10px',
                    borderRadius: '10px', textAlign: 'center'
                }}>
                    <div style={{ color: '#08776E', fontWeight: 'bold' }}>452</div>
                    <div style={{ fontSize: '12px' }}>Today's Income</div>
                </div>
            </div>


            <button onClick={logout}>Logout</button>

            {/* Top Buyer Card */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                backgroundColor: '#FFC107', padding: '15px', borderRadius: '10px', margin: '10px'
            }}>
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Top Buyer of the Month</div>
                    <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#D32F2F' }}>Won: Rs.4502</div>
                    <div style={{ fontSize: '14px' }}>Name: Prakash</div>
                </div>
                <img src={buyerImg} alt="Top Buyer" style={{ width: '76px', height: '72px' }} />
            </div>

            {isEnabled ? (
                <>
                    <h2 style={{
                        textAlign: 'center', backgroundColor: '#08776E',
                        padding: '10px 20px', color: 'white', borderRadius: '15px', width: 'fit-content',
                        margin: '20px auto'
                    }}>Customer List</h2>

                    <div style={{ padding: '0 10px', paddingBottom: '80px' }}>
                        {customers.map((item) => (
                            <div key={item.id} style={{
                                display: 'flex', alignItems: 'center', backgroundColor: 'white',
                                padding: '15px', borderRadius: '10px', margin: '15px 0',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)', height: '70px'
                            }}>
                                <img src={sellerImg} alt="Customer" style={{
                                    width: '50px', height: '50px', borderRadius: '25px',
                                    marginRight: '15px'
                                }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                                    <div style={{ color: 'gray' }}>Distance: {item.distance}</div>
                                </div>
                                <button onClick={() => navigate('/users/buyer/location')} style={{
                                    backgroundColor: '#08776E', color: 'white',
                                    padding: '8px 15px', borderRadius: '5px', border: 'none',
                                    fontWeight: 'bold'
                                }}>
                                    Accept
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                    <p style={{ color: 'red', fontSize: '23px' }}>Activate your working mode</p>
                    <p style={{ color: 'red', fontSize: '17px' }}>Click the red button above to turn on</p>
                </div>
            )}
        </div>
    );
}

export default BuyerPage;
