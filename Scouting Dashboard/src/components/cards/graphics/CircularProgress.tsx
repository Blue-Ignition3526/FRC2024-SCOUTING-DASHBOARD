function CircularProgress({ percentage, text }: { percentage: number, text: string }) {
  let radius = 60;
  let circumference = 2 * Math.PI * radius;
  let offset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="circular-progress" width="140" height="140">
      <circle
        className="circular-progress__background"
        stroke="#ddd"
        strokeWidth="15"
        fill="transparent"
        r={radius}
        cx="70"
        cy="70"
      />
      <circle
        className="circular-progress__progress"
        stroke="#4c9aff"
        strokeWidth="15"
        fill="transparent"
        r={radius}
        cx="70"
        cy="70"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text
        className="circular-progress__text"
        x="70"
        y="75"
        textAnchor="middle"
      >
        {text}
      </text>
    </svg>
  );
}

export default CircularProgress