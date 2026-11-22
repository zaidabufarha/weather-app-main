function HourCard({ icon, hour, temperature }) {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        justifyContent: "space-between",
        padding: 5,
        backgroundColor: "#2F2F49",
        alignContent: "center",
        gap: 20,
        fontSize: 20,
        borderRadius: 10,
        color: "white",
        fontFamily: "DM Sans",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={icon} width={50} height={50} />
        <p>{hour}</p>
      </div>
      <p
        style={{
          fontSize: 18,
          marginRight: 10,
        }}
      >
        {temperature}°
      </p>
    </div>
  );
}

export default HourCard;
