interface Props {
  highlighted: "none" | "a" | "b";
  assist: "none" | "a" | "b";
}

const DuckRabbitFigure = ({ highlighted }: Props) => {
  const accentA = highlighted === "a" ? "hsl(var(--primary) / 0.18)" : "none";
  const accentB = highlighted === "b" ? "hsl(var(--primary) / 0.18)" : "none";
  const mainFill = "hsl(var(--foreground) / 0.78)";
  const eyeFill = "hsl(var(--card))";

  return (
    <svg viewBox="0 0 240 240" className="w-full h-full" role="img"
      aria-label="Ambiguous figure that can be seen as either a duck or a rabbit">
      <rect width="240" height="240" rx="14" fill="hsl(var(--secondary))" />
      {highlighted === "a" && (
        <ellipse cx="100" cy="130" rx="60" ry="40" fill={accentA} style={{ transition: "fill 0.35s ease" }} />
      )}
      {highlighted === "b" && (
        <ellipse cx="140" cy="120" rx="55" ry="45" fill={accentB} style={{ transition: "fill 0.35s ease" }} />
      )}
      <path
        d="M 60,140 C 55,125 58,105 72,100 C 78,98 82,100 85,105 C 88,95 90,72 95,58
           C 98,50 104,48 108,55 C 112,62 110,78 108,90 C 115,80 122,60 128,50
           C 132,44 138,46 138,55 C 138,68 130,88 124,100 C 135,98 148,97 158,100
           C 172,105 182,118 182,134 C 182,152 170,165 155,170 C 140,175 110,175 90,172
           C 70,169 58,158 60,140 Z"
        fill={mainFill} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <circle cx="148" cy="122" r="6" fill={eyeFill} />
      <circle cx="148" cy="122" r="2.5" fill="hsl(var(--foreground))" />
      <path d="M 60,140 C 65,142 72,140 78,138" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.2" />
    </svg>
  );
};

export default DuckRabbitFigure;
