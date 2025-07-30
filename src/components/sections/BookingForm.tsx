"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'; // Handles client-side navigation
import { format } from "date-fns";
import { Calendar as CalendarIcon, User, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function BookingForm() {
  // Router hook to programmatically change routes.
  const router = useRouter(); 
  
  // States to hold all the form data.
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [adults, setAdults] = useState<string>("2"); // State for adults
  const [children, setChildren] = useState<string>("0"); // State for children

  // This function runs when the "Search" button is clicked.
  const handleSearch = () => {
    // Basic validation to ensure dates are selected.
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return; // Stop the function if dates are missing.
    }
    // Logical validation: check-out cannot be before check-in
    if (checkOut < checkIn) {
      alert("Check-out date cannot be before check-in date.");
      return;
    }
    
    // This creates a URL-safe query string from our form data.
    // e.g., "checkIn=2025-08-10&checkOut=2025-08-15&adults=2&children=0"
    const queryParams = new URLSearchParams({
        checkIn: format(checkIn, 'yyyy-MM-dd'),
        checkOut: format(checkOut, 'yyyy-MM-dd'),
        adults: adults,
        children: children
    }).toString();

    // Redirect the user to the search results page with the data in the URL.
    router.push(`/booking/search?${queryParams}`);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-2xl w-full max-w-5xl text-slate-800 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        
        {/* Check-in Date Picker */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="check-in" className="font-semibold text-xs ml-1">Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="check-in" variant={"outline"} className="w-full justify-start font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Check-out Date Picker */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="check-out" className="font-semibold text-xs ml-1">Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="check-out" variant={"outline"} className="w-full justify-start font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus disabled={(date) => !!checkIn && date < checkIn} />
            </PopoverContent>
          </Popover>
        </div>

        {/* Adults Selector - Now a controlled component using state */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="adults" className="font-semibold text-xs ml-1">Adults</Label>
          <Select value={adults} onValueChange={setAdults}>
            <SelectTrigger id="adults"><User className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
            <SelectContent>
                <SelectItem value="1">1 Adult</SelectItem>
                <SelectItem value="2">2 Adults</SelectItem>
                <SelectItem value="3">3 Adults</SelectItem>
                <SelectItem value="4">4 Adults</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Children Selector - Now a controlled component using state */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="children" className="font-semibold text-xs ml-1">Children</Label>
          <Select value={children} onValueChange={setChildren}>
            <SelectTrigger id="children"><Users className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
            <SelectContent>
                <SelectItem value="0">0 Children</SelectItem>
                <SelectItem value="1">1 Child</SelectItem>
                <SelectItem value="2">2 Children</SelectItem>
                <SelectItem value="3">3 Children</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button - Now calls the handleSearch function when clicked */}
        <Button onClick={handleSearch} size="lg" className="w-full h-10 bg-amber-500 hover:bg-amber-600 text-white font-bold text-base col-span-1 md:col-span-2 lg:col-span-1">
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>
    </div>
  );
}