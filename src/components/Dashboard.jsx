import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"; // Chart.js ve gerekli bileşenleri içe aktar
import clientsImage from "../assets/clients.png";
import botoksImage from "../assets/botoks.png";
import consultationImage from "../assets/consultation.png";
import surgeryImage from "../assets/surgery.png";
import rightArrowImage from "../assets/right-arrow.png";
import { useNavigate } from "react-router-dom";
import HeaderImg from "../assets/HeaderImg.png";
// Chart.js bileşenlerini kaydet
Chart.register(...registerables);

const Dashboard = ({
  clientsLast3Months,
  clientsLast6Months,
  clientsLast12Months,
  appointmentData,
  clientCount,
  graphData,
}) => {
  const [moreData, setMoreData] = useState(true);
  const navigate = useNavigate();

  function getLastSixMonths() {
    const months = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];
    const result = [];
    const today = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      result.push(months[date.getMonth()]);
    }

    return result;
  }

  const data = {
    labels: getLastSixMonths(),
    datasets: [
      {
        label: "Patient Count",
        data: Object.values(graphData),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full  flex  justify-center p-4 h-full">
      <div className="w-full max-w-6xl">
        <div className=" p-4 rounded-3xl flex  justify-center">
          <img src={HeaderImg} width={520}></img>
        </div>
        <div className="flex flex-col justify-between">
          <div className="mt-3 flex lg:flex-row flex-col gap-4 w-full h-auto bg-stone-100 rounded-3xl shadow-lg overflow-auto">
            <div className="lg:m-3 rounded-lg  p-4 w-full sm:w-1/2 lg:w-5/12 bg-transparent">
              <h4 className="text-center mb-6">Patienten</h4>
              <Line data={data} content="" />
            </div>
            <div className="lg:m-5 bg-indigo-100 rounded-2xl p-4 w-full sm:w-1/2 lg:w-5/12 ">
              <h3 className="text-xl font-semibold mb-4">
                Patienten Eingetragen
              </h3>
              <div>
                <div className="p-2 flex items-center justify-around bg-sky-950 rounded-lg mb-2 text-white">
                  <span className="font-medium">Anzahl der Kunden</span>
                  <span className="font-medium">Zeitraum</span>
                </div>
                <div className="p-2 flex items-center justify-around bg-white rounded-lg mb-2">
                  <span>{clientsLast3Months} Neue Kunden</span>
                  <span>Letzte 3 Monate</span>
                </div>
                <div className="p-2 flex items-center justify-around bg-white rounded-lg mb-2">
                  <span>{clientsLast6Months} Neue Kunden</span>
                  <span>Letzte 6 Monate</span>
                </div>
                <div className="p-2 flex items-center justify-around bg-white rounded-lg mb-2">
                  <span>{clientsLast12Months} Neue Kunden</span>
                  <span>Letzte 12 Monate</span>
                </div>

                <div className="flex justify-end">
                  <button
                    className="text-red-600  hover:text-gray-900 w-4 h-2 "
                    onClick={() => navigate("/clients")}
                  >
                    <img src={rightArrowImage} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border-inherit p-4 w-full mb-6 lg:mb-0">
            <div className="m-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Patients */}
              <div className="flex items-center rounded-lg bg-gradient-to-br from-green-50 to-green-200 p-4 sm:w-60 md:w-48 lg:w-full h-28 gap-4 shadow-md">
                <div className="w-16 h-16 border-4 border-green-700 rounded-full flex items-center justify-center">
                  <img
                    src={clientsImage}
                    alt="Clients"
                    className="w-10 h-10 p-1"
                  />
                </div>
                <div>
                  <p className="text-center m-0">Patienten</p>
                  <h2 className="text-center font-bold text-5xl">
                    {clientCount}
                  </h2>
                </div>
              </div>

              {/* Consultation */}
              <div className="flex items-center rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-200 p-8 sm:w-60 md:w-48 lg:w-full h-28 gap-4 shadow-md">
                <div className="w-16 h-16 border-4 border-indigo-700 rounded-full flex items-center justify-center">
                  <img
                    src={consultationImage}
                    alt="Consultation"
                    className="w-10 h-10 p-1"
                  />
                </div>
                <div>
                  <p className="text-center m-0">Beratung</p>
                  <h2 className="text-center font-bold text-5xl">
                    {appointmentData.Consulting}
                  </h2>
                </div>
              </div>

              {/* Injection */}
              <div className="flex items-center rounded-lg bg-gradient-to-br from-fuchsia-50 to-fuchsia-200 p-8 sm:w-60 md:w-48 lg:w-full h-28 gap-4 shadow-md">
                <div className="w-16 h-16 border-4 border-fuchsia-700 rounded-full flex items-center justify-center">
                  <img
                    src={botoksImage}
                    alt="Bototks"
                    className="w-10 h-10 p-1"
                  />
                </div>
                <div>
                  <p className="text-center m-0">Injektion</p>
                  <h2 className="text-center font-bold text-5xl">
                    {appointmentData.Injection}
                  </h2>
                </div>
              </div>

              {/* Surgery */}
              <div className="flex items-center rounded-lg bg-gradient-to-br from-amber-50 to-amber-200 p-8 sm:w-60 md:w-48 lg:w-full h-28 gap-4 shadow-md">
                <div className="w-16 h-16 border-4 border-amber-700 rounded-full flex items-center justify-center">
                  <img
                    src={surgeryImage}
                    alt="Surgery"
                    className="w-10 h-10 p-1"
                  />
                </div>
                <div>
                  <p className="text-center m-0">Operation</p>
                  <h2 className="text-center font-bold text-5xl">
                    {appointmentData.Surgery}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
