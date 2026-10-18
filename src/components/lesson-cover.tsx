import { lessonCatalog } from "@/data/lesson-catalog";

export function LessonCover({ number }: { number: number }) {
  const lesson = lessonCatalog[number - 1];
  return <figure className="overflow-hidden rounded-xl shadow-card">
    <img src={`/covers/licao-${String(number).padStart(2, "0")}.jpg`} alt={`Ilustração para a lição ${number}: ${lesson.title}`} className="aspect-video w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10" />
  </figure>;
}
