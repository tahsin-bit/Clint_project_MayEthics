export default function Toast({ show, message }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      <span className="toast-icon">✓</span>
      {message}
    </div>
  );
}
