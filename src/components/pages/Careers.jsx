import React, { useEffect, useState } from 'react';
import { getJobs } from '../../api/carrierApis';
import JobCard from '../common/JobCard';
import Stats from '../common/Stats';

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const jobsPerPage = 4;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const jobs = await getJobs();
      setJobListings(Array.isArray(jobs.data) ? jobs.data : []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load jobs. Please try again later.');
      setJobListings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const locations = [...new Set(jobListings.map(job => job.location))];

  // Search and filter logic
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = locationFilter ? job.location === locationFilter : true;
    return matchesSearch && matchesLocation;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div>
      {/* Banner Section */}
      <div className="relative h-[400px] w-full mb-12">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.1"
          alt="Careers Banner"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl max-w-2xl text-center">
            Be part of a team that's dedicated to creating exceptional wellness experiences
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Stats Section */}
        <Stats />

        {/* Search and Filter Section */}
        {!isLoading && !error && (
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search jobs by title or skills..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Current Opportunities Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Current Opportunities</h2>
            {!isLoading && !error && (
              <div className="text-blue-600">
                {filteredJobs.length} Open Position{filteredJobs.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 mx-auto border-4 border-blue-500 border-t-transparent rounded-full"></div>
              <p className="mt-4 text-gray-600">Loading jobs...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <button
                onClick={fetchJobs}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                {currentJobs.map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </div>

              {currentJobs.length === 0 && (
                <div className="text-center py-8 text-gray-600">
                  No jobs found matching your criteria.
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg ${currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Why Join Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-600">Continuous learning and advancement opportunities</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Competitive Pay</h3>
              <p className="text-gray-600">Excellent compensation and benefits package</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Great Culture</h3>
              <p className="text-gray-600">Supportive and inclusive work environment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
