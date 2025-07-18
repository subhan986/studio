'use client';

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
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
  Download,
  Shuffle,
} from 'lucide-react';
import {Spinner} from './icons';
import {cn} from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
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

const specialFeatures = [
  {name: 'Houseplants', icon: Leaf},
  {name: 'Fireplace', icon: Flame},
  {name: 'Wall Art', icon: ImageIcon},
  {name: 'Exposed Brick', icon: LayoutGrid},
  {name: 'Large Windows', icon: RectangleHorizontal},
  {name: 'Skylight', icon: Sun},
  {name: 'Hardwood Floors', icon: Layers},
  {name: 'Built-in Shelving', icon: BarChart4},
];

const dataURIToFile = (dataURI: string, filename: string): File => {
  const arr = dataURI.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error('Invalid data URI');
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type: mime});
};

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
          title: 'That\'s a chonker',
          description: 'Gotta be under 4MB, chief.',
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
        title: 'Hold up',
        description:
          'Yo, drop a pic and choose a room type, style, and color.',
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
          title: 'It\'s giving... error',
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setIsLoading(false);
      const errorMessage = 'Couldn\'t read that file, fam.';
      toast({
        variant: 'destructive',
        title: 'File is sus',
        description: errorMessage,
      });
    };
  };

  const handleRemix = (imageDataUri: string) => {
    try {
      const newFile = dataURIToFile(imageDataUri, 'remixed-image.png');
      setFile(newFile);
      setPreviewUrl(imageDataUri); // Data URI is valid for src
      setFurnishedImages(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast({
        title: 'Remix is live!',
        description: 'Your new pic is the main character now. Tweak the settings and let\'s go again!',
      });
    } catch (error) {
       toast({
          variant: 'destructive',
          title: 'Remix flopped',
          description: 'Couldn\'t load that pic for the remix, no cap.',
        });
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 min-h-screen bg-background text-foreground">
      <div className="lg:col-span-4 xl:col-span-3 bg-card rounded-xl shadow-lg flex flex-col">
        <header className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Vibe Check</h1>
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
                  Drop a Pic of Your Space
                </Label>
                <div className="space-y-2">
                   <label
                    htmlFor="room-photo-upload"
                    className={cn(
                      'relative block w-full aspect-video border-2 border-dashed border-border rounded-lg cursor-pointer transition-colors',
                      previewUrl
                        ? 'border-solid border-primary/50'
                        : 'hover:border-primary/50'
                    )}
                  >
                     <input
                      id="room-photo-upload"
                      type="file"
                      className="sr-only"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleFileChange}
                      aria-label="Upload room photo"
                    />
                    {previewUrl ? (
                      <>
                        <Image
                          src={previewUrl}
                          alt="Room preview"
                          fill
                          className="object-contain rounded-md"
                        />
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4 text-center">
                        <Upload className="w-8 h-8 mb-2 text-primary" />
                        <span className="font-semibold">
                          Spill the tea, upload a pic
                        </span>
                        <span className="text-xs">
                          PNG, JPG, WEBP, keep it under 4MB, fam
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="room-type"
                  className="font-semibold text-foreground/80"
                >
                  <Home className="inline-block mr-2 w-4 h-4" />
                  What's the room's deal?
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
                  What's the aesthetic?
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
                  Pick a color vibe
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {colorTones.map(tone => (
                    <Button
                      key={tone.name}
                      type="button"
                      onClick={() => setColorTone(tone.name)}
                      variant="secondary"
                      size="sm"
                      className={cn(
                        'w-full justify-start h-auto p-3 gap-3 transition-all hover:scale-105 active:scale-95',
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
                  Extra Spice
                </Label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {specialFeatures.map(feature => (
                    <Button
                      key={feature.name}
                      type="button"
                      variant="secondary"
                      onClick={() => handleFeatureToggle(feature.name)}
                      className={cn(
                        'flex flex-col h-auto p-3 items-center justify-center gap-2 text-center transition-all hover:scale-105 active:scale-95',
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
                className="w-full text-lg h-14 transition-transform hover:scale-105 active:scale-95"
                disabled={!file || !colorTone || isLoading}
              >
                {isLoading ? (
                  <Spinner className="animate-spin mr-2" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'Vibin\'...' : 'Cook Up Some Looks'}
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
                Your Lewks
              </CardTitle>
              {furnishedImages && furnishedImages.length > 0 && (
                <CardDescription className="text-muted-foreground">
                  {furnishedImages.length} lewks just dropped. Peep the options.
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center p-6">
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
                  {Array.from({length:4}).map((_, i) => (
                     <div key={i} className="w-full aspect-[4/3] space-y-4">
                        <Skeleton className="w-full h-full rounded-lg bg-muted/40" />
                     </div>
                  ))}
                </div>
              )}
              {!isLoading && furnishedImages && furnishedImages.length > 0 && (
                <ScrollArea className="w-full h-[75vh]">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-6">
                    {furnishedImages.map((image, index) => (
                      <Card key={index} className="overflow-hidden group relative opacity-0 animate-pop-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <CardContent className="p-0">
                          <div className="aspect-[4/3] relative">
                             <Image
                                src={image}
                                alt={`Furnished room variation ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between p-2 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                           <p className="text-sm font-bold text-white">Variation {index + 1}</p>
                           <div className="flex gap-1">
                            <Button asChild size="icon" variant="ghost" className="text-white hover:bg-white/20 hover:text-white transition-transform hover:scale-110 active:scale-90">
                                <a href={image} download={`design-variation-${index + 1}.png`} title="Download image">
                                <Download className="w-4 h-4" />
                                </a>
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleRemix(image)} title="Remix this image" className="text-white hover:bg-white/20 hover:text-white transition-transform hover:scale-110 active:scale-90">
                                <Shuffle className="w-4 h-4" />
                            </Button>
                           </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
              {!isLoading && !furnishedImages && (
                <div className="text-center text-muted-foreground max-w-md">
                  <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Your fire designs gonna show up here
                  </h2>
                  <p>
                    Drop a pic, pick your vibe, and smash that 'Generate' button. It's gonna be bussin'.
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
