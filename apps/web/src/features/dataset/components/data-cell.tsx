interface DataCellProps {
  value: unknown;
}

export function DataCell({
  value,
}: DataCellProps) {
  return (
    <td className="px-4 py-3">
      {String(value ?? "")}
    </td>
  );
}