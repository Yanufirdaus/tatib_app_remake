import dashboardImg from "@/assets/dashboard_img.png";

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center px-6 py-6 md:px-12 bg-teal-400">

      <div className="flex-1 pb-6 md:pb-0">
        <p className="text-center md:text-left text-4xl md:text-6xl font-bold text-white">
          Tatib Apps
        </p>

        <p className="text-center md:text-justify mt-4 text-sm md:text-lg text-white pr-0 md:pr-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>

      <div className="flex-1 flex justify-center">
        <img
          src={dashboardImg}
          alt="Dashboard Preview"
          className="p-2 md:pb-6 opacity-85"
        />
      </div>

    </div>
  );
};

export default HeroSection;