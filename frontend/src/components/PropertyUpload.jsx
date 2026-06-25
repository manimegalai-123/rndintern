
import { useState } from "react";
import api from "../services/api";

function PropertyUpload() {

    const [ownerName, setOwnerName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [area, setArea] = useState("");
    const [floor, setFloor] = useState("");
    const [status, setStatus] = useState("");

    const [files, setFiles] = useState([]);
    const [result, setResult] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

        if (files.length === 0) {
            alert("Please select images");
            return;
        }

        setLoading(true);

        const formData = new FormData();

        formData.append("owner_name", ownerName);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("location", location);
        formData.append("area", area);
        formData.append("floor", floor);
        formData.append("status", status);

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        try {

            const response = await api.post(
                "/pipeline/",
                formData
            );

            console.log(response.data);

            setResult(response.data);

        } catch (error) {

            console.log(error);

            if (error.response) {
                console.log(error.response.data);
                alert(JSON.stringify(error.response.data));
            } else {
                alert("Upload failed");
            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="container mt-4">

            <h1 className="text-center mb-4">
                🏠 AI Real Estate Platform
            </h1>

            <div className="card p-4 shadow">

                <input
                    className="form-control mb-2"
                    placeholder="Owner Name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Floor"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <input
                    className="form-control"
                    type="file"
                    multiple
                    onChange={(e) => {

                        setFiles(e.target.files);

                        if (e.target.files.length > 0) {

                            setPreview(
                                URL.createObjectURL(
                                    e.target.files[0]
                                )
                            );

                        }

                    }}
                />

                <br />

                {
                    preview &&
                    <img
                        src={preview}
                        width="400"
                        alt="preview"
                        className="img-fluid rounded"
                    />
                }

                <br />

                <button
                    className="btn btn-primary"
                    onClick={handleUpload}
                >
                    Upload
                </button>

                <br />

                {
                    loading &&
                    <h4>Processing Images...</h4>
                }

            </div>

            <br />

            {
                result &&
                <div className="card p-4 shadow">

                    <h2>Detected Rooms</h2>

                    <pre>
                        {JSON.stringify(result, null, 2)}
                    </pre>

                </div>
            }

        </div>
    );
}

export default PropertyUpload;

