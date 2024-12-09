import { useRef, useState } from "react";
import StudentList from "./component/student-list";

function App() {
  const [students, setStudents] = useState([
    { name: "Benj", section: "Section1", course: "BSIT" },
    { name: "Grace", section: "Section2", course: "BSIT" },
  ]);

  const [searchFilter, setSearchFilter] = useState("");

  const nameRef = useRef(null);
  const courseRef = useRef(null);
  const sectionRef = useRef(null);

  const handleSubmit = () => {
    const newStudent = {
      name: nameRef.current.value,
      course: courseRef.current.value,
      section: sectionRef.current.value,
    };
    // console.log(newStudent);
    setStudents((prev) => [...prev, newStudent]);
    nameRef.current.value = "";
    courseRef.current.value = "";
    sectionRef.current.value = "";
    nameRef.current.focus();
  };

  const filteredItem = students.filter((student) =>
    student.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  console.log(filteredItem);

  const handleChange = (e) => {
    setSearchFilter(e.target.value);
  };

  return (
    <main className="w-screen h-screen bg-green-300 flex flex-col gap-5">
      <div className="flex gap-5 p-5 items-center">
        <input type="text" placeholder="name" ref={nameRef} />
        <input type="text" placeholder="course" ref={courseRef} />
        <input type="text" placeholder="section" ref={sectionRef} />
        <button className="bg-blue-400 px-5 py-2" onClick={handleSubmit}>
          Submit
        </button>

        <div className="ml-auto">
          <input
            type="search"
            placeholder="Search..."
            value={searchFilter}
            onChange={handleChange}
          />
        </div>
      </div>

      <StudentList data={filteredItem} updateStudents={setStudents} />
    </main>
  );
}

export default App;
