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
  furnitureStyle: z.string().describe('The desired furniture style for the room.'),
});
export type FurnishRoomFromImageInput = z.infer<typeof FurnishRoomFromImageInputSchema>;

const FurnishRoomFromImageOutputSchema = z.object({
  furnishedRoomImage: z
    .string()
    .describe(
      'A data URI of the furnished room image, with furniture added to the original image.'
    ),
});
export type FurnishRoomFromImageOutput = z.infer<typeof FurnishRoomFromImageOutputSchema>;

export async function furnishRoomFromImage(
  input: FurnishRoomFromImageInput
): Promise<FurnishRoomFromImageOutput> {
  return furnishRoomFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'furnishRoomFromImagePrompt',
  input: {schema: FurnishRoomFromImageInputSchema},
  output: {schema: FurnishRoomFromImageOutputSchema},
  prompt: `You are an AI interior designer. You will furnish the provided room image with furniture according to the specified style. Return the updated image as a data URI.

Furniture Style: {{{furnitureStyle}}}
Room Image: {{media url=photoDataUri}}

IMPORTANT: You must respond with valid a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'.`,
  config: {
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

const furnishRoomFromImageFlow = ai.defineFlow(
  {
    name: 'furnishRoomFromImageFlow',
    inputSchema: FurnishRoomFromImageInputSchema,
    outputSchema: FurnishRoomFromImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.photoDataUri}},
        {
          text:
            'Furnish this room in the style of ' + input.furnitureStyle + '.',
        },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      furnishedRoomImage: media!.url,
    };
  }
);
