import Connect from '../components/connect/Connect';
import ContractCall from '../components/contractCall/ContractCall';
import useAccount from '../hook/useAccount';


export default function HomePage() {

  const { userAddress } = useAccount()

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column', gap:'30px' }} >
      <Connect/>
      <ContractCall/>
      <div>
        { userAddress }
      </div>
    </div>
  )
}