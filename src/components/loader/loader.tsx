import "./loader.css";

export function Loader() {
  return (
    <div className="loader__container">
      <p>Loading...</p>
      <img
        src="erp-circle-background-blue.png"
        alt="loader"
        className="loader__image"
      />
    </div>
  );
}
