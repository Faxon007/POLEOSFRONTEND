const fs = require("fs");
const path = require("path");

const oldName = process.argv[2]; // singular ej: robot
const newName = process.argv[3]; // singular ej: poleo

if (!oldName || !newName) {
  console.error("❌ Uso: node clone-option.js <oldName> <newName>");
  process.exit(1);
}

// Derivar plurales
const oldPlural = oldName.endsWith("s") ? oldName : oldName + "s";
const newPlural = newName.endsWith("s") ? newName : newName + "s";

// Capitalizar
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const replacements = [
  { from: oldName, to: newName },             // robot → poleo
  { from: capitalize(oldName), to: capitalize(newName) }, // Robot → Poleo
  { from: oldPlural, to: newPlural },         // robots → poleos
  { from: capitalize(oldPlural), to: capitalize(newPlural) } // Robots → Poleos
];

// Copiar directorio
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  fs.readdirSync(src).forEach(file => {
    const srcFile = path.join(src, file);

    let destFile = path.join(dest, file);
    replacements.forEach(r => {
      destFile = destFile.replace(new RegExp(r.from, "g"), r.to);
    });

    if (fs.lstatSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      let content = fs.readFileSync(srcFile, "utf8");
      replacements.forEach(r => {
        content = content.replace(new RegExp(r.from, "g"), r.to);
      });
      fs.writeFileSync(destFile, content, "utf8");
    }
  });
}

// Paths
const pagesDir = path.join(__dirname, "src", "app", "pages");
const servicesDir = path.join(__dirname, "src", "app", "services");

const oldPageDir = path.join(pagesDir, oldPlural);
const newPageDir = path.join(pagesDir, newPlural);

const oldServiceDir = path.join(servicesDir, oldName);
const newServiceDir = path.join(servicesDir, newName);

// Ejecutar
copyDir(oldPageDir, newPageDir);
copyDir(oldServiceDir, newServiceDir);

console.log(`✅ Clonado con reemplazos: ${oldName} → ${newName}, ${oldPlural} → ${newPlural}`);
