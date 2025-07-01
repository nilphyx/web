// import { createClient } from "@/lib/supabase/server";
import { Course } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

export async function getCourses(): Promise<Course[]> {
  const supabase = createClient();

  const { data, error } = await supabase.from("courses").select("*");

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
    tags: raw.tags || [],
    imageUrl: raw.image_url,
    modules: raw.modules || [],
    difficulty: raw.difficulty,
    prerequisites: raw.prerequisites || [],
    learningOutcomes: raw.learning_outcomes || [],
    estimatedDuration: raw.estimated_duration,
  }));
}
