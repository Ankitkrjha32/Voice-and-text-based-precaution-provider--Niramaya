import { useState } from "react";
import axios from "axios";

const SummaryGenerator: React.FC = () => {
    const [patientId, setPatientId] = useState<string>("");
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generateSummary = async () => {
        setLoading(true);
        setError(null);
        setSummary(null);

        try {
            const response = await axios.post("http://localhost:5000/generate-summary", {
                patient_id: patientId,
            });

            setSummary(response.data.summary);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to fetch summary");
        }

        setLoading(false);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-white flex items-center justify-center p-6">
            <div className="relative z-10 max-w-lg w-full mx-auto p-8 bg-white/90 shadow-xl rounded-xl border border-gray-200 backdrop-blur-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Patient Summary Generator
                </h2>

                <input
                    type="text"
                    placeholder="Enter Patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                />

                <button
                    onClick={generateSummary}
                    disabled={loading || !patientId}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                    {loading ? "Generating..." : "Generate Summary"}
                </button>

                {error && <p className="text-red-500 text-center mt-3">{error}</p>}

                {summary && (
                    <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                        <h3 className="font-semibold text-gray-700">Summary:</h3>
                        <p className="text-gray-600">{summary}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SummaryGenerator;
