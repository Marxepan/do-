
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImageUrl: string;
}

export interface CartItem extends Book {
  quantity: number;
}
