import { connection } from "next/server";

const HeaderDate = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return <span className="text-xs text-gray-500">{date}</span>;
};

export default HeaderDate;