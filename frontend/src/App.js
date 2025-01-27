import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const host = "http://localhost:5000";
  const [formData, setFormData] = useState({
    name: "",
    socialHandle: "",
  });
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${host}/api/fetchallUser`);
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("socialHandle", formData.socialHandle);

    Array.from(files).forEach((file) => {
      data.append("images", file);
    });

    try {
      const res = await axios.post(`${host}/api/form`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data);
      setUsers((prev) => [...prev, res.data.data]); // Update user list
    } catch (error) {
      console.error(error);
      setResponse({ error: "An error occurred while uploading the data." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mb-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Upload Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="socialHandle" className="block text-sm font-medium text-gray-700">
              Social Handle
            </label>
            <input
              type="text"
              id="socialHandle"
              name="socialHandle"
              value={formData.socialHandle}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300">
            Submit
          </button>
        </form>
        {response && (
          <div className="mt-4">
            {response.error ? (
              <p className="text-red-500">{response.error}</p>
            ) : (
              <div>
                <h2 className="text-lg font-bold text-green-600">Success!</h2>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Admin Panel</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Social Handle</th>
                <th className="border border-gray-300 p-2">Images</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border border-gray-300 p-2">{user.name}</td>
                  <td className="border border-gray-300 p-2">{user.socialHandle}</td>
                  <td className="border border-gray-300 p-2">
                    {user.image ? (
                      <img
                        src={`data:image/png;base64,${btoa(
                          new Uint8Array(user.image.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ""
                          )
                        )}`}
                        alt="User Upload"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <span>No images uploaded</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
