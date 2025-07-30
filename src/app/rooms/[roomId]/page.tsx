import { use } from "react";
import { notFound } from "next/navigation";

interface RoomDetailPageProps {
  params: { roomId: string };
}

export default function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { roomId } = params;
  // for now we are just showing the room id 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Details for {roomId.charAt(0).toUpperCase() + roomId.slice(1)} Room</h1>
      <p className="text-gray-500">(There will be room details, gallery and reservation button here)</p>
    </div>
  );
} 