const API_URL = "https://api.jsonbin.io/v3/b/65a7dca4266cfc3fde7a2e59";

export const fetchTodos = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    console.error("Error fetching todos");
    return [];
  }
  const { record: todos } = await response.json();
  return todos;
};

export const updateTodos = async ({ todos }) => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": import.meta.env.VITE_API_BIN_KEY,
    },
    body: JSON.stringify(todos),
  });
  return response.ok;
};
