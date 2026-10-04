// lib/csv.ts
function escapeCsvValue(value: unknown): string {
    if (value === null || value === undefined) return "";
    const str = String(value);
    // Wrap in quotes if it contains a comma, quote, or newline; escape internal quotes
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

export function toCsv(rows: Record<string, unknown>[], columns: { key: string; header: string }[]): string {
    const headerLine = columns.map((c) => escapeCsvValue(c.header)).join(",");
    const dataLines = rows.map((row) =>
        columns.map((c) => escapeCsvValue(row[c.key])).join(",")
    );
    return [headerLine, ...dataLines].join("\n");
}