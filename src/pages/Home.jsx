import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import styles from "../styles/Home.module.css"; // CSS Module

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles.loaderContainer}>
            <img src={logo} alt="SeekScrap Logo" className={styles.loaderLogo} />
        </div>
    );
}

export default Home;
