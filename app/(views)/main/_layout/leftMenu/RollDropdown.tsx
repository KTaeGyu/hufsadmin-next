import { Roll } from "../LeftMenu";

interface Props {
  rolls?: Roll[];
  selectedRoll?: Roll;
  selectRollHandler: (roll: Roll) => void;
}

export default function RollDropdown({ rolls, selectedRoll, selectRollHandler }: Props) {
  console.log(rolls);

  return (
    <div id="roll-select-dropdown-div" className="dropdown">
      <button
        id="roll-select-dropdown-button"
        className="btn btn-secondary dropdown-toggle btn-block text-white"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {selectedRoll?.rollName || "역할 선택"}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {rolls?.map((roll) => (
          <a key={roll.rollId} className="dropdown-item" href="#" onClick={() => selectRollHandler(roll)}>
            {roll.rollName}
          </a>
        ))}
      </div>
    </div>
  );
}
