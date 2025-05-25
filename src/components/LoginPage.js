import React, { useState } from 'react';
import Tooltip from './Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function LoginPage({ onLogin, setLoginError }) {
  const [semester, setSemester] = useState('');
  const [boardRoll, setBoardRoll] = useState('');
  const [error, setError] = useState('');

  const semesters = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoginError('');

    if (!semester || !boardRoll) {
      setError('Please select your semester and enter your board roll.');
      return;
    }

    if (semester === '7th Semester' || semester === '8th Semester') {
      setError('Students in 7th or 8th semester do not need to apply as they will be graduating soon.');
      return;
    }

    if (!/^\d{6}$/.test(boardRoll)) {
      setError('Board Roll Number must be exactly 6 digits.');
      return;
    }

    const submittedRolls = JSON.parse(localStorage.getItem('submittedRolls') || '[]');
    if (submittedRolls.includes(boardRoll)) {
      setError('This board roll has already submitted information.');
      return;
    }

    onLogin(semester, boardRoll);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-md border border-gray-200 mx-auto my-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Student Login</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="mb-4">
          <label htmlFor="semester" className="block text-gray-700 text-sm font-bold mb-2">
            Select Semester
          </label>
          <select
            id="semester"
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white border-gray-300"
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="boardRoll" className="block text-gray-700 text-sm font-bold mb-2">
            Board Roll Number:
            <Tooltip text="Enter the 6-digit board roll number found on your admit card.">
              <InfoOutlinedIcon className="ml-1 text-gray-400 text-base cursor-help" />
            </Tooltip>
          </label>
          <input
            type="text"
            id="boardRoll"
            name="boardRoll"
            value={boardRoll}
            onChange={(e) => setBoardRoll(e.target.value)}
            placeholder="e.g., 123456"
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white border-gray-300"
            maxLength="6"
            pattern="\d*"
            inputMode="numeric"
            required
          />
        </div>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg
                     hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginPage;