import React, { useState, forwardRef } from 'react'; // Import forwardRef

const CollapsibleMenu = forwardRef(({ agreed, setAgreed }, ref) => {
  const [isOpen, setIsOpen] = useState(true); // Default to true to auto-open

  const handleCheckboxChange = (e) => {
    setAgreed(e.target.checked);
  };

  return (
    <div ref={ref} className="w-full md:w-4/5 mx-auto my-8 rounded-2xl overflow-hidden shadow-lg border border-yellow-100
                    bg-yellow-50 bg-opacity-70 backdrop-filter backdrop-blur-sm animate-fade-in">
      <button
        className="w-full flex justify-between items-center p-3 text-base font-semibold text-yellow-700
                   bg-yellow-100 hover:bg-yellow-200
                   transition-all duration-300 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Attention Students. Must Read Before Filling the Form.</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-3 bg-white text-gray-700 border-t border-yellow-100 animate-fade-in">
          <h3 className="font-semibold text-sm text-yellow-700 mb-1">Class Roll:</h3>
          <p className="mb-2 text-xs">
            This is a temporary roll number given to you by Dhaka Polytechnic Institute during the admission process,
            until you receive your board roll in the official admit card for the 1st semester final exam.
          </p>
          <h3 className="font-semibold text-sm text-yellow-700 mb-1">Board Roll:</h3>
          <p className="text-xs mb-2">
            This is the official roll number printed on your admit card, issued by the Bangladesh Technical Education Board (BTEB).
            It is used in all board examinations and official academic records.
          </p>
          <h3 className="font-semibold text-sm text-yellow-700 mb-1">Image:</h3>
          <p className="text-xs mb-4">
            You must submit a formal passport-sized photo of yourself. If you upload a photo that does not meet the requirements, your application will be rejected.
          </p>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="agreeToInstructions"
              checked={agreed}
              onChange={handleCheckboxChange}
              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out cursor-pointer"
            />
            <label htmlFor="agreeToInstructions" className="ml-2 text-sm text-yellow-800 cursor-pointer">
              I have read and understood the instructions.
            </label>
          </div>
        </div>
      )}
    </div>
  );
});

export default CollapsibleMenu;