function DayCard({ day, weather, high, low }) {
  return (
    <div className="day-card">
      <p className="day-card__day">{day}</p>
      <img src={weather} className="day-card__icon" />
      <div className="day-card__temps">
        <p className="day-card__temp">{high}</p>
        <p className="day-card__temp">{low}</p>
      </div>
    </div>
  );
}
export default DayCard;
