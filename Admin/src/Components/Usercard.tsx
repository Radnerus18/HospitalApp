
interface UserCardProps {
    name: string;
    dob: string;
    age: number;
    gender: string;
    city: string;
    userId: string;
    mailId: string;
}
const User_Bio: UserCardProps = {
    name: "John Doe",
    dob: "1990-01-01",
    age: 35,
    gender: "Male",
    city: "New York",
    userId: "123456",
    mailId: "john.doe@example.com"
  };
const UserCard = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Patient Details</h2>
            <img src="./assets/images/person.png" alt="" width={150}/>
            <p className="text-gray-700"><span className="font-semibold">Name:</span> {User_Bio.name}</p>
            <p className="text-gray-700"><span className="font-semibold">Date of Birth:</span> {User_Bio.dob}</p>
            <p className="text-gray-700"><span className="font-semibold">Age:</span> {User_Bio.age}</p>
            <p className="text-gray-700"><span className="font-semibold">Gender:</span> {User_Bio.gender}</p>
            <p className="text-gray-700"><span className="font-semibold">City:</span> {User_Bio.city}</p>
            <p className="text-gray-700"><span className="font-semibold">User ID:</span> {User_Bio.userId}</p>
            <p className="text-gray-700"><span className="font-semibold">Email ID:</span> {User_Bio.mailId}</p>
        </div>
    );
};

export default UserCard;
