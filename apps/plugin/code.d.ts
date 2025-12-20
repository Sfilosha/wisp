declare const normalizeName: (name: string) => string;
declare function rgbaToHex(color: RGBA): string;
declare function toUnit(value: number, { unit, base, }?: {
    unit?: "rem" | "%" | "px" | "none";
    base?: number;
}): string;
declare function getAllTokens(): Promise<{
    numeric: Record<string, string>;
    string: Record<string, string>;
    color: Record<string, string>;
    typography: Record<string, string>;
    ids: Record<string, string>;
}>;
declare function serializeFigmaNode(node: SceneNode): any;
