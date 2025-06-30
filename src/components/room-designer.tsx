'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';
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
import {
  Home,
  Image as ImageIcon,
  Lightbulb,
  Sparkles,
  Upload,
} from 'lucide-react';
import { Spinner } from './icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';

const roomTypes = [
  'Living Room',
  'Bedroom',
  'Dining Room',
  'Kitchen',
  'Office',
  'Bathroom',
];
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
const colorTones = [
  { name: 'Warm Neutral', color: '#EAE0D5' },
  { name: 'Cool Neutral', color: '#C9D1D9' },
  { name: 'Earthy Tones', color: '#A59A8D' },
  { name: 'Monochromatic', color: '#888888' },
  { name: 'Pastel Hues', color: '#FEC8D8' },
  { name: 'Bold & Vibrant', color: '#FF6B6B' },
];

export default function RoomDesigner() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [roomType, setRoomType] = useState('');
  const [furnitureStyle, setFurnitureStyle] = useState('');
  const [colorTone, setColorTone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file || !furnitureStyle || !roomType || !colorTone) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description:
          'Please upload an image and select a room type, style, and color tone.',
      });
      return;
    }

    setIsLoading(true);
    setFurnishedImage(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const photoDataUri = reader.result as string;

        const result = await generateFurnishedImage({
          photoDataUri,
          roomType,
          furnitureStyle,
          colorTone,
        });

        if (result.success && result.data) {
          setFurnishedImage(result.data.furnishedRoomImage);
        } else {
          throw new Error(result.error || 'Failed to furnish image.');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred.';
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
      toast({
        variant: 'destructive',
        title: 'File Error',
        description: errorMessage,
      });
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 min-h-screen">
      <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
        <header className="flex items-center gap-3 py-2">
          <Home className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            Aesthetic Architect
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-grow">
          <Tabs defaultValue="from-photo" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="from-photo">
                <ImageIcon className="mr-2" /> From Photo
              </TabsTrigger>
              <TabsTrigger value="freestyle" disabled>
                <Lightbulb className="mr-2" /> Freestyle
              </TabsTrigger>
            </TabsList>
            <TabsContent value="from-photo" className="mt-6 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="room-photo"
                  className="relative block w-full aspect-video border-2 border-dashed border-muted-foreground/50 rounded-lg cursor-pointer hover:bg-muted/20 transition-colors"
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
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="font-semibold">
                        Click or Drag & Drop to Upload
                      </span>
                      <span className="text-sm">
                        Upload a photo of your interior
                      </span>
                    </div>
                  )}
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room-type" className="font-semibold">
                  Room Type
                </Label>
                <Select value={roomType} onValueChange={setRoomType} required>
                  <SelectTrigger id="room-type" className="w-full">
                    <SelectValue placeholder="Select a room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map(style => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="furniture-style" className="font-semibold">
                  Room Style
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
                    {furnitureStyles.map(style => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="font-semibold">Color Tones</Label>
                <RadioGroup
                  value={colorTone}
                  onValueChange={setColorTone}
                  className="grid grid-cols-2 gap-3"
                >
                  {colorTones.map(tone => (
                    <Label
                      key={tone.name}
                      htmlFor={tone.name}
                      className={cn(
                        'flex items-center gap-3 rounded-md border-2 p-3 cursor-pointer transition-colors',
                        colorTone === tone.name
                          ? 'border-primary bg-primary/10'
                          : 'border-input hover:bg-muted/50'
                      )}
                    >
                      <RadioGroupItem
                        value={tone.name}
                        id={tone.name}
                        className="sr-only"
                      />
                      <span
                        style={{ backgroundColor: tone.color }}
                        className="h-5 w-5 rounded-full border"
                      ></span>
                      <span className="font-medium text-sm">{tone.name}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-auto">
            <Button
              type="submit"
              size="lg"
              className="w-full text-lg"
              disabled={
                !file || !furnitureStyle || !roomType || !colorTone || isLoading
              }
            >
              {isLoading ? (
                <Spinner className="animate-spin mr-2" />
              ) : (
                <Sparkles className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Generating...' : 'Generate Ideas'}
            </Button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-8 xl:col-span-9 flex flex-col">
        <div className="flex-grow flex items-center justify-center p-6">
          <Card className="w-full h-full flex flex-col">
            <CardContent className="flex-grow flex flex-col items-center justify-center p-6">
              {isLoading && (
                 <div className="w-full max-w-2xl aspect-square space-y-4">
                    <Skeleton className="w-full h-full rounded-lg" />
                 </div>
              )}
              {!isLoading && furnishedImage && (
                <div className="w-full max-w-2xl aspect-square relative">
                  <Image
                    src={furnishedImage}
                    alt="Furnished room"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              )}
              {!isLoading && !furnishedImage && (
                <div className="text-center text-muted-foreground">
                  <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Your designs will appear here
                  </h2>
                  <p>
                    Use the controls on the left to configure your desired
                    interior, then click "Generate Ideas" to see the magic
                    happen.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
