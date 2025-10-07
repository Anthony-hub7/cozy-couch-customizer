import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ControlPanelProps {
  color: string;
  texture: string;
  onColorChange: (color: string) => void;
  onTextureChange: (texture: string) => void;
}

const textures = [
  { id: 'fabric', name: 'Tissu', icon: '🧵' },
  { id: 'leather', name: 'Cuir', icon: '👜' },
  { id: 'velvet', name: 'Velours', icon: '✨' },
  { id: 'linen', name: 'Lin', icon: '🌾' },
];

export default function ControlPanel({ 
  color, 
  texture, 
  onColorChange, 
  onTextureChange 
}: ControlPanelProps) {
  return (
    <Card className="p-6 backdrop-blur-sm bg-card/95 shadow-lg border-border">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Personnalisez votre canapé
          </h2>
          <p className="text-sm text-muted-foreground">
            Choisissez la couleur et le matériau parfaits
          </p>
        </div>

        {/* Color Picker */}
        <div className="space-y-3">
          <Label htmlFor="color-picker" className="text-sm font-semibold text-foreground">
            Couleur du tissu
          </Label>
          <div className="flex items-center gap-4">
            <input
              id="color-picker"
              type="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="h-14 w-20 rounded-lg cursor-pointer border-2 border-border transition-all hover:scale-105"
            />
            <div className="flex-1">
              <div 
                className="h-14 rounded-lg border-2 border-border transition-all"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
        </div>

        {/* Texture Selector */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">
            Matériau
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {textures.map((tex) => (
              <Button
                key={tex.id}
                variant={texture === tex.id ? "default" : "outline"}
                onClick={() => onTextureChange(tex.id)}
                className="h-auto py-4 px-4 flex flex-col items-center gap-2 transition-all hover:scale-105"
              >
                <span className="text-2xl">{tex.icon}</span>
                <span className="text-sm font-medium">{tex.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            💡 Utilisez la souris pour faire pivoter la vue 3D
          </p>
        </div>
      </div>
    </Card>
  );
}
