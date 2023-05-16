import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import "./App.css";

// pages
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Menu from "./pages/Menu/Menu.jsx";
import AddTransactions from "./pages/AddTransactions/AddTransactions";
import FilterExpenses from "./pages/FilterTransactions/FilterExpenses";
import Onboarding from "./pages/Onboarding/Onboarding.jsx";
import Report from "./pages/Report/Report.jsx";
import Setup from "./pages/Setup/Setup.jsx";
import Transactions from "./pages/Transactions/Transactions.jsx";
import Auth from "./components/Authentication/Auth";
import CategoryReport from "./pages/Report/CategoryReportExpense.jsx";
import CategoryReportIncome from "./pages/Report/CategoryReportIncome.jsx";
import FAQ from "./pages/Menu/FAQ";
import FilterIncome from "./pages/FilterTransactions/FilterIncome";
// import AnimatedOnboarding from "./AnimatedOnboarding";


function App() {
	return (
		<>
			<Router>
				{/* <AnimatedOnboarding /> */}
				<Routes location={location} key={location.pathname}>
					<Route element={<Auth />}>
						<Route path="/" element={<Home />} />
						<Route path="/menu" element={<Menu />} />
						<Route path="/faq" element={<FAQ />} />
						<Route path="/add-transaction" element={<AddTransactions />} />
						{/* <Route path="/add-expense" element={<AddExpense />} /> */}
						{/* <Route path="/add-income" element={<AddIncome />} /> */}
						<Route path="/transactions/income" element={<FilterIncome />} />
						<Route path="/transactions/expenses" element={<FilterExpenses />} />
						<Route path="/report" element={<Report />} />
						<Route path="/report/expense" element={<CategoryReport />} />
						<Route path="/report/income" element={<CategoryReportIncome />} />
						<Route path="/setup" element={<Setup />} />
						<Route path="/transactions" element={<Transactions />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/onboarding" element={<Onboarding />} />
					<Route path="*" element={<h1>Not Found</h1>} />

				</Routes>
			</Router>
		</>
	);
}

export default App;
