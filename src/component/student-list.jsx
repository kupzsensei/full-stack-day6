export default function StudentList({
  data,
  updateStudents,
  setDialog,
  setEditData,
}) {
  return (
    <table className="table table-auto w-full border-spacing-2 border-separate">
      <thead>
        <tr>
          <th>Name</th>
          <th>Course</th>
          <th>Section</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((student) => (
          <tr key={student.name} className="text-center">
            <td>{student.name}</td>
            <td>{student.course}</td>
            <td>{student.section}</td>
            <td className="flex gap-3 items-center justify-center">
              <button
                className="bg-yellow-500 text-white p-2"
                onClick={() => {
                  setDialog(true);
                  setEditData(student);
                }}
              >
                edit
              </button>
              <button
                className="bg-red-500 text-white p-2"
                onClick={() => {
                  console.log(student);
                  updateStudents((prev) => {
                    return prev.filter((obj) => {
                      return obj.name !== student.name;
                    });
                  });
                }}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
