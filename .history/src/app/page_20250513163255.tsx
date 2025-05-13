"use client";

import api from "@/api/api";
import type { Expense } from "@/types/types";
import { useCallback, useEffect, useRef, useState } from "react";

const NEXT_EXPENSE_ITEM = {
	name: "New item",
	cost: 2000,
} as const;

const Home = () => {
	const [expenses, setExpenses] = useState<Expense[] | null>(null);

	const postNewItem = async () => {
		try {
			const newExpenseItem = await api.createExpense(NEXT_EXPENSE_ITEM);
			setExpenses((e) => {
				if (e) {
					return [...e, newExpenseItem];
				}
				return e;
			});
		} catch (error) {
			window.alert(error);
		}
	};

	const getExpenseByIdOne = async () => {
		try {
			const newExpenseItem = await api.getExpenseById(1);
			window.alert(JSON.stringify(newExpenseItem));
		} catch {
			window.alert("Cannot get item by id 1");
		}
	};

	const deleteExpenseByIdTwo = async () => {
		try {
			const newExpenses = await api.deleteExpenseById(2);
			setExpenses(newExpenses);
		} catch (error) {
			window.alert(error);
		}
	};

	const getExpenses = useCallback(async () => {
		try {
			const expenseResponse = await api.getExpenses();
			setExpenses(expenseResponse);
		} catch (error) {
			window.alert(error);
		}
	}, []);

	useEffect(() => {
		getExpenses();
	}, [getExpenses]);

	if (!expenses) {
		return (
			<div className="p-20">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div className="w-full max-w-sm mx-auto p-8">
			<input
				type="text"
				placeholder="Expense Name"
				// value={expenseName}
				// onChange={(e) => setExpenseName(e.target.value)}
				className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 mb-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
			/>
			<input
				type="text"
				placeholder="Cost"
				// value={expenseCost}
				// onChange={(e) => setExpenseCost(e.target.value)}
				className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 mb-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
			/>
			<button
				// onClick={handleAddExpense}
				className="w-full bg-blue-500 text-white rounded-md px-3 py-2 hover:bg-blue-600 transition"
			>
				Add expense
			</button>
			<div className="w-full max-w-md mx-auto">
				{/* Title */}
				<p className="text-black font-bold text-lg mb-4">Your Expenses</p>

				{/* Expenses List */}
				<div className="space-y-2">
					{expenses.map((e) => (
						<div
							key={e.id}
							className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2"
						>
							{/* Name and Cost */}
							<div className="flex items-center space-x-4">
								<p className="font-bold text-gray-800">{e.name}</p>
								<p className="text-blue-500">- ${e.cost}</p>
							</div>

							{/* Delete Button */}
							<button
								onClick={() => handleDelete(e.id)} // make sure this function exists
								className="text-red-500 border border-red-500 rounded px-2 py-1 text-sm hover:bg-red-50 transition"
							>
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		</div>

		// <div className="p-20">
		// 	{expenses.map((e) => (
		// 		<div key={e.id} className="border border-red-400">
		// 			<p>P{e.name}</p>
		// 			<p>Cost: {e.cost}</p>
		// 		</div>
		// 	))}
		// 	<button
		// 		type="button"
		// 		onClick={postNewItem}
		// 		className="border border-green-500"
		// 	>
		// 		<p>Post new item</p>
		// 	</button>
		// 	<button
		// 		type="button"
		// 		onClick={getExpenseByIdOne}
		// 		className="border border-green-500"
		// 	>
		// 		<p>Get expense by id 1</p>
		// 	</button>
		// 	<button
		// 		type="button"
		// 		onClick={deleteExpenseByIdTwo}
		// 		className="border border-green-500"
		// 	>
		// 		<p>Delete expense by id 2</p>
		// 	</button>
		// </div>
	);
};

export default Home;
