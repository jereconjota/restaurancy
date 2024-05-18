import api from "@/api";
import RestaurantCard from "../components/RestaurantCard";
import { redirect } from "next/navigation";

export default async function HomePage({ searchParams }: { searchParams: { q: string } }) {
  const restaurants = await api.search(searchParams.q);

  async function searchAction(formData: FormData) {
    'use server'

    redirect(`/?q=${formData.get('query')}`);
  }

  return (
    <section>
      {/* <SearchBox /> */}
      <form action={searchAction} className="inline-flex gap-2 mb-4">
        <input defaultValue={searchParams.q || ''} className="px-2 border border-gray-500 rounded-md" name="query" />
        <button type="submit" className="p-2 bg-white/20 rounded-md">Search</button>
      </form>
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {
          !restaurants.length ? (
            <p className="text-center">No restaurants found</p>
          ) : (
            restaurants.map((restaurant) => {
              return (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              );
            })
          )
        }
      </section>
    </section>)
}
