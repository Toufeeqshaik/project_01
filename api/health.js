export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    success: true,
    patient: { name: "Alex M.", age: 38, gender: "Male" },
    vitals: {
      bp: "118/76",
      hr: "68",
      glucose: "94"
    },
    doctor: {
      name: "Dr. Elena Vance, MD",
      specialty: "Cardiologist",
      appointment: "Tomorrow at 2:30 PM"
    },
    synthesis: {
      anomalies: ["Slightly elevated resting heart rate post-exercise"],
      recommendations: ["Maintain current Metformin dose", "Hydrate well before next lab"]
    }
  });
}
