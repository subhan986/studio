'use server';
/**
 * @fileOverview Furnishes a room from an image using GenAI.
 *
 * - furnishRoomFromImage - A function that handles the room furnishing process.
 * - FurnishRoomFromImageInput - The input type for the furnishRoomFromImage function.
 * - FurnishRoomFromImageOutput - The return type for the furnishRoomFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FurnishRoomFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  furnitureStyle: z
    .string()
    .describe('The desired furniture style for the room.'),
  roomType: z
    .string()
    .describe('The type of the room (e.g., Living Room, Bedroom).'),
  colorTone: z
    .string()
    .describe('The desired color tone for the room interior.'),
  specialFeatures: z
    .array(z.string())
    .optional()
    .describe('A list of special features to include in the room.'),
});
export type FurnishRoomFromImageInput = z.infer<
  typeof FurnishRoomFromImageInputSchema
>;

const FurnishRoomFromImageOutputSchema = z.object({
  furnishedRoomImages: z
    .array(z.string())
    .describe(
      'A list of data URIs of the furnished room images, with furniture added to the original image.'
    ),
});
export type FurnishRoomFromImageOutput = z.infer<
  typeof FurnishRoomFromImageOutputSchema
>;

export async function furnishRoomFromImage(
  input: FurnishRoomFromImageInput
): Promise<FurnishRoomFromImageOutput> {
  return furnishRoomFromImageFlow(input);
}

const furnishRoomFromImageFlow = ai.defineFlow(
  {
    name: 'furnishRoomFromImageFlow',
    inputSchema: FurnishRoomFromImageInputSchema,
    outputSchema: FurnishRoomFromImageOutputSchema,
  },
  async input => {
    const textPrompt = `Furnish this ${input.roomType} in a ${
      input.furnitureStyle
    } style with a ${
      input.colorTone
    } color tone. Make it photorealistic. ${
      input.specialFeatures && input.specialFeatures.length > 0
        ? `Incorporate these features: ${input.specialFeatures.join(', ')}.`
        : ''
    }`;

    const promptPayload = [
      {media: {url: input.photoDataUri}},
      {
        text: textPrompt,
      },
    ];

    const imagePromises = Array.from({length: 4}).map(() =>
      ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: promptPayload,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_NONE',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_NONE',
            },
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_NONE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_NONE',
            },
          ],
        },
      })
    );

    const results = await Promise.allSettled(imagePromises);

    const furnishedRoomImages = results
      .filter(
        (
          result
        ): result is PromiseFulfilledResult<{media?: {url: string}}> =>
          result.status === 'fulfilled' && !!result.value.media?.url
      )
      .map(result => result.value.media!.url);

    if (furnishedRoomImages.length === 0) {
      // Log failed promises for debugging
      results.forEach(result => {
        if (result.status === 'rejected') {
          console.error('Image generation promise rejected:', result.reason);
        }
      });
      throw new Error(
        'Image generation failed to return any images. This could be due to a safety policy violation or a temporary issue. Please try adjusting your prompt or try again later.'
      );
    }

    return {
      furnishedRoomImages,
    };
  }
);
