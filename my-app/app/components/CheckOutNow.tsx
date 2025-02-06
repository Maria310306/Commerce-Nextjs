
"use client";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { ProductCart } from "./AddToBag";


export default function CheckoutNow({
  currency,
  description,
  image,
  name,
  price,
  slug, 
  price_id,
}: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow(priceId: string){
    checkoutSingleItem(priceId); // Checkout the item
  }


  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(), 
    // id: slug, 
    price_id: price_id
  };

  return (
    <Button
      onClick={() => {
        buyNow(product.price_id); // Call the buyNow function when clicked
      }}
    >
      Checkout
    </Button>
  );
}
