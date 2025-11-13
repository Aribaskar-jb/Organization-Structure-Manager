// Replace this array with your actual data (each line = one employee)
const employees = [
{ id: 1, name: 'Mark Hill', designation: 'CEO', team: 'Executive', manager: null },
    { id: 2, name: 'Joe Linux', designation: 'VP of Engineering', team: 'Engineering', manager: 1 },
    { id: 3, name: 'Linda May', designation: 'VP of Sales', team: 'Sales', manager: 1 },
    { id: 4, name: 'John Green', designation: 'VP of Marketing', team: 'Marketing', manager: 1 },
    { id: 5, name: 'Ron Blomquist', designation: 'Director of Engineering', team: 'Engineering', manager: 2 },
    { id: 6, name: 'Alice Smith', designation: 'Lead Engineer', team: 'Engineering', manager: 5 },
    { id: 7, name: 'Bob Johnson', designation: 'Software Engineer', team: 'Engineering', manager: 6 },
    { id: 8, name: 'Jane Doe', designation: 'Sales Manager', team: 'Sales', manager: 3 },
    { id: 9, name: 'Peter Jones', designation: 'Sales Representative', team: 'Sales', manager: 8 },
    { id: 10, name: 'Sue Brown', designation: 'Marketing Manager', team: 'Marketing', manager: 4 },
    { id: 11, name: 'Emma Wilson', designation: 'Content Strategist', team: 'Marketing', manager: 10},
    { id: 12, name: 'Chris Lee', designation: 'DevOps Engineer', team: 'Engineering', manager: 5}
  // add more lines as needed...
];

// API endpoint
const apiUrl = "https://67f9582d094de2fe6ea13fc3.mockapi.io/api/vi/Employee";

// Function to post each employee
async function postEmployees() {
  for (const emp of employees) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(emp)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Posted:", data);
      } else {
        console.error("❌ Failed:", response.statusText);
      }
    } catch (err) {
      console.error("⚠️ Error posting data:", err);
    }
  }
}

postEmployees();
