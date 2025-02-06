export interface simplifiedProduct{
    productName: string;
    price: number;
    inventory: number;
    image: string;
    slug: string;

}
export interface fullProduct{
    productName: string;
    price: number;
    inventory: number;
    image: any;
    description: string;
    slug: string;
    category: string;
    price_id: string;

}