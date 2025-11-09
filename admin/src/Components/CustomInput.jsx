import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

const CustomInput = ({
  label = "Label",
  placeholder = "Enter text",
  type = "text",
  name = "",
  value,
  onChange,
  className = "",
  showPasswordRules = false 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  const rules = [
    { test: /.{8,}/, label: "At least 8 characters" },
    { test: /[A-Z]/, label: "At least 1 uppercase letter" },
    { test: /[a-z]/, label: "At least 1 lowercase letter" },
    { test: /\d/, label: "At least 1 number" },
    { test: /[@$!%*?&]/, label: "At least 1 special character (@$!%*?&)" },
  ];

  const checkRule = (regex) => regex.test(value);

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <label
        htmlFor={name}
        className="font-serif text-sm text-black capitalize"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={isPasswordField && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full font-serif text-base py-2 px-2 rounded-md pr-10 border border-gray-400"
        />
        {isPasswordField && (
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        )}
      </div>

      {showPasswordRules && isPasswordField && value && (
        <ul className="mt-2 space-y-1 text-xs font-serif">
          {rules.map((rule, index) => {
            const passed = checkRule(rule.test);
            return (
              <li
                key={index}
                className={`flex items-center gap-2 ${
                  passed ? "text-green-600" : "text-red-500"
                }`}
              >
                {passed ? <Check size={14} /> : <X size={14} />}
                {rule.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomInput;