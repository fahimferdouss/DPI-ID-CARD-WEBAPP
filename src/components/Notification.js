import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

function Notification({ message, type, onDismiss }) {
  let bgColor = 'bg-yellow-200';
  let textColor = 'text-yellow-800';
  let borderColor = 'border-yellow-300';

  if (type === 'success') {
    bgColor = 'bg-green-200';
    textColor = 'text-green-800';
    borderColor = 'border-green-300';
  } else if (type === 'error') {
    bgColor = 'bg-red-200';
    textColor = 'text-red-800';
    borderColor = 'border-red-300';
  }

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl
                    ${bgColor} ${textColor} ${borderColor} border
                    backdrop-filter backdrop-blur-sm bg-opacity-70`}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm mr-4">{message}</span>
        <button onClick={onDismiss} className="text-current hover:opacity-75">
          <CloseIcon className="text-base" />
        </button>
      </div>
    </div>
  );
}
export default Notification;