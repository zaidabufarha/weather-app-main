function DayCard({ day, weather, high, low }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "hsl(243, 23%, 30%)",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        color: "white",
        fontSize: 18,
        fontFamily: "DM Sans",
        margin: 0,
        flex: 1,
      }}
    >
      <p style={{ fontSize: 24, margin: 0 }}>{day}</p>
      <img src={weather} style={{ width: 70 }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <p style={{ margin: 0 }}>{high}</p>
        <p style={{ margin: 0 }}>{low}</p>
      </div>
    </div>
  );
}
export default DayCard;
