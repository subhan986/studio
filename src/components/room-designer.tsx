'use client';

import {useState, type ChangeEvent, type FormEvent} from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {generateFurnishedImage} from '@/app/actions';
import {useToast} from '@/hooks/use-toast';
import {Skeleton} from './ui/skeleton';
import {
  Home,
  Image as ImageIcon,
  Sparkles,
  Upload,
  Paintbrush,
  Palette,
  Leaf,
  Flame,
  LayoutGrid,
  RectangleHorizontal,
  Sun,
  Layers,
  BarChart4,
  PersonStanding,
  ArrowUpRightFromSquare,
} from 'lucide-react';
import {Spinner} from './icons';
import {cn} from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {ScrollArea} from './ui/scroll-area';

const roomTypes = [
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Dining Room',
  'Home Office',
  'Bathroom',
  'Nursery',
  'Home Gym',
  'Basement',
  'Guest Room',
  'Gaming Room',
];
const furnitureStyles = [
  'Art Deco',
  'Art Nouveau',
  'Bohemian',
  'Coastal',
  'Contemporary',
  'Cyberpunk',
  'Farmhouse',
  'Gradient',
  'Industrial',
  'Japandi',
  'Maximalist',
  'Mid-Century Modern',
  'Minimalist',
  'Modern',
  'Neumorphism',
  'Scandinavian',
  'Steampunk',
  'Traditional',
];
const colorTones = [
  {name: 'Warm Neutral', color: '#F5F5DC'},
  {name: 'Cool Neutral', color: '#D4E0E6'},
  {name: 'Earthy Tones', color: '#BFAE99'},
  {name: 'Monochromatic', color: '#808080'},
  {name: 'Pastel Hues', color: '#FFD1DC'},
  {name: 'Bold & Vibrant', color: '#FF4500'},
  {name: 'Jewel Tones', color: '#4B0082'},
  {name: 'Oceanic Blues', color: '#006994'},
];

const StoneMaskIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2a9.5 9.5 0 0 0-9.5 9.5c0 4.5 3 8.5 7 9.3" />
    <path d="M14.5 21.8c4-1 7-4.8 7-9.3A9.5 9.5 0 0 0 12 2" />
    <path d="M8 14c.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5" />
    <path d="M9 9.5c.2-.5.8-.5 1 0" />
    <path d="M15 9.5c-.2-.5-.8-.5-1 0" />
    <path d="M4.2 9.2C3 10.5 2.5 12.2 3.2 14" />
    <path d="M20.8 9.2c1.2 1.3 1.8 3 .8 4.8" />
  </svg>
);

const specialFeatures = [
  {name: 'Houseplants', icon: Leaf},
  {name: 'Fireplace', icon: Flame},
  {name: 'Wall Art', icon: ImageIcon},
  {name: 'Exposed Brick', icon: LayoutGrid},
  {name: 'Large Windows', icon: RectangleHorizontal},
  {name: 'Skylight', icon: Sun},
  {name: 'Hardwood Floors', icon: Layers},
  {name: 'Built-in Shelving', icon: BarChart4},
  {name: 'Bizarre Poses', icon: PersonStanding},
  {name: 'Stand Arrow', icon: ArrowUpRightFromSquare},
  {name: 'Stone Mask', icon: StoneMaskIcon},
];

export default function RoomDesigner() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [roomType, setRoomType] = useState('Living Room');
  const [furnitureStyle, setFurnitureStyle] = useState('Modern');
  const [colorTone, setColorTone] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [furnishedImages, setFurnishedImages] = useState<string[] | null>(
    null
  );
  const {toast} = useToast();

  const handleFeatureToggle = (featureName: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureName)
        ? prev.filter(f => f !== featureName)
        : [...prev, featureName]
    );
  };

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
      setFurnishedImages(null);
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
    setFurnishedImages(null);

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
          specialFeatures: selectedFeatures,
        });

        if (result.success && result.data) {
          setFurnishedImages(result.data.furnishedRoomImages);
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 min-h-screen bg-background text-foreground">
      <div className="lg:col-span-4 xl:col-span-3 bg-card rounded-xl shadow-lg flex flex-col">
        <header className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Aesthetic Architect</h1>
          </div>
        </header>

        <ScrollArea className="flex-grow">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-4 h-full"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="room-photo"
                  className="font-semibold text-foreground/80"
                >
                  Your Room Photo
                </Label>
                <div
                  className={cn(
                    'relative block w-full aspect-video border-2 border-dashed border-border rounded-lg cursor-pointer transition-colors',
                    previewUrl
                      ? 'border-solid border-primary/50'
                      : 'hover:border-primary/50'
                  )}
                >
                  <input
                    id="room-photo"
                    type="file"
                    className="sr-only"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                    aria-label="Upload room photo"
                  />
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Room preview"
                      fill
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4 text-center">
                      <Upload className="w-8 h-8 mb-2 text-primary" />
                      <span className="font-semibold">
                        Upload a photo of your room
                      </span>
                      <span className="text-xs">
                        PNG, JPG, or WEBP up to 4MB
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="room-type"
                  className="font-semibold text-foreground/80"
                >
                  <Home className="inline-block mr-2 w-4 h-4" />
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

              <div className="space-y-3">
                <Label
                  htmlFor="furniture-style"
                  className="font-semibold text-foreground/80"
                >
                  <Paintbrush className="inline-block mr-2 w-4 h-4" />
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
                <Label className="font-semibold text-foreground/80">
                  <Palette className="inline-block mr-2 w-4 h-4" />
                  Color Tones
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {colorTones.map(tone => (
                    <Button
                      key={tone.name}
                      onClick={() => setColorTone(tone.name)}
                      variant="secondary"
                      size="sm"
                      className={cn(
                        'w-full justify-start h-auto p-3 gap-3 transition-colors',
                        colorTone === tone.name &&
                          'bg-primary/20 border-primary border'
                      )}
                    >
                      <span
                        style={{backgroundColor: tone.color}}
                        className="h-4 w-4 rounded-full border border-white/20"
                      ></span>
                      <span className="text-sm font-medium">{tone.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-semibold text-foreground/80">
                  Special Features
                </Label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {specialFeatures.map(feature => (
                    <Button
                      key={feature.name}
                      variant="secondary"
                      onClick={() => handleFeatureToggle(feature.name)}
                      className={cn(
                        'flex flex-col h-auto p-3 items-center justify-center gap-2 text-center transition-colors',
                        selectedFeatures.includes(feature.name) &&
                          'bg-primary/20 border-primary text-primary-foreground border'
                      )}
                    >
                      <feature.icon className="w-5 h-5" />
                      <span className="text-xs font-medium leading-tight">
                        {feature.name}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Button
                type="submit"
                size="lg"
                className="w-full text-lg h-14"
                disabled={!file || !colorTone || isLoading}
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
        </ScrollArea>
      </div>

      <div className="lg:col-span-8 xl:col-span-9 flex flex-col">
        <div className="flex-grow flex items-center justify-center p-0 md:p-6">
          <Card className="w-full h-full flex flex-col bg-card/50 border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg text-foreground font-semibold">
                Your Designs
              </CardTitle>
              {furnishedImages && furnishedImages.length > 0 && (
                <CardDescription className="text-muted-foreground">
                  {furnishedImages.length} variations generated. Use the arrows
                  to navigate.
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center p-6">
              {isLoading && (
                <div className="w-full max-w-4xl aspect-[4/3] space-y-4">
                  <Skeleton className="w-full h-full rounded-lg bg-muted/40" />
                </div>
              )}
              {!isLoading && furnishedImages && furnishedImages.length > 0 && (
                <Carousel
                  className="w-full max-w-4xl"
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {furnishedImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card className="border-none bg-transparent">
                            <CardContent className="flex aspect-[4/3] items-center justify-center p-0 relative">
                              <Image
                                src={image}
                                alt={`Furnished room variation ${index + 1}`}
                                fill
                                className="object-contain rounded-lg"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-16" />
                  <CarouselNext className="mr-16" />
                </Carousel>
              )}
              {!isLoading && !furnishedImages && (
                <div className="text-center text-muted-foreground max-w-md">
                  <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Your design ideas will appear here
                  </h2>
                  <p>
                    Upload a photo and use the controls to set your desired
                    style. Click &ldquo;Generate Ideas&rdquo; to see the magic
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
