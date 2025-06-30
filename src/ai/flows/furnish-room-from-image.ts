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
  maskDataUri: z
    .string()
    .optional()
    .describe(
      "An optional mask for inpainting as a data URI. White areas on the mask indicate where to edit. Format: 'data:image/png;base64,<encoded_data>'."
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
    const generationPromises = Array.from({length: 10}).map((_, i) => {
      const textPrompt = `Furnish this ${input.roomType} in a ${
        input.furnitureStyle
      } style with a ${input.colorTone} color tone. ${
        input.specialFeatures && input.specialFeatures.length > 0
          ? `Incorporate these features: ${input.specialFeatures.join(
              ', '
            )}.`
          : ''
      } Make it photorealistic. This is variation ${
        i + 1
      } of 10. Generate a unique and creative result.`;

      const prompt = input.maskDataUri
        ? {
            text: textPrompt,
            inpaint: [
              {media: {url: input.photoDataUri}},
              {media: {url: input.maskDataUri}},
            ],
          }
        : [
            {media: {url: input.photoDataUri}},
            {
              text: textPrompt,
            },
          ];

      return ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_ONLY_HIGH',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_NONE',
            },
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_LOW_AND_ABOVE',
            },
          ],
        },
      });
    });

    const results = await Promise.all(generationPromises);

    const furnishedRoomImages = results
      .map(result => result.media?.url)
      .filter((url): url is string => !!url);

    if (furnishedRoomImages.length === 0) {
      throw new Error(
        'Image generation failed to return any images. This could be due to a safety policy violation or a temporary issue. Please try adjusting your prompt or try again later.'
      );
    }

    return {
      furnishedRoomImages,
    };
  }
);
