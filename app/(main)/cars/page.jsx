import { getCarFilters } from "@/actions/car-listing";
import React from "react";
import CarFilters from "./_components/car-filters";
import CarListings from "./_components/car-listing";

export const metadata = {
  title: "Cars | Vehiql",
  description: "Browse and search for your dream car",
};

const CarsPage = async () => {
  const filtersData = await getCarFilters();
  return (
    <div className="container mx-auto px-4 py-12">
      <div>
        <h1 className="text-6xl mb-4 font-bold bg-gradient-to-br from-blue-500 to-green-500 bg-clip-text text-transparent">Browse Cars</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="w-full lg:w-80 flex-shrink-0">
          <CarFilters filters={filtersData.data} />
        </div>

        
        <div className="flex-1">
          <CarListings />
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
