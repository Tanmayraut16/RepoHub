import React from "react";

const BUTTONS = [
  { type: "recent", text: "Most Recent" },
  { type: "stars", text: "Most Stars" },
  { type: "forks", text: "Most Forks" },
];

const SortRepos = ({ onSort, sortType }) => {
  return (
    <div className="mb-2 flex justify-center lg:justify-end">
      {BUTTONS.map((button) => (
        <button
          key={button.type}
          type={button.type}
          className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
				${sortType === button.type ? "border border-blue-600" : ""}`}
          onClick={() => onSort(button.type)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default SortRepos;