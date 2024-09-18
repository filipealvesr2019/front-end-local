import "./Total.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Cookies from "js-cookie";
import { useConfig } from "../../../context/ConfigContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Total({ storeID }) {
  const { apiUrl } = useConfig();
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [monthPercentageChange, setMonthPercentageChange] = useState(0);
  const [dayPercentageChange, setDayPercentageChange] = useState(0);

  const [year, setYear] = useState(0);
  const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie

  console.log("storeID", storeID);

  async function getTotalDay() {
    try {
      const response = await axios.get(`${apiUrl}/api/lucro/dia/${AdminID}`);
      setDay(response.data.lucroHoje);
      setDayPercentageChange(response.data.lucroOntem);
      console.log("getTotalDay", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }
  async function getTotalMonth() {
    try {
      const response = await axios.get(
        `${apiUrl}/api/profit-percentage/mes/${AdminID}`
      );
      setMonth(response.data.currentMonthProfit);
      console.log(response.data.percentageChange);
      setMonthPercentageChange(response.data.previousMonthProfit);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }

  async function getTotalYear() {
    try {
      const response = await axios.get(
        `${apiUrl}/api/admin/vendas/total-mes/${storeID}`
      );
      setYear(response.data.totalGanho);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }
  // Só faz a requisição quando o storeID for válido
  useEffect(() => {
    if (storeID) {
      console.log("Fetching products com storeID:", storeID);
      getTotalDay();
      getTotalMonth();
      getTotalYear();
    }
  }, [storeID]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Lucro do Dia</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">R$ {day}</span>

          <span className="featuredMoneyRate">
            {day === 0 ? (
              <>N/A {/* Exibe "N/A" quando o lucro do dia é zero */}</>
            ) : dayPercentageChange >= 0 ? (
              <>
                R${dayPercentageChange}{" "}
                {/* Mantém a substring */}
                <ArrowUpwardIcon className="featuredIcon" />
              </>
            ) : (
              <>
                R${dayPercentageChange}{" "}
                {/* Mantém a substring */}
                <ArrowDownwardIcon className="featuredIcon negative" />
              </>
            )}
          </span>
        </div>
        <span className="featuredSub">Comparado ao dia anterior</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Lucro do Mês</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">R$ {month}</span>
          <span className="featuredMoneyRate">
            <span className="featuredMoneyRate">
              {day === 0 ? (
                <>N/A {/* Exibe "N/A" quando o lucro do dia é zero */}</>
              ) : dayPercentageChange >= 0 ? (
                <>
                  R$ {monthPercentageChange}{" "}
                  {/* Limita a 5 caracteres */}
                  <ArrowUpwardIcon className="featuredIcon" />
                </>
              ) : (
                <>
                  R$ {monthPercentageChange}{" "}
                  {/* Limita a 5 caracteres */}
                  <ArrowDownwardIcon className="featuredIcon negative" />
                </>
              )}
            </span>
          </span>
        </div>
        <span className="featuredSub">Comparado ao ultimo mes</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Lucro do Ano</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">R$ {year}</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpwardIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
