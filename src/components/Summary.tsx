import { useState } from "react";
import axios from "axios";

const SummaryGenerator: React.FC = () => {
    const [patientId, setPatientId] = useState<string>("");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generateSummary = async () => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.post("http://localhost:5000/api/patients/generate_summary", {
                pid: patientId,
            });

            setData(response.data);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to fetch summary");
        }

        setLoading(false);
    };

    // Function to generate a brief summary
    const getSmallSummary = () => {
        if (!data) return "";

        const { history, medications, tests } = data;
        let summary = [];

        if (history.length > 0) {
            summary.push(`Past conditions include ${history.map((h: any) => h.diagnosis).join(", ")}.`);
        }

        if (medications.length > 0) {
            summary.push(`Currently on medications: ${medications.split("\n").join(", ")}.`);
        }

        if (tests.length > 0) {
            const abnormalTests = tests.filter((t: any) => t.result.includes("high") || t.result.includes("low"));
            if (abnormalTests.length > 0) {
                summary.push(`Recent tests indicate possible concerns: ${abnormalTests.map((t: any) => t.type).join(", ")}.`);
            }
        }

        return summary.length > 0 ? summary.join(" ") : "No critical issues found.";
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="flex w-full max-w-5xl gap-8">
                {/* Left Side - Search Section */}
                <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 border border-gray-300">
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-4">🔍 Search</h2>
                    <input
                        type="text"
                        placeholder="Enter Patient ID"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <button
                        onClick={generateSummary}
                        disabled={loading || !patientId}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center justify-center"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                        ) : (
                            "Generate Summary"
                        )}
                    </button>
                </div>

                {/* Right Side - Summary Section */}
                <div className="w-2/3 bg-white shadow-lg rounded-lg p-6 border border-gray-300">
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-4">📄 Patient Summary</h2>
                    <div className="border-t border-gray-300 my-3"></div>

                    {loading ? (
                        <div className="flex items-center justify-center h-48">
                            <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        </div>
                    ) : data ? (
                        <div className="text-gray-700">
                            {/* Small Summary */}
                            <div className="bg-blue-100 p-3 rounded-lg mb-4">
                                <strong>📝 Small Summary:</strong> {getSmallSummary()}
                            </div>

                            {/* Patient Information */}
                            <h3 className="font-bold text-lg mt-2">Patient Information</h3>
                            <p><strong>Name:</strong> {data.patient.name}</p>
                            <p><strong>Age:</strong> {data.patient.age}</p>
                            <p><strong>Gender:</strong> {data.patient.gender}</p>
                            <p><strong>Contact:</strong> {data.patient.contact}</p>
                            <p><strong>Email:</strong> {data.patient.email}</p>
                            <p><strong>Address:</strong> {data.patient.address}</p>

                            {/* Medications */}
                            <h3 className="font-bold text-lg mt-4">Medications</h3>
                            {data.medications.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {data.medications.split("\n").map((med: string, index: number) => (
                                        <li key={index}>{med}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No current medications.</p>
                            )}

                            {/* Medical History Table */}
                            <h3 className="font-bold text-lg mt-4">Medical History</h3>
                            {data.history.length > 0 ? (
                                <table className="w-full border-collapse border border-gray-300 mt-2">
                                    <thead>
                                        <tr>
                                            <th className="border px-4 py-2 bg-gray-200">Date</th>
                                            <th className="border px-4 py-2 bg-gray-200">Diagnosis</th>
                                            <th className="border px-4 py-2 bg-gray-200">Treatment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.history.map((hist: any, index: number) => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{hist.date}</td>
                                                <td className="border px-4 py-2">{hist.diagnosis}</td>
                                                <td className="border px-4 py-2">{hist.treatment}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No prior medical history.</p>
                            )}

                            {/* Recent Tests Table */}
                            <h3 className="font-bold text-lg mt-4">Recent Tests</h3>
                            {data.tests.length > 0 ? (
                                <table className="w-full border-collapse border border-gray-300 mt-2">
                                    <thead>
                                        <tr>
                                            <th className="border px-4 py-2 bg-gray-200">Test Type</th>
                                            <th className="border px-4 py-2 bg-gray-200">Date</th>
                                            <th className="border px-4 py-2 bg-gray-200">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.tests.map((test: any, index: number) => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{test.type}</td>
                                                <td className="border px-4 py-2">{test.date}</td>
                                                <td className="border px-4 py-2">{test.result}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No recent tests.</p>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Enter a Patient ID and generate a summary.</p>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        </div>
    );
};

export default SummaryGenerator;
