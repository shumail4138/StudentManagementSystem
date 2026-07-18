"use client";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportButtons({ students }) {

  // ----------------------------
  // Export CSV
  // ----------------------------
  const exportCSV = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);

    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;"
      }
    );

    saveAs(blob, "students.csv");

  };

  // ----------------------------
  // Export Excel
  // ----------------------------
  const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Students"
    );

    XLSX.writeFile(
      workbook,
      "students.xlsx"
    );

  };

  // ----------------------------
  // Export PDF
  // ----------------------------
  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Student List",
      14,
      20
    );

    autoTable(doc, {

      head: [[
        "ID",
        "Name",
        "Email",
        "Phone",
        "Course"
      ]],

      body: students.map(student => [

        student.id,
        student.name,
        student.email,
        student.phone,
        student.course

      ])

    });

    doc.save("students.pdf");

  };

  return (

    <div className="flex gap-3">

      <button
        onClick={exportCSV}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Export CSV
      </button>

      <button
        onClick={exportExcel}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Export Excel
      </button>

      <button
        onClick={exportPDF}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Export PDF
      </button>

    </div>

  );

}