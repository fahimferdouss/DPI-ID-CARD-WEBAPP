import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Import InfoOutlinedIcon

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative inline-block group">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block
                             bg-gray-800 text-white text-xs rounded py-1 px-2 z-50 whitespace-nowrap shadow-lg">
        {text}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0
                        border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
      </div>
    </div>
  );
};
export default Tooltip;