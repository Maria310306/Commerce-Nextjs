import { client } from "../lib/sanity";
import { simplifiedProduct } from "../components/interface";
import Link from "next/link";
import Image from "next/image";

async function getAllProducts() {
    const query = `*[_type == "product"] | order(_createdAt desc) {
        productName,
        price,
        inventory,
        "image": image.asset->url,
        "slug": slug.current
    }`;
    const data = await client.fetch(query);
    return data;
}

export default async function AllProducts() {
    const data: simplifiedProduct[] = await getAllProducts();

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">All Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.map((product) => (
                        <div key={product.productName} className="group relative">
                            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                                <Image
                                    src={product.image}
                                    alt="Product Image"
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-cover lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between"></div>
                            <div>
                                <h3 className="text-sm text-gray-900 font-bold">
                                    <Link href={`/product/${product.slug}`}>
                                        {product.productName}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-sm text-primary">
                                    Available: {product.inventory}
                                </p>
                            </div>
                            <p className="text-sm font-medium text-gray-700">${product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
