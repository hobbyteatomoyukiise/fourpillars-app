// src/App.tsx
import { useState } from 'react';

const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

function calculatePillar(offset: number, base: number) {
  const stem = heavenlyStems[(base - 4 + offset) % 10];
  const branch = earthlyBranches[(base - 4 + offset) % 12];
  return `${stem}${branch}`;
}

export default function App() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState<any>(null);

  const handleSubmit = () => {
    const date = new Date(birthdate);
    const year = date.getFullYear();

    const sampleResult = {
      name,
      birthdate,
      gender,
      pillars: {
        year: calculatePillar(0, year),
        month: calculatePillar(1, year),
        day: calculatePillar(2, year),
        hour: calculatePillar(3, year),
      },
      elements: {
        fire: 2,
        earth: 3,
        water: 1,
        metal: 2,
        wood: 2,
      },
      luckCycles: Array.from({ length: 5 }, (_, i) => ({
        age: (i + 1) * 10,
        pillar: calculatePillar(i + 4, year),
      })),
      yearlyFortunes: Array.from({ length: 5 }, (_, i) => {
        const y = 2025 + i;
        return {
          year: y,
          pillar: calculatePillar(i, y),
          keywords: "変化の年",
          sixStar: "調整中"
        };
      })
    };

    setResult(sampleResult);
  };

  return (
    <div className="max-w-xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">四柱推命｜整い命式アプリ</h1>
      <div className="grid gap-4 mb-6">
        <input className="border p-2" placeholder="氏名" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2" placeholder="生年月日 (YYYY-MM-DD)" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        <select className="border p-2" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">男性</option>
          <option value="female">女性</option>
        </select>
        <button className="bg-blue-600 text-white py-2 rounded" onClick={handleSubmit}>鑑定する</button>
      </div>

      {result && (
        <div className="bg-white border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">命式結果（{result.name}さん）</h2>
          <p>生年月日: {result.birthdate}</p>
          <p>性別: {result.gender === "male" ? "男性" : "女性"}</p>
          <p>年柱: {result.pillars.year} / 月柱: {result.pillars.month} / 日柱: {result.pillars.day} / 時柱: {result.pillars.hour}</p>

          <h3 className="mt-4 font-semibold">五行バランス</h3>
          <ul>
            {Object.entries(result.elements).map(([key, val]) => (
              <li key={key}>{key.toUpperCase()}: {val}</li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold">大運</h3>
          <ul>
            {result.luckCycles.map((cycle, i) => (
              <li key={i}>{cycle.age}歳〜：{cycle.pillar}</li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold">今後5年の年運</h3>
          <ul>
            {result.yearlyFortunes.map((fortune, i) => (
              <li key={i}>{fortune.year}年：{fortune.pillar} / {fortune.keywords} / 六星：{fortune.sixStar}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
