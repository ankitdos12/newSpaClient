import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <Link
            to={`/job-details/${job._id}`}
            className="block group bg-white hover:bg-gray-50 border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-lg"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
                        {job.title}
                    </h3>
                    <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        {job.openings} open
                    </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {job.experience}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {job.type}
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{job.Description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                        {job.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                {skill}
                            </span>
                        ))}
                        {job.skills.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                +{job.skills.length - 3} more
                            </span>
                        )}
                    </div>
                    <span className="text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                        View Details →
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default JobCard;
