import { createFileRoute } from "@tanstack/react-router";
import { LessonReader } from "@/components/lesson-reader";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <LessonReader />;
}
