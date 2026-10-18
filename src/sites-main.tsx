import { createRoot } from "react-dom/client";
import { LessonReader } from "@/components/lesson-reader";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(<LessonReader />);
