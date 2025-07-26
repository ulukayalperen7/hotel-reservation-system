"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, User, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function BookingForm() {
  // States to hold the selected check-in and check-out dates.
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();

  return (
    // The main container for the form with a blurred glass effect.
    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-2xl w-full max-w-5xl text-slate-800">
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
              <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Adults Selector */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="adults" className="font-semibold text-xs ml-1">Adults</Label>
          <Select defaultValue="2">
            <SelectTrigger id="adults"><User className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
            <SelectContent>
                <SelectItem value="1">1 Adult</SelectItem>
                <SelectItem value="2">2 Adults</SelectItem>
                <SelectItem value="3">3 Adults</SelectItem>
                <SelectItem value="4">4 Adults</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Children Selector */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="children" className="font-semibold text-xs ml-1">Children</Label>
          <Select defaultValue="0">
            <SelectTrigger id="children"><Users className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
            <SelectContent>
                <SelectItem value="0">0 Children</SelectItem>
                <SelectItem value="1">1 Child</SelectItem>
                <SelectItem value="2">2 Children</SelectItem>
                <SelectItem value="3">3 Children</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button size="lg" className="w-full h-10 bg-amber-500 hover:bg-amber-600 text-white font-bold text-base col-span-1 md:col-span-2 lg:col-span-1">
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>
    </div>
  );
}