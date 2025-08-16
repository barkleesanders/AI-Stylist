import { Type } from "@google/genai";

export const MONETIZATION_PROMPT = `Act as a business consultant specializing in creative and service-based industries. I am starting a sustainable fashion styling business focused on creating 'Modern Classic' wardrobes for clients. My services include educating them on toxins in clothing, creating visual 'style outs' in PDFs, and sourcing sustainable/ethical brands. 

Based on this model, and using Google Search to find credible sources and relevant tools, generate a detailed report on the top 3 monetization strategies I should consider. For each strategy, include:

A detailed description (e.g., 'Tiered Subscription Service').
Pros and Cons.
A sample pricing structure.
Key steps to implement it.

Format the output using markdown. The user will be shown a separate list of the links from your search results.`;

export const EDUCATIONAL_CONTENT_PROMPT = `Act as a content writer specializing in sustainability and wellness. Using Google Search to find sources for your claims, write an informative and persuasive 500-word article for a blog titled 'Style & Substance'. The article's headline should be 'Why Your Wardrobe is a Health Choice: The Hidden Toxins in Your Clothes'. 

The article must:
1. Explain the concept of toxins (like PFAS, phthalates, and lead) in clothing.
2. Connect it to the fact that our skin is our largest organ.
3. Empower the reader with 3 simple, actionable tips for building a healthier, non-toxic wardrobe.

The tone should be authoritative yet accessible and inspiring, not alarmist. Format the output using markdown. The user will be shown a separate list of the links from your search results.`;

export const STYLE_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    sustainableItems: {
      type: Type.ARRAY,
      description: 'A list of recommended items from brands identified as sustainable based on the initial analysis of the domain.',
      items: {
        type: Type.OBJECT,
        properties: {
          itemName: { type: Type.STRING, description: "The name of the clothing item, e.g., 'High-Waisted Linen Trousers'" },
          description: { type: Type.STRING, description: "A brief description of the item." },
          stylingTip: { type: Type.STRING, description: "A short tip on how to style this item." },
          links: {
            type: Type.ARRAY,
            description: "A list of shoppable links for this item, validated from the sitemap.",
            items: {
              type: Type.OBJECT,
              properties: {
                productName: { type: Type.STRING, description: "The specific name of the product from the website." },
                url: { type: Type.STRING, description: "The direct, live URL to the product page." }
              }
            }
          }
        }
      }
    },
    otherItems: {
      type: Type.ARRAY,
      description: 'A list of recommended items from brands not identified as sustainable, or if sustainability status is unknown.',
       items: {
        type: Type.OBJECT,
        properties: {
          itemName: { type: Type.STRING, description: "The name of the clothing item, e.g., 'High-Waisted Linen Trousers'" },
          description: { type: Type.STRING, description: "A brief description of the item." },
          stylingTip: { type: Type.STRING, description: "A short tip on how to style this item." },
          links: {
            type: Type.ARRAY,
            description: "A list of shoppable links for this item, validated from the sitemap.",
            items: {
              type: Type.OBJECT,
              properties: {
                productName: { type: Type.STRING, description: "The specific name of the product from the website." },
                url: { type: Type.STRING, description: "The direct, live URL to the product page." }
              }
            }
          }
        }
      }
    }
  }
};

export const STYLE_OUT_PROMPT = (domain: string, request: string) => `
Act as a specialized personal shopper AI and sustainability analyst. Your goal is to generate a list of shoppable clothing items from the brand at '${domain}' that match a user's request, categorize them by the brand's perceived sustainability, and return a structured JSON response.

**Execution Plan:**

1.  **Analyze Domain for Sustainability:**
    *   The target domain is **${domain}**.
    *   Based on your general knowledge, determine if this brand is widely recognized for its sustainable and ethical practices.

2.  **Item Generation:**
    *   The user's request is: "${request}".
    *   Based on your knowledge of the brand's product catalog and style, generate a list of relevant clothing and accessory items.
    *   For each item, invent a plausible, correctly-formatted shoppable link from the domain ${domain}. The links don't have to be live, but should look realistic (e.g., https://${domain}/products/item-name).

3.  **Structured JSON Output:**
    *   Populate a JSON object according to the provided schema.
    *   If you determined the brand is likely sustainable in Step 1, place all generated items in the \`sustainableItems\` array.
    *   Otherwise, place all generated items in the \`otherItems\` array.
    *   If no items are found for the request, return empty arrays for both.
    *   Your entire response must be ONLY the JSON object.
`;


export const HYPERREALISTIC_MOOD_BOARD_PROMPT = `Create a hyperrealistic, 8k resolution flat-lay fashion mood board for a 'Modern Classic' style. The aesthetic is minimalist, clean, and sophisticated.
Items to include:
- Tailored navy blue wool trousers with a visible, high-quality fabric texture.
- A crisp white organic cotton button-down shirt, slightly unbuttoned.
- A relaxed-fit beige cashmere sweater, showing soft texture.
- Classic brown leather loafers with fine stitching details.
- A pair of simple, elegant gold hoop earrings.
- A high-quality leather-bound journal.

The background should be a neutral, textured cream linen.
Lighting: Soft, natural, cinematic lighting from the side to create gentle shadows and highlight textures.
Overall feel: Timeless, sustainable, luxurious, and effortlessly chic. The image should look like a professional photograph shot on a Canon EOS R5 with a 100mm macro lens, sharp focus on all items.`;

export const HYPERREALISTIC_SINGLE_OUTFIT_PROMPT = (modelDesc: string) => `Create a full-body, hyperrealistic, 8k resolution photograph of an outfit in the 'Modern Classic' style.
Outfit Details:
- A crisp white organic cotton button-down shirt, tucked in.
- High-waisted, tailored navy blue wool trousers.
- A timeless beige trench coat draped over the shoulders.
- Classic brown leather loafers.
- Simple, elegant gold jewelry.

Model: The outfit is worn by ${modelDesc || 'a woman with a confident, natural pose'}. The focus should be on the clothes, but the model should look realistic and engaging.

Setting: A clean, minimalist urban street scene, possibly in Paris or London, with soft, diffused morning light. The background should be slightly out of focus to emphasize the model and outfit.

Photography Style: Shot on a Sony A7R IV with a G-Master 85mm f/1.4 lens. The image should be incredibly sharp, with detailed fabric textures, realistic skin tones, and cinematic lighting. The overall mood is sophisticated, effortless, and timeless.`;

export const IDENTIFY_AND_FIND_ITEMS_PROMPT = (domain: string) => `
Act as a fashion expert AI and sustainability analyst. Your task is to analyze an image, identify fashion items, generate plausible shoppable links for them from a specific domain, and categorize the results by the brand's sustainability status in a structured JSON response.

**Execution Plan:**

1.  **Analyze Image:** Identify each major clothing and accessory item in the provided image.

2.  **Analyze Domain for Sustainability:**
    *   The target domain is **${domain}**.
    *   Based on your general knowledge, determine if this brand is widely recognized for its sustainable and ethical practices.

3.  **Item Matching and Link Generation:**
    *   For each item identified in the image, find a similar product from the brand '${domain}' based on your knowledge of their catalog.
    *   Generate a plausible, correctly-formatted shoppable link for each item. The links do not have to be live, but should look realistic (e.g., https://${domain}/products/item-name).

4.  **Structured JSON Output:**
    *   Populate a JSON object according to the provided schema.
    *   Based on your analysis in Step 2, place found items in either the \`sustainableItems\` or \`otherItems\` array.
    *   If you cannot find a link for an item, do not include it. If no items are found, return empty arrays.
    *   Your entire response must be ONLY the JSON object.
`;


export const API_KEY_ERROR_MESSAGE = "This application requires a Google Gemini API key to function. Please set the `API_KEY` environment variable. This app is a demonstration and does not provide a way to enter the key directly in the browser.";