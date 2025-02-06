import AddToBag from "@/app/components/AddToBag";
import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/components/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";

async function getData(slug: string){
    const query=`*[_type == "product"&& slug.current=="${slug}"][0]{
  productName,
    image,
    price,
    description,
    "slug":slug.current,
    category,
    price_id,
}`;
const data = await client.fetch(query);
return data;
}

export default async function ProductPage({params,}:{params:{slug:string}}) {
    const data: fullProduct =await getData(params.slug);
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <ImageGallery image={data.image}/>
                    <div className="md:py-8">
                        <div className="md-2 md:mb-3">
                            <span className="mb-0.5 inline-block text-gray-600">
                                {data.category}
                            </span>
                            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl ">{data.productName}</h2>
                        </div>
                        <div className="mb-6 flex items-center gap-3 md:mb-10"> 
                            <Button>
                                <span className="text-sm">4.6</span>
                                <Star/>
                            </Button>
                            <span className="text-sm text-gray-600 transition duration-100 font-semibold">59 Ratings</span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-end gap-2">
                                <span className="text-xl font-bold text-gray-800 md:text-2xl">${data.price}</span>
                                <span className="md:0.5 text-red-500 line-through">${data.price +1000}</span>
                            </div>
                            <span className="text-sm gray-500">Incl. variety and shipping</span>
                        </div>
                        <div className="mb-6 flex items-center gap-2 text-gray-600">
                            <Truck/>
                            <span className="text-sm">5-6 Day Shipping</span>
                        </div>
                        <div className="flex gap-2.5">
                            <AddToBag currency="USD" 
                            description={data.description} 
                            image={data.image} 
                            name={data.productName} 
                            price={data.price} 
                            slug={""}
                            price_id={data.price_id}/>
                            <Button variant={"secondary"}>Checkout Now</Button>
                        </div>
                        <p className="mt-12 text-basr text-gray-600 tracking-wider">{data.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  