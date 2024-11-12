

const About = () => {
  return (
    <div>About</div>
  )
}

export default About



// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./Mark.css";

// function App() {
//   const [students, setStudents] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [newStudentName, setNewStudentName] = useState('');
//   const [selectedStudent, setSelectedStudent] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [marks, setMarks] = useState({});
//   const [percentage, setPercentage] = useState(null);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/subject');
//         setDepartments(response.data);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//       }
//     };

//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/Users');
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       }
//     };

//     fetchDepartments();
//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     if (selectedStudent) {
//       const student = students.find((s) => s._id === selectedStudent);
//       if (student) {
//         setNewStudentName(student.name);
//         setSelectedDepartment(student.department._id);

//         // Load only the subjects that the student has, along with their marks
//         const initialMarks = {};
//         student.subjects.forEach((subject) => {
//           initialMarks[subject.name] = subject.mark || 0;
//         });
//         setMarks(initialMarks);

//         // Calculate and set the percentage based on the student's subjects
//         const totalMarks = Object.values(initialMarks).reduce((acc, mark) => acc + mark, 0);
//         const percentage = (totalMarks / (student.subjects.length * 100)) * 100;
//         setPercentage(percentage.toFixed(2));
//       }
//     } else {
//       resetForm();
//     }
//   }, [selectedStudent, students]);

//   const resetForm = () => {
//     setNewStudentName('');
//     setSelectedDepartment('');
//     setMarks({});
//     setPercentage(null);
//   };

//   const handleMarksChange = (subject, mark) => {
//     const markValue = parseInt(mark, 10);
//     if (markValue > 100) {
//       alert('Marks should be less than or equal to 100');
//       return;
//     }
//     setMarks((prev) => ({ ...prev, [subject]: markValue }));

//     const totalMarks = Object.values({ ...marks, [subject]: markValue }).reduce((acc, m) => acc + m, 0);
//     const percentage = (totalMarks / (Object.keys(marks).length * 100)) * 100;
//     setPercentage(percentage.toFixed(2));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       name: newStudentName,
//       department: selectedDepartment,
//       subjects: Object.keys(marks).map((subject) => ({
//         name: subject,
//         mark: marks[subject]
//       })),
//       percentage: percentage,
//     };

//     try {
//       if (selectedStudent) {
//         await axios.put(`http://localhost:8000/Users/${selectedStudent}`, data);
//         alert('Marks updated successfully!');
//       } else {
//         await axios.post('http://localhost:8000/Users', data);
//         alert('Student added successfully!');
//       }

//       resetForm();
//       setSelectedStudent('');

//       const response = await axios.get('http://localhost:8000/Users');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error saving student:', error);
//     }
//   };

//   const calculatePercentage = (student) => {
//     const totalMarks = student.subjects.reduce((acc, subject) => acc + subject.mark, 0);
//     const percentage = (totalMarks / (student.subjects.length * 100)) * 100;
//     return percentage.toFixed(2);
//   };

//   return (
//     <div className='Mark-full-box'>
//       <h1 className='mark-h1'>Student Management</h1>
//       <div className='mark-student-department-box'>
//         <div className='mark-student-box'>
//           <h3 className='mark-h3-1'>Select Existing Student</h3>
//           <select className='mark-select-student'
//             value={selectedStudent}
//             onChange={(e) => setSelectedStudent(e.target.value)}
//           >
//             <option value="">Select Student</option>
//             {students.map((student) => (
//               <option key={student._id} value={student._id}>
//                 {student.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedStudent && (
//           <div className='mark-department-box'>
//             <h3 className='mark-h3-2'>Student Class</h3>
//             <input
//               type="text"
//               className='Select-Department'
//               value={departments.find(dept => dept._id === selectedDepartment)?.department || ''}
//               disabled
//             />
//           </div>
//         )}
//       </div>

//       <div className='mark-enter-size'>
//         {selectedStudent && (
//           <form onSubmit={handleSubmit}>
//             <div className='mark-btn-onside'>
//               <h3 className='mark-h3-3'>Subjects and Marks</h3>
//               <table className='mark-table'>
//                 <thead>
//                   <tr>
//                     <th>Subject</th>
//                     <th>Marks</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students
//                     .find((student) => student._id === selectedStudent)
//                     ?.subjects.map((subject) => (
//                       <tr key={subject.name}>
//                         <td>{subject.name}</td>
//                         <td>
//                           <input
//                             type="number"
//                             placeholder="Enter Marks"
//                             value={marks[subject.name] !== undefined ? marks[subject.name] : 0}
//                             onChange={(e) => handleMarksChange(subject.name, e.target.value)}
//                             required
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//               <h4 className='percentage'>Percentage: {percentage}%</h4>
//               <button className="mark-btn-submit" type="submit">
//                 {selectedStudent ? 'Update Marks' : 'Submit'}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>

//       <h3 className='mark-h3-4'>Class and Subjects List</h3>
//       <table className='mark-1st-table' border="1" style={{ marginBottom: '20px' }}>
//         <thead>
//           <tr>
//             <th>Class Name</th>
//             <th>Subjects</th>
//           </tr>
//         </thead>
//         <tbody>
//           {departments.map((dept) => (
//             <tr key={dept._id}>
//               <td>{dept.department}</td>
//               <td>{dept.subjects.join(', ')}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h3 className='mark-h3-5'>Students List</h3>
//       <table className='mark-2nd-table' border="1">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Subjects and Marks</th>
//             <th>Percentage</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student._id}>
//               <td>{student.name}</td>
//               <td>{student.department?.department}</td>
//               <td>
//                 {student.subjects?.map((subject) => (
//                   <div key={subject.name}>
//                     {subject.name}: {subject.mark}
//                   </div>
//                 ))}
//               </td>
//               <td>{calculatePercentage(student)}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;
