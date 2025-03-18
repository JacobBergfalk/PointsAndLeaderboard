import "../assets/styles.css";
/**
 * HTML element at the bottom of the page
 */
function SalesPitch() {
  return (
    <div className="pitch-container">
      <h2 className="title">Varför oss?</h2>
      <div className="sections">
        {/* Section 1 */}
        <div className="pitch-cards">
          <img src="/images/happy.png" alt="happy" className="card-img" />
          <h3 className="card-title">Enkel Registrering</h3>
          <p className="card-text">Snabbt och säker loggar du in och spelar!</p>
        </div>
        {/* Section 1 */}
        <div className="pitch-cards">
          <img src="/images/moneyface.png" alt="" className="card-img" />
          <h3 className="card-title">Inga Uttag</h3>
          <p className="card-text">
            Du kan inte begära att ta ut eller ta ut dina vinster eller
            förluster
          </p>
        </div>
        {/* Section 1 */}
        <div className="pitch-cards">
          <img src="/images/document.png" alt="" className="card-img" />
          <h3 className="card-title">Inget ansvar</h3>
          <p className="card-text">
            Vi tar inget juridiskt ansvar för eventuella ekonomiska förluster
            eller negativa konsekvenser som kan uppstå till följd av spelande på
            vår plattform.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SalesPitch;
