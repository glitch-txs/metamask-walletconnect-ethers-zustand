import Connect from '../components/connect/Connect';
import ContractCall from '../components/contractCall/ContractCall';


export default function HomePage() {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column', gap:'30px' }} >
      <Connect/>
      <ContractCall/>
    </div>
  )
}