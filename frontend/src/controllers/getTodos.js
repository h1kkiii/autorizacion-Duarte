export const obtenerTodos = async () => {
  try {
    const response = await fetch("http://localhost:4000/todos", {
      credentials: "include",
    });
    const data = await response.json();
    return data.todos;
  } catch (error) {
    console.error("Error al obtener los todos:", error);
    return [];
  }
};
