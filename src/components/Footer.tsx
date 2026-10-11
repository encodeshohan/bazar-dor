const Footer = () => {
    return (
        <footer className="mt-10 border-t border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
                <p className="font-medium text-gray-800">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>
                <p className="text-gray-500 md:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;