export default function ToggleSwitch({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div
        className="w-11 h-5 bg-white border border-gray-400 rounded-full relative peer-checked:bg-[#ef4056]
        after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2
        after:left-[3px] after:bg-gray-400 after:rounded-full after:h-3 after:w-3
        after:transition-all peer-checked:after:left-[29px] peer-checked:after:bg-white"
      ></div>
    </label>
  );
}