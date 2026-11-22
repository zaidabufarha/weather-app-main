function HourCard({ icon, hour, temperature }) {
  return (
    <div className="hour-card">
      <div className="hour-card__time">
        <img src={icon} width={50} height={50} />
        <p>{hour}</p>
      </div>
      <p className="hour-card__temp">{temperature}°</p>
    </div>
  );
}

export default HourCard;
