import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { appllyJob } from '../../api/carrierApis';
const Apply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send data directly as JSON
      const response = await appllyJob({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        resume: formData.resume,
        cover_letter: formData.cover_letter
      }, id);

      if (response.success) {
        // Reset form
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          resume: '',
          cover_letter: ''
        });

        alert('Application submitted successfully!');
        navigate('/careers');
      } else {
        throw new Error(response.message || 'Failed to submit application');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link
            to="/careers"
            className="inline-flex items-center text-white hover:text-blue-100 mb-6 group font-medium"
          >
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Careers
          </Link>
          <h1 className="text-4xl font-bold text-white mb-3">Apply for {id || 'Position'}</h1>
          <p className="text-lg text-blue-100">Take the first step towards your next great opportunity</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm">
            <div className="flex">
              <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10 bg-white rounded-xl shadow-lg p-8 border border-blue-100">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-6 pb-2 border-b border-blue-100">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-700">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-blue-50/30 hover:bg-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-700">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-blue-50/30 hover:bg-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-blue-50/30 hover:bg-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91xxxxxxxx"
                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-blue-50/30 hover:bg-white"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-6 pb-2 border-b border-blue-100">
                Professional Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Resume Link</label>
                  <div className="relative">
                    <input
                      type="url"
                      name="resume"
                      value={formData.resume}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/your-resume"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-blue-50/30 hover:bg-white"
                      required
                    />
                    <svg className="absolute left-3 top-3.5 h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <p className="mt-2 text-sm text-blue-600">Please provide a link to your resume (Google Drive, Dropbox, etc.)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Cover Letter</label>
                  <div className="relative">
                    <textarea
                      name="cover_letter"
                      value={formData.cover_letter}
                      onChange={handleChange}
                      rows="8"
                      className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-blue-50/30 hover:bg-white"
                      placeholder="Dear Hiring Manager,

Please include:
• Why you're interested in this position
• Your relevant experience and skills
• What makes you a great fit for the role
• Any specific achievements you'd like to highlight"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-blue-100">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg transition duration-300 font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                loading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Application...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
            <p className="text-center text-sm text-blue-600 mt-4">
              By submitting this application, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;
