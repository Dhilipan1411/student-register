
import { useState, useEffect } from "react";
import axios from "axios";
import "./Subject.css";

const App = () => {
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null); // For tracking the department being edited

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:8000/subject");
        setDepartments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepartments();
  }, []);

  const handleAddSubject = () => {
    if (subject) {
      setSubjects([...subjects, subject]);
      setSubject("");
    }
  };

  const handleDeleteSubject = (subjectToDelete) => {
    setSubjects(subjects.filter((sub) => sub !== subjectToDelete));
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/subject/${id}`);
      // Fetch updated departments
      const res = await axios.get("http://localhost:8000/subject");
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        // Edit existing department
        await axios.put(`http://localhost:8000/subject/${editId}`, {
          department,
          subjects,
        });
      } else {
        // Add new department
        await axios.post("http://localhost:8000/subject", {
          department,
          subjects,
        });
      }
      setDepartment("");
      setSubjects([]);
      setEditMode(false); // Reset edit mode
      setEditId(null); // Reset edit id
      // Fetch updated departments
      const res = await axios.get("http://localhost:8000/subject");
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditDepartment = (dept) => {
    setEditMode(true);
    setEditId(dept._id);
    setDepartment(dept.department);
    setSubjects(dept.subjects || []);
  };

  return (
    <div className="Sub-full">
      <h1 className="sub-h1">{editMode ? "Edit class and Subjects" : "Add class and Subjects"}</h1>
      <div className="sub-inpt-boxs">
        <div className="first-input-box">
          <input
            className="first-input"
            type="text"
            placeholder="Enter class"
            value={department}
            required
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="sec-input-box">
          <input
            className="sec-input"
            type="text"
            placeholder="Enter Subject"
            value={subject}
            required
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <button className="sub-add" onClick={handleAddSubject}>
          +
        </button>
      </div>

      <div>
        <h2 className="sub-h2">Subjects</h2>
        <table className="sub-table" border="1">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub, index) => (
              <tr key={index}>
                <td>{sub}</td>
                <td>
                  <button className="delete-sub" onClick={() => handleDeleteSubject(sub)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="sum-button" onClick={handleSubmit}>
        {editMode ? "Update" : "Submit"}
      </button>

      <h2 className="Depart-h2">classes</h2>
      <table className="Depart-table" border="1">
        <thead>
          <tr>
            <th>classes</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept._id}>
              <td>{dept.department}</td>
              <td>{Array.isArray(dept.subjects) ? dept.subjects.join(", ") : "No subjects"}</td>
              <td>
                <button className="edit-sub" onClick={() => handleEditDepartment(dept)}>Edit</button>
                <button className="delete-sub" onClick={() => handleDeleteDepartment(dept._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default App;
