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
		<div className="p-20">
			{expenses.map((e) => (
				<div key={e.id} className="border border-red-400">
					<p>P{e.name}</p>
					<p>Cost: {e.cost}</p>
				</div>
			))}
			<button
				type="button"
				onClick={postNewItem}
				className="border border-green-500"
			>
				<p>Post new item</p>
			</button>
			<button
				type="button"
				onClick={getExpenseByIdOne}
				className="border border-green-500"
			>
				<p>Get expense by id 1</p>
			</button>
			<button
				type="button"
				onClick={deleteExpenseByIdTwo}
				className="border border-green-500"
			>
				<p>Delete expense by id 2</p>
			</button>
		</div>
	);
};

export default Home;
