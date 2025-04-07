import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import styles from "../styles/Home.module.css";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        const timer = setTimeout(() => {
            if (user && user.role) {
                navigate(`/${user.role}`);
            } else {
                navigate("/login");
            }
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
