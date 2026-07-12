import { INTERVIEW_LANGUAGES } from "../lib/interview";

const LANGUAGE_DOT_CLASS = {
  javascript: "lang-dot--javascript",
  python: "lang-dot--python",
  java: "lang-dot--java",
  cpp: "lang-dot--cpp",
};

export default function LanguageSelector({
  value,
  onChange,
  disabled = false,
  readOnly = false,
  showLabel = false,
}) {
  const dotClass = LANGUAGE_DOT_CLASS[value] || LANGUAGE_DOT_CLASS.javascript;
  const selectedLabel =
    INTERVIEW_LANGUAGES.find((option) => option.value === value)?.label || value;

  if (readOnly) {
    return (
      <div className="interview-language-readonly">
        {showLabel ? <span className="interview-language-label">Language</span> : null}
        <div className="lang-select-wrap">
          <span className={`lang-dot ${dotClass}`} aria-hidden="true" />
          <strong>{selectedLabel}</strong>
        </div>
      </div>
    );
  }

  return (
    <label className="interview-language-select">
      {showLabel ? <span className="interview-language-label">Language</span> : null}
      <div className="lang-select-wrap">
        <span className={`lang-dot ${dotClass}`} aria-hidden="true" />
        <select
          className="interview-lang-select"
          disabled={disabled}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Programming language"
        >
          {INTERVIEW_LANGUAGES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}
