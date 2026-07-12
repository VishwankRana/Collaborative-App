export function renderTemplate(template, variables) {
  let output = template;

  for (const [key, value] of Object.entries(variables)) {
    const pattern = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    output = output.replace(pattern, value ?? "");
  }

  return output;
}
