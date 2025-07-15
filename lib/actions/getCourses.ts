import { Course } from "@/lib/types";
import { createClient as serverClient } from "@/utils/supabase/server";
import { createClient } from "@/utils/supabase/client";

function safeJsonParse(str: string) {
  try {
    // clean the JSON string to avoid issues with extra quotes
    const cleaned = str.trim();
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      return JSON.parse(JSON.parse(cleaned));
    }
    return JSON.parse(cleaned);
  } catch {
    return [];
  }
}
export async function getCourses(): Promise<Course[]> {
  const supabase = createClient();

  const { data, error } = await supabase.from("courses").select(
    `
        *,
        modules: modules (
          *,
           lessons:lessons (
        *
      )
        )
      `
  );

  console.log("[getCourses] Supabase Response:", data, error);

  if (error) {
    console.error("[getCourses] Supabase Error:", error.message);
    return [];
  }

  return (data || []).map((raw: any) => ({
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    longDescription: raw.long_description,
    instructor: raw.instructor,
    category: raw.category,
    tags: typeof raw.tags === "string" ? safeJsonParse(raw.tags) : raw.tags,
    modules: raw.modules || [],
    difficulty: raw.difficulty,
    prerequisites:
      typeof raw.prerequisites === "string"
        ? safeJsonParse(raw.prerequisites)
        : raw.prerequisites,
    learningOutcomes:
      typeof raw.learning_outcomes === "string"
        ? safeJsonParse(raw.learning_outcomes)
        : raw.learning_outcomes,
    imageUrl: raw.image_url,
    estimatedDuration: raw.estimated_duration,
  }));
}
