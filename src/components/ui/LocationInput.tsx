/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { upazillas, districts } from "bd-geojs";
import { Input } from "./input";

function LocationInput({ value, onChange, ...rest }: any) {
  const [name, setName] = useState(value || "");
  const [suggestions, setSuggestions] = useState<
    { label: string; district: string; union?: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    onChange(val);

    if (val.length > 0) {
      // Find upazilla/union matches and attach district
      const upozallaMatches = upazillas
        .filter((u) => u.name.toLowerCase().startsWith(val.toLowerCase()))
        .map((u) => {
          const parentDistrict = districts.find((d) => d.id === u.district_id);
          return {
            label: `${parentDistrict ? parentDistrict.name : ""} → ${u.name}`,
            district: parentDistrict ? parentDistrict.name : "",
            union: u.name,
          };
        });

      // Find district matches only
      const districtMatches = districts
        .filter((d) => d.name.toLowerCase().startsWith(val.toLowerCase()))
        .map((d) => ({
          label: `${d.name}`,
          district: d.name,
        }));

      setSuggestions([...districtMatches, ...upozallaMatches].slice(0, 10));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (item: { district: string; union?: string }) => {
    // Combine district and union if available
    const displayValue = item.union
      ? `${item.district} → ${item.union}`
      : item.district;

    setName(displayValue);
    onChange(districts.find((d) => d.name === item.district)?.name || "");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Input
        {...rest}
        value={name}
        onChange={handleChange}
        placeholder="Pickup Location"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            background: "white",
            border: "1px solid #ccc",
            width: "100%",
            maxHeight: "150px",
            overflowY: "auto",
            margin: 0,
            padding: 0,
            listStyle: "none",
            zIndex: 1000,
          }}
        >
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationInput;
