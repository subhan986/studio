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
  furnishedRoomImage: z
    .string()
    .describe(
      'A data URI of the furnished room image, with furniture added to the original image.'
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

const furnishRoomPrompt = ai.definePrompt({
  name: 'furnishRoomPrompt',
  input: {schema: FurnishRoomFromImageInputSchema},
  output: {schema: FurnishRoomFromImageOutputSchema},
  prompt: `Generate a photorealistic image of a furnished room.

Room Type: {{{roomType}}}
Style: {{{furnitureStyle}}}
Color Tone: {{{colorTone}}}
{{#if specialFeatures}}

Special Features to include:
{{#each specialFeatures}}
- {{{this}}}
{{/each}}
{{/if}}

The user has provided this image as a base:
{{media url=photoDataUri}}

Modify the user's image to furnish it according to the specifications above. The output should be a single image of the furnished room.`,
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
          text: `Furnish this ${input.roomType} in a ${
            input.furnitureStyle
          } style with a ${input.colorTone} color tone. ${
            input.specialFeatures && input.specialFeatures.length > 0
              ? `Incorporate these features: ${input.specialFeatures.join(
                  ', '
                )}.`
              : ''
          } Make it photorealistic.`,
        },
      ],
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

    if (!media?.url) {
      throw new Error('Image generation failed to return an image.');
    }

    return {
      furnishedRoomImage: media.url,
    };
  }
);
