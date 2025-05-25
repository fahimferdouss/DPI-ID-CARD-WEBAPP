import React, { useState, useEffect } from 'react';
import Notification from './components/Notification'; // Assuming moved to components
import Header from './components/Header'; // Assuming moved to components
import Footer from './components/Footer'; // Assuming moved to components
import LoginPage from './components/LoginPage'; // Assuming moved to components
import DepartmentSelection from './components/DepartmentSelection'; // Assuming moved to components
import IdCardForm from './components/IdCardForm'; // Assuming moved to components
import ReviewPage from './components/ReviewPage'; // Assuming moved to components

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'departments', 'form', 'review'
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [notification, setNotification] = useState(null); // { message: '', type: '' }
  const [loggedInSemester, setLoggedInSemester] = useState('');
  const [loggedInBoardRoll, setLoggedInBoardRoll] = useState('');
  const [formDataForReview, setFormDataForReview] = useState(null); // To hold data for review page
  const [submissionRollError, setSubmissionRollError] = useState(null); // New state for roll validation error


  // No favicon setting here
  useEffect(() => {
    // This useEffect can be removed if there's no other logic intended here.
  }, []);

  // List of 12 departments - UPDATED
  const departments = [
    "Architecture Technology",
    "Civil Technology",
    "Chemical Technology",
    "Food Technology",
    "Computer Science and Technology",
    "Electrical Technology",
    "Electronics Technology",
    "Environmental Technology",
    "Mechanical Technology",
    "Automobile Technology",
    "Refrigeration and Air Conditioning", // Changed from RAC Technology
    "Power Technology"
  ];

  // Function to handle successful login
  const handleLoginSuccess = (semester, boardRoll) => {
    setLoggedInSemester(semester);
    setLoggedInBoardRoll(boardRoll);
    setCurrentView('departments');
    setNotification({ message: 'Login successful!', type: 'success' });
  };

  // Function to handle department selection
  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
    setCurrentView('form');
    setNotification(null); // Clear notification
    setSubmissionRollError(null); // Clear roll error when moving to form
  };

  // Function to go back to department selection
  const handleBackToDepartments = () => {
    setSelectedDepartment(null);
    setCurrentView('departments');
    setNotification(null); // Clear notification
    setSubmissionRollError(null); // Clear roll error when going back
  };

  // Function to handle form submission (moves to review page)
  const handleFormSubmitForReview = (formData) => {
    setFormDataForReview(formData);
    setCurrentView('review');
    setNotification({ message: 'Please review your information before final submission.', type: 'warning' });
    setSubmissionRollError(null); // Clear roll error when moving to review
  };

  // Function to handle returning from review to form for edits
  const handleEditForm = () => {
    setCurrentView('form');
    setNotification(null); // Clear notification
    setSubmissionRollError(null); // Clear roll error when editing
  };

  // Function for final submission (from review page)
  const handleFinalSubmit = async () => {
    setNotification({ message: 'Submitting information...', type: 'warning' });
    setSubmissionRollError(null); // Clear previous roll error before new validation

    const boardRoll = formDataForReview.boardRoll;
    const classRoll = formDataForReview.classRoll;

    // Validation: Board Roll and Class Roll cannot be the same
    if (boardRoll === classRoll) {
      setNotification({ message: 'Submission failed: Board Roll and Class Roll cannot be the same.', type: 'error' });
      setSubmissionRollError('Board Roll and Class Roll cannot be the same.');
      setCurrentView('form');
      return;
    }

    // Validation: First 5 digits cannot match
    if (boardRoll.length >= 5 && classRoll.length >= 5 && boardRoll.substring(0, 5) === classRoll.substring(0, 5)) {
      setNotification({ message: 'Submission failed: The first 5 digits of Board Roll and Class Roll cannot match.', type: 'error' });
      setSubmissionRollError('The first 5 digits of Board Roll and Class Roll cannot match.');
      setCurrentView('form');
      return;
    }

    try {
      // Replace with your actual Google Apps Script Web App URL
      const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzty5EpyyoTIwf4G13pk4M584FVtjV1H5F7pLk58YMa39qX6D3MwwTtZk1RGJM0Hwck/exec';

      // Prepare data for Google Apps Script.
      // We now send the profileImageLink directly.
      const dataToSend = { ...formDataForReview };
      dataToSend.profileImage = formDataForReview.profileImageLink; // Send the URL directly

      const response = await fetch(appsScriptUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend), // Send the entire form data object
      });

      // Check if the response was successful (HTTP status code 2xx)
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = `Server error: ${errorData.message}`;
          } else if (errorData.error) {
            errorMessage = `Server error: ${errorData.error}`;
          }
        } catch (e) {
          // If response is not JSON, or parsing fails, use generic message
          console.error("Failed to parse error response:", e);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();

      if (result.success) {
          setNotification({ message: 'Information submitted successfully!', type: 'success' });
          console.log('Submission successful!', result);
          // Simulate marking roll as submitted in localStorage
          const submittedRolls = JSON.parse(localStorage.getItem('submittedRolls') || '[]');
          if (!submittedRolls.includes(loggedInBoardRoll)) {
              submittedRolls.push(loggedInBoardRoll);
              localStorage.setItem('submittedRolls', JSON.stringify(submittedRolls));
          }
          setCurrentView('login'); // Go back to login after successful submission
      } else {
          setNotification({ message: `Submission failed: ${result.message || 'Unknown error'}`, type: 'error' });
          console.error('Submission failed:', result);
      }
    } catch (error) {
      setNotification({ message: `Submission failed: ${error.message}`, type: 'error' });
      console.error('Submission failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 flex flex-col relative overflow-hidden">
      {/* Subtle moving background glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-glow-slow-1 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-glow-slow-2 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-glow-slow-3 pointer-events-none"></div>

      <Header />

      <main className="flex-grow flex items-center justify-center p-8 relative z-10 flex-col"> {/* Increased padding on main, added flex-col */}
        <div className="w-full max-w-4xl mx-auto"> {/* Centered container */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-10 leading-tight"> {/* Increased bottom margin */}
            Dhaka Polytechnic Institute
            <br />
            <span className="text-blue-600 text-2xl md:text-3xl font-semibold mt-2 block">ID Card Information Collection</span>
          </h1>

          {currentView === 'login' && (
            <LoginPage onLogin={handleLoginSuccess} setLoginError={setNotification} />
          )}

          {currentView === 'departments' && (
            <DepartmentSelection
              departments={departments}
              onSelect={handleSelectDepartment}
            />
          )}

          {currentView === 'form' && (
            <>
              <IdCardForm
                department={selectedDepartment}
                loggedInSemester={loggedInSemester}
                loggedInBoardRoll={loggedInBoardRoll}
                onBack={handleBackToDepartments}
                onSubmit={handleFormSubmitForReview} // Submit to review page first
                setSubmissionStatus={setNotification} // Pass setNotification for form-level errors
                initialFormData={formDataForReview} // Pass back data if editing
                submissionRollError={submissionRollError} // Pass the new error state
              />
            </>
          )}

          {currentView === 'review' && formDataForReview && (
            <ReviewPage
              formData={formDataForReview}
              department={selectedDepartment} // Pass selectedDepartment to ReviewPage
              onEdit={handleEditForm}
              onConfirm={handleFinalSubmit}
            />
          )}

          {/* Notification Popup */}
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onDismiss={() => setNotification(null)}
            />
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;