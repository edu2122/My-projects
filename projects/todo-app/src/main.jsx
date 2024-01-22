import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { TodosProvider } from "./context/todos.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <TodosProvider>
      <App />
    </TodosProvider>
);
