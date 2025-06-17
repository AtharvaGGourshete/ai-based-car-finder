"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Heart, Car as CarIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; // Assuming you're using a toast hook
import { toggleSavedCar } from "@/actions/car-listing";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

const CarCard = ({ car }) => {
  const { isSignedIn } = useAuth();
  const [isSaved, setIsSaved] = useState(car.wishlisted);
  const router = useRouter();

  const {
    loading: isToggling,
    fn: toggleSavedCarFn,
    data: toggleResult,
    error: toggleError,
  } = useFetch(toggleSavedCar);

  // Handle toggle result
  useEffect(() => {
    console.log("toggleResult:", toggleResult);
    if (toggleResult?.success) {
      setIsSaved(toggleResult.saved);
      toast({
        title: "Success",
        description: toggleResult.message,
      });
    }
  }, [toggleResult]);

  useEffect(() => {
    console.log("toggleError:", toggleError);
    if (toggleError) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    }
  }, [toggleError]);
  useEffect(() => {
    if (toggleResult?.success) {
      setIsSaved(toggleResult.saved);
      toast({
        title: "Success",
        description: toggleResult.message,
      });
    }
  }, [toggleResult]);

  // Handle toggle errors
  useEffect(() => {
    if (toggleError) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    }
  }, [toggleError]);

  const handleToggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save cars",
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }

    if (isToggling) return;

    // Optimistic update
    const previousIsSaved = isSaved;
    setIsSaved(!isSaved);

    try {
      const result = await toggleSavedCarFn(car.id);
      if (!result?.success) {
        // Revert optimistic update on failure
        setIsSaved(previousIsSaved);
        toast({
          title: "Error",
          description: result?.message || "Failed to update favorites",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsSaved(previousIsSaved);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition group cursor-pointer">
      <div className="relative h-48">
        {car.images && car.images.length > 0 ? (
          <div className="relative w-full h-full">
            <Image
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <CarIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-white/90 rounded-full p-1.5 ${
            isSaved
              ? "text-red-500 hover:text-red-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={handleToggleSave}
          disabled={isToggling}
        >
          {isToggling ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Heart className={isSaved ? "fill-current" : ""} size={20} />
          )}
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex flex-col mb-2">
          <h3 className="text-lg font-bold line-clamp-1">
            {car.make} {car.model}
          </h3>
          <span className="text-xl font-bold text-blue-600">
            ${car.price.toLocaleString()}
          </span>
        </div>

        <div className="text-gray-600 mb-2 flex items-center">
          <span>{car.year}</span>
          <span className="mx-2">•</span>
          <span>{car.transmission}</span>
          <span className="mx-2">•</span>
          <span>{car.fuelType}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          <Badge variant="outline" className="bg-gray-50">
            {car.bodyType}
          </Badge>
          <Badge variant="outline" className="bg-gray-50">
            {car.mileage.toLocaleString()} miles
          </Badge>
          <Badge variant="outline" className="bg-gray-50">
            {car.color}
          </Badge>
        </div>

        <div className="flex justify-between">
          <Button
            className="flex-1"
            onClick={() => {
              router.push(`/cars/${car.id}`);
            }}
          >
            View Car
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
