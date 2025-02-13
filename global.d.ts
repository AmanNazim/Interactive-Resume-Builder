// global.d.ts
export {}; // This makes the file a module

declare global {
  interface Window {
    jsPDF: typeof import("jspdf").jsPDF; // Declare jsPDF on window
  }
}
