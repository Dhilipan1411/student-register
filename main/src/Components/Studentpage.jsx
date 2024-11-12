

import './studentpage.css';
import axios from 'axios';
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilterUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", age: "", RollNo: "", gender: "" });
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/Users");
      setUsers(res.data);
      setFilterUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getAllCities = async () => {
    try {
      const res = await axios.get("http://localhost:8000/City");
      setCityList(res.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getAllClass = async () => {
    try {
      const res = await axios.get("http://localhost:8000/subject");
      setClassList(res.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllCities();
    getAllClass();
  }, []);

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchText)
    );
    setFilterUsers(filteredUsers);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/Users/${id}`);
        setUsers(users.filter(user => user._id !== id));
        setFilterUsers(filteredUsers.filter(user => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleAdd = () => {
    setUserData({ name: "", age: "", RollNo: "", gender: "" });
    setSelectedCity(""); // Clear selected city
    setSelectedClass(""); // Clear selected class
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    getAllUsers();
  };

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData._id) {
        await axios.put(`http://localhost:8000/Users/${userData._id}`, { 
          ...userData, city: selectedCity, department: selectedClass 
        });
      } else {
        await axios.post("http://localhost:8000/Users", { 
          ...userData, city: selectedCity, department: selectedClass 
        });
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
    closeModal();
  };

  const handleEdit = (user) => {
    setUserData(user);
    setSelectedCity(user.city ? user.city._id : "");
    setSelectedClass(user.department ? user.department._id : "");
    setIsModalOpen(true);
  };

  const changeCity = (e) => {
    setSelectedCity(e.target.value);
  };

  const changeClass = (e) => {
    setSelectedClass(e.target.value);
  };

  // Function to sort users by RollNo
  const sortedUsers = filteredUsers.sort((a, b) => a.RollNo - b.RollNo);

  return (
    <div className="container">
      <h3>Student Register</h3>
      <div className="input-search">
        <input type="search" placeholder='Search' onChange={handleSearchChange} />
        <button className="btn green" onClick={handleAdd}>Add</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Roll.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Class</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td> 
              <td>{user.RollNo}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.department ? user.department.department : "N/A"}</td>
              <td>{user.city ? user.city.city : "N/A"}</td>
              <td>
                <button className="btn green" onClick={() => handleEdit(user)}>Edit</button>
              </td>
              <td>
                <button className="btn red" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{userData._id ? "Edit Record" : "Add Record"}</h2>
            <div className="input-group">
              <label htmlFor="RollNo">Roll.No</label>
              <input type="number" name="RollNo" id="RollNo" value={userData.RollNo} 
              onChange={handleData} required />
            </div>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={userData.name} 
              onChange={handleData} required />
            </div>
            <div className="input-group">
              <label htmlFor="age">Age</label>
              <input type="number" name="age" id="age" value={userData.age} 
              onChange={handleData} required />
            </div>
            <div className="input-group">
              <label htmlFor="gender">Gender</label>
              <select className='form-control' name="gender" value={userData.gender} onChange={handleData} required>
                <option value="">--Select Gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="dep">Class</label>
              <select className='form-control' value={selectedClass} onChange={changeClass}>
                <option value="">--Select Class--</option>
                {classList.map((department) => (
                  <option key={department._id} value={department._id}>{department.department}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <select className='form-control' value={selectedCity} onChange={changeCity}>
                <option value="">--Select City--</option>
                {cityList.map((city) => (
                  <option key={city._id} value={city._id}>{city.city}</option>
                ))}
              </select>
            </div>
           
            <button className='btn green' onClick={handleSubmit}>
              {userData._id ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


// import './studentpage.css';
// import axios from 'axios';
// import { useEffect, useState } from "react";

// function App() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilterUsers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [userData, setUserData] = useState({ name: "", age: "", RollNo: "", gender: "", percentage: "", subjects: [] });
//   const [cityList, setCityList] = useState([]);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [classList, setClassList] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");

//   const getAllUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/Users");
//       setUsers(res.data);
//       setFilterUsers(res.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const getAllCities = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/City");
//       setCityList(res.data);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   const getAllClass = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/subject");
//       setClassList(res.data);
//     } catch (error) {
//       console.error("Error fetching classes:", error);
//     }
//   };

//   useEffect(() => {
//     getAllUsers();
//     getAllCities();
//     getAllClass();
//   }, []);

//   const handleSearchChange = (e) => {
//     const searchText = e.target.value.toLowerCase();
//     const filteredUsers = users.filter((user) =>
//       user.name.toLowerCase().includes(searchText)
//     );
//     setFilterUsers(filteredUsers);
//   };

//   const handleDelete = async (id) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this user?");
//     if (isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:8000/Users/${id}`);
//         setUsers(users.filter(user => user._id !== id));
//         setFilterUsers(filteredUsers.filter(user => user._id !== id));
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   const handleAdd = () => {
//     setUserData({ name: "", age: "", RollNo: "", gender: "", percentage: "", subjects: [] });
//     setSelectedCity(""); // Clear selected city
//     setSelectedClass(""); // Clear selected class
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     getAllUsers();
//   };

//   const handleData = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Log userData for debugging
//     console.log("User data submitted:", userData);

//     // Calculate percentage if subjects are not empty
//     if (userData.percentage === "" && userData.subjects && userData.subjects.length > 0) {
//       const totalMarks = userData.subjects.reduce((total, subject) => total + parseInt(subject.mark || 0), 0);
//       const calculatedPercentage = (totalMarks / (userData.subjects.length * 100)) * 100;
//       setUserData({ ...userData, percentage: calculatedPercentage.toFixed(2) });
//     }

//     try {
//       if (userData._id) {
//         // Update existing user
//         await axios.put(`http://localhost:8000/Users/${userData._id}`, { 
//           ...userData, city: selectedCity, department: selectedClass 
//         });
//       } else {
//         // Add new user
//         await axios.post("http://localhost:8000/Users", { 
//           ...userData, city: selectedCity, department: selectedClass 
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting user data:", error);
//     }
//     closeModal();
//   };

//   const handleEdit = (user) => {
//     setUserData(user);
//     setSelectedCity(user.city ? user.city._id : "");
//     setSelectedClass(user.department ? user.department._id : "");
//     setIsModalOpen(true);
//   };

//   const changeCity = (e) => {
//     setSelectedCity(e.target.value);
//   };

//   const changeClass = (e) => {
//     setSelectedClass(e.target.value);
//   };

//   const sortedUsers = filteredUsers.sort((a, b) => a.RollNo - b.RollNo);

//   return (
//     <div className="container">
//       <h3>Student Register</h3>
//       <div className="input-search">
//         <input type="search" placeholder='Search' onChange={handleSearchChange} />
//         <button className="btn green" onClick={handleAdd}>Add</button>
//       </div>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>S.no</th>
//             <th>Roll.No</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Gender</th>
//             <th>Class</th>
//             <th>City</th>
//             <th>Percentage</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedUsers.map((user, index) => (
//             <tr key={user._id}>
//               <td>{index + 1}</td> 
//               <td>{user.RollNo}</td>
//               <td>{user.name}</td>
//               <td>{user.age}</td>
//               <td>{user.gender}</td>
//               <td>{user.department ? user.department.department : "N/A"}</td>
//               <td>{user.city ? user.city.city : "N/A"}</td>
//               <td>{user.percentage ? user.percentage : "N/A"}</td>
//               <td>
//                 <button className="btn green" onClick={() => handleEdit(user)}>Edit</button>
//               </td>
//               <td>
//                 <button className="btn red" onClick={() => handleDelete(user._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={closeModal}>&times;</span>
//             <h2>{userData._id ? "Edit Record" : "Add Record"}</h2>
//             <div className="input-group">
//               <label htmlFor="RollNo">Roll.No</label>
//               <input type="number" name="RollNo" id="RollNo" value={userData.RollNo} 
//               onChange={handleData} required />
//             </div>
//             <div className="input-group">
//               <label htmlFor="name">Name</label>
//               <input type="text" name="name" id="name" value={userData.name} 
//               onChange={handleData} required />
//             </div>
//             <div className="input-group">
//               <label htmlFor="age">Age</label>
//               <input type="number" name="age" id="age" value={userData.age} 
//               onChange={handleData} required />
//             </div>
//             <div className="input-group">
//               <label htmlFor="gender">Gender</label>
//               <select className='form-control' name="gender" value={userData.gender} onChange={handleData} required>
//                 <option value="">--Select Gender--</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             </div>
//             <div className="input-group">
//               <label htmlFor="dep">Class</label>
//               <select className='form-control' value={selectedClass} onChange={changeClass}>
//                 <option value="">--Select Class--</option>
//                 {classList.map((department) => (
//                   <option key={department._id} value={department._id}>{department.department}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="input-group">
//               <label htmlFor="city">City</label>
//               <select className='form-control' value={selectedCity} onChange={changeCity}>
//                 <option value="">--Select City--</option>
//                 {cityList.map((city) => (
//                   <option key={city._id} value={city._id}>{city.city}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="input-group">
//               <label htmlFor="subjects">Subjects</label>
//               {/* Add subjects dynamically */}
//             </div>
//             <button className="btn green" onClick={handleSubmit}>
//               {userData._id ? "Update" : "Add"} Record
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
