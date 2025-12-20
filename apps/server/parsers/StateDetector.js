import Logger from "../../../helpers/Logger.js";
import { pseudoClassValues } from "../helpers/pseudoClassValues.js";

// Analyses the component's properties map and dynamically finds the one
// that corresponds to pseudo-states (hover, focus, disabled).

// propsMap: {Map<string, Set<string>>}
export function findStatePropName(propsMap) {
  const pseudoItem = new Set(pseudoClassValues);

  for (const [propName, values] of propsMap.entries()) {
    // console.log(`Checking property: "${propName}" with value:`, values);
    const lowerCaseValues = Array.from(values).map(v => v.toLowerCase());

    // Check for values that match pseudo-classes
    if (lowerCaseValues.some(v => pseudoItem.has(v))) {
      Logger.info(`Property that corresponds to state: "${propName}"`);
      return propName;
    }
  }
  return null;
  // Return "null" if no state property is found or {propName} if found
  // propName - any string from Figma component properties that matches pseudo-classes
}
