(async () => {
  try {
    const imported = await import("pdf-parse");
    console.log("Imported module:", typeof imported);
    console.log("Imported keys:", Object.keys(imported));
    if (imported.default) console.log("Has .default, type:", typeof imported.default);
  } catch (e) {
    console.log("Import error:", e.message);
  }
  
  try {
    const required = require("pdf-parse");
    console.log("\nRequired module type:", typeof required);
    console.log("Required keys:", Object.keys(required).slice(0, 10));
    console.log("Is directly callable?:", typeof required === "function");
  } catch (e) {
    console.log("Require error:", e.message);
  }
})();
