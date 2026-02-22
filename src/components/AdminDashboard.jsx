import React, { useState, useEffect } from 'react';

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("AdminDashboard Crashed:", error, errorInfo);
    }

    handleReset = () => {
        localStorage.removeItem('delego_applications');
        window.location.reload();
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
                    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-red-100 text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Dashboard Error</h2>
                        <p className="text-gray-600 mb-6">Something went wrong while loading the data.</p>
                        <div className="bg-gray-100 p-4 rounded-lg text-left text-xs font-mono text-red-500 mb-6 overflow-auto max-h-32">
                            {this.state.error?.toString()}
                        </div>
                        <button
                            onClick={this.handleReset}
                            className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 w-full"
                        >
                            Clear Data & Retry
                        </button>
                        <button
                            onClick={this.props.onBack}
                            className="mt-4 text-gray-400 hover:text-gray-600 text-sm"
                        >
                            Go Back to Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const AdminDashboard = ({ onBack }) => {
    return (
        <ErrorBoundary onBack={onBack}>
            <DashboardContent onBack={onBack} />
        </ErrorBoundary>
    )
};

const DashboardContent = ({ onBack }) => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        try {
            // Load submissions from local storage
            const raw = localStorage.getItem('delego_applications');
            const stored = raw ? JSON.parse(raw) : [];

            if (Array.isArray(stored)) {
                setSubmissions(stored.reverse()); // Newest first
            } else {
                setSubmissions([]);
            }
        } catch (error) {
            console.error("Failed to load applications:", error);
            setSubmissions([]);
        }
    }, []);

    const clearData = () => {
        if (confirm('Are you sure you want to delete all submissions?')) {
            localStorage.removeItem('delego_applications');
            setSubmissions([]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col font-sans text-slate-900">
            <div className="max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-gray-500">Founding Influencer Applications</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={clearData}
                            className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors"
                        >
                            Clear Data
                        </button>
                        <button
                            onClick={onBack}
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm font-medium transition-colors"
                        >
                            Back to Site
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Applications</h3>
                        <p className="text-4xl font-bold">{submissions.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Top Category</h3>
                        <p className="text-xl font-bold truncate">
                            {submissions.length > 0
                                ? Object.entries(submissions.reduce((acc, curr) => {
                                    acc[curr.category || 'Unspecified'] = (acc[curr.category || 'Unspecified'] || 0) + 1;
                                    return acc;
                                }, {})).sort((a, b) => b[1] - a[1])?.[0]?.[0] || 'N/A'
                                : 'N/A'}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Recent City</h3>
                        <p className="text-xl font-bold truncate">{submissions[0]?.city || 'N/A'}</p>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-500">Date</th>
                                    <th className="p-4 font-semibold text-gray-500">Name / Handle</th>
                                    <th className="p-4 font-semibold text-gray-500">Contact</th>
                                    <th className="p-4 font-semibold text-gray-500">Expertise</th>
                                    <th className="p-4 font-semibold text-gray-500">Stats</th>
                                    <th className="p-4 font-semibold text-center text-gray-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {submissions.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-400">
                                            No applications received yet.
                                        </td>
                                    </tr>
                                ) : (
                                    submissions.map((sub, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-gray-400 whitespace-nowrap">
                                                {new Date(sub.timestamp).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <div className="font-bold text-gray-900">{sub.name}</div>
                                                <div className="text-blue-600 font-medium">{sub.handle}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-gray-600">{sub.email}</div>
                                                <div className="text-xs text-gray-400">{sub.city}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-medium text-gray-900">{sub.category}</div>
                                                <div className="text-xs text-gray-400">{sub.neighborhood}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-gray-600 font-mono text-xs">
                                                    {sub.followers} • {sub.reach}
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                                                    Pending
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
