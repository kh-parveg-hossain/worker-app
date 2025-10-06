import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchWorkers = () => {
  return axios.get("http://localhost:3000/List-Services")
    .then(res => res.data);
}

const Worker = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: fetchWorkers
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Workers List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.slice(0, 10).map(worker => (
          <div key={worker._id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            width: '250px'
          }}>
            <img 
              src={worker.image} 
              alt={worker.name} 
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h2>{worker.name}</h2>
            <p><strong>Services:</strong> {worker.services}</p>
            <p><strong>Experience:</strong> {worker.experience}</p>
            <p><strong>Religion:</strong> {worker.religion}</p>
            <p><strong>Age:</strong> {worker.age}</p>
            <p><strong>State:</strong> {worker.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Worker;
