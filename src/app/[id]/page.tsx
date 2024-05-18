
import api from "@/api";
import RestaurantCard from "@/app/components/RestaurantCard";
import Link from "next/link";

// export async function generateStaticParams() {
//   const restaurants = await api.list();
 
//   return restaurants.map((restaurant) => ({
//     id: restaurant.id,
//   }));
// }

export default async function RestaurantPage({ params: { id } }: { params: { id: string } }) {
  const restaurant = await api.fetch(id);

  return (
    <>
      < RestaurantCard {...restaurant} />
      <Link href="/" className="opacity-100 flex justify-center mt-9">
        <small>Back to list</small>
      </Link>
    </>
  );
}
