import { useEffect, useRef, useState } from "react";
import StudentList from "./component/student-list";

function App() {
  const [students, setStudents] = useState([
    { name: "Benj", section: "Section1", course: "BSIT" },
    { name: "Grace", section: "Section2", course: "BSIT" },
  ]);

  const dialogNameRef = useRef(null);
  const dialogCourseRef = useRef(null);
  const dialogSectionRef = useRef(null);

  const [dialog, setDialog] = useState(false);
  const [editData, setEditData] = useState({});

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

  useEffect(() => {
    if (editData.name) {
      dialogNameRef.current.value = editData?.name;
      dialogCourseRef.current.value = editData?.course;
      dialogSectionRef.current.value = editData?.section;
    }
  }, [editData]);

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

      <StudentList
        data={filteredItem}
        updateStudents={setStudents}
        dialog={dialog}
        setDialog={setDialog}
        setEditData={setEditData}
      />

      {dialog && (
        <div className="w-screen h-screen bg-black/50 absolute top-0 left-0 flex justify-center items-center">
          <div className="flex flex-col p-5 bg-gray-200 gap-3">
            <input
              type="text"
              placeholder="name"
              className="p-2"
              ref={dialogNameRef}
            />
            <input
              type="text"
              placeholder="course"
              className="p-2"
              ref={dialogCourseRef}
            />
            <input
              type="text"
              placeholder="section"
              className="p-2"
              ref={dialogSectionRef}
            />
            <button
              className="bg-yellow-200 p-2"
              onClick={() => {
                setStudents((prev) => {
                  const updated = students.map((row) => {
                    if (row.name === editData.name) {
                      return {
                        name: dialogNameRef.current.value,
                        course: dialogCourseRef.current.value,
                        section: dialogSectionRef.current.value,
                      };
                    }
                    return row;
                  });
                  return updated;
                });
                setDialog(false);
              }}
            >
              update
            </button>
            <button
              className="bg-gray-500 p-2"
              onClick={() => {
                setDialog(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
