import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  console.log("Received patient:", data);
  // TODO: persist to database...
  return NextResponse.json(
    {
      success: true,
      name: data.name,
      contact: data.contact,
      appointmentDate: data.appointmentDate,
      doctor: data.doctor,
    },
    { status: 201 }
  );
}
