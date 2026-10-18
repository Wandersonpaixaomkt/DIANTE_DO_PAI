import { createRoot } from "react-dom/client";
import { LessonLibrary } from "@/components/lesson-library";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(<LessonLibrary />);
