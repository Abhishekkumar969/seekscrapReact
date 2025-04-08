import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import buyerImg from '../../assets/images/buyer.png';
import './SellerPage.css'; // Make sure this CSS file is next to SellerPage.jsx or adjust path

export default function SellerPage() {
    const navigate = useNavigate();
    const listRef = useRef(null);

    const buyers = [
        { id: '1', name: 'Myung Philippe', distance: '50m', rating: 4.9 },
        { id: '2', name: 'Myung Philippe', distance: '80m', rating: 4.9 },
        { id: '3', name: 'Myung Philippe', distance: '100m', rating: 4.9 },
        { id: '4', name: 'Myung Philippe', distance: '120m', rating: 4.9 },
        { id: '5', name: 'Myung Philippe', distance: '150m', rating: 4.9 },
        { id: '6', name: 'Myung Philippe', distance: '170m', rating: 4.9 },
        { id: '7', name: 'Yung Philippe', distance: '191m', rating: 4.9 },
    ];

    const scrollToList = () => {
        listRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/", { replace: true });
    };



    return (
        <div className="container">
            {/* Top Bar */}
            <div className="topBar">

                <button className="menuBtn">☰</button>

                <div className="locationContainer">
                    <span className="locationIcon">📍</span>
                    <div className="locationText">
                        <h3>Mustafapur</h3>
                        <p>Kothawan</p>
                    </div>
                </div>
            </div>

            {/* Banner and Button */}
            <div className="banner">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            <button onClick={logout}>Logout</button>

            <div ref={listRef} className="centerBtn">
                <button className="scrollBtn" onClick={scrollToList}>Buyers List</button>
            </div>

            {/* Buyers List */}
            <div className="buyersList">
                {buyers.map((buyer) => (
                    <div key={buyer.id} className="buyerCard" onClick={() => navigate('/users/seller/rates')}>
                        <img src={buyerImg} alt="Buyer" className="buyerImage" />
                        <div className="buyerInfo">
                            <h4>{buyer.name}</h4>
                            <span>Distance:</span>
                            <strong> {buyer.distance}</strong>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
