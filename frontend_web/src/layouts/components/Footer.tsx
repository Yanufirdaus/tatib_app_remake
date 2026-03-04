const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-auto">
            <div className="container mx-auto text-center text-xs md:text-sm">
                <p>&copy; {new Date().getFullYear()} Tatib Apps. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;