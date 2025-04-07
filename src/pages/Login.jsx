import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import logo from "../assets/images/logo.png";
import sellerIcon from "../assets/images/seller.png";
import buyerIcon from "../assets/images/buyer.png";
import collectorIcon from "../assets/images/collector.png";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [step, setStep] = useState("input");
    const [verifying, setVerifying] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [showResend, setShowResend] = useState(false);
    const navigate = useNavigate();

    const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.role) {
            navigate(`/${user.role}`);
        }
    }, [navigate]);


    const sendOtp = async () => {
        if (!role || !phone) return alert("Please select role and enter phone");

        const generatedOtp = generateOtp();
        const docRef = doc(db, role, phone);

        try {
            await setDoc(docRef, { phone, role, otp: generatedOtp });
            alert(`Your OTP is ${generatedOtp}`);
            setStep("otp");

            setTimeout(async () => {
                await deleteDoc(docRef);
                console.log("OTP expired and deleted");
            }, 30 * 60 * 1000);
        } catch (err) {
            console.error("Error sending OTP:", err);
            alert("Failed to send OTP");
        }
    };

    const handleOtpChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, ""); // digits only
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            if (otp[index]) {
                // Just clear current input
                newOtp[index] = "";
            } else if (index > 0) {
                // Move back to previous input
                const prevInput = document.getElementById(`otp-${index - 1}`);
                if (prevInput) prevInput.focus();

                newOtp[index - 1] = "";
            }
            setOtp(newOtp);
        }
    };

    const verifyOtp = async () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length < 4) {
            return;
        }

        setVerifying(true);
        setShowResend(false);

        try {
            const docRef = doc(db, role, phone);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                setShowResend(true);
                return;
            }

            const data = docSnap.data(); // 👈 Now data is defined here!

            if (data.otp === enteredOtp) {
                // 👉 Store user state
                const userData = { phone, role };
                localStorage.setItem("user", JSON.stringify(userData));
                navigate(`/${role}`);
            } else {
                setShowResend(true); // Show resend option
            }

        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Failed to verify OTP");
            setShowResend(true);
        }

        setVerifying(false);
    };



    return (
        <div className={styles.container}>
            <button className={styles.helpButton}>Help</button>

            <img src={logo} alt="SeekScrap Logo" className={styles.logo} />

            {role === "" && (
                <>
                    <h2 className={styles.subtitle}>Choose your category</h2>
                    <div className={styles.row}>
                        <button
                            className={`${styles.button} ${styles.seller}`}
                            onClick={() => setRole("seller")}
                        >
                            <img src={sellerIcon} alt="Seller" className={styles.icon} />
                            Seller
                        </button>
                        <button
                            className={`${styles.button} ${styles.buyer}`}
                            onClick={() => setRole("buyer")}
                        >
                            <img src={buyerIcon} alt="Buyer" className={styles.icon} />
                            Buyer
                        </button>
                    </div>
                    <button
                        className={`${styles.button} ${styles.collector}`}
                        onClick={() => setRole("collector")}
                    >
                        <img src={collectorIcon} alt="Collector" className={styles.icon} />
                        Collector
                    </button>

                    <div className={styles.hintBox}>
                        <p><strong>Hint:</strong></p>
                        <p><strong>Seller:</strong> List your scrap materials to find buyers.</p>
                        <p><strong>Buyer:</strong> Purchase scrap from sellers.</p>
                        <p><strong>Collector:</strong> Manage scrap materials.</p>
                    </div>
                </>
            )}

            {role !== "" && step === "input" && (
                <div className={styles.inputContainer}>
                    <h2 className={styles.subtitle}>Type your phone number</h2>
                    <div className={styles.phoneContainer}>
                        <span className={styles.countryCode}>+91</span>
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={styles.phoneInput}
                        />
                    </div>
                    <p className={styles.terms}>
                        By continuing, you accept the <span className={styles.link}>Terms of Service</span>, <span className={styles.link}>Privacy Policy</span>, and <span className={styles.link}>Content Policy</span>.
                    </p>
                    <button onClick={sendOtp} className={styles.continueButton}>Send OTP</button>
                </div>
            )}

            {step === "otp" && (
                <div className={styles.inputContainer}>
                    <h2 className={styles.subtitle}>Type your OTP</h2>

                    <p className={styles.editText} onClick={() => setStep("input")} style={{ cursor: "pointer" }}>
                        Edit to phone number? <span className={styles.phoneNumber}>+91{phone}</span>
                    </p>

                    <div className={styles.otpBoxes}>
                        {[0, 1, 2, 3].map((index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="number"
                                maxLength="1"
                                className={styles.otpInput}
                                value={otp[index] || ""}
                                onChange={(e) => handleOtpChange(e, index)}
                                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <p className={styles.otpInfo}>We have sent OTP to your mobile number.</p>
                    {showResend && (
                        <p className={styles.resendText} onClick={sendOtp}>
                            Didn’t receive OTP? <span className={styles.resendLink}>Resend OTP</span>
                        </p>
                    )}

                    <button onClick={verifyOtp} className={styles.continueButton} disabled={verifying}>
                        {verifying ? "Verifying OTP..." : "Verify OTP"}
                    </button>
                </div>
            )}

        </div>
    );
}

export default Login;
