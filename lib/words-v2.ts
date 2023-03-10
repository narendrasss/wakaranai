import { supabase } from "./supabase/public";

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

export type VariationsResponse = {
  id: number;
  literal: string;
  jlpt: number;
  senses: WordSense[];
  kanji: string;
};

export async function getBulkVariations(kanjis: string[], level = 5) {
  const { data } = await supabase
    .from("variations")
    .select()
    .in("kanji", kanjis)
    .eq("jlpt", level);
  return data as VariationsResponse[];
}

export async function getVariations(
  kanji: string,
  level = 5
): Promise<VariationsResponse[]> {
  const { data } = await supabase
    .from("variations")
    .select()
    .eq("kanji", kanji)
    .eq("jlpt", level);
  return data as VariationsResponse[];
}
