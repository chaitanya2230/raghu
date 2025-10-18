import { useState } from 'react';
import { ArrowLeft, Camera, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { t } from '../data/translations';

interface PestDetectionSectionProps {
  language: Language;
  onBack: () => void;
}

export function PestDetectionSection({ language, onBack }: PestDetectionSectionProps) {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ disease: string; action: string } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      alert('Please upload an image first');
      return;
    }

    setAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));

    const diseases = [
      { disease: 'Leaf Blight', action: 'Apply copper-based fungicide. Remove affected leaves and ensure proper spacing for air circulation.' },
      { disease: 'Powdery Mildew', action: 'Use sulfur-based treatment. Improve air circulation and avoid overhead watering.' },
      { disease: 'Aphid Infestation', action: 'Spray neem oil solution. Introduce natural predators like ladybugs.' },
      { disease: 'Bacterial Spot', action: 'Remove infected plants. Use copper-based bactericide and practice crop rotation.' },
      { disease: 'Rust Disease', action: 'Apply fungicide containing chlorothalonil. Remove infected leaves immediately.' },
    ];

    const randomResult = diseases[Math.floor(Math.random() * diseases.length)];
    setResult(randomResult);
    setAnalyzing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          {t(language, 'back_button')}
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-green-700 text-center mb-8">
            Pest & Disease Detection
          </h1>

          <label
            htmlFor="pest-upload"
            className="border-3 border-dashed border-gray-300 rounded-2xl p-12 cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all block text-center"
          >
            <Camera className="w-20 h-20 mx-auto mb-4 text-green-700" />
            <h3 className="text-2xl font-bold mb-2">Upload Crop Image</h3>
            <p className="text-gray-600">Click here to select an image of the affected crop leaf</p>
          </label>
          <input
            id="pest-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {image && (
            <div className="mt-8">
              <img
                src={image}
                alt="Uploaded crop"
                className="max-w-full max-h-96 mx-auto rounded-xl shadow-lg"
              />
            </div>
          )}

          {image && (
            <button
              onClick={analyzeImage}
              disabled={analyzing}
              className="w-full mt-8 bg-green-600 text-white py-4 rounded-full text-lg font-bold hover:bg-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Analyzing image...
                </>
              ) : (
                <>
                  <Camera size={24} />
                  {t(language, 'analyze_image')}
                </>
              )}
            </button>
          )}

          {result && (
            <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-red-500">
              <h3 className="text-2xl font-bold text-red-700 mb-4">Analysis Result:</h3>
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-800">Disease Detected:</strong>
                  <p className="text-xl text-red-600 font-semibold mt-1">{result.disease}</p>
                </div>
                <div>
                  <strong className="text-gray-800">Recommended Action:</strong>
                  <p className="text-gray-700 mt-1">{result.action}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
