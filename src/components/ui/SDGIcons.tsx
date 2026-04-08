import Image from "next/image";

const SDG_DATA: Record<number, { title: string; color: string }> = {
  1:  { title: "No Poverty", color: "#E5243B" },
  2:  { title: "Zero Hunger", color: "#DDA63A" },
  3:  { title: "Good Health & Well-being", color: "#4C9F38" },
  4:  { title: "Quality Education", color: "#C5192D" },
  5:  { title: "Gender Equality", color: "#FF3A21" },
  6:  { title: "Clean Water", color: "#26BDE2" },
  7:  { title: "Affordable Energy", color: "#FCC30B" },
  8:  { title: "Decent Work", color: "#A21942" },
  9:  { title: "Industry & Innovation", color: "#FD6925" },
  10: { title: "Reduced Inequalities", color: "#DD1367" },
  11: { title: "Sustainable Cities", color: "#FD9D24" },
  12: { title: "Responsible Consumption", color: "#BF8B2E" },
  13: { title: "Climate Action", color: "#3F7E44" },
  14: { title: "Life Below Water", color: "#0A97D9" },
  15: { title: "Life on Land", color: "#56C02B" },
  16: { title: "Peace & Justice", color: "#00689D" },
  17: { title: "Partnerships", color: "#19486A" },
};

export function SDGBadge({ num, size = "md" }: { num: number; size?: "sm" | "md" | "lg" }) {
  const sdg = SDG_DATA[num];
  if (!sdg) return null;

  const sizes = {
    sm: { outer: "w-10 h-10", text: "text-[10px]", title: "text-[7px]" },
    md: { outer: "w-14 h-14", text: "text-sm", title: "text-[8px]" },
    lg: { outer: "w-20 h-20", text: "text-lg", title: "text-[9px]" },
  };

  const s = sizes[size];

  return (
    <div
      className={`${s.outer} rounded-xl flex flex-col items-center justify-center text-white font-bold shadow-md transition-transform duration-300 hover:scale-110 cursor-default`}
      style={{ backgroundColor: sdg.color }}
      title={`SDG ${num}: ${sdg.title}`}
    >
      <span className={s.text}>{num}</span>
      <span className={`${s.title} font-medium leading-tight text-center px-0.5 opacity-90`}>
        {sdg.title.length > 12 ? sdg.title.split(" ").slice(0, 2).join(" ") : sdg.title}
      </span>
    </div>
  );
}

export function SDGRow({ goals, size = "md" }: { goals: number[]; size?: "sm" | "md" | "lg" }) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {goals.map((num) => (
        <SDGBadge key={num} num={num} size={size} />
      ))}
    </div>
  );
}

export { SDG_DATA };
