import Sidebar from './Sidebar';
import UserCard from './Usercard';
const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Sidebar />
      <UserCard/>
    </div>
  )
}

export default Home