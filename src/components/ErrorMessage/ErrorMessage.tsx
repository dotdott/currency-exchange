import warningIcon from "@/assets/warning-icon.svg";
import "./styles.scss";

const ErrorMessage = ({ errors }: { errors: string[][] }) => {
  return (
    <>
      {errors.length > 0 && (
        <div className="error-message" data-testid="error-message-test-id">
          {errors.map((error, idx) => (
            <div key={idx}>
              <img src={warningIcon}></img>
              {error.map((e) => (
                <span key={e}>{e + " "}</span>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
