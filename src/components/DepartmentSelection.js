import React from 'react';

function DepartmentSelection({ departments, onSelect }) {
  const iconClass = "text-blue-500 text-4xl mb-2 w-10 h-10";

  const getDepartmentIconComponent = (departmentName) => {
    switch (departmentName) {
      case "Architecture Technology": return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 14c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1z"/></svg>;
      case "Civil Technology": return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2V4h-2v6h2v4h-2v4h4v-4zm-2 4h-2v-2h2v2z"/></svg>;
      case "Chemical Technology": return <svg className={iconClass} fill="currentColor" viewBox="00 0 24 24"><path d="M15 17v-3.5c0-.83-.67-1.5-1.5-1.5S12 12.67 12 13.5V17H6V4h.01L6 4.01 10 4v2h4V4h4v13h-3zM12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/></svg>;
      case "Food Technology": return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0H4V6h16v4zm-9 4H4v2h7v-2zm9 0h-7v2h7v-2zM4 18h7v2H4v-2z"/></svg>;
      case "Computer Science and Technology": return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>;
      case "Electrical Technology": return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M13 18h-2v-2h2v2zm2-4h-4V7h4v7zm-2-9H6V3h5v2zM17 3h-4V1h4v2zM9 1h4v2H9V1zM5 3h4v2H5V3zM19 1h-4v2h4V1z"/></svg>;
      case "Electronics Technology": return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>;
      case "Environmental Technology": return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L12 13l-4 4 3 3 1-1 1 1-2 2zM12 4.07c3.95.49 7 3.85 7 7.93 0 .62-.08 1.21-.21 1.79L12 11l4-4-3-3-1 1-1-1 2-2z"/></svg>;
      case "Mechanical Technology": return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.09-.75-1.71-1l-.36-2.5c-.05-.24-.25-.42-.49-.42h-4c-.24 0-.44.18-.49.42l-.36 2.5c-.62.25-1.19.6-1.71 1l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.12.22-.07.49.12.64l2.11 1.65c-.04.32-.07.64-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.09.75 1.71 1l.36 2.5c.05.24.25.42.49.42h4c.24 0 .44-.18.49-.42l-.36-2.5c.62-.25 1.19-.6 1.71-1l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>;
      case "Automobile Technology": return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 2.01C18.72 1.42 18.16 1 17.5 1h-11c-.66 0-1.22.42-1.42 1.01L3 8v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V8l-2.08-5.99zM6.5 12c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9s1.5.67 1.5 1.5S7.33 12 6.5 12zm11 0c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5S18.33 12 17.5 12zM5 6h14l-.8-2.4c-.09-.28-.35-.4-.6-.4H5.9c-.25 0-.51.12-.6.4L5 6z"/></svg>;
      case "Refrigeration and Air Conditioning": return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M18 11h-1.5c-1.38 0-2.5 1.12-2.5 2.5V16h-1.5v-2.5c0-1.38-1.12-2.5-2.5-2.5H6V11h1.5c1.38 0 2.5-1.12 2.5-2.5V6h1.5v2.5c0 1.38 1.12 2.5 2.5 2.5H18V11zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>;
      case "Power Technology": return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M13 18h-2v-2h2v2zm2-4h-4V7h4v7zm-2-9H6V3h5v2zM17 3h-4V1h4v2zM9 1h4v2H9V1zM5 3h4v2H5V3zM19 1h-4v2h4V1z"/></svg>;
      default: return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Select Your Department</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept, index) => (
          <button
            key={dept}
            onClick={() => onSelect(dept)}
            className="group relative flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm
                       hover:bg-blue-50 transition-all duration-200 transform hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75
                       border border-gray-200
                       animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <span className="relative z-10">
              {getDepartmentIconComponent(dept)}
            </span>
            <span className="relative z-10 text-lg font-semibold text-blue-700 group-hover:text-blue-800 transition-colors duration-200 text-center">
              {dept}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
export default DepartmentSelection;