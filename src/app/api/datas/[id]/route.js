import { NextResponse } from "next/server";
import connectMongoDB from "../../../Libs/mongodb";
import student from "../../../models/studentList";
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const {
      newName: name,
      newEmail: email,
      newPhone: phone,
    } = await request.json();
    await connectMongoDB();
    await student.findByIdAndUpdate(id, { name, email, phone });
    return NextResponse.json({ message: "Student updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { message: "Error updating student", error: error.message },
      { status: 500 }
    );
  }
}
