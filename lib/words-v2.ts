import { createServerClient } from "./supabase/server";

type Tag = string;

type WordMeaning = {
  tags: Tag[];
  info: string[];
  related: string[];
  texts: string[];
  partsOfSpeech: string[];
};

type WordPart = {
  literal: string;
  reading?: string;
};

type WordSense = {
  readings: string[];
  meanings: WordMeaning[];
  parts: WordPart[];
  sourceId: string;
};

export type WordV2 = {
  literal: string;
  jlpt: number;
  senses: WordSense[];
};

export type WordV2Response = WordV2 & {
  id: number;
  created_at: string;
};

export async function getVariations(kanji: string): Promise<WordV2Response[]> {
  const client = createServerClient();
  const { data } = await client
    .from("words-v2")
    .select()
    .like("literal", `%${kanji}%`)
    .not("jlpt", "in", "(1, 2)");
  return data as WordV2Response[];
}
