import CategoryLinks from "./CategoryLinks";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavLinks = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories",
    );
    const categories: Category[] = res.ok ? await res.json() : [];

    return <CategoryLinks categories={categories} />;
};

export default NavLinks;