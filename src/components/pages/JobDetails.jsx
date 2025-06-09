import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getJobDetails } from '../../api/carrierApis';

const JobDetails = () => {
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) {
      navigate('/careers');
      return;
    }

    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getJobDetails(id);
        console.log(data);

        setJobDetail(data.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch job details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
        <p className="mt-4 text-blue-600">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
        <Link
          to="/careers"
          className="text-blue-600 hover:text-blue-700 hover:underline transition duration-200"
        >
          Return to Careers Page
        </Link>
      </div>
    );
  }

  if (!jobDetail) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to="/careers"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 group font-medium"
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

        <div className="bg-white rounded-xl shadow-lg border border-blue-100">
          <div className="border-b border-blue-100 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{jobDetail.title}</h1>
            <div className="flex items-center text-blue-600 text-sm mb-4">
              <span>{jobDetail.department}</span>
              <span className="mx-2">•</span>
              <span>{jobDetail.location}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                {jobDetail.type}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                {jobDetail.experience}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                {jobDetail.salary}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                {jobDetail.openings} openings
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                {jobDetail.status}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                <p className="text-gray-600 leading-relaxed">{jobDetail.Description}</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">About the Role</h2>
                <p className="text-gray-600 leading-relaxed">{jobDetail.about_the_role}</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {(jobDetail?.skills || []).map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {(jobDetail?.requirements || []).map((item, index) => (
                    <li key={index} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Benefits</h2>
                <div className="flex flex-wrap gap-2">
                  {(jobDetail?.benefits || []).map((benefit, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                      {benefit}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="flex gap-4 mt-8 pt-8 border-t border-blue-100">
              <Link
                to={`/apply/${jobDetail._id}`}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition duration-200"
              >
                Apply Now
              </Link>
              <Link
                to="/careers"
                className="px-6 py-3 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition duration-200"
              >
                View All Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
