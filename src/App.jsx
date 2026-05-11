import { useState, useEffect } from "react"

function App() {

  const defaultTasks = [
    {
      name: "Wake Up",
      time: "5:00",
      status: "",
      comment: "",
    },

    {
      name: "Run",
      time: "5:30",
      status: "",
      comment: "",
    },

    {
      name: "Study Session 1",
      time: "7–9",
      status: "",
      comment: "",
    },

    {
      name: "Skill Session",
      time: "9:30–10:30",
      status: "",
      comment: "",
    },

    {
      name: "Study Session 2",
      time: "11–1",
      status: "",
      comment: "",
    },

    {
      name: "Study Session 3",
      time: "6–8",
      status: "",
      comment: "",
    },

    {
      name: "Sleep by 10",
      time: "10:00",
      status: "",
      comment: "",
    },
  ]

  const today = new Date().toISOString().split("T")[0]

  const [selectedDate, setSelectedDate] = useState(today)

  const [tasks, setTasks] = useState(
  JSON.parse(JSON.stringify(defaultTasks))
)

  // LOAD DATA WHEN DATE CHANGES
  useEffect(() => {

    const savedData =
      localStorage.getItem(selectedDate)

    if (savedData) {

      setTasks(JSON.parse(savedData))

    } else {

      setTasks(defaultTasks)

    }

  }, [selectedDate])

  // AUTO SAVE
  useEffect(() => {

    localStorage.setItem(
      selectedDate,
      JSON.stringify(tasks)
    )

  }, [tasks, selectedDate])

  const updateStatus = (index, value) => {

    const updatedTasks = [...tasks]

    updatedTasks[index].status = value

    setTasks(updatedTasks)

  }

 const updateComment = (index, value) => {

  const updatedTasks = [...tasks]

  updatedTasks[index].comment = value

  setTasks(updatedTasks)

}

  // STUDY TIME CALCULATION
  const studyHours =
    (tasks[2]?.status === "done" ? 2 : 0) +
    (tasks[4]?.status === "done" ? 2 : 0) +
    (tasks[5]?.status === "done" ? 2 : 0)

  return (

    <div style={styles.app}>

      <div style={styles.container}>

        <h1 style={styles.title}>
          Daily Discipline Tracker
        </h1>

        <p style={styles.subtitle}>
          Build consistency. Protect the streak.
        </p>

        <div style={styles.topBar}>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
            style={styles.dateInput}
          />

        </div>

        <table style={styles.table}>

          <thead>

            <tr>

              <th style={styles.th}>Task</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Comment</th>

            </tr>

          </thead>

          <tbody>

            {tasks.map((task, index) => (

              <tr key={index}>

                <td style={styles.td}>
                  {task.name}
                </td>

                <td style={styles.td}>
                  {task.time}
                </td>

                <td style={styles.td}>

                  <button
                    onClick={() =>
                      updateStatus(index, "done")
                    }
                    style={{
                      ...styles.doneButton,
                      opacity:
                        task.status === "done"
                          ? 1
                          : 0.35,
                    }}
                  >
                    ✓
                  </button>

                  <span style={styles.separator}>
                    /
                  </span>

                  <button
                    onClick={() =>
                      updateStatus(index, "fail")
                    }
                    style={{
                      ...styles.failButton,
                      opacity:
                        task.status === "fail"
                          ? 1
                          : 0.35,
                    }}
                  >
                    ✕
                  </button>

                </td>

                <td style={styles.td}>

                  <input
                    type="text"
                    placeholder="Comment..."
                    value={task.comment}
                    onChange={(e) =>
                      updateComment(
                        index,
                        e.target.value
                      )
                    }
                    style={styles.commentInput}
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div style={styles.studyBox}>

          Total Study Time:
          <span style={styles.studyHours}>
            {" "}
            {studyHours} Hours
          </span>

        </div>

      </div>

    </div>

  )
}

const styles = {

  app: {
    backgroundColor: "#000000",
    minHeight: "100vh",
    color: "white",
    padding: "40px",
    fontFamily: "Arial",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  title: {
    fontSize: "48px",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#9CA3AF",
    marginBottom: "40px",
    fontSize: "18px",
  },

  topBar: {
    marginBottom: "25px",
  },

  dateInput: {
    backgroundColor: "#111111",
    color: "white",
    border: "1px solid #333333",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "16px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    borderBottom: "1px solid #222222",
    padding: "18px",
    textAlign: "left",
    color: "white",
    fontSize: "18px",
  },

  td: {
    borderBottom: "1px solid #111111",
    padding: "20px 18px",
    fontSize: "18px",
  },

  doneButton: {
    background: "none",
    border: "none",
    color: "#22C55E",
    fontSize: "24px",
    cursor: "pointer",
  },

  failButton: {
    background: "none",
    border: "none",
    color: "#EF4444",
    fontSize: "24px",
    cursor: "pointer",
  },

  separator: {
    margin: "0 8px",
    color: "#888888",
    fontSize: "20px",
  },

  commentInput: {
    backgroundColor: "#0A0A0A",
    color: "white",
    border: "1px solid #222222",
    padding: "10px",
    borderRadius: "8px",
    width: "100%",
    fontSize: "15px",
  },

  studyBox: {
    marginTop: "35px",
    fontSize: "24px",
    fontWeight: "bold",
  },

  studyHours: {
    color: "#22C55E",
  },

}

export default App