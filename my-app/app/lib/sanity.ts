import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
export const client = createClient({
    projectId: "e9sgvpiy",
    dataset: "production",
    apiVersion: '2025-01-25',
    // token: 'your-sanity-token',
    useCdn: true,
});

const builder=imageUrlBuilder(client)
export function urlFor(source:any){
    return builder.image(source)
}