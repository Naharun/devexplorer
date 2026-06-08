interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function RepositorySearch({
    value,
    onChange,
}: Props) {
    return (
        <input
            type="text"
            value={value}
            placeholder="Search repositories..."
            onChange={(e) =>
                onChange(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
        />
    );
}