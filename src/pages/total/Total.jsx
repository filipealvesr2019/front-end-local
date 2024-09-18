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

  const [year, setYear] = useState(0);
  const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie

  console.log("storeID", storeID);

  async function getTotalDay() {
    try {
      const response = await axios.get(
        `${apiUrl}/api//admin/vendas/total-dia/${storeID}`
      );
      setDay(response.data.totalGanho);
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
      setMonthPercentageChange(response.data.percentageChange);
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
        <span className="featuredTitle">Dia</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">R$ {day}</span>
          <span className="featuredMoneyRate">
            percentageChange{" "}
            <ArrowDownwardIcon className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Mês</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">R$ {month}</span>
          <span className="featuredMoneyRate">
            {monthPercentageChange >= 0 ? (
              <>
                {monthPercentageChange.toFixed(2)}%
                <ArrowUpwardIcon className="featuredIcon" />
              </>
            ) : (
              <>
                {monthPercentageChange.toFixed(2)}%
                <ArrowDownwardIcon className="featuredIcon negative" />
              </>
            )}
          </span>
        </div>
        <span className="featuredSub">Comparado ao ultimo mes</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Ano</span>
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
