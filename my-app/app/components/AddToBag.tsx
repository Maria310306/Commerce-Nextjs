
"use client";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";


export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  slug: string; 
  price_id: string
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  slug, 
  price_id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();


  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(), 
    id: slug, 
    price_id: price_id
  };

  return (
    <Button
      onClick={() => {
        addItem(product); // Add item to cart
        handleCartClick(); // Open the cart
      }}
    >
      Add to Cart
    </Button>
  );
}
