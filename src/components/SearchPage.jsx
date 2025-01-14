import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=CfNfvoZGs1DOAfZFs4Jo5ebIS1XZOK2-688BUjggvRc`
      );
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages();
  };

  const handleAddCaption = (image) => {
    navigate("/caption-editor", { state: { image } });
  };

  // return (
  //   <div className="search-page">
  //     <form onSubmit={handleSearch}>
  //       <input
  //         type="text"
  //         placeholder="Enter your search term"
  //         value={query}
  //         onChange={(e) => setQuery(e.target.value)}
  //       />
  //       <button type="submit">Search</button>
  //     </form>
  //     <div className="image-grid">
  //       {images.map((image) => (
  //         <div key={image.id} className="image-item">
  //           <img src={image.urls.small} alt={image.alt_description} />
  //           <button onClick={() => handleAddCaption(image)}>Add Caption</button>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className="p-6 space-y-6">
      <header className="text-left">
        <p className="font-bold">Name: Md Kashif Raza Ansari</p>
        <p className="font-bold">Email: kashifjsr7@gmail.com</p>
      </header>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter your search term"
            className="w-72 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="border border-gray-300 p-4 rounded-lg text-center shadow-md"
          >
            <img
              src={image.urls.full}
              alt={`Image ${image.id}`}
              className="w-full h-auto rounded-lg mb-4 object-cover aspect-square"
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={() => handleAddCaption(image)}
            >
              Add Caption
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
