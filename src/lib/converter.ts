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
  // Base
  transparent: "transparent",
  currentColor: "current",
  black: "black",
  white: "white",
  "#000": "black",
  "#000000": "black",
  "#fff": "white",
  "#ffffff": "white",

  // Slate
  "#f8fafc": "slate-50",
  "#f1f5f9": "slate-100",
  "#e2e8f0": "slate-200",
  "#cbd5e1": "slate-300",
  "#94a3b8": "slate-400",
  "#64748b": "slate-500",
  "#475569": "slate-600",
  "#334155": "slate-700",
  "#1e293b": "slate-800",
  "#0f172a": "slate-900",
  "#020617": "slate-950",

  // Gray
  "#f9fafb": "gray-50",
  "#f3f4f6": "gray-100",
  "#e5e7eb": "gray-200",
  "#d1d5db": "gray-300",
  "#9ca3af": "gray-400",
  "#6b7280": "gray-500",
  "#4b5563": "gray-600",
  "#374151": "gray-700",
  "#1f2937": "gray-800",
  "#111827": "gray-900",
  "#030712": "gray-950",

  // Zinc
  "#fafafa": "zinc-50",
  "#f4f4f5": "zinc-100",
  "#e4e4e7": "zinc-200",
  "#d4d4d8": "zinc-300",
  "#a1a1aa": "zinc-400",
  "#71717a": "zinc-500",
  "#52525b": "zinc-600",
  "#3f3f46": "zinc-700",
  "#27272a": "zinc-800",
  "#18181b": "zinc-900",
  "#09090b": "zinc-950",

  // Neutral
  // "#fafafa": "neutral-50",
  "#f5f5f5": "neutral-100",
  "#e5e5e5": "neutral-200",
  "#d4d4d4": "neutral-300",
  "#a3a3a3": "neutral-400",
  "#737373": "neutral-500",
  "#525252": "neutral-600",
  "#404040": "neutral-700",
  "#262626": "neutral-800",
  "#171717": "neutral-900",
  "#0a0a0a": "neutral-950",

  // Stone
  "#fafaf9": "stone-50",
  "#f5f5f4": "stone-100",
  "#e7e5e4": "stone-200",
  "#d6d3d1": "stone-300",
  "#a8a29e": "stone-400",
  "#78716c": "stone-500",
  "#57534e": "stone-600",
  "#44403c": "stone-700",
  "#292524": "stone-800",
  "#1c1917": "stone-900",
  "#0c0a09": "stone-950",

  // Red
  "#fef2f2": "red-50",
  "#fee2e2": "red-100",
  "#fecaca": "red-200",
  "#fca5a5": "red-300",
  "#f87171": "red-400",
  "#ef4444": "red-500",
  "#dc2626": "red-600",
  "#b91c1c": "red-700",
  "#991b1b": "red-800",
  "#7f1d1d": "red-900",
  "#450a0a": "red-950",

  // Orange
  "#fff7ed": "orange-50",
  "#ffedd5": "orange-100",
  "#fed7aa": "orange-200",
  "#fdba74": "orange-300",
  "#fb923c": "orange-400",
  "#f97316": "orange-500",
  "#ea580c": "orange-600",
  "#c2410c": "orange-700",
  "#9a3412": "orange-800",
  "#7c2d12": "orange-900",
  "#431407": "orange-950",

  // Amber
  "#fffbeb": "amber-50",
  "#fef3c7": "amber-100",
  "#fde68a": "amber-200",
  "#fcd34d": "amber-300",
  "#fbbf24": "amber-400",
  "#f59e0b": "amber-500",
  "#d97706": "amber-600",
  "#b45309": "amber-700",
  "#92400e": "amber-800",
  "#78350f": "amber-900",
  "#451a03": "amber-950",

  // Yellow
  "#fefce8": "yellow-50",
  "#fef9c3": "yellow-100",
  "#fef08a": "yellow-200",
  "#fde047": "yellow-300",
  "#facc15": "yellow-400",
  "#eab308": "yellow-500",
  "#ca8a04": "yellow-600",
  "#a16207": "yellow-700",
  "#854d0e": "yellow-800",
  "#713f12": "yellow-900",
  "#422006": "yellow-950",

  // Lime
  "#f7fee7": "lime-50",
  "#ecfccb": "lime-100",
  "#d9f99d": "lime-200",
  "#bef264": "lime-300",
  "#a3e635": "lime-400",
  "#84cc16": "lime-500",
  "#65a30d": "lime-600",
  "#4d7c0f": "lime-700",
  "#3f6212": "lime-800",
  "#365314": "lime-900",
  "#1a2e05": "lime-950",

  // Green
  "#f0fdf4": "green-50",
  "#dcfce7": "green-100",
  "#bbf7d0": "green-200",
  "#86efac": "green-300",
  "#4ade80": "green-400",
  "#22c55e": "green-500",
  "#16a34a": "green-600",
  "#15803d": "green-700",
  "#166534": "green-800",
  "#14532d": "green-900",
  "#052e16": "green-950",

  // Emerald
  "#ecfdf5": "emerald-50",
  "#d1fae5": "emerald-100",
  "#a7f3d0": "emerald-200",
  "#6ee7b7": "emerald-300",
  "#34d399": "emerald-400",
  "#10b981": "emerald-500",
  "#059669": "emerald-600",
  "#047857": "emerald-700",
  "#065f46": "emerald-800",
  "#064e3b": "emerald-900",
  "#022c22": "emerald-950",

  // Teal
  "#f0fdfa": "teal-50",
  "#ccfbf1": "teal-100",
  "#99f6e4": "teal-200",
  "#5eead4": "teal-300",
  "#2dd4bf": "teal-400",
  "#14b8a6": "teal-500",
  "#0d9488": "teal-600",
  "#0f766e": "teal-700",
  "#115e59": "teal-800",
  "#134e4a": "teal-900",
  "#042f2e": "teal-950",

  // Cyan
  "#ecfeff": "cyan-50",
  "#cffafe": "cyan-100",
  "#a5f3fc": "cyan-200",
  "#67e8f9": "cyan-300",
  "#22d3ee": "cyan-400",
  "#06b6d4": "cyan-500",
  "#0891b2": "cyan-600",
  "#0e7490": "cyan-700",
  "#155e75": "cyan-800",
  "#164e63": "cyan-900",
  "#083344": "cyan-950",

  // Sky
  "#f0f9ff": "sky-50",
  "#e0f2fe": "sky-100",
  "#bae6fd": "sky-200",
  "#7dd3fc": "sky-300",
  "#38bdf8": "sky-400",
  "#0ea5e9": "sky-500",
  "#0284c7": "sky-600",
  "#0369a1": "sky-700",
  "#075985": "sky-800",
  "#0c4a6e": "sky-900",
  "#082f49": "sky-950",

  // Blue
  "#eff6ff": "blue-50",
  "#dbeafe": "blue-100",
  "#bfdbfe": "blue-200",
  "#93c5fd": "blue-300",
  "#60a5fa": "blue-400",
  "#3b82f6": "blue-500",
  "#2563eb": "blue-600",
  "#1d4ed8": "blue-700",
  "#1e40af": "blue-800",
  "#1e3a8a": "blue-900",
  "#172554": "blue-950",

  // Indigo
  "#eef2ff": "indigo-50",
  "#e0e7ff": "indigo-100",
  "#c7d2fe": "indigo-200",
  "#a5b4fc": "indigo-300",
  "#818cf8": "indigo-400",
  "#6366f1": "indigo-500",
  "#4f46e5": "indigo-600",
  "#4338ca": "indigo-700",
  "#3730a3": "indigo-800",
  "#312e81": "indigo-900",
  "#1e1b4b": "indigo-950",

  // Violet
  "#f5f3ff": "violet-50",
  "#ede9fe": "violet-100",
  "#ddd6fe": "violet-200",
  "#c4b5fd": "violet-300",
  "#a78bfa": "violet-400",
  "#8b5cf6": "violet-500",
  "#7c3aed": "violet-600",
  "#6d28d9": "violet-700",
  "#5b21b6": "violet-800",
  "#4c1d95": "violet-900",
  "#2e1065": "violet-950",

  // Purple
  "#faf5ff": "purple-50",
  "#f3e8ff": "purple-100",
  "#e9d5ff": "purple-200",
  "#d8b4fe": "purple-300",
  "#c084fc": "purple-400",
  "#a855f7": "purple-500",
  "#9333ea": "purple-600",
  "#7e22ce": "purple-700",
  "#6b21a8": "purple-800",
  "#581c87": "purple-900",
  "#3b0764": "purple-950",

  // Fuchsia
  "#fdf4ff": "fuchsia-50",
  "#fae8ff": "fuchsia-100",
  "#f5d0fe": "fuchsia-200",
  "#f0abfc": "fuchsia-300",
  "#e879f9": "fuchsia-400",
  "#d946ef": "fuchsia-500",
  "#c026d3": "fuchsia-600",
  "#a21caf": "fuchsia-700",
  "#86198f": "fuchsia-800",
  "#701a75": "fuchsia-900",
  "#4a044e": "fuchsia-950",

  // Pink
  "#fdf2f8": "pink-50",
  "#fce7f3": "pink-100",
  "#fbcfe8": "pink-200",
  "#f9a8d4": "pink-300",
  "#f472b6": "pink-400",
  "#ec4899": "pink-500",
  "#db2777": "pink-600",
  "#be185d": "pink-700",
  "#9d174d": "pink-800",
  "#831843": "pink-900",
  "#500724": "pink-950",

  // Rose
  "#fff1f2": "rose-50",
  "#ffe4e6": "rose-100",
  "#fecdd3": "rose-200",
  "#fda4af": "rose-300",
  "#fb7185": "rose-400",
  "#f43f5e": "rose-500",
  "#e11d48": "rose-600",
  "#be123c": "rose-700",
  "#9f1239": "rose-800",
  "#881337": "rose-900",
  "#4c0519": "rose-950",
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

  // alignements
  {
    property: "align-items",
    converter: (value) => {
      const alignMap: Record<string, string> = {
        center: "items-center",
        start: "items-start",
        end: "items-end",
        baseline: "items-baseline",
        stretch: "items-stretch",
      };

      return alignMap[value] || `items-[${value}]`;
    },
  },
  {
    property: "justify-content",
    converter: (value) => {
      const justifyMap: Record<string, string> = {
        center: "justify-center",
        start: "justify-start",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
        left: "justify-start",
        right: "justify-end",
        baseline: "items-baseline",
        stretch: "items-stretch",
        inherit: "inherit",
        initial: "initial",
        "space-between": "justify-between",
        "space-around": "justify-around",
        "space-evenly": "justify-evenly",
        "space-x-reverse": "space-x-reverse",
        "space-y-reverse": "space-y-reverse",
      };

      return justifyMap[value] || `justify-[${value}]`;
    },
  },

  // Flex Direction
  {
    property: "flex-direction",
    converter: (value) => {
      const directionMap: Record<string, string> = {
        row: "flex-row",
        column: "flex-col",
        "row-reverse": "flex-row-reverse",
        "column-reverse": "flex-col-reverse",
      };

      return directionMap[value] || `flex-[${value}]`;
    },
  },

  // Flex Wrap
  {
    property: "flex-wrap",
    converter: (value) => {
      const wrapMap: Record<string, string> = {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        "wrap-reverse": "flex-wrap-reverse",
      };

      return wrapMap[value] || `flex-[${value}]`;
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

      // Handle hex colors
      if (value.startsWith("#")) {
        return `bg-${convertHexToTailwindColor(value)}`;
      }

      // Handle rgb/rgba
      if (value.startsWith("rgb")) {
        return `bg-[${value}]`;
      }

      return `bg-[${value}]`;
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

      // Handle hex colors
      if (value.startsWith("#")) {
        return `text-${convertHexToTailwindColor(value)}`;
      }

      // Handle rgb/rgba
      if (value.startsWith("rgb")) {
        return `text-[${value}]`;
      }

      return `text-[${value}]`;
    },
  },

  // border
  {
    property: /^border$/,
    converter: (value) => {
      const parts = value.split(" ");
      const [width, style, color] = parts;

      const borderWidth = width === "2px" ? "border-2" : `border-[${width}]`;
      const borderStyle =
        style === "solid" ? "border-solid" : `border-[${style}]`;

      let borderColor = "";
      if (cssToTailwindColors[color]) {
        borderColor = `border-${cssToTailwindColors[color]}`;
      } else if (color.startsWith("#")) {
        borderColor = `border-${convertHexToTailwindColor(color)}`;
      } else {
        borderColor = `border-[${color}]`;
      }

      return `${borderWidth} ${borderStyle} ${borderColor}`.trim();
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

function convertHexToTailwindColor(hex: string): string {
  return cssToTailwindColors[hex.toLowerCase()] || `[${hex}]`;
}

export async function convertCssToTailwind(css: string): Promise<string> {
  try {
    // Nouveau parser CSS maison
    const parsedCSS = parseCSS(css);

    const tailwindClassesMap = new Map<string, string[]>();

    for (const [selector, properties] of Object.entries(parsedCSS)) {
      const classes: string[] = [];

      for (const [prop, value] of Object.entries(properties)) {
        const kebabProp = prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
        let converted = false;

        for (const rule of conversionRules) {
          const propMatch =
            typeof rule.property === "string"
              ? kebabProp === rule.property
              : rule.property.test(kebabProp);

          if (propMatch) {
            const valuePattern = rule.valuePattern;
            const valueStr = String(value).trim();

            if (!valuePattern || valuePattern.test(valueStr)) {
              const tailwindClass = rule.converter(valueStr, kebabProp);
              if (tailwindClass) {
                classes.push(tailwindClass);
                converted = true;
                break;
              }
            }
          }
        }

        if (!converted) {
          classes.push(`${kebabProp}-[${value}]`);
        }
      }

      if (classes.length > 0) {
        tailwindClassesMap.set(selector, classes);
      }
    }

    return formatResult(tailwindClassesMap);
  } catch (error) {
    console.error("Conversion error:", error);
    return "/* Error: Failed to convert CSS */";
  }
}

// Helpers
function parseCSS(css: string): Record<string, Record<string, string>> {
  return css
    .split("}")
    .filter((rule) => rule.trim())
    .reduce((acc, rule) => {
      const [selectorPart, declarations] = rule.split("{");
      const selector = selectorPart?.trim();

      if (selector && declarations) {
        acc[selector] = declarations
          .split(";")
          .filter((decl) => decl.trim())
          .reduce((props, decl) => {
            const [prop, value] = decl.split(":").map((s) => s.trim());
            if (prop && value) props[prop] = value.replace(/!important/g, "");
            return props;
          }, {} as Record<string, string>);
      }
      return acc;
    }, {} as Record<string, Record<string, string>>);
}

function formatResult(map: Map<string, string[]>): string {
  return Array.from(map.entries())
    .map(
      ([selector, classes]) =>
        `/* ${selector} */\nclassName="${classes.join(" ")}"`
    )
    .join("\n\n");
}
