// global.d.ts
export {}; // This makes the file a module

declare global {
  interface Window {
    jsPDF: typeof import("jspdf").jsPDF; // Declare jsPDF on window
    html2canvas: typeof import("html2canvas").html2canvas; // Declare html2canvas on window
    jspdf: typeof import("jspdf"); // Declare jspdf on window
    saveAs: typeof import("file-saver").saveAs; // Declare saveAs on window
  }
}

// Add type declarations for window.jspdf
declare global {
  interface Window {
    jspdf: {
      jsPDF: new (
        orientation?: "p" | "l",
        unit?: "pt" | "mm" | "cm" | "in",
        format?: string | number[]
      ) => any;
    };
  }
}
