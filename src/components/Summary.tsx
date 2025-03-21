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
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Patient Summary Generator</h2>
            
            <input
                type="text"
                placeholder="Enter Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            
            <button
                onClick={generateSummary}
                disabled={loading || !patientId}
                className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
            >
                {loading ? "Generating..." : "Generate Summary"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            
            {summary && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="font-semibold">Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default SummaryGenerator;