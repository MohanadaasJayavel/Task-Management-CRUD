const API_URL = "http://localhost:5000/api/tasks";

const getTasks = async () => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return await response.json();
};

const updateTask = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export default { getTasks,createTask, updateTask };
