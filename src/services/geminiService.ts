import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface AddressResult {
  text: string;
  url?: string;
}

export async function getAddressFromCoords(lat: number, lng: number): Promise<AddressResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Berikan alamat lengkap dan nama tempat yang paling akurat untuk koordinat ini: latitude ${lat}, longitude ${lng}. Berikan hanya alamatnya saja dalam satu baris singkat.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        }
      },
    });

    const text = response.text?.trim() || `Lokasi: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    
    // Extract Maps URL from grounding metadata if available
    const mapsChunk = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.find(
      (chunk: any) => chunk.maps?.uri
    );
    const url = mapsChunk?.maps?.uri;

    return { text, url };
  } catch (error) {
    console.error("Error getting address from Gemini:", error);
    return { text: `Lokasi: ${lat.toFixed(4)}, ${lng.toFixed(4)}` };
  }
}
