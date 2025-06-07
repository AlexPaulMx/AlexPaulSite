import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Supporter {
  name: string;
  amount: number;
  comment?: string;
  address: string;
  emoji: string;
}

const TheLabCrewList: React.FC = () => {
  const [theLabCrew, setTheLabCrew] = useState<Supporter[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTheLabCrew = async () => {
      try {
        const { data, error } = await supabase
          .from("thelabcrew")
          .select('name, amount, comment, address, emoji')
          .order('amount', { ascending: false })
          .limit(10);

        if (error) {
          console.error("[THE LAB CREW FETCH] Error:", error);
          setError("Error al cargar The Lab Crew");
          return;
        }

        if (!data || data.length === 0) {
          console.log("No The Lab Crew found");
          setTheLabCrew([]);
          return;
        }

        console.log("Fetched The Lab Crew:", data);
        setTheLabCrew(data);
      } catch (err) {
        console.error("Error fetching The Lab Crew:", err);
        setError("Error al cargar The Lab Crew");
      }
    };

    fetchTheLabCrew();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 border border-gray-700 rounded-lg">
      <h2 className="text-xl font-bold mb-4">The Lab Crew</h2>
      {theLabCrew.length === 0 ? (
        <p className="text-gray-400">Aún no hay The Lab Crew.</p>
      ) : (
        <ul className="space-y-2">
          {theLabCrew.map((theLabCrewMember) => (
            <li key={theLabCrewMember.address} className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{theLabCrewMember.emoji}</span>
                <span className="font-medium text-white">{theLabCrewMember.name || theLabCrewMember.address}</span>
              </div>
              <span className="text-yellow-400 font-bold">${theLabCrewMember.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TheLabCrewList; 