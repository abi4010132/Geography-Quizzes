import "./RegionFilter.css"

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

interface RegionFilterProps {
    filteredRegions: string[];
    onChange: (regions: string[]) => void;
}

const RegionFilter = ({ filteredRegions, onChange }: RegionFilterProps) => {
    const toggleRegion = (region: string) => {
        if (filteredRegions.includes(region)) {
            onChange(filteredRegions.filter(r => r !== region));
        } else {
            onChange(filteredRegions.concat(region));
        }
    };

    return (
        <div className="region-filter">
            {regions.map(region => (
                <div className="region-filter" key={region}>
                    <input
                        id={region}
                        type="checkbox"
                        checked={filteredRegions.includes(region)}
                        onChange={() => toggleRegion(region)}
                    />
                    <label key={region} htmlFor={region}>
                        {region}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default RegionFilter;