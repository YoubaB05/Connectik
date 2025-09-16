import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  className?: string;
}

export function ImageUploader({ images, onChange, maxImages = 5, className }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: "Erreur",
        description: `Vous ne pouvez ajouter que ${maxImages} images maximum`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Erreur",
            description: "Seules les images sont autorisées",
            variant: "destructive",
          });
          continue;
        }

        // Get upload URL from backend
        const uploadResponse = await fetch("/api/admin/images/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!uploadResponse.ok) {
          throw new Error("Erreur lors de l'obtention de l'URL d'upload");
        }

        const { uploadURL } = await uploadResponse.json();

        // Upload file to object storage
        const fileResponse = await fetch(uploadURL, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!fileResponse.ok) {
          throw new Error("Erreur lors du téléchargement du fichier");
        }

        // Set ACL policy for the uploaded image
        const aclResponse = await fetch("/api/admin/images", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageURL: uploadURL }),
        });

        if (!aclResponse.ok) {
          throw new Error("Erreur lors de la configuration de l'image");
        }

        const { objectPath } = await aclResponse.json();

        // Add the image path to the list
        onChange([...images, objectPath]);

        toast({
          title: "Succès",
          description: "Image téléchargée avec succès",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors du téléchargement",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    
    toast({
      title: "Image supprimée",
      description: "L'image a été supprimée de la liste",
    });
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Upload button */}
        {images.length < maxImages && (
          <div>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              disabled={uploading}
              className="hidden"
              id="image-upload"
              data-testid="input-image-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              disabled={uploading}
              className="w-full"
              data-testid="button-upload-image"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Téléchargement..." : "Ajouter une image"}
            </Button>
          </div>
        )}

        {/* Image preview grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <Card key={index} className="relative p-2">
                <div className="aspect-square relative overflow-hidden rounded">
                  {image.startsWith('/objects/') ? (
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      data-testid={`image-preview-${index}`}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      <span className="ml-2 text-sm text-muted-foreground">Image</span>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => removeImage(index)}
                    data-testid={`button-remove-image-${index}`}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Image count info */}
        <p className="text-sm text-muted-foreground">
          {images.length} / {maxImages} images ajoutées
        </p>
      </div>
    </div>
  );
}