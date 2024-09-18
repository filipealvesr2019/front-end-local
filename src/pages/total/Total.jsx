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
  const [monthProfitChange, setMonthProfitChange] = useState(0);
  const [dayProfitChange, setDayProfitChange] = useState(0);

  const [expenses, setExpenses] = useState(0);
  const [previousMonthExpenses, setPreviousMonthExpenses] = useState(0);


  const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie

  console.log("storeID", storeID);

  async function getTotalDay() {
    try {
      const response = await axios.get(`${apiUrl}/api/lucro/dia/${AdminID}`);
      setDay(response.data.lucroHoje);
      setDayProfitChange(response.data.lucroOntem);
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
      setMonthProfitChange(response.data.previousMonthProfit);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }

  async function getMonthExpenses() {
    try {
      const response = await axios.get(
        `${apiUrl}/api/despesas-por-mes/${AdminID}`
      );
      setExpenses(response.data.currentMonthExpenses);
      setPreviousMonthExpenses(response.data.previousMonthExpenses)
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
      getMonthExpenses();
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
            ) : day >  dayProfitChange  ? (
              <>
                R${dayProfitChange}{" "}
                {/* Mantém a substring */}
                <ArrowUpwardIcon className="featuredIcon" />
              </>
            ) : (
              <>
                R${dayProfitChange}{" "}
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
              {month === 0 ? (
                <>N/A {/* Exibe "N/A" quando o lucro do dia é zero */}</>
              ) : month > monthProfitChange? (
                <>
                  R$ {monthProfitChange}{" "}
                  {/* Limita a 5 caracteres */}
                  <ArrowUpwardIcon className="featuredIcon" />
                </>
              ) : (
                <>
                  R$ {monthProfitChange}{" "}
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
        <span className="featuredTitle">Despesas do mes</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">R$ {expenses}</span>
          <span className="featuredMoneyRate">
              {expenses === 0 ? (
                <>N/A {/* Exibe "N/A" quando o lucro do dia é zero */}</>
              ) : month > previousMonthExpenses? (
                <>
                  R$ {previousMonthExpenses}{" "}
                  {/* Limita a 5 caracteres */}
                  <ArrowUpwardIcon className="featuredIcon" />
                </>
              ) : (
                <>
                  R$ {previousMonthExpenses}{" "}
                  {/* Limita a 5 caracteres */}
                  <ArrowDownwardIcon className="featuredIcon negative" />
                </>
              )}
            </span>
        </div>
        <span className="featuredSub">Comparado ao ultimo mes</span>
      </div>
    </div>
  );
}
