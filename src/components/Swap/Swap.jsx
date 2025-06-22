import "./Swap.css"

export default function Swap({ onClick }) {
    return (
        <button className="swap-button" onClick={onClick}>
            <img src="/src/assets/icons/swap.png" alt="swap"/>
        </button>
    );
  }