import { useState, Suspense } from 'react';
import SofaScene from '@/components/SofaScene';
import ControlPanel from '@/components/ControlPanel';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [color, setColor] = useState('#4a90e2');
  const [texture, setTexture] = useState('fabric');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <header className="py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Configurateur 3D
          </h1>
          <p className="text-muted-foreground mt-2">
            Créez le canapé de vos rêves en temps réel
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,380px] gap-6">
            {/* 3D Viewer */}
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-card to-secondary/30 shadow-2xl border border-border">
              <Suspense
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Chargement du modèle 3D...</p>
                    </div>
                  </div>
                }
              >
                <SofaScene color={color} texture={texture} />
              </Suspense>
            </div>

            {/* Control Panel */}
            <div className="lg:h-[700px] flex flex-col">
              <ControlPanel
                color={color}
                texture={texture}
                onColorChange={setColor}
                onTextureChange={setTexture}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
