import React from "react";

const SideContent = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-5">Recent news</h3>
      <a
        href="#"
        className="flex flex-col items-center  rounded-lg md:max-w-xl "
      >
        <img
          className="object-cover w-full   md:h-auto  "
          src="https://www.aljazeera.com/wp-content/uploads/2023/11/AP23323576681891-1700417500.jpg?fit=1170%2C780&quality=80"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </a>
      <hr />
      <br />
      <a
        href="#"
        className="flex flex-col items-center  rounded-lg md:max-w-xl "
      >
        <img
          className="object-cover w-full   md:h-auto  "
          src="https://www.aljazeera.com/wp-content/uploads/2023/11/AP23323576681891-1700417500.jpg?fit=1170%2C780&quality=80"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </a>
    </div>
  );
};

export default SideContent;
