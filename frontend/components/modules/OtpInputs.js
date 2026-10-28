import styles from "./OtpModal.module.css";

function OtpInputs({ otp, setOtp, inputRefs }) {
  return (
    <div className={styles.otpInputs} dir="ltr">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          aria-label={`رقم ${index + 1} کد تأیید`}
          onChange={(event) => {
            const value = event.target.value.replace(/\D/g, "").slice(-1);

            setOtp((previousOtp) => {
              const updatedOtp = [...previousOtp];
              updatedOtp[index] = value;
              return updatedOtp;
            });

            if (value && index < 5) {
              inputRefs.current[index + 1]?.focus();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !otp[index] && index > 0) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
          onPaste={(event) => {
            event.preventDefault();

            const pastedDigits = event.clipboardData
              .getData("text")
              .replace(/\D/g, "")
              .slice(0, 6);

            if (!pastedDigits) return;

            setOtp((previousOtp) => {
              const updatedOtp = [...previousOtp];

              pastedDigits.split("").forEach((digit, digitIndex) => {
                updatedOtp[digitIndex] = digit;
              });

              return updatedOtp;
            });

            const nextIndex = Math.min(pastedDigits.length, 5);
            inputRefs.current[nextIndex]?.focus();
          }}
        />
      ))}
    </div>
  );
}

export default OtpInputs;
