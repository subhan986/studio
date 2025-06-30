'use server';

import {
  furnishRoomFromImage,
  type FurnishRoomFromImageInput,
  type FurnishRoomFromImageOutput,
} from '@/ai/flows/furnish-room-from-image';

type ActionResult =
  | { success: true; data: FurnishRoomFromImageOutput }
  | { success: false; error: string };

export async function generateFurnishedImage(
  input: FurnishRoomFromImageInput
): Promise<ActionResult> {
  try {
    const result = await furnishRoomFromImage(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error furnishing room:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: errorMessage };
  }
}
