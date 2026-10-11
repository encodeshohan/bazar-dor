export const toBengaliNumber = (value: number) =>
    value.toLocaleString("bn-BD", { maximumFractionDigits: 2 });

const units: Record<string, string> = {
    kg: "/কেজি",
    litre: "/লিটার",
    dozen: "/ডজন",
    piece: "/পিস",
};

export const formatUnit = (unit: string) => units[unit] ?? `প্রতি ${unit}`;