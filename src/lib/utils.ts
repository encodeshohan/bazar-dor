import { Product, SortOption } from "@/types";

export const toBengaliNumber = (value: number) =>
    value.toLocaleString("bn-BD", { maximumFractionDigits: 2 });

const units: Record<string, string> = {
    kg: "/কেজি",
    litre: "/লিটার",
    dozen: "/ডজন",
    piece: "/পিস",
};

export const formatUnit = (unit: string) => units[unit] ?? `প্রতি ${unit}`;


const bengaliDigits = "০১২৩৪৫৬৭৮৯";

// "১,৮৫০ টাকা" -> 1850
export const parseBengaliPrice = (text: string): number => {
    const ascii = text
        .replace(/[০-৯]/g, (d) => String(bengaliDigits.indexOf(d)))
        .replace(/[^0-9.]/g, "");
    return Number(ascii);
};

export const sortProducts = (products: Product[], option: SortOption) => {
    if (option === "default") return products;

    const price = (p: Product) =>
        parseBengaliPrice(`${toBengaliNumber(p.today)} টাকা`);

    return [...products].sort((a, b) =>
        option === "price-asc" ? price(a) - price(b) : price(b) - price(a),
    );
};


// Only allow same-site paths, so a crafted link can't redirect users elsewhere
export const getSafeCallbackUrl = (url: string | null) =>
    url && url.startsWith("/") && !url.startsWith("//") ? url : "/";