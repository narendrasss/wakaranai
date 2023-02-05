import { getWords } from "@/lib/words";
import { Quiz } from "./quiz";

export const dynamic = "force-dynamic";

export default async function QuizPage({
  searchParams,
}: {
  searchParams: { count?: string };
}) {
  const list = await getWords(validateCount(searchParams.count));
  return (
    <main className="mx-auto w-fit h-screen flex items-center justify-center">
      <Quiz list={list} />
    </main>
  );
}

const DEFAULT_COUNT = 35;

const validateCount = (count?: string): number => {
  if (!count) return DEFAULT_COUNT;
  const parsed = Number(count);
  if (Number.isNaN(parsed)) {
    return DEFAULT_COUNT;
  }
  return parsed;
};