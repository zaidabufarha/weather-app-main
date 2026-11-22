function RowCard({ text, value }) {
  return (
    <div className="row-card">
      <p className="row-card__label">{text}</p>
      <p className="row-card__value">{value}</p>
    </div>
  );
}
export default RowCard;
