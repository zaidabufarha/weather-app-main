function RowCard({ text, value }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "hsl(243, 23%, 30%)",
        padding: 20,
        borderRadius: 10,
        flex: 1,
      }}
    >
      <p
        style={{
          color: "white",
          fontSize: 20,
          fontFamily: "DM Sans",
          margin: 0,
        }}
      >
        {text}
      </p>
      <p
        style={{
          color: "white",
          fontSize: 36,
          fontFamily: "DM Sans",
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}
export default RowCard;
