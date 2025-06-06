"use client";

import { useStackOneHub } from "@stackone/react-hub";
import type React from "react";
import { useCallback, useEffect } from "react";
import { retrieveConnectSessionToken } from "../http/SessionToken";

const LinkAccountButton: React.FC = () => {
	const { startConnect } = useStackOneHub();

	const startFlow = useCallback(async () => {
		try {
			const sessionToken = await retrieveConnectSessionToken();
			startConnect({ sessionToken: sessionToken.token });
		} catch (error) {
			console.error("Error starting connect flow:", error);
		}
	}, [startConnect]);

	useEffect(() => {
		startFlow();
	}, [startFlow]);
	return null;
};

export default LinkAccountButton;
