import propTypes from "prop-types";
import "./index.css";
function Loader({ isFullScreen = false }) {
  return (
    <>
      {isFullScreen ? (
        <span className="loader"></span>
      ) : (
        <span className="loader"></span>
      )}
    </>
  );
}

Loader.propTypes = {
  isFullScreen: propTypes.bool,
};
export default Loader;
