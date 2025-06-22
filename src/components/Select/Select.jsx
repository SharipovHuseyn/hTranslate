import "./Select.css"
import { supportedLanguages } from '../../lang.js';

export default function Select({ type, value, onChange, options = supportedLanguages }) {
  return (
    <select className={`select-${type}`} value={value} onChange={onChange}>
      {options.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}