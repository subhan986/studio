'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateFurnishedImage } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import { Sparkles, Upload } from 'lucide-react';
import { Spinner } from './icons';

const furnitureStyles = [
  'Modern',
  'Minimalist',
  'Contemporary',
  'Industrial',
  'Scandinavian',
  'Bohemian',
  'Farmhouse',
  'Traditional',
];

export default function RoomDesigner() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [furnitureStyle, setFurnitureStyle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [furnishedImage, setFurnishedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload an image smaller than 4MB.',
        });
        return;
      }
      setFile(selectedFile);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setFurnishedImage(null);
      setOriginalImage(null);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file || !furnitureStyle) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please upload an image and select a style.',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setFurnishedImage(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const photoDataUri = reader.result as string;
        setOriginalImage(photoDataUri);

        const result = await generateFurnishedImage({
          photoDataUri,
          furnitureStyle,
        });

        if (result.success && result.data) {
          setFurnishedImage(result.data.furnishedRoomImage);
        } else {
          throw new Error(result.error || 'Failed to furnish image.');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Generation Failed',
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setIsLoading(false);
      const errorMessage = 'Failed to read the file.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'File Error',
        description: errorMessage,
      });
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Design Your Room
              </CardTitle>
              <CardDescription>
                Upload a photo and choose a style to begin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="room-photo" className="text-lg">
                  1. Upload Photo
                </Label>
                <Label
                  htmlFor="room-photo"
                  className="relative block w-full h-64 border-2 border-dashed border-muted-foreground/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                >
                  <input
                    id="room-photo"
                    type="file"
                    className="sr-only"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                  />
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Room preview"
                      fill
                      className="object-contain rounded-lg p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <Upload className="w-10 h-10 mb-2" />
                      <span className="font-semibold">Click to upload</span>
                      <span className="text-sm">PNG, JPG, or WEBP (max 4MB)</span>
                    </div>
                  )}
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="furniture-style" className="text-lg">
                  2. Choose Style
                </Label>
                <Select
                  value={furnitureStyle}
                  onValueChange={setFurnitureStyle}
                  required
                >
                  <SelectTrigger id="furniture-style" className="w-full">
                    <SelectValue placeholder="Select a furniture style" />
                  </SelectTrigger>
                  <SelectContent>
                    {furnitureStyles.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={!file || !furnitureStyle || isLoading}
              >
                {isLoading ? (
                  <Spinner className="animate-spin mr-2" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Furnishing...' : 'Furnish My Room'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>

      <div className="lg:col-span-8">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Results</CardTitle>
            <CardDescription>
              Your original and AI-furnished rooms will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <div className="flex flex-col gap-2">
                <h3 className="text-center font-semibold text-muted-foreground">Original Room</h3>
                <div className="aspect-square relative bg-muted rounded-lg flex items-center justify-center">
                  {originalImage ? (
                    <Image
                      src={originalImage}
                      alt="Original room"
                      fill
                      className="object-contain rounded-lg"
                    />
                  ) : (
                     <p className="text-muted-foreground">Your photo will be shown here</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-center font-semibold text-muted-foreground">Furnished Room</h3>
                <div className="aspect-square relative bg-muted rounded-lg flex items-center justify-center">
                  {isLoading && (
                    <div className="w-full h-full p-4 space-y-4">
                       <Skeleton className="w-full h-full" />
                    </div>
                  )}
                  {!isLoading && furnishedImage && (
                    <Image
                      src={furnishedImage}
                      alt="Furnished room"
                      fill
                      className="object-contain rounded-lg"
                    />
                  )}
                   {!isLoading && !furnishedImage && (
                     <p className="text-muted-foreground">AI magic happens here</p>
                   )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
