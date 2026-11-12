import styles from "./Layout.module.css";
import Footer from "../modules/Layout/Footer";
import MobileMenu from "../modules/Layout/MobileMenu";
import Header from "../modules/Layout/Header";
import LoginModal from "../modules/Auth/LoginModal";
import OtpModal from "../modules/Auth/OtpModal";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile } from "../../services/userService";

function Layout({ children }) {
  const { user, login, logout, isLoading, updateUser } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [testCode, setTestCode] = useState("");
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  useEffect(() => {
    const handleAuthExpired = () => {
      setMobile("");
      setTestCode("");
      setIsOtpOpen(false);
      setIsAccountMenuOpen(false);
      setIsLoginOpen(true);
    };

    window.addEventListener("auth-expired", handleAuthExpired);

    return () => {
      window.removeEventListener("auth-expired", handleAuthExpired);
    };
  }, []);

  const handleOtpSent = (mobileNumber, code) => {
    setMobile(mobileNumber);
    setTestCode(code || "");
    setIsLoginOpen(false);
    setIsOtpOpen(true);
  };

  const handleLoginSuccess = async (data) => {
    const success = login(data);

    if (!success) return;

    try {
      const profileData = await getUserProfile();

      updateUser(profileData);

      setMobile(data.user.mobile);
      setTestCode("");
      setIsOtpOpen(false);
    } catch (error) {
      logout();
      setMobile("");
      setTestCode("");
      setIsOtpOpen(false);
      setIsLoginOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    setMobile("");
    setTestCode("");
    setIsAccountMenuOpen(false);
    setIsOtpOpen(false);
    setIsLoginOpen(false);
  };
  return (
    <div className={styles.page}>
      {testCode && (
        <p className={styles.testCode}>
          کد آزمایشی: <span dir="ltr">{testCode}</span>
        </p>
      )}
      <Header
        user={user}
        isLoading={isLoading}
        isOtpOpen={isOtpOpen}
        isMenuOpen={isMenuOpen}
        isAccountMenuOpen={isAccountMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onLoginClick={() => {
          if (!isOtpOpen) setIsLoginOpen(true);
        }}
        onAccountToggle={() => setIsAccountMenuOpen((prev) => !prev)}
        onAccountClose={() => setIsAccountMenuOpen(false)}
        onLogout={handleLogout}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main className={styles.main}>{children}</main>
      <Footer />
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onOtpSent={handleOtpSent}
        />
      )}
      {isOtpOpen && (
        <OtpModal
          mobile={mobile}
          onBack={() => {
            setIsOtpOpen(false);
            setIsLoginOpen(true);
          }}
          onClose={() => setIsOtpOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default Layout;
