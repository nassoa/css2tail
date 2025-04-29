import postcss from "postcss";
import postcssJs from "postcss-js";

type ConversionRule = {
  property: string | RegExp;
  valuePattern?: RegExp;
  converter: (value: string, property?: string) => string;
};

const remToTailwind: Record<string, string> = {
  "0.125rem": "0.5",
  "0.25rem": "1",
  "0.375rem": "1.5",
  "0.5rem": "2",
  "0.625rem": "2.5",
  "0.75rem": "3",
  "0.875rem": "3.5",
  "1rem": "4",
  "1.25rem": "5",
  "1.5rem": "6",
  "1.75rem": "7",
  "2rem": "8",
  "2.25rem": "9",
  "2.5rem": "10",
  "2.75rem": "11",
  "3rem": "12",
  "3.5rem": "14",
  "4rem": "16",
  "5rem": "20",
  "6rem": "24",
  "7rem": "28",
  "8rem": "32",
  "9rem": "36",
  "10rem": "40",
  "11rem": "44",
  "12rem": "48",
  "13rem": "52",
  "14rem": "56",
  "15rem": "60",
  "16rem": "64",
  "18rem": "72",
  "20rem": "80",
  "24rem": "96",
};

const cssToTailwindColors: Record<string, string> = {
  transparent: "transparent",
  currentColor: "current",
  black: "black",
  white: "white",
  "#000": "black",
  "#000000": "black",
  "#fff": "white",
  "#ffffff": "white",
  // Grays
  "#f8f9fa": "gray-50",
  "#f1f3f5": "gray-100",
  "#e9ecef": "gray-200",
  "#dee2e6": "gray-300",
  "#ced4da": "gray-400",
  "#adb5bd": "gray-500",
  "#868e96": "gray-600",
  "#495057": "gray-700",
  "#343a40": "gray-800",
  "#212529": "gray-900",
  // Blues
  "#e7f5ff": "blue-50",
  "#d0ebff": "blue-100",
  "#a5d8ff": "blue-200",
  "#74c0fc": "blue-300",
  "#4dabf7": "blue-400",
  "#339af0": "blue-500",
  "#228be6": "blue-600",
  "#1c7ed6": "blue-700",
  "#1971c2": "blue-800",
  "#1864ab": "blue-900",
};

const conversionRules: ConversionRule[] = [
  // Margin
  {
    property: /^margin$/,
    converter: (value) => {
      if (value === "0") return "m-0";
      if (value.includes(" ")) {
        const values = value.split(" ").map((v) => v.trim());
        if (values.length === 2) {
          const [y, x] = values;
          return `${getMarginClass("y", y)} ${getMarginClass("x", x)}`;
        } else if (values.length === 4) {
          const [top, right, bottom, left] = values;
          return `${getMarginClass("t", top)} ${getMarginClass(
            "r",
            right
          )} ${getMarginClass("b", bottom)} ${getMarginClass("l", left)}`;
        }
      }
      return getMarginClass("", value);
    },
  },
  {
    property: /^margin-(top|right|bottom|left)$/,
    converter: (value, property) => {
      const direction = property?.replace("margin-", "");
      const dirMap: Record<string, string> = {
        top: "t",
        right: "r",
        bottom: "b",
        left: "l",
      };
      const dir = dirMap[direction as string] || "";
      return getMarginClass(dir, value);
    },
  },

  // Padding
  {
    property: /^padding$/,
    converter: (value) => {
      if (value === "0") return "p-0";
      if (value.includes(" ")) {
        const values = value.split(" ").map((v) => v.trim());
        if (values.length === 2) {
          const [y, x] = values;
          return `${getPaddingClass("y", y)} ${getPaddingClass("x", x)}`;
        } else if (values.length === 4) {
          const [top, right, bottom, left] = values;
          return `${getPaddingClass("t", top)} ${getPaddingClass(
            "r",
            right
          )} ${getPaddingClass("b", bottom)} ${getPaddingClass("l", left)}`;
        }
      }
      return getPaddingClass("", value);
    },
  },
  {
    property: /^padding-(top|right|bottom|left)$/,
    converter: (value, property) => {
      const direction = property?.replace("padding-", "");
      const dirMap: Record<string, string> = {
        top: "t",
        right: "r",
        bottom: "b",
        left: "l",
      };
      const dir = dirMap[direction as string] || "";
      return getPaddingClass(dir, value);
    },
  },

  // Border Radius
  {
    property: /^border-radius$/,
    converter: (value) => {
      if (value === "0") return "rounded-none";
      if (value === "9999px") return "rounded-full";

      const roundedMap: Record<string, string> = {
        "0.125rem": "rounded-sm",
        "0.25rem": "rounded",
        "0.375rem": "rounded-md",
        "0.5rem": "rounded-lg",
        "0.75rem": "rounded-xl",
        "1rem": "rounded-2xl",
        "1.5rem": "rounded-3xl",
      };

      return roundedMap[value] || `rounded-[${value}]`;
    },
  },
  {
    property: /^border-(top|right|bottom|left)(-radius)?$/,
    converter: (value, property) => {
      const side = property?.replace("border-", "").replace("-radius", "");
      const sideMap: Record<string, string> = {
        top: "t",
        right: "r",
        bottom: "b",
        left: "l",
      };

      const dir = sideMap[side || ""] || "";

      const roundedMap: Record<string, string> = {
        "0.125rem": `rounded-${dir}-sm`,
        "0.25rem": `rounded-${dir}`,
        "0.375rem": `rounded-${dir}-md`,
        "0.5rem": `rounded-${dir}-lg`,
      };

      return roundedMap[value] || `rounded-${dir}-[${value}]`;
    },
  },

  // Width & Height
  {
    property: "width",
    converter: (value) => {
      if (value === "100%") return "w-full";
      if (value === "100vw") return "w-screen";
      if (value === "auto") return "w-auto";
      if (value === "1px") return "w-px";

      const widthClass = remToTailwind[value];
      return widthClass ? `w-${widthClass}` : `w-[${value}]`;
    },
  },
  {
    property: "height",
    converter: (value) => {
      if (value === "100%") return "h-full";
      if (value === "100vh") return "h-screen";
      if (value === "auto") return "h-auto";
      if (value === "1px") return "h-px";

      const heightClass = remToTailwind[value];
      return heightClass ? `h-${heightClass}` : `h-[${value}]`;
    },
  },

  // Gap
  {
    property: /^gap$/,
    converter: (value) => {
      if (value === "0") return "gap-0";

      const gapClass = remToTailwind[value];
      return gapClass ? `gap-${gapClass}` : `gap-[${value}]`;
    },
  },

  // Display
  {
    property: "display",
    converter: (value) => {
      const displayMap: Record<string, string> = {
        block: "block",
        inline: "inline",
        "inline-block": "inline-block",
        flex: "flex",
        "inline-flex": "inline-flex",
        grid: "grid",
        "inline-grid": "inline-grid",
        none: "hidden",
      };

      return displayMap[value] || `${value}`;
    },
  },

  // Background
  {
    property: /^background-color$/,
    converter: (value) => {
      const colorName = cssToTailwindColors[value];
      if (colorName) {
        return `bg-${colorName}`;
      }

      // Handle rgb/rgba
      if (value.startsWith("rgb")) {
        return `bg-[${value}]`;
      }

      // Handle hex
      if (value.startsWith("#")) {
        return `bg-[${value}]`;
      }

      return `bg-${value}`;
    },
  },

  // Text Color
  {
    property: "color",
    converter: (value) => {
      const colorName = cssToTailwindColors[value];
      if (colorName) {
        return `text-${colorName}`;
      }

      // Handle rgb/rgba
      if (value.startsWith("rgb")) {
        return `text-[${value}]`;
      }

      // Handle hex
      if (value.startsWith("#")) {
        return `text-[${value}]`;
      }

      return `text-${value}`;
    },
  },

  // Font Weight
  {
    property: "font-weight",
    converter: (value) => {
      const weightMap: Record<string, string> = {
        "100": "font-thin",
        "200": "font-extralight",
        "300": "font-light",
        "400": "font-normal",
        "500": "font-medium",
        "600": "font-semibold",
        "700": "font-bold",
        "800": "font-extrabold",
        "900": "font-black",
        normal: "font-normal",
        bold: "font-bold",
      };

      return weightMap[value] || `font-[${value}]`;
    },
  },

  // Font Size
  {
    property: "font-size",
    converter: (value) => {
      const sizeMap: Record<string, string> = {
        "0.75rem": "text-xs",
        "0.875rem": "text-sm",
        "1rem": "text-base",
        "1.125rem": "text-lg",
        "1.25rem": "text-xl",
        "1.5rem": "text-2xl",
        "1.875rem": "text-3xl",
        "2.25rem": "text-4xl",
        "3rem": "text-5xl",
        "3.75rem": "text-6xl",
        "4.5rem": "text-7xl",
        "6rem": "text-8xl",
        "8rem": "text-9xl",
      };

      return sizeMap[value] || `text-[${value}]`;
    },
  },

  // line-height
  {
    property: /^line-height$/,
    converter: (value) => {
      console.log("Line-height value:", value);
      const lineHeightMap: Record<string, string> = {
        "1rem": "leading-4",
        "1.25rem": "leading-5",
        "1.5rem": "leading-6",
        "1.75rem": "leading-7",
        "2rem": "leading-8",
        "2.25rem": "leading-9",
        "2.5rem": "leading-10",
      };

      return lineHeightMap[value] || `leading-[${value}]`;
    },
  },
];

function getMarginClass(direction: string, value: string): string {
  const prefix = `m${direction}`;
  if (value === "0") return `${prefix}-0`;
  const size = remToTailwind[value];
  return size ? `${prefix}-${size}` : `${prefix}-[${value}]`;
}

function getPaddingClass(direction: string, value: string): string {
  const prefix = `p${direction}`;
  if (value === "0") return `${prefix}-0`;
  const size = remToTailwind[value];
  return size ? `${prefix}-${size}` : `${prefix}-[${value}]`;
}

export async function convertCssToTailwind(css: string): Promise<string> {
  try {
    const root = postcss.parse(css);
    const cssObject = postcssJs.objectify(root);

    const tailwindClassesMap = new Map<string, string[]>();

    for (const [selector, properties] of Object.entries(cssObject)) {
      if (typeof properties !== "object") continue;

      const classes: string[] = [];

      if (properties && typeof properties === "object") {
        for (const [prop, value] of Object.entries(properties)) {
          console.log("Processing property:", prop, "Value:", value);

          // Convert camelCase to kebab-case
          const kebabProp = prop.replace(
            /[A-Z]/g,
            (m) => `-${m.toLowerCase()}`
          );
          console.log("Normalized property:", kebabProp);

          let converted = false;

          for (const rule of conversionRules) {
            if (
              (typeof rule.property === "string" &&
                kebabProp === rule.property) ||
              (rule.property instanceof RegExp && rule.property.test(kebabProp))
            ) {
              console.log("Matched rule for property:", kebabProp);
              if (
                !rule.valuePattern ||
                (rule.valuePattern && rule.valuePattern.test(value))
              ) {
                const tailwindClass = rule.converter(value, kebabProp);
                if (tailwindClass) {
                  classes.push(tailwindClass);
                  converted = true;
                  break;
                }
              }
            }
          }

          if (!converted) {
            console.log("No rule matched for property:", kebabProp);
            classes.push(`${kebabProp}-[${value}]`);
          }
        }
      }

      tailwindClassesMap.set(selector, classes);
    }

    let result = "";
    for (const [selector, classes] of Array.from(
      tailwindClassesMap.entries()
    )) {
      if (classes.length > 0) {
        result += `/* ${selector} */\n`;
        result += `className="${classes.join(" ")}"\n\n`;
      }
    }

    return result.trim();
  } catch (error) {
    console.error("Error in convertCssToTailwind:", error);
    return "/* Error: Failed to convert CSS */";
  }
}
