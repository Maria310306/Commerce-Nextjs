import Link from "next/link";
import { client } from "../lib/sanity";
import { fullProduct, simplifiedProduct } from "../components/interface";

async function getData(category:string){
    const query=`*[_type == "product" && category == "${category}"]
{
  productName,
    "image": image.asset->url,
    price,
    inventory,
    "slug":slug.current,
    category,
}`;
    const data = await client.fetch(query);
    return data;
}
export default async function categoryPage({params,}:{params:{category:string}}){
    const data:fullProduct[]=await getData(params.category);
    return(
        <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Products for {params.category}</h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {data.map((product)=>(
                    <div key={product.productName} className="group relative">
                        <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                            <img src ={product.image} alt="Product Image" className="w-full h-full object-cover lg:h-full lg:w-full"
                            width={300}
                            height={300}/>
                        </div>
                        <div className="mt-4 flex justify-between"></div>
                        <div>
                            <h3 className="text-sm text-gray-900 font-bold">
                                <Link href={`/product/${product.slug}`}>
                                {product.productName}
                                </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                <p className="mt-1 text-sm text-primary">
                                    Available:{product.inventory}
                                </p>  
                            </div>
                            <p className="text-sm font-medium text-gray-700">${product.price}</p>
                            </div>
                ))}

            </div>

        </div>
        </div>
    )

}