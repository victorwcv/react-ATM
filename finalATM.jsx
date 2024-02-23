const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3>{atmMode}</h3>
      <input
        id="number-input"
        type="number"
        width="200"
        onChange={onChange}
      />
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid} />
      {!isValid && <p style={{ color: 'red' }}>Transaction not valid</p>}
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      setValidTransaction(false);
      return;
    }
    if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(true);
    event.preventDefault();
  };

  const handleModeSelect = event => {
    setAtmMode(event.target.value);
    if (event.target.value === 'Deposit') {
      setIsDeposit(true);
    } else if (event.target.value === 'Cash Back') {
      setIsDeposit(false);
    }
    setValidTransaction(false); // Reset validTransaction when mode changes
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode} isValid={validTransaction}></ATMDeposit>}
    </form>
  );
};

const element = document.getElementById('root');
const root = ReactDOM.createRoot(element);
root.render(<Account />)