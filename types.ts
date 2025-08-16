export interface SearchResult {
  web: {
    uri: string;
    title: string;
  };
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    isLoading?: boolean;
    error?: string | null;
    // Specific content types
    imageUrl?: string;
    searchResults?: SearchResult[];
}

export interface StyledLink {
  productName: string;
  url: string;
}

export interface StyledItem {
  itemName: string;
  description: string;
  stylingTip: string;
  links: StyledLink[];
}

export interface StyleResponse {
  sustainableItems: StyledItem[];
  otherItems: StyledItem[];
}
