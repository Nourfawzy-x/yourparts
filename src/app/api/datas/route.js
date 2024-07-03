import { NextResponse } from "next/server";
import connectMongoDB from "../../Libs/mongodb";
import student from "../../models/studentList";

export async function POST(request) {
  try {
    const { name, email, phone, dateOfAdmission } = await request.json();
    await connectMongoDB();
    await student.create({ name, email, phone, dateOfAdmission });
    return NextResponse.json({ message: "student created" }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email already exists. Please use a different email." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Error creating student", error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    await connectMongoDB();
    await student.findByIdAndDelete(id);
    return NextResponse.json({ message: "student deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { message: "Error deleting student", error: error.message },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    await connectMongoDB();
    if (id) {
      const singleStudent = await student.findById(id);
      if (!singleStudent) {
        return NextResponse.json(
          { message: "Student not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ student: singleStudent });
    } else {
      const students = await student.find();
      return NextResponse.json({ students });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", message: error.message },
      { status: 500 }
    );
  }
}
