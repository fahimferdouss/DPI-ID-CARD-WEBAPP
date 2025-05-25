import React, { useState, useEffect, useRef } from 'react';
import Tooltip from './Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CollapsibleMenu from './CollapsibleMenu';

function IdCardForm({ department, loggedInSemester, loggedInBoardRoll, onBack, onSubmit, setSubmissionStatus, initialFormData, submissionRollError }) {
  const [formData, setFormData] = useState(initialFormData || {
    name: '',
    fathersName: '',
    mothersName: '',
    dateOfBirth: '',
    bloodGroup: '',
    phoneNumber: '',
    session: '',
    customSession: '',
    classRoll: '',
    boardRoll: loggedInBoardRoll,
    regNo: '',
    group: '',
    shift: '',
    idCardValiditySession: '',
    profileImageLink: '',
  });
  const [errors, setErrors] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showCustomSessionInput, setShowCustomSessionInput] = useState(formData.session === 'Other / Custom Session');
  const [hasAgreed, setHasAgreed] = useState(false);
  const collapsibleMenuRef = useRef(null);


  const generateSessionOptions = () => {
    const startYear = 2016;
    const endYear = 2026;
    const sessions = [];
    for (let year = startYear; year <= endYear; year++) {
      sessions.push(`${year}-${year + 1}`);
    }
    sessions.push('Other / Custom Session');
    return sessions;
  };

  const sessionOptions = generateSessionOptions();

  const calculateIdCardValiditySession = (academicSession) => {
    if (!academicSession || academicSession === 'Other / Custom Session') {
      return '';
    }
    const sessionParts = academicSession.split('-');
    if (sessionParts.length === 2) {
      const endYear = parseInt(sessionParts[1], 10);
      if (!isNaN(endYear)) {
        const validityEndYear = endYear + 7;
        return `${validityEndYear - 1}-${validityEndYear}`;
      }
    }
    return '';
  };

  useEffect(() => {
    const initialSession = initialFormData?.session || '';
    const initialCustomSession = initialFormData?.customSession || '';
    const calculatedValidity = calculateIdCardValiditySession(initialSession === 'Other / Custom Session' ? initialCustomSession : initialSession);

    setFormData(initialFormData || {
      name: '',
      fathersName: '',
      mothersName: '',
      dateOfBirth: '',
      bloodGroup: '',
      phoneNumber: '',
      session: initialSession,
      customSession: initialCustomSession,
      classRoll: '',
      boardRoll: loggedInBoardRoll,
      regNo: '',
      group: '',
      shift: '',
      idCardValiditySession: calculatedValidity,
      profileImageLink: '',
    });
    setErrors({});
    setSubmissionStatus(null);
    setHasAgreed(false); // Corrected typo
    setShowCustomSessionInput(initialSession === 'Other / Custom Session');
  }, [department, loggedInBoardRoll, setSubmissionStatus, initialFormData]);

  useEffect(() => {
    if (submissionRollError) {
      setErrors(prevErrors => ({ ...prevErrors, submissionRollError: submissionRollError }));
      if (collapsibleMenuRef.current) {
        collapsibleMenuRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [submissionRollError]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      let updatedData = { ...prevData, [name]: value };

      if (name === 'session') {
        if (value === 'Other / Custom Session') {
          setShowCustomSessionInput(true);
          updatedData.customSession = '';
          updatedData.idCardValiditySession = '';
        } else {
          setShowCustomSessionInput(false);
          updatedData.customSession = '';
          updatedData.idCardValiditySession = calculateIdCardValiditySession(value);
        }
      } else if (name === 'customSession') {
        if (updatedData.session === 'Other / Custom Session') {
          updatedData.idCardValiditySession = calculateIdCardValiditySession(value);
        }
      }

      if (errors[name]) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
      }
      return updatedData;
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.fathersName.trim()) newErrors.fathersName = 'Father\'s Name is required.';
    if (!formData.mothersName.trim()) newErrors.mothersName = 'Mother\'s Name is required.';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required.';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood Group is required.';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required.';
    else if (!/^\d{11}$/.test(formData.phoneNumber.trim())) newErrors.phoneNumber = 'Phone Number must be exactly 11 digits.';

    if (!formData.session.trim()) {
      newErrors.session = 'Session is required.';
    } else if (formData.session === 'Other / Custom Session' && !formData.customSession.trim()) {
      newErrors.customSession = 'Custom Session is required when "Other" is selected.';
    }

    if (!formData.classRoll.trim()) newErrors.classRoll = 'Class Roll is required.';
    else if (!/^\d{1,9}$/.test(formData.classRoll.trim())) newErrors.classRoll = 'Class Roll must be up to 9 digits.';

    if (!formData.boardRoll.trim()) newErrors.boardRoll = 'Board Roll is required.';
    else if (!/^\d{6}$/.test(formData.boardRoll.trim())) newErrors.boardRoll = 'Board Roll must be exactly 6 digits.';

    if (!formData.regNo.trim()) newErrors.regNo = 'Registration No. is required.';
    else if (!/^\d{10}$/.test(formData.regNo.trim())) newErrors.regNo = 'Registration No. must be exactly 10 digits.';

    if (!formData.group.trim()) newErrors.group = 'Group is required.';
    if (!formData.shift.trim()) newErrors.shift = 'Shift is required.';

    if (!formData.idCardValiditySession.trim()) newErrors.idCardValiditySession = 'ID Card Validity Session could not be calculated. Please check Academic Session.';

    // Validation for profile image link
    if (!formData.profileImageLink.trim()) newErrors.profileImageLink = 'Profile image link is required.';


    if (!hasAgreed) {
      newErrors.agreed = 'You must read and agree to the instructions.';
      if (collapsibleMenuRef.current) {
        collapsibleMenuRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmationModal(true);
    } else {
      console.log('Form has validation errors.');
    }
  };

  const confirmSubmission = () => {
    setShowConfirmationModal(false);
    const dataToSubmit = {
      loggedInSemester: loggedInSemester,
      ...formData,
    };
    if (dataToSubmit.session === 'Other / Custom Session') {
      dataToSubmit.session = dataToSubmit.customSession; // Corrected typo
    }
    delete dataToSubmit.customSession; // Corrected typo
    dataToSubmit.profileImage = formData.profileImageLink;


    onSubmit(dataToSubmit);
  };

  const handleClearForm = () => {
    setFormData({
      name: '',
      fathersName: '',
      mothersName: '',
      dateOfBirth: '',
      bloodGroup: '',
      phoneNumber: '',
      session: '',
      customSession: '',
      classRoll: '',
      boardRoll: loggedInBoardRoll,
      regNo: '',
      group: '',
      shift: '',
      idCardValiditySession: '',
      profileImageLink: '',
    });
    setErrors({});
    setSubmissionStatus(null);
    setHasAgreed(false);
    setShowCustomSessionInput(false);
  };

  const renderInputField = (label, name, type = 'text', placeholder = '', options = [], readOnly = false, maxLength = null, pattern = null, inputMode = null) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200
                      bg-white border border-gray-300 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}
                      ${errors[name] ? 'border-red-500' : ''}`}
          required
          disabled={readOnly}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200
                      bg-white border border-gray-300 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}
                      ${errors[name] ? 'border-red-500' : ''}`}
          required
          readOnly={readOnly}
          maxLength={maxLength}
          pattern={pattern}
          inputMode={inputMode}
        />
      )}
      {errors[name] && <p className="text-red-600 text-xs italic mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        ID Card Information for <span className="text-blue-600">{department}</span>
      </h2>

      <CollapsibleMenu agreed={hasAgreed} setAgreed={setHasAgreed} ref={collapsibleMenuRef} />
      {errors.agreed && <p className="text-red-600 text-sm text-center mb-4">{errors.agreed}</p>}
      {errors.submissionRollError && <p className="text-red-600 text-sm text-center mb-4">{errors.submissionRollError}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pre-filled and Locked Fields */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2 border-gray-300">Login Details (Locked)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Semester (from Login)</label>
              <p className="py-3 px-4 text-gray-800 bg-gray-100 rounded-lg border border-gray-300">
                {loggedInSemester}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Board Roll Number
              </label>
              <p className="py-3 px-4 text-gray-800 bg-gray-100 rounded-lg border border-gray-300">
                {loggedInBoardRoll}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-blue-50 p-6 rounded-xl shadow-inner border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-700 mb-4 border-b pb-2 border-blue-300">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInputField('Full Name', 'name', 'text', 'e.g., Md. Abdullah Al Mamun')}
            {renderInputField('Father\'s Name', 'fathersName', 'text', 'e.g., Mr. Khan')}
            {renderInputField('Mother\'s Name', 'mothersName', 'text', 'e.g., Mrs. Khan')}
            {renderInputField('Date of Birth', 'dateOfBirth', 'date')}
            {renderInputField('Blood Group', 'bloodGroup', 'select', '', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])}
            {renderInputField('Phone Number', 'phoneNumber', 'tel', 'e.g., 01712345678', [], false, 11, "\\d*", "numeric")}

            {/* Profile Image Link Field */}
            <div className="mb-4 col-span-full">
              <label htmlFor="profileImageLink" className="block text-gray-700 text-sm font-bold mb-2">
                Profile Image Link (Google Drive):
                <Tooltip text="1. Upload your passport-sized image to Google Drive. 2. Right-click the image, select 'Share'. 3. Change 'General access' to 'Anyone with the link'. 4. Copy the link and paste it here.">
                  <InfoOutlinedIcon className="ml-1 text-gray-400 text-base cursor-help" />
                </Tooltip>
              </label>
              <input
                type="text"
                id="profileImageLink"
                name="profileImageLink"
                value={formData.profileImageLink}
                onChange={handleChange}
                placeholder="Paste your Google Drive image link here"
                className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200
                            bg-white border border-gray-300 ${errors.profileImageLink ? 'border-red-500' : ''}`}
                required
              />
              {errors.profileImageLink && <p className="text-red-600 text-xs italic mt-1">{errors.profileImageLink}</p>}
              {formData.profileImageLink && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                  <img
                    src={formData.profileImageLink}
                    alt="Profile Preview"
                    className="mx-auto w-32 h-32 object-cover rounded-full shadow-md border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Institute-Specific Information */}
        <div className="bg-green-50 p-6 rounded-xl shadow-inner border border-green-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 border-b pb-2 border-green-300">Institute Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInputField('Academic Session', 'session', 'select', '', sessionOptions)}
            {showCustomSessionInput && (
              <div className="mb-4">
                <label htmlFor="customSession" className="block text-gray-700 text-sm font-bold mb-2">
                  Enter Custom Session
                </label>
                <input
                  type="text"
                  id="customSession"
                  name="customSession"
                  value={formData.customSession}
                  onChange={handleChange}
                  placeholder="e.g., 2027-2028"
                  className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200
                              ${errors.customSession ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.customSession && <p className="text-red-500 text-xs italic mt-1">{errors.customSession}</p>}
              </div>
            )}
            {renderInputField('ID Card Validity Session', 'idCardValiditySession', 'text', '', [], true)}
            {renderInputField('Class Roll', 'classRoll', 'text', 'e.g., 123', [], false, 9, "\\d*", "numeric")}
            {renderInputField('Registration No.', 'regNo', 'text', 'e.g., 1234567890', [], false, 10, "\\d*", "numeric")}
            {renderInputField('Group', 'group', 'text', 'e.g., A/B')}
            {renderInputField('Shift', 'shift', 'select', '', ['1st Shift', '2nd Shift'])}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md
                        hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            ← Back to Departments
          </button>
          <button
            type="button"
            onClick={handleClearForm}
            className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md
                        hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className={`flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg
                        hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            Review & Submit
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Review</h3>
            <p className="text-gray-700 mb-6">
              Please review your information on the next page before final submission.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md
                            hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmission}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg
                            hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Proceed to Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default IdCardForm;